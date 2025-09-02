
'use server';

import type { IContent } from '@/lib/content';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';

const contentPath = path.join(process.cwd(), 'src/lib/content.json');

async function saveContentToFile(content: IContent): Promise<void> {
  await fs.writeFile(contentPath, JSON.stringify(content, null, 2), 'utf8');
}


export async function saveContent(content: IContent) {
  try {
    await saveContentToFile(content);
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
    // ... add other paths as needed
    return { success: true };
  } catch (error) {
    console.error('Failed to save content:', error);
    return { success: false, error: 'Failed to save content.' };
  }
}
