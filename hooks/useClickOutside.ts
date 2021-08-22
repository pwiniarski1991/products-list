import { RefObject, useCallback, useEffect } from 'react';

export const useClickOutside = (ref: RefObject<HTMLElement> | null, handler: () => void, shouldAttach = true): void => {
  const listener = useCallback((event: MouseEvent | TouchEvent): void => {
    if (!ref?.current || ref.current.contains(event.target as HTMLElement)) {
      return;
    }

    handler();
  }, [ref, handler]);

  useEffect(() => {
    if (!shouldAttach) {
      return;
    }

    document.addEventListener('mousedown', listener, false);
    document.addEventListener('touchstart', listener, { passive: true });

    return (): void => {
      document.removeEventListener('mousedown', listener, false);
      document.removeEventListener('touchstart', listener, false);
    }
  }, [shouldAttach, listener]);
}