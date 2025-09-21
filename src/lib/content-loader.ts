import fs from 'fs/promises';
import path from 'path';
import { IContent } from './content';
import { getStore } from '@netlify/blobs';

const contentPath = path.join(process.cwd(), 'src/lib/content.json');

// Function to add default content for missing sections
function addDefaultContent(content: any): IContent {
  // Ensure required sections exist with default values
  if (!content.home?.ceoSection) {
    if (!content.home) content.home = {};
    content.home.ceoSection = {
      title: "Leadership Excellence",
      subtitle: "Meet the visionary leaders who drive our institution towards unprecedented heights of academic and administrative excellence.",
      cards: [
        {
          name: "Chief Executive Officer",
          position: "CEO & Director",
          description: "Leading with vision and innovation.",
          image: {
            src: "https://picsum.photos/400/500?random=ceo1",
            alt: "CEO Portrait",
            hint: "professional executive portrait"
          },
          highlights: [
            "Visionary leadership in education",
            "Strategic innovation initiatives",
            "Award-winning management"
          ]
        },
        {
          name: "Chief Academic Officer",
          position: "CAO",
          description: "Championing academic excellence.",
          image: {
            src: "https://picsum.photos/400/500?random=ceo2",
            alt: "CAO Portrait", 
            hint: "professional academic portrait"
          },
          highlights: [
            "Educational innovation expert",
            "Research leadership",
            "Curriculum development"
          ]
        },
        {
          name: "Chief Technology Officer",
          position: "CTO",
          description: "Driving technological advancement.",
          image: {
            src: "https://picsum.photos/400/500?random=ceo3",
            alt: "CTO Portrait",
            hint: "professional tech executive portrait"
          },
          highlights: [
            "Technology infrastructure leader",
            "Digital transformation expert",
            "Innovation catalyst"
          ]
        }
      ]
    };
  }

  if (!content.home?.featureCards) {
    if (!content.home) content.home = {};
    content.home.featureCards = {
      title: "Our Excellence",
      subtitle: "Discover the exceptional features and opportunities that make our institution a beacon of educational excellence and innovation.",
      cards: [
        {
          title: "State-of-the-Art Laboratories",
          description: "Advanced science and computer labs equipped with cutting-edge technology to foster hands-on learning and innovation.",
          image: {
            src: "https://picsum.photos/400/300?random=501",
            alt: "Modern Science Laboratory",
            hint: "school laboratory equipment"
          }
        },
        {
          title: "Smart Classrooms",
          description: "Interactive digital learning environments with smart boards and multimedia tools for enhanced educational experiences.",
          image: {
            src: "https://picsum.photos/400/300?random=502",
            alt: "Smart Classroom Technology",
            hint: "digital classroom interactive"
          }
        },
        {
          title: "Sports & Recreation",
          description: "Comprehensive sports facilities including basketball, football, cricket grounds, and indoor games for holistic development.",
          image: {
            src: "https://picsum.photos/400/300?random=503",
            alt: "Sports Complex",
            hint: "school sports facilities"
          }
        },
        {
          title: "Arts & Culture Hub",
          description: "Dedicated spaces for music, dance, drama, and visual arts to nurture creativity and cultural appreciation.",
          image: {
            src: "https://picsum.photos/400/300?random=504",
            alt: "Arts and Culture Center",
            hint: "school arts music theater"
          }
        },
        {
          title: "Digital Library",
          description: "Modern library with extensive collection of books, digital resources, and quiet study spaces for research and learning.",
          image: {
            src: "https://picsum.photos/400/300?random=505",
            alt: "Digital Library",
            hint: "modern school library"
          }
        },
        {
          title: "Career Guidance Center",
          description: "Professional counseling and career guidance services to help students make informed decisions about their future.",
          image: {
            src: "https://picsum.photos/400/300?random=506",
            alt: "Career Counseling",
            hint: "student career guidance"
          }
        },
        {
          title: "Innovation Lab",
          description: "Maker space for robotics, 3D printing, and STEM projects encouraging creativity and problem-solving skills.",
          image: {
            src: "https://picsum.photos/400/300?random=507",
            alt: "Innovation and Robotics Lab",
            hint: "school innovation robotics"
          }
        },
        {
          title: "Health & Wellness",
          description: "Comprehensive health services including medical facility, counseling, and wellness programs for student well-being.",
          image: {
            src: "https://picsum.photos/400/300?random=508",
            alt: "Health and Wellness Center",
            hint: "school health medical"
          }
        }
      ]
    };
  }

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
  
  return content as IContent;
}

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
        console.log('getContent: Successfully loaded from Netlify Blobs (source of truth for admin updates)');
        const content = json as IContent;
        // Ensure all required sections exist even when loaded from Netlify Blobs
        return addDefaultContent(content);
      }
      console.log('getContent: No content found in Netlify Blobs, initializing from file');
      
      // Only initialize Blobs if it doesn't exist - never overwrite existing Blobs
      const fileContent = await fs.readFile(contentPath, 'utf8');
      const content = JSON.parse(fileContent);
      
      // Initialize Blobs with file content only if Blobs is empty
      try {
        await store.set('content.json', content);
        console.log('getContent: Initialized Netlify Blobs with file content (first time setup)');
      } catch (initErr) {
        console.log('getContent: Failed to initialize Netlify Blobs:', initErr);
      }
      
      return content;
    } catch (err) {
      // MissingBlobsEnvironmentError during build -> fall back to file
      console.log('getContent: Blobs unavailable in this environment, falling back to file:', err);
    }
  }
  
  // Fallback to repo file (dev/local environment only)
  console.log('getContent: Reading from local file system (development/local only)');
  const fileContent = await fs.readFile(contentPath, 'utf8');
  const content = JSON.parse(fileContent);
  
  // Ensure all required sections exist with default values
  return addDefaultContent(content);
}
