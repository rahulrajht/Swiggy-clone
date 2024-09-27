import { useState, useEffect, useCallback } from 'react';

const useOnlineStatus = (onOnline, onOffline) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const handleOnline = useCallback(() => {
    setIsOnline(true);
    if (onOnline) onOnline();
  }, [onOnline]);

  const handleOffline = useCallback(() => {
    setIsOnline(false);
    if (onOffline) onOffline();
  }, [onOffline]);

  useEffect(() => {
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [handleOnline, handleOffline]);

  return isOnline;
};

export default useOnlineStatus;
