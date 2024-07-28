import { useEffect } from 'react';

export default function useEscape(ref, handler) {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        handler();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [ref, handler]);
}
