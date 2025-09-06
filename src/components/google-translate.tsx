
"use client";

import { useEffect } from 'react';

declare global {
    namespace google {
        namespace translate {
            class TranslateElement {
                constructor(options: {pageLanguage: string, includedLanguages: string, layout: any, autoDisplay: boolean}, elementId: string);
                static InlineLayout: {
                    SIMPLE: any;
                };
            }
        }
    }
    function googleTranslateElementInit(): void;
}

export function GoogleTranslate() {
  useEffect(() => {
    // Make the init function globally available
    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        { pageLanguage: 'hi', includedLanguages: 'en,hi', layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE, autoDisplay: false },
        'google_translate_element'
      );
    };

    // Load the Google Translate script
    const addScript = document.createElement('script');
    addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
    document.body.appendChild(addScript);

    // Clean up the script and global function on component unmount
    return () => {
      document.body.removeChild(addScript);
      delete (window as any).googleTranslateElementInit;
    };
  }, []);

  return <div id="google_translate_element" style={{ display: 'none' }}></div>;
}
