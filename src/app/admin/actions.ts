
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
    // If running on Netlify, persist to Netlify Blobs (durable storage)
    if (process.env.NETLIFY === 'true') {
      try {
        const store = getStore({ name: 'content', consistency: 'strong' });
        await store.set('content.json', JSON.stringify(content, null, 2));
      } catch (err) {
        // If Blobs isn't available (e.g., unexpected build/preview context), fall back to file
        await saveContentToFile(content);
      }
    } else {
      // Local dev fallback to file system
      await saveContentToFile(content);
    }
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
    return { success: true };
  } catch (error) {
    console.error('Failed to save content:', error);
    return { success: false, error: 'Failed to save content.' };
  }
}
export { saveContent };
