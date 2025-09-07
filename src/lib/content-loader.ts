import fs from 'fs/promises';
import path from 'path';
import { IContent } from './content';
import { getStore } from '@netlify/blobs';

const contentPath = path.join(process.cwd(), 'src/lib/content.json');

// This function is intended to be used in Server Components and Server Actions.
export async function getContent(): Promise<IContent> {
  // Check if we're running on Netlify Functions (AWS Lambda environment)
  // Netlify Functions run on AWS Lambda, so AWS_LAMBDA_FUNCTION_NAME will be present
  const isNetlify = process.env.NETLIFY === 'true' || 
                   process.env.NETLIFY_DEV === 'true' || 
                   process.env.CONTEXT === 'production' ||
                   process.env.CONTEXT === 'deploy-preview' ||
                   process.env.CONTEXT === 'branch-deploy' ||
                   typeof process.env.NETLIFY_SITE_ID !== 'undefined' ||
                   typeof process.env.AWS_LAMBDA_FUNCTION_NAME !== 'undefined';

  // In Netlify, try durable storage first. If not available during build, fall back.
  if (isNetlify) {
    try {
      const store = getStore({ name: 'content', consistency: 'strong' });
      const json = await store.get('content.json', { type: 'json' });
      if (json) {
        console.log('getContent: Successfully loaded from Netlify Blobs');
        return json as IContent;
      }
      console.log('getContent: No content found in Netlify Blobs, falling back to file');
    } catch (err) {
      // MissingBlobsEnvironmentError during build -> fall back to file
      console.log('getContent: Blobs unavailable in this environment, falling back to file:', err);
    }
  }
  // Fallback to repo file (dev/local or if no blob yet)
  console.log('getContent: Reading from local file system');
  const fileContent = await fs.readFile(contentPath, 'utf8');
  return JSON.parse(fileContent);
}
