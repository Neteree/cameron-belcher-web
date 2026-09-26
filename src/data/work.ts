// Portfolio. These are demo projects, labelled as such on the page.

import type { ImageMetadata } from 'astro';
import cafe from '../assets/work/cafe.jpg';
import plumber from '../assets/work/plumber.jpg';
import barber from '../assets/work/barber.jpg';
import physio from '../assets/work/physio.jpg';
import bakery from '../assets/work/bakery.jpg';
import floristBotanical from '../assets/work/florist-botanical.jpg';

export interface Project {
  title: string;
  kind: string;
  image: ImageMetadata;
  alt: string;
  shows: string;
}

export const projects: Project[] = [
  {
    title: 'Paper Boat Café',
    kind: 'Café',
    image: cafe,
    alt: 'Café website in warm retro orange and brown with a coffee cup illustration and menu highlights',
    shows: 'Opening hours up front, menu favourites, and ordering ahead for pickup.',
  },
  {
    title: 'Tideline Plumbing',
    kind: 'Plumber',
    image: plumber,
    alt: 'Bold yellow and black plumbing website with a pipe illustration and a big phone number',
    shows: 'Built to get the phone ringing: emergency call-outs, fixed quotes and trust points.',
  },
  {
    title: 'Kingfisher Barbers',
    kind: 'Barber',
    image: barber,
    alt: 'Dark barbershop website with gold lettering, a price list and a barber pole',
    shows: 'A price list at a glance, opening hours and online booking.',
  },
  {
    title: 'Clearwater Physio',
    kind: 'Physiotherapy clinic',
    image: physio,
    alt: 'Calm sage-green physio website with an appointment booking panel',
    shows: 'A calm, trustworthy feel with appointment booking right on the home page.',
  },
  {
    title: 'Early Crust',
    kind: 'Bakery',
    image: bakery,
    alt: 'Bakery website in a blue and yellow print style with a weekend pre-order',
    shows: 'Weekend pre-orders with pickup times, sold-out items and a cake enquiry form.',
  },
  {
    title: 'Stem & Loam',
    kind: 'Florist',
    image: floristBotanical,
    alt: 'Florist website with a hand-drawn bouquet, script lettering and blush paper texture',
    shows: 'A romantic, hand-drawn look with a weekly flower list and a seasonal guide.',
  },
];
