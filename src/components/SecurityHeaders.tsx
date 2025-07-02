import { useEffect } from 'react';

// Component to handle client-side security configurations
const SecurityHeaders = () => {
  useEffect(() => {
    // Disable right-click context menu in production
    if (import.meta.env.PROD) {
      const disableRightClick = (e: MouseEvent) => {
        if (e.button === 2) {
          e.preventDefault();
        }
      };
      
      document.addEventListener('contextmenu', disableRightClick);
      
      return () => {
        document.removeEventListener('contextmenu', disableRightClick);
      };
    }
  }, []);

  useEffect(() => {
    // Prevent text selection in production
    if (import.meta.env.PROD) {
      document.body.style.userSelect = 'none';
      document.body.style.webkitUserSelect = 'none';
      
      return () => {
        document.body.style.userSelect = '';
        document.body.style.webkitUserSelect = '';
      };
    }
  }, []);

  useEffect(() => {
    // Add security-related meta tags
    const addMetaTag = (name: string, content: string) => {
      const existingTag = document.querySelector(`meta[name="${name}"]`);
      if (!existingTag) {
        const meta = document.createElement('meta');
        meta.name = name;
        meta.content = content;
        document.head.appendChild(meta);
      }
    };

    // Prevent caching of sensitive pages
    addMetaTag('Cache-Control', 'no-cache, no-store, must-revalidate');
    addMetaTag('Pragma', 'no-cache');
    addMetaTag('Expires', '0');
    
    // Referrer policy
    addMetaTag('referrer', 'strict-origin-when-cross-origin');
  }, []);

  return null;
};

export default SecurityHeaders;