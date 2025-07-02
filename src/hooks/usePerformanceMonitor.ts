import { useEffect, useRef } from 'react';

interface PerformanceMetrics {
  componentName: string;
  renderTime: number;
  timestamp: number;
}

export const usePerformanceMonitor = (componentName: string) => {
  const renderStartTime = useRef<number>(Date.now());
  const isFirstRender = useRef(true);

  useEffect(() => {
    const renderEndTime = Date.now();
    const renderTime = renderEndTime - renderStartTime.current;

    // Only log slow renders (>16ms for 60fps)
    if (renderTime > 16) {
      const metrics: PerformanceMetrics = {
        componentName,
        renderTime,
        timestamp: renderEndTime
      };

      console.warn(`Slow render detected in ${componentName}:`, metrics);

      // In production, send to analytics service
      if (import.meta.env.PROD) {
        logPerformanceMetrics(metrics);
      }
    }

    // Reset for next render
    renderStartTime.current = Date.now();
    isFirstRender.current = false;
  });

  return {
    isFirstRender: isFirstRender.current
  };
};

const logPerformanceMetrics = (metrics: PerformanceMetrics) => {
  // Placeholder for analytics service integration
  console.log('Performance metrics logged:', metrics);
};

// Hook for measuring Core Web Vitals
export const useWebVitals = () => {
  useEffect(() => {
    if ('web-vital' in window) {
      return;
    }

    // Measure First Contentful Paint (FCP)
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'paint' && entry.name === 'first-contentful-paint') {
          console.log('FCP:', entry.startTime);
          
          if (import.meta.env.PROD) {
            logWebVital('FCP', entry.startTime);
          }
        }
      }
    });

    try {
      observer.observe({ entryTypes: ['paint'] });
    } catch (e) {
      console.log('Performance Observer not supported');
    }

    return () => observer.disconnect();
  }, []);
};

const logWebVital = (name: string, value: number) => {
  // Placeholder for web vitals logging
  console.log(`Web Vital ${name}:`, value);
};