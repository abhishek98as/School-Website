import fs from 'fs/promises';
import path from 'path';
import { IContent } from './content';

const contentPath = path.join(process.cwd(), 'src/lib/content.json');

// This function is intended to be used in Server Components and Server Actions.
export async function getContent(): Promise<IContent> {
  const fileContent = await fs.readFile(contentPath, 'utf8');
  return JSON.parse(fileContent);
}
