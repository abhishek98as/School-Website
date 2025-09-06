
"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

declare global {
    namespace google {
        namespace translate {
            class TranslateElement {
                constructor(options: {pageLanguage: string, includedLanguages?: string, layout?: any, autoDisplay?: boolean}, elementId: string);
                static InlineLayout: {
                    SIMPLE: any;
                };
            }
        }
    }
    function googleTranslateElementInit(): void;
}


export function GoogleTranslate() {
    const pathname = usePathname();

    useEffect(() => {
        const scriptId = 'google-translate-script';

        if (document.getElementById(scriptId)) {
            // Script already exists, maybe just re-initialize
             if (typeof (window as any).googleTranslateElementInit === 'function') {
                (window as any).googleTranslateElementInit();
             }
            return;
        }

        (window as any).googleTranslateElementInit = () => {
            new (window as any).google.translate.TranslateElement(
                { 
                    pageLanguage: 'hi', 
                    includedLanguages: 'en,hi', 
                    layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE, 
                    autoDisplay: false 
                },
                'google_translate_element'
            );
        };

        const addScript = document.createElement('script');
        addScript.id = scriptId;
        addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
        document.body.appendChild(addScript);

        return () => {
            const script = document.getElementById(scriptId);
            if (script) {
                document.body.removeChild(script);
            }
            delete (window as any).googleTranslateElementInit;
        };
    }, [pathname]); // Rerun on path change if needed

  return <div id="google_translate_element" style={{ display: 'none' }}></div>;
}
