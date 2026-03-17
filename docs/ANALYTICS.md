# Analytics & Event Tracking Documentation

## Overview

ABUD Platform now includes a clean, privacy-conscious analytics instrumentation layer that tracks key user actions and conversion funnel events.

## Architecture

### Analytics Utility Layer
- **Location**: `src/lib/analytics.ts`
- **Design**: Provider-agnostic with support for Google Analytics 4
- **Privacy**: No sensitive data, no PII, no message content tracking

### Event Naming Convention
- **Format**: `snake_case`
- **Structure**: `{section}_{action}_{detail}`
- **Examples**: `home_hero_cta_click`, `product_card_click`, `checkout_submit`

## Tracked Events

### 🏠 Home Page Events

| Event Name | Description | Properties |
|------------|-------------|------------|
| `home_hero_cta_click` | Hero CTA clicked | `cta_type`, `cta_location`, `destination` |
| `home_final_cta_click` | Final CTA section clicked | `cta_location`, `destination` |

**Implementation**:
```typescript
import { trackHomeHeroCTA, trackHomeFinalCTA } from '@/lib/analytics';

// Hero CTA
trackHomeHeroCTA('primary', '/store');
trackHomeHeroCTA('secondary', '/contact');

// Final CTA
trackHomeFinalCTA('/store');
```

---

### 🛍️ Store Page Events

| Event Name | Description | Properties |
|------------|-------------|------------|
| `store_page_view` | Store page viewed | `filter_type`, `category` |
| `product_card_click` | Product card clicked | `product_id`, `product_slug`, `product_type`, `product_category`, `product_price`, `cta_location` |
| `store_filter_used` | Filter applied | `filter_type`, `filter_value` |
| `store_search_used` | Search performed | `search_term`, `search_length` |

**Implementation**:
```typescript
import { trackStorePageView, trackProductCardClick, trackStoreFilterUsed, trackStoreSearchUsed } from '@/lib/analytics';

// Page view
trackStorePageView();

// Product click
trackProductCardClick({
  product_id: 'abc123',
  product_slug: 'my-product',
  product_type: 'instant',
  product_category: 'Tools',
  product_price: 299,
  cta_location: 'featured_section'
});

// Filter usage
trackStoreFilterUsed('type', 'instant');

// Search
trackStoreSearchUsed('web development');
```

---

### 📦 Product Detail Page Events

| Event Name | Description | Properties |
|------------|-------------|------------|
| `product_detail_view` | Product detail viewed | `product_id`, `product_slug`, `product_type`, `product_category`, `product_price` |
| `product_cta_click` | Product CTA clicked | `product_id`, `product_slug`, `product_type`, `cta_type` |

**Implementation**:
```typescript
import { trackProductDetailView, trackProductCTAClick } from '@/lib/analytics';

// Page view
trackProductDetailView({
  product_id: 'abc123',
  product_slug: 'my-product',
  product_type: 'instant',
  product_category: 'Tools',
  product_price: 299
});

// CTA click
trackProductCTAClick({
  product_id: 'abc123',
  product_slug: 'my-product',
  product_type: 'instant',
  cta_type: 'instant_purchase'
});
```

---

### 💳 Checkout Events

| Event Name | Description | Properties |
|------------|-------------|------------|
| `checkout_start` | Checkout initiated | `product_id` |
| `checkout_payment_method_selected` | Payment method chosen | `payment_method` |
| `checkout_submit` | Checkout form submitted | `product_id`, `payment_method`, `order_value` |
| `checkout_success` | Order completed | `order_number`, `order_value` |

**Implementation**:
```typescript
import { trackCheckoutStart, trackCheckoutPaymentMethodSelected, trackCheckoutSubmit, trackCheckoutSuccess } from '@/lib/analytics';

// Checkout start
trackCheckoutStart({ product_id: 'abc123' });

// Payment method selection
trackCheckoutPaymentMethodSelected('vodafone_cash');

// Submit
trackCheckoutSubmit({
  product_id: 'abc123',
  payment_method: 'vodafone_cash',
  order_value: 299
});

// Success
trackCheckoutSuccess({
  order_number: 'ORD-12345',
  order_value: 299
});
```

---

### 📧 Contact Form Events

| Event Name | Description | Properties |
|------------|-------------|------------|
| `contact_form_start` | Form interaction started | `form_name` |
| `contact_qualification_field` | Qualification field changed | `field_name`, `field_value` |
| `contact_form_submit` | Form submitted | `inquiry_type`, `budget_range`, `timeline_range` |

**Implementation**:
```typescript
import { trackContactFormStart, trackContactQualificationField, trackContactFormSubmit } from '@/lib/analytics';

// Form start
trackContactFormStart();

// Qualification field
trackContactQualificationField('inquiry_type', 'service');
trackContactQualificationField('budget', '5k-15k');
trackContactQualificationField('timeline', 'soon');

// Submit
trackContactFormSubmit({
  inquiry_type: 'service',
  budget_range: '5k-15k',
  timeline_range: 'soon'
});
```

---

### 📰 Newsletter Events

| Event Name | Description | Properties |
|------------|-------------|------------|
| `newsletter_submit` | Newsletter subscription | `source` |

**Implementation**:
```typescript
import { trackNewsletterSubmit } from '@/lib/analytics';

trackNewsletterSubmit('footer');
```

---

## Setup Instructions

### 1. Google Analytics 4 Setup

#### Step 1: Create GA4 Property
1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property
3. Get your Measurement ID (format: `G-XXXXXXXXXX`)

#### Step 2: Add Environment Variable
Add to `.env.local`:
```bash
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

#### Step 3: Add GA4 Script to Layout
Add to `src/app/layout.tsx`:
```tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### 2. Testing Analytics

#### Development Mode
In development, events are logged to the console:
```
[Analytics Event] home_hero_cta_click { cta_type: 'primary', destination: '/store' }
```

#### Production Mode
Events are sent to GA4 automatically when `NEXT_PUBLIC_GA_ID` is configured.

#### Manual Testing
1. Open browser DevTools
2. Go to Console tab
3. Interact with the site
4. Check for `[Analytics Event]` logs

#### GA4 Real-Time Testing
1. Go to GA4 → Reports → Realtime
2. Interact with your site
3. Events should appear within seconds

---

## Funnel Measurement

### Current Measurable Funnel Steps

```
┌─────────────────────────────────────────────────────────┐
│                    AWARENESS                            │
├─────────────────────────────────────────────────────────┤
│ ✅ Home page view                                       │
│ ✅ Hero CTA clicks                                      │
│ ✅ Final CTA clicks                                     │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                   CONSIDERATION                         │
├─────────────────────────────────────────────────────────┤
│ ✅ Store page view                                      │
│ ✅ Product browsing (filters, search)                  │
│ ✅ Product card clicks                                  │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                     DECISION                            │
├─────────────────────────────────────────────────────────┤
│ ✅ Product detail view                                  │
│ ✅ Product CTA clicks                                   │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                   CONVERSION                            │
├─────────────────────────────────────────────────────────┤
│ ✅ Checkout start                                       │
│ ✅ Payment method selection                            │
│ ✅ Checkout submit                                      │
│ ✅ Checkout success                                     │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                  LEAD GENERATION                        │
├─────────────────────────────────────────────────────────┤
│ ✅ Contact form start                                   │
│ ✅ Qualification fields usage                          │
│ ✅ Contact form submit                                  │
└─────────────────────────────────────────────────────────┘
```

### Key Metrics You Can Now Track

#### Conversion Rates
- **Home → Store**: `home_hero_cta_click` → `store_page_view`
- **Store → Product**: `product_card_click` → `product_detail_view`
- **Product → Checkout**: `product_cta_click` → `checkout_start`
- **Checkout → Success**: `checkout_start` → `checkout_success`

#### Drop-off Points
- Checkout abandonment: `checkout_start` vs `checkout_submit`
- Product interest vs action: `product_detail_view` vs `product_cta_click`
- Form abandonment: `contact_form_start` vs `contact_form_submit`

#### User Behavior
- Most clicked products
- Most used filters
- Search patterns
- Payment method preferences
- Lead qualification patterns

---

## A/B Testing Readiness

### Current State
The platform is now ready for A/B testing with minimal additional work.

### Easy Test Surfaces

#### 1. Home Hero CTA Text
**Current**: "تصفح المنتجات الآن"
**Variants**: Can easily test different wording
**Tracking**: `home_hero_cta_click` already in place

#### 2. Product CTA Wording
**Current**: "احصل عليه الآن"
**Variants**: Can test different urgency levels
**Tracking**: `product_cta_click` already in place

#### 3. Checkout Reassurance Copy
**Current**: "احصل على منتجك فورًا بعد إتمام الدفع"
**Variants**: Can test different trust messages
**Tracking**: `checkout_start` already in place

#### 4. Contact Form Helper Text
**Current**: "سأرد عليك خلال 24 ساعة"
**Variants**: Can test different response time promises
**Tracking**: `contact_form_start` already in place

### How to Run A/B Tests

#### Option 1: Manual Variant Switching
```typescript
// Example: Test different CTA text
const ctaVariant = Math.random() > 0.5 ? 'A' : 'B';
const ctaText = ctaVariant === 'A' ? 'تصفح المنتجات' : 'اكتشف المنتجات';

// Track with variant label
trackHomeHeroCTA('primary', '/store', { variant: ctaVariant });
```

#### Option 2: Use Feature Flags (Future)
Consider adding a lightweight feature flag library like:
- `@vercel/flags` (if using Vercel)
- `launchdarkly-js-client-sdk`
- `flagsmith`

---

## Privacy & Safety

### What We Track ✅
- Page views
- Button clicks
- Form interactions
- Product interactions
- Navigation patterns

### What We DON'T Track ❌
- ❌ Full message content
- ❌ Personal notes
- ❌ Passwords or secrets
- ❌ Email content
- ❌ Phone numbers (only presence)
- ❌ Payment details

### GDPR Compliance
- No PII is sent to analytics
- Only aggregated behavioral data
- User can opt-out via browser settings
- No cross-site tracking

---

## What's Still Missing

### Not Yet Tracked
1. **Blog engagement**: Post views, reading time, related post clicks
2. **Services page**: Service card clicks, inquiry starts
3. **Portfolio**: Project views, case study engagement
4. **Admin actions**: Dashboard usage, content management
5. **AI assistant**: Chat interactions, query patterns

### Why Not Tracked Yet
- **Priority**: Focused on revenue-generating funnel first
- **Complexity**: Some require more sophisticated tracking
- **Privacy**: Some admin actions shouldn't be tracked

### Future Enhancements
1. **Enhanced e-commerce tracking**: Cart value, product impressions
2. **User journey mapping**: Complete path analysis
3. **Heatmaps**: Click patterns, scroll depth
4. **Session recording**: User behavior analysis (with consent)
5. **Custom dashboards**: Real-time conversion monitoring

---

## Troubleshooting

### Events Not Showing in Console
**Problem**: No `[Analytics Event]` logs
**Solution**: 
- Check you're in development mode
- Verify analytics.ts is imported correctly
- Check browser console for errors

### Events Not in GA4
**Problem**: Events tracked locally but not in GA4
**Solution**:
- Verify `NEXT_PUBLIC_GA_ID` is set
- Check GA4 script is loaded (Network tab)
- Wait 24-48 hours for data processing
- Use GA4 Realtime view for immediate feedback

### TypeScript Errors
**Problem**: Type errors when calling tracking functions
**Solution**:
- Check parameter types match interface
- Ensure all required properties are provided
- Use TypeScript autocomplete for guidance

---

## Support

For questions or issues:
1. Check this documentation
2. Review `src/lib/analytics.ts` for implementation details
3. Test in development mode first
4. Verify GA4 setup in production

---

**Last Updated**: 2026-03-17
**Version**: 1.0.0
**Maintainer**: ABUD Platform Team
