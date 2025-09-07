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
  const content = JSON.parse(fileContent);
  
  // Ensure required sections exist with default values
  if (!content.contactUs) {
    content.contactUs = {
      title: "Contact Us",
      subtitle: "Get in touch with us. We're here to help and answer any questions you might have.",
      description: "Whether you have questions about our programs, admission process, or campus life, our team is ready to assist you. Fill out the form below and we'll get back to you as soon as possible.",
      googleFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSe_example_contact_form_url/viewform?embedded=true",
      hero: {
        image: {
          src: "https://picsum.photos/1920/1080?random=100",
          alt: "Contact Us",
          hint: "college campus contact"
        }
      }
    };
  }
  
  if (!content.privacyPolicy) {
    content.privacyPolicy = {
      title: "Privacy Policy",
      subtitle: "Your privacy is important to us. This policy explains how we collect, use, and protect your information.",
      lastUpdated: "September 7, 2025",
      sections: [
        {
          title: "Information We Collect",
          content: [
            "We collect information you provide directly to us, such as when you create an account, fill out a form, or contact us.",
            "This may include your name, email address, phone number, and any other information you choose to provide."
          ]
        }
      ]
    };
  }
  
  return content;
}
