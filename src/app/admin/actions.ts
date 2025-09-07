
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
    console.log('Environment check - NETLIFY_DEV:', process.env.NETLIFY_DEV);
    console.log('Environment check - CONTEXT:', process.env.CONTEXT);
    console.log('Environment check - NETLIFY_SITE_ID:', process.env.NETLIFY_SITE_ID);
    console.log('Environment check - AWS_LAMBDA_FUNCTION_NAME:', process.env.AWS_LAMBDA_FUNCTION_NAME);
    console.log('Environment check - AWS_EXECUTION_ENV:', process.env.AWS_EXECUTION_ENV);
    console.log('Environment check - LAMBDA_RUNTIME_DIR:', process.env.LAMBDA_RUNTIME_DIR);
    console.log('Environment check - NODE_ENV:', process.env.NODE_ENV);
    
    // Check if we're running on Netlify Functions (multiple detection methods)
    const isNetlify = process.env.NETLIFY === 'true' || 
                     process.env.NETLIFY_DEV === 'true' || 
                     process.env.CONTEXT === 'production' ||
                     process.env.CONTEXT === 'deploy-preview' ||
                     process.env.CONTEXT === 'branch-deploy' ||
                     typeof process.env.NETLIFY_SITE_ID !== 'undefined' ||
                     typeof process.env.AWS_LAMBDA_FUNCTION_NAME !== 'undefined' ||
                     typeof process.env.AWS_EXECUTION_ENV !== 'undefined' ||
                     typeof process.env.LAMBDA_RUNTIME_DIR !== 'undefined' ||
                     process.env.AWS_EXECUTION_ENV === 'AWS_Lambda_nodejs18.x' ||
                     process.env.AWS_EXECUTION_ENV === 'AWS_Lambda_nodejs20.x';
    
    console.log('saveContent: Detected Netlify environment:', isNetlify);
    
    // Always try Netlify Blobs first - this is the most reliable approach
    try {
      console.log('saveContent: Attempting Netlify Blobs storage');
      const store = getStore({ name: 'content', consistency: 'strong' });
      const result = await store.setJSON('content.json', content);
      console.log('saveContent: Successfully saved to Netlify Blobs', { modified: result.modified, etag: result.etag });
    } catch (blobError) {
      console.error('saveContent: Blob save failed:', blobError);
      
      // Check if we're in a serverless environment where filesystem is read-only
      const isServerless = typeof process.env.AWS_LAMBDA_FUNCTION_NAME !== 'undefined' ||
                          typeof process.env.AWS_EXECUTION_ENV !== 'undefined' ||
                          typeof process.env.LAMBDA_RUNTIME_DIR !== 'undefined';
      
      if (isServerless) {
        console.error('saveContent: In serverless environment with read-only filesystem, cannot fallback');
        throw new Error('Netlify Blobs unavailable in serverless environment and filesystem is read-only');
      } else {
        console.log('saveContent: Falling back to local file system');
        await saveContentToFile(content);
        console.log('saveContent: Fallback file save completed');
      }
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
