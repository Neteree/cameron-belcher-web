// The look presets a client can choose on the onboarding form. Keep the ids in
// step with starter/src/themes.ts in Neteree/new-empty-repo; each preset's
// colours and font sample are in OnboardingForm.svelte's styles.
export const themes = [
  { id: 'bold', name: 'Bold', text: 'Blue and sunshine yellow, chunky headings.' },
  { id: 'classic', name: 'Classic', text: 'Deep green and gold, elegant serif headings.' },
  { id: 'calm', name: 'Calm', text: 'Soft teal and peach, clean rounded type.' },
  { id: 'warm', name: 'Warm', text: 'Terracotta and cream, friendly serif headings.' },
];

/** Add-on modules the starter has. Cameron adds them to the onboarding link, e.g. ?modules=food. */
export const modules = ['food', 'prices', 'bouquet', 'booking', 'reviews', 'faq', 'shop'];
