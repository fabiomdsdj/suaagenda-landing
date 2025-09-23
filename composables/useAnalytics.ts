// composables/useAnalytics.ts
export const useAnalytics = () => {
  const trackEvent = (action: string, params: Record<string, any> = {}) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', action, params);
    }
  };

  const trackPageview = (path?: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_path: path || window.location.pathname,
        page_title: document.title
      });
    }
  };

  return {
    trackEvent,
    trackPageview
  };
};