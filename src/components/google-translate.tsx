"use client";

import { useEffect } from 'react';

declare global {
    namespace google {
        namespace translate {
            class TranslateElement {
                constructor(options: {pageLanguage: string, includedLanguages: string, layout: any}, elementId: string);
                static InlineLayout: {
                    SIMPLE: any;
                };
            }
        }
    }
    function googleTranslateElementInit(): void;
    function changeLanguage(lang: string): void;
}


export function GoogleTranslate() {

  useEffect(() => {
    const addScript = () => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    };

    if (!(window as any).google || !(window as any).google.translate) {
      addScript();
    }

    (window as any).googleTranslateElementInit = () => {
        new google.translate.TranslateElement({pageLanguage: 'en', includedLanguages: 'en,hi', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
    };
    
    (window as any).changeLanguage = (lang: string) => {
        const a = document.querySelector<HTMLSelectElement>("#google_translate_element select");
        if (a) {
          a.value = lang;
          const e = document.createEvent('HTMLEvents');
          e.initEvent('change', true, true);
          a.dispatchEvent(e);
        }
    }
  }, []);

  return (
    <div id="google_translate_element" style={{ display: 'none' }}></div>
  );
}
