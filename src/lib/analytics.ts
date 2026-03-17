/**
 * Analytics Utility Layer
 * 
 * Clean, privacy-conscious analytics tracking for ABUD Platform.
 * Supports GA4 and can be extended to other providers.
 * 
 * Event Naming Convention:
 * - Use snake_case for event names
 * - Use descriptive, action-oriented names
 * - Group related events with prefixes (e.g., checkout_, product_, contact_)
 * 
 * Privacy:
 * - Never send sensitive personal data
 * - Never send full message content
 * - Never send secrets or credentials
 * - Only send necessary metadata
 */

// Types
export interface AnalyticsEvent {
  name: string;
  params?: Record<string, string | number | boolean | undefined>;
}

export interface ProductEventParams extends Record<string, string | number | boolean | undefined> {
  product_slug?: string;
  product_id?: string;
  product_type?: 'instant' | 'contact';
  product_category?: string;
  product_price?: number;
}

export interface CTAEventParams extends Record<string, string | number | boolean | undefined> {
  cta_location: string;
  cta_text?: string;
  cta_type?: 'primary' | 'secondary';
  destination?: string;
}

export interface FormEventParams extends Record<string, string | number | boolean | undefined> {
  form_name: string;
  form_step?: string;
  field_name?: string;
}

export interface CheckoutEventParams extends Record<string, string | number | boolean | undefined> {
  product_id?: string;
  payment_method?: string;
  order_value?: number;
  step?: string;
}

export interface ContactEventParams extends Record<string, string | number | boolean | undefined> {
  inquiry_type?: string;
  budget_range?: string;
  timeline_range?: string;
}

// Analytics Provider Interface
interface AnalyticsProvider {
  trackEvent: (event: AnalyticsEvent) => void;
  trackPageView: (url: string, title?: string) => void;
}

// Google Analytics 4 Provider
class GA4Provider implements AnalyticsProvider {
  private isEnabled: boolean;

  constructor() {
    // Check if gtag is available (loaded via Script in layout)
    this.isEnabled = typeof window !== 'undefined' && typeof (window as any).gtag === 'function';
  }

  trackEvent(event: AnalyticsEvent): void {
    if (!this.isEnabled) return;

    try {
      (window as any).gtag('event', event.name, event.params);
    } catch (error) {
      console.error('[Analytics] Failed to track event:', error);
    }
  }

  trackPageView(url: string, title?: string): void {
    if (!this.isEnabled) return;

    try {
      (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
        page_path: url,
        page_title: title,
      });
    } catch (error) {
      console.error('[Analytics] Failed to track page view:', error);
    }
  }
}

// Console Logger (for development/debugging)
class ConsoleProvider implements AnalyticsProvider {
  trackEvent(event: AnalyticsEvent): void {
    console.log('[Analytics Event]', event.name, event.params);
  }

  trackPageView(url: string, title?: string): void {
    console.log('[Analytics Page View]', url, title);
  }
}

// Analytics Manager
class AnalyticsManager {
  private providers: AnalyticsProvider[] = [];
  private isProduction: boolean;

  constructor() {
    this.isProduction = process.env.NODE_ENV === 'production';
    this.initializeProviders();
  }

  private initializeProviders(): void {
    // Always add console logger in development
    if (!this.isProduction) {
      this.providers.push(new ConsoleProvider());
    }

    // Add GA4 if configured
    if (typeof window !== 'undefined') {
      this.providers.push(new GA4Provider());
    }
  }

  track(event: AnalyticsEvent): void {
    this.providers.forEach(provider => provider.trackEvent(event));
  }

  trackPageView(url: string, title?: string): void {
    this.providers.forEach(provider => provider.trackPageView(url, title));
  }
}

// Singleton instance
let analyticsInstance: AnalyticsManager | null = null;

function getAnalytics(): AnalyticsManager {
  if (typeof window === 'undefined') {
    // Return a no-op instance on server
    return {
      track: () => {},
      trackPageView: () => {},
    } as unknown as AnalyticsManager;
  }

  if (!analyticsInstance) {
    analyticsInstance = new AnalyticsManager();
  }

  return analyticsInstance;
}

// ============================================================
// HIGH-LEVEL TRACKING FUNCTIONS
// ============================================================

/**
 * HOME PAGE EVENTS
 */
export function trackHomeHeroCTA(ctaType: 'primary' | 'secondary', destination: string): void {
  getAnalytics().track({
    name: 'home_hero_cta_click',
    params: {
      cta_type: ctaType,
      cta_location: 'hero',
      destination,
    },
  });
}

export function trackHomeFinalCTA(destination: string): void {
  getAnalytics().track({
    name: 'home_final_cta_click',
    params: {
      cta_location: 'final_section',
      destination,
    },
  });
}

/**
 * STORE PAGE EVENTS
 */
export function trackStorePageView(params?: { filter_type?: string; category?: string }): void {
  getAnalytics().track({
    name: 'store_page_view',
    params,
  });
}

export function trackProductCardClick(params: ProductEventParams & { cta_location: string }): void {
  getAnalytics().track({
    name: 'product_card_click',
    params,
  });
}

export function trackStoreFilterUsed(filterType: string, filterValue: string): void {
  getAnalytics().track({
    name: 'store_filter_used',
    params: {
      filter_type: filterType,
      filter_value: filterValue,
    },
  });
}

export function trackStoreSearchUsed(searchTerm: string): void {
  getAnalytics().track({
    name: 'store_search_used',
    params: {
      search_term: searchTerm,
      search_length: searchTerm.length,
    },
  });
}

/**
 * PRODUCT DETAIL PAGE EVENTS
 */
export function trackProductDetailView(params: ProductEventParams): void {
  getAnalytics().track({
    name: 'product_detail_view',
    params,
  });
}

export function trackProductCTAClick(params: ProductEventParams & { cta_type: 'instant_purchase' | 'service_inquiry' }): void {
  getAnalytics().track({
    name: 'product_cta_click',
    params,
  });
}

/**
 * CHECKOUT EVENTS
 */
export function trackCheckoutStart(params: CheckoutEventParams): void {
  getAnalytics().track({
    name: 'checkout_start',
    params,
  });
}

export function trackCheckoutPaymentMethodSelected(paymentMethod: string): void {
  getAnalytics().track({
    name: 'checkout_payment_method_selected',
    params: {
      payment_method: paymentMethod,
    },
  });
}

export function trackCheckoutSubmit(params: CheckoutEventParams): void {
  getAnalytics().track({
    name: 'checkout_submit',
    params,
  });
}

export function trackCheckoutSuccess(params: { order_number?: string; order_value?: number }): void {
  getAnalytics().track({
    name: 'checkout_success',
    params,
  });
}

/**
 * CONTACT FORM EVENTS
 */
export function trackContactFormStart(): void {
  getAnalytics().track({
    name: 'contact_form_start',
    params: {
      form_name: 'contact',
    },
  });
}

export function trackContactQualificationField(fieldName: 'inquiry_type' | 'budget' | 'timeline', value: string): void {
  getAnalytics().track({
    name: 'contact_qualification_field',
    params: {
      field_name: fieldName,
      field_value: value,
    },
  });
}

export function trackContactFormSubmit(params: ContactEventParams): void {
  getAnalytics().track({
    name: 'contact_form_submit',
    params: {
      inquiry_type: params.inquiry_type,
      budget_range: params.budget_range,
      timeline_range: params.timeline_range,
      // Never send actual message content
    },
  });
}

/**
 * NEWSLETTER EVENTS
 */
export function trackNewsletterSubmit(source: string): void {
  getAnalytics().track({
    name: 'newsletter_submit',
    params: {
      source,
    },
  });
}

/**
 * GENERIC CTA TRACKING
 */
export function trackCTAClick(params: CTAEventParams): void {
  getAnalytics().track({
    name: 'cta_click',
    params,
  });
}

/**
 * PAGE VIEW TRACKING
 */
export function trackPageView(url: string, title?: string): void {
  getAnalytics().trackPageView(url, title);
}

// Export analytics instance for custom tracking if needed
export { getAnalytics };
