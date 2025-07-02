interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp?: number;
}

class Analytics {
  private isProduction = import.meta.env.PROD;
  private userId: string | null = null;
  private sessionId: string = this.generateSessionId();

  constructor() {
    // Initialize session tracking
    this.trackSession();
  }

  private generateSessionId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  setUserId(userId: string | null) {
    this.userId = userId;
  }

  track(eventName: string, properties?: Record<string, any>) {
    const event: AnalyticsEvent = {
      name: eventName,
      properties: {
        ...properties,
        userId: this.userId,
        sessionId: this.sessionId,
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        referrer: document.referrer
      },
      timestamp: Date.now()
    };

    if (this.isProduction) {
      this.sendToAnalyticsService(event);
    } else {
      console.log('Analytics Event:', event);
    }
  }

  private sendToAnalyticsService(event: AnalyticsEvent) {
    // In production, this would send to your analytics service
    // Examples: Google Analytics, Mixpanel, Amplitude, etc.
    console.log('Production analytics event:', event);
    
    // Example implementation for Google Analytics 4
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', event.name, event.properties);
    }
  }

  trackPageView(path: string) {
    this.track('page_view', {
      path,
      title: document.title
    });
  }

  trackUserAction(action: string, element?: string, value?: any) {
    this.track('user_action', {
      action,
      element,
      value
    });
  }

  trackError(error: Error, context?: string) {
    this.track('error', {
      message: error.message,
      stack: error.stack,
      context,
      url: window.location.href
    });
  }

  trackPerformance(metric: string, value: number, unit: string = 'ms') {
    this.track('performance', {
      metric,
      value,
      unit
    });
  }

  private trackSession() {
    // Track session start
    this.track('session_start');

    // Track session end on page unload
    window.addEventListener('beforeunload', () => {
      this.track('session_end');
    });

    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.track('page_hidden');
      } else {
        this.track('page_visible');
      }
    });
  }
}

export const analytics = new Analytics();

// Hook for tracking component lifecycle
export const useAnalytics = (componentName: string) => {
  return {
    trackMount: () => analytics.track('component_mount', { component: componentName }),
    trackUnmount: () => analytics.track('component_unmount', { component: componentName }),
    trackAction: (action: string, properties?: Record<string, any>) => 
      analytics.trackUserAction(action, componentName, properties)
  };
};