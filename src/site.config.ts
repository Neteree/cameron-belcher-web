// Everything about the business in one place. Prices are examples: change
// them here and the whole site updates.

export const site = {
  name: 'Cameron Belcher',
  role: 'Websites for local businesses',
  city: 'Auckland',
  country: 'New Zealand',
  timezone: 'Pacific/Auckland',
  description:
    'Fast, good-looking websites for Auckland small businesses, with no monthly fees. Pay once for the build, then only for the changes you ask for.',
  /**
   * The live address, e.g. 'https://example.co.nz' (no trailing slash). Link
   * previews on Facebook and in messages need it to show the share image.
   */
  url: null as string | null,
  /** Shown on the page only when set. */
  email: null as string | null,
  /**
   * Web3Forms access key for the contact form (web3forms.com). Enquiries go
   * to the email address the key was created with. It's safe to publish.
   * While null, the form says it isn't connected and sends nothing.
   */
  formKey: null as string | null,
  currency: 'NZD',
  /** Every site starts here. */
  base: {
    name: 'Your website',
    price: 150,
    summary: 'A polished one-page site that tells people who you are and how to reach you.',
    features: [
      'One-page custom design',
      'Enquiry form',
      'Google Business Profile and local search basics',
      'Launched on your own domain',
      'Free hosting set up in your name',
    ],
  },
  /** Optional extras, added at launch or any time later. */
  addons: [
    { name: 'Extra page', price: 40, detail: 'About, services, gallery, or anything else. Priced per page.' },
    { name: 'Menu or product list', price: 60, detail: 'Your menu, services or products with prices.' },
    { name: 'Booking or quote form', price: 60, detail: 'Customers send a booking or quote request straight to you.' },
    { name: 'News you edit yourself', price: 80, detail: 'Post news, specials or updates from a simple editor.' },
    { name: 'Online orders', price: 350, detail: 'Orders, pre-orders or payments through Stripe, set up in your name.' },
  ],
  /** Pay-per-request changes after launch. */
  changes: [
    { name: 'Small change', price: 20, detail: 'Text, photos, prices, opening hours or a menu update.' },
    { name: 'Bigger job', price: null, detail: 'A redesign or something not listed above. Quoted up front.' },
  ],
};
