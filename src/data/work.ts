// Portfolio. These are demo projects, labelled as such on the page.

export interface Project {
  title: string;
  kind: string;
  image: string;
  alt: string;
  shows: string;
}

export const projects: Project[] = [
  {
    title: 'Stem & Loam',
    kind: 'Florist',
    image: 'work/florist-botanical.jpg',
    alt: 'Florist website with a hand-drawn bouquet, script lettering and blush paper texture',
    shows: 'A romantic, hand-drawn look with a weekly flower list and a seasonal guide.',
  },
  {
    title: 'Stem & Loam, still life',
    kind: 'Florist, alternative design',
    image: 'work/florist-still-life.jpg',
    alt: 'Dark florist website styled like a Dutch still-life painting in a gilt frame',
    shows: 'The same content in a completely different design: dark, painterly and gallery-like.',
  },
  {
    title: 'Stem & Loam shop',
    kind: 'Online flower shop',
    image: 'work/flower-shop.jpg',
    alt: 'Online flower shop with product filters and illustrated flowers in arches',
    shows: 'Product options, card messages, a cart, and delivery or pickup at checkout.',
  },
  {
    title: 'Early Crust',
    kind: 'Bakery',
    image: 'work/bakery.jpg',
    alt: 'Bakery website in a blue and yellow print style with a weekend pre-order',
    shows: 'Weekend pre-orders with pickup times, sold-out items and a cake enquiry form.',
  },
];
