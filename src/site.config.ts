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
  /** Shown on the page only when set. */
  email: null as string | null,
  currency: 'NZD',
  plans: [
    {
      name: 'Starter',
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
    {
      name: 'Business',
      price: 350,
      featured: true,
      summary: 'A full site for businesses that want to be found and win enquiries online.',
      features: [
        'Up to 8 pages, custom design',
        'Blog or news you can edit yourself',
        'Booking or quote request forms',
        'Everything in Starter',
        'Visitor stats you can check any time',
      ],
    },
    {
      name: 'Online orders',
      price: 600,
      summary: 'Take orders, pre-orders or payments online without a clunky shop platform.',
      features: [
        'Menu, product list or pre-order cart',
        'Secure checkout through Stripe',
        'Delivery and pickup options',
        'Everything in Business',
        'Stripe account set up in your name',
      ],
    },
  ],
  /** Pay-per-request changes after launch. */
  changes: [
    { name: 'Small change', price: 10, detail: 'Text, photos, prices, opening hours or a menu update.' },
    { name: 'New page', price: 40, detail: 'A new page designed to match the rest of your site.' },
    { name: 'Bigger job', price: null, detail: 'New features, bookings, online orders or a redesign. Quoted up front.' },
  ],
};
