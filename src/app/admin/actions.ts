
'use server';

import { saveContent as saveContentToFile, IContent } from '@/lib/content';
import { revalidatePath } from 'next/cache';

export async function saveContent(content: IContent) {
  try {
    await saveContentToFile(content);
    // Revalidate all pages that might use this content
    revalidatePath('/');
    revalidatePath('/academics');
    revalidatePath('/admission');
    revalidatePath('/faculty');
    // ... add other paths as needed
    return { success: true };
  } catch (error) {
    console.error('Failed to save content:', error);
    return { success: false, error: 'Failed to save content.' };
  }
}
