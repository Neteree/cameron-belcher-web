// Everything about the business in one place. Prices are examples: change
// them here and the whole site updates.

export const site = {
  name: 'Cameron Belcher',
  role: 'Websites for local businesses',
  city: 'Auckland',
  country: 'New Zealand',
  timezone: 'Pacific/Auckland',
  description:
    'Fast, good-looking websites for Auckland small businesses, designed, built and looked after for one monthly fee.',
  /** Shown on the page only when set. */
  email: null as string | null,
  currency: 'NZD',
  plans: [
    {
      name: 'Starter',
      setup: 1200,
      monthly: 59,
      summary: 'A polished one-page site that tells people who you are and how to reach you.',
      features: [
        'One-page custom design',
        'Enquiry form',
        'Google Business Profile and local search basics',
        'Hosting, security and updates',
        'Small text changes on request',
      ],
    },
    {
      name: 'Business',
      setup: 2400,
      monthly: 99,
      featured: true,
      summary: 'A full site for businesses that want to be found and win enquiries online.',
      features: [
        'Up to 8 pages, custom design',
        'Blog or news you can edit yourself',
        'Booking or quote request forms',
        'Everything in Starter',
        'Monthly report on visits and enquiries',
      ],
    },
    {
      name: 'Online orders',
      setup: 3800,
      monthly: 149,
      summary: 'Take orders, pre-orders or payments online without a clunky shop platform.',
      features: [
        'Menu, product list or pre-order cart',
        'Secure checkout through Stripe',
        'Delivery and pickup options',
        'Everything in Business',
        'Priority changes',
      ],
    },
  ],
};
