
'use server';

import type { IContent } from '@/lib/content';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';

const contentPath = path.join(process.cwd(), 'src/lib/content.json');

import { getStore } from '@netlify/blobs';

async function saveContentToFile(content: IContent): Promise<void> {
  await fs.writeFile(contentPath, JSON.stringify(content, null, 2), 'utf8');
}

async function saveContent(content: IContent) {
  try {
    console.log('saveContent: Starting save operation');
    console.log('Environment check - NETLIFY:', process.env.NETLIFY);
    
    // If running on Netlify, persist to Netlify Blobs (durable storage)
    if (process.env.NETLIFY === 'true') {
      console.log('saveContent: Using Netlify Blobs storage');
      try {
        const store = getStore({ name: 'content', consistency: 'strong' });
        await store.set('content.json', JSON.stringify(content, null, 2));
        console.log('saveContent: Successfully saved to Netlify Blobs');
      } catch (blobError) {
        console.error('saveContent: Blob save failed, falling back to file:', blobError);
        // If Blobs isn't available (e.g., unexpected build/preview context), fall back to file
        await saveContentToFile(content);
        console.log('saveContent: Fallback file save completed');
      }
    } else {
      console.log('saveContent: Using local file system');
      // Local dev fallback to file system
      await saveContentToFile(content);
      console.log('saveContent: Local file save completed');
    }
    
    console.log('saveContent: Starting cache revalidation');
    // Revalidate all pages that might use this content
    revalidatePath('/');
    revalidatePath('/academics');
    revalidatePath('/admission');
    revalidatePath('/faculty');
    revalidatePath('/infrastructure');
    revalidatePath('/student-life');
    revalidatePath('/library');
    revalidatePath('/campus');
    revalidatePath('/virtual-tour');
    console.log('saveContent: Cache revalidation completed');
    
    return { success: true };
  } catch (error) {
    console.error('saveContent: Fatal error during save operation:', error);
    return { 
      success: false, 
      error: `Failed to save content: ${error instanceof Error ? error.message : String(error)}` 
    };
  }
}
export { saveContent };
