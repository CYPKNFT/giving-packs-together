import { useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
const WARNING_TIME = 5 * 60 * 1000; // 5 minutes before timeout

export const useSessionTimeout = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const warningRef = useRef<NodeJS.Timeout>();

  const resetTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (warningRef.current) clearTimeout(warningRef.current);

    if (user) {
      // Set warning timer
      warningRef.current = setTimeout(() => {
        toast({
          title: "Session expiring soon",
          description: "Your session will expire in 5 minutes. Click to extend.",
        });
      }, SESSION_TIMEOUT - WARNING_TIME);

      // Set logout timer
      timeoutRef.current = setTimeout(() => {
        signOut();
        toast({
          title: "Session expired",
          description: "You have been logged out due to inactivity.",
          variant: "destructive",
        });
      }, SESSION_TIMEOUT);
    }
  };

  useEffect(() => {
    if (user) {
      resetTimer();

      // Reset timer on user activity
      const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
      const resetOnActivity = () => resetTimer();

      events.forEach(event => {
        document.addEventListener(event, resetOnActivity);
      });

      return () => {
        events.forEach(event => {
          document.removeEventListener(event, resetOnActivity);
        });
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        if (warningRef.current) clearTimeout(warningRef.current);
      };
    }
  }, [user]);

  return { resetTimer };
};