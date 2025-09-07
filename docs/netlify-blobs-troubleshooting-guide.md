# Netlify Blobs Troubleshooting Guide

## Problem Overview

When deploying Next.js applications with admin panels to Netlify, you may encounter the error:
```
EROFS: read-only file system, open '/var/task/src/lib/content.json'
```

This happens because **Netlify Functions run in a serverless AWS Lambda environment with a read-only filesystem**, but your application is trying to write files to disk.

## Root Cause Analysis

### The Core Issue
- **Netlify Functions = AWS Lambda**: Netlify Functions are executed in AWS Lambda containers
- **Read-only filesystem**: Lambda containers have read-only filesystems (except `/tmp`)
- **Traditional file writes fail**: Any attempt to write to your project directory will result in `EROFS` errors

### Environment Detection Challenges
The main challenge was **detecting when code is running in Netlify Functions vs. local development**:

1. **Standard Netlify env vars weren't available**: `process.env.NETLIFY` was `undefined` in Functions
2. **Build vs Runtime context**: Environment variables differ between build time and function runtime
3. **AWS Lambda indicators**: Netlify Functions run on AWS Lambda, so AWS-specific env vars are present

## The Solution: Netlify Blobs

### What are Netlify Blobs?
- **Persistent storage service** for Netlify applications
- **Key-value store** that works in serverless environments
- **Consistent across deployments** - data persists between builds
- **Available in Functions** - perfect for admin panel data storage

### Implementation Strategy

#### 1. Install Netlify Blobs
```bash
npm install @netlify/blobs
```

#### 2. Always Try Blobs First Approach
Instead of complex environment detection, always attempt Blobs first:

```typescript
import { getStore } from '@netlify/blobs';

async function saveContent(content: any) {
  try {
    // Always try Netlify Blobs first
    console.log('saveContent: Attempting Netlify Blobs storage');
    const store = getStore({ name: 'content', consistency: 'strong' });
    const result = await store.setJSON('content.json', content);
    console.log('saveContent: Successfully saved to Netlify Blobs');
    return { success: true };
    
  } catch (blobError) {
    console.error('saveContent: Blob save failed:', blobError);
    
    // Check if we're in a serverless environment
    const isServerless = typeof process.env.AWS_LAMBDA_FUNCTION_NAME !== 'undefined' ||
                        typeof process.env.AWS_EXECUTION_ENV !== 'undefined' ||
                        typeof process.env.LAMBDA_RUNTIME_DIR !== 'undefined';
    
    if (isServerless) {
      // In serverless: filesystem is read-only, so fail gracefully
      throw new Error('Storage unavailable: Netlify Blobs failed and filesystem is read-only');
    } else {
      // Local development: fallback to filesystem
      await fs.writeFile('content.json', JSON.stringify(content, null, 2));
      return { success: true };
    }
  }
}
```

#### 3. Reading Data with Fallback
For reading data, implement a similar pattern:

```typescript
export async function getContent(): Promise<IContent> {
  try {
    // Try Netlify Blobs first
    const store = getStore({ name: 'content', consistency: 'strong' });
    const json = await store.get('content.json', { type: 'json' });
    if (json) {
      console.log('getContent: Successfully loaded from Netlify Blobs');
      return json as IContent;
    }
  } catch (error) {
    console.log('getContent: Blobs unavailable, falling back to file:', error);
  }

  // Fallback to local file
  try {
    const fileContent = await fs.readFile(contentPath, 'utf8');
    console.log('getContent: Reading from local file system');
    return JSON.parse(fileContent);
  } catch (fileError) {
    console.log('getContent: Using default content');
    return getDefaultContent();
  }
}
```

## Environment Detection Methods

### Reliable Serverless Detection
Use AWS Lambda-specific environment variables that are always present in Netlify Functions:

```typescript
function isServerlessEnvironment(): boolean {
  return typeof process.env.AWS_LAMBDA_FUNCTION_NAME !== 'undefined' ||
         typeof process.env.AWS_EXECUTION_ENV !== 'undefined' ||
         typeof process.env.LAMBDA_RUNTIME_DIR !== 'undefined';
}
```

### Netlify-Specific Detection (Less Reliable)
These variables may not always be available in Functions:

```typescript
function isNetlifyEnvironment(): boolean {
  return process.env.NETLIFY === 'true' || 
         process.env.NETLIFY_DEV === 'true' || 
         process.env.CONTEXT === 'production' ||
         process.env.CONTEXT === 'deploy-preview' ||
         typeof process.env.NETLIFY_SITE_ID !== 'undefined';
}
```

## Step-by-Step Implementation Guide

### Step 1: Install Dependencies
```bash
npm install @netlify/blobs
```

### Step 2: Create Blob Store Helper
```typescript
// lib/storage.ts
import { getStore } from '@netlify/blobs';

export function getContentStore() {
  return getStore({ 
    name: 'content', 
    consistency: 'strong' // Ensures data consistency
  });
}
```

### Step 3: Update Save Function
```typescript
// app/admin/actions.ts
'use server';

import { getContentStore } from '@/lib/storage';
import { revalidatePath } from 'next/cache';

export async function saveContent(content: any) {
  try {
    // Always try Blobs first
    const store = getContentStore();
    await store.setJSON('content.json', content);
    
    // Revalidate pages that use this content
    revalidatePath('/');
    revalidatePath('/admin');
    
    return { success: true, message: 'Content saved successfully!' };
    
  } catch (error) {
    console.error('Save failed:', error);
    
    // Check if we're in serverless environment
    const isServerless = typeof process.env.AWS_LAMBDA_FUNCTION_NAME !== 'undefined';
    
    if (isServerless) {
      return { success: false, message: 'Storage service unavailable' };
    } else {
      // Fallback for local development
      // ... implement file system fallback
      return { success: true, message: 'Saved locally' };
    }
  }
}
```

### Step 4: Update Load Function
```typescript
// lib/content-loader.ts
import { getContentStore } from './storage';

export async function loadContent() {
  try {
    const store = getContentStore();
    const content = await store.get('content.json', { type: 'json' });
    
    if (content) {
      return content;
    }
  } catch (error) {
    console.log('Blobs unavailable, trying local file');
  }

  // Fallback to local file or default content
  return getDefaultContent();
}
```

### Step 5: Configure Netlify
Ensure your `netlify.toml` has the correct configuration:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

## Common Pitfalls and Solutions

### 1. Build vs Runtime Environment
**Problem**: Different environment variables during build vs runtime.
**Solution**: Use the "try Blobs first" approach rather than complex environment detection.

### 2. Missing Error Handling
**Problem**: Blobs operations can fail silently.
**Solution**: Always wrap Blobs operations in try-catch blocks with proper logging.

### 3. Cache Invalidation
**Problem**: Updated content doesn't appear immediately.
**Solution**: Use `revalidatePath()` after successful saves.

### 4. Local Development
**Problem**: Blobs aren't available locally.
**Solution**: Implement filesystem fallback for local development.

## Debugging Tips

### 1. Add Comprehensive Logging
```typescript
console.log('Environment check - AWS_LAMBDA_FUNCTION_NAME:', process.env.AWS_LAMBDA_FUNCTION_NAME);
console.log('Environment check - AWS_EXECUTION_ENV:', process.env.AWS_EXECUTION_ENV);
console.log('Environment check - NETLIFY_SITE_ID:', process.env.NETLIFY_SITE_ID);
```

### 2. Check Function Logs
```bash
npx netlify functions:log
```

### 3. Test Storage Operations
Create a simple test endpoint to verify Blobs:
```typescript
// app/api/test-storage/route.ts
export async function GET() {
  try {
    const store = getStore({ name: 'test' });
    await store.set('test-key', 'test-value');
    const value = await store.get('test-key');
    return Response.json({ success: true, value });
  } catch (error) {
    return Response.json({ success: false, error: error.message });
  }
}
```

## Prevention Checklist

- [ ] Always use Netlify Blobs for persistent data in Netlify deployments
- [ ] Implement proper fallbacks for local development
- [ ] Add comprehensive error handling and logging
- [ ] Test both local and deployed environments
- [ ] Use `revalidatePath()` for cache invalidation
- [ ] Never rely solely on environment variable detection
- [ ] Monitor function logs for storage issues

## Key Takeaways

1. **Netlify Functions = AWS Lambda = Read-only filesystem**
2. **Use Netlify Blobs for persistent storage in serverless environments**
3. **Always try Blobs first, detect serverless environment for fallback decisions**
4. **Implement proper error handling and logging**
5. **Test thoroughly in both local and deployed environments**

This approach ensures your admin panels work reliably across all Netlify deployment contexts while maintaining compatibility with local development.
