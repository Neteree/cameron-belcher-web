<script lang="ts">
  // Change requests from existing clients. Sends through Web3Forms like the
  // other forms, with the changes attached as one line of JSON between
  // ---CHANGES-JSON--- markers in the shape the starter's
  // scripts/apply-changes.js takes. Nothing happens until the client confirms
  // from their saved email address and Cameron approves the price.
  import { site } from '../site.config';

  type Kind = 'text' | 'hours' | 'news' | 'menu-add' | 'menu-price' | 'menu-remove' | 'menu-sold-out' | 'other';
  const kinds: { id: Kind; label: string }[] = [
    { id: 'text', label: 'Change some wording' },
    { id: 'hours', label: 'Update opening hours' },
    { id: 'news', label: 'Post news or a special' },
    { id: 'menu-add', label: 'Add a menu item' },
    { id: 'menu-price', label: 'Change a price on the menu' },
    { id: 'menu-remove', label: 'Remove a menu item' },
    { id: 'menu-sold-out', label: 'Mark a menu item sold out (or back on)' },
    { id: 'other', label: 'Something else, like a new photo or section' },
  ];

  const blank = () => ({
    kind: 'text' as Kind,
    current: '',
    replacement: '',
    hours: [{ days: '', times: '' }],
    title: '',
    excerpt: '',
    body: '',
    name: '',
    description: '',
    price: '',
    vegan: false,
    glutenFree: false,
    category: '',
    soldOut: true,
    details: '',
  });

  let email = $state('');
  let business = $state('');
  let changes = $state([blank()]);
  let botcheck = $state(false);
  let tried = $state(false);
  let status = $state<'idle' | 'sending' | 'sent' | 'failed'>('idle');

  type Change = ReturnType<typeof blank>;
  const priceOk = (value: string) => Number(value.replace(/[$,\s]/g, '')) > 0;

  /** What's missing from one change, or '' when it's complete. */
  function problem(c: Change): string {
    switch (c.kind) {
      case 'text':
        return c.current.trim() && c.replacement.trim() ? '' : 'Fill in the current and new wording.';
      case 'hours':
        return c.hours.some((row) => row.days.trim() && row.times.trim()) ? '' : 'Add at least one line of hours.';
      case 'news':
        return c.title.trim() && c.excerpt.trim() && c.body.trim() ? '' : 'Fill in the title, summary and text.';
      case 'menu-add':
        return c.name.trim() && c.description.trim() && priceOk(c.price) ? '' : 'Fill in the name, description and a price.';
      case 'menu-price':
        return c.name.trim() && priceOk(c.price) ? '' : 'Fill in the item name and its new price.';
      case 'menu-remove':
      case 'menu-sold-out':
        return c.name.trim() ? '' : 'Fill in the item name, exactly as it is on the menu.';
      default:
        return c.details.trim() ? '' : 'Describe what you’d like changed.';
    }
  }

  const errors = $derived({
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Enter the email address I have for you.',
    business: business.trim() ? '' : 'Enter your business name.',
    changes: changes.map(problem),
  });
  const valid = $derived(!errors.email && !errors.business && errors.changes.every((e) => !e));

  /** The changes in the shape scripts/apply-changes.js takes. */
  function toChanges() {
    return changes.map((c) => {
      switch (c.kind) {
        case 'text':
          return { type: 'text', current: c.current.trim(), new: c.replacement.trim() };
        case 'hours':
          return { type: 'hours', hours: c.hours.filter((row) => row.days.trim() && row.times.trim()) };
        case 'news':
          return { type: 'news', title: c.title.trim(), excerpt: c.excerpt.trim(), body: c.body.trim() };
        case 'menu-add': {
          const tags = [c.vegan && 'vegan', c.glutenFree && 'gluten-free'].filter(Boolean);
          return { type: 'menu-add', name: c.name.trim(), description: c.description.trim(), price: c.price.trim(), tags, category: c.category.trim() };
        }
        case 'menu-price':
          return { type: 'menu-price', name: c.name.trim(), price: c.price.trim() };
        case 'menu-remove':
          return { type: 'menu-remove', name: c.name.trim() };
        case 'menu-sold-out':
          return { type: 'menu-sold-out', name: c.name.trim(), soldOut: c.soldOut };
        default:
          return { type: 'other', details: c.details.trim() };
      }
    });
  }

  async function submit(event: SubmitEvent) {
    event.preventDefault();
    tried = true;
    if (!valid || status === 'sending') return;
    if (!site.formKey) {
      status = 'sent';
      return;
    }
    status = 'sending';
    const request = { request: 1, email: email.trim(), business: business.trim(), changes: toChanges() };
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: site.formKey,
          subject: `Change request: ${business.trim()}`,
          from_name: site.name,
          email: email.trim(),
          business: business.trim(),
          changes_json: `---CHANGES-JSON--- ${JSON.stringify(request)} ---END-CHANGES-JSON---`,
          botcheck,
        }),
      });
      const result = await response.json();
      status = result.success ? 'sent' : 'failed';
    } catch {
      status = 'failed';
    }
  }
</script>

{#if status === 'sent'}
  <div class="sent" role="status">
    <p class="big">Request sent.</p>
    {#if site.formKey}
      <p>
        You’ll get an email at the address I have for you. Click the link in it to confirm the
        request, then I’ll send you the price before any work starts.
      </p>
    {:else}
      <p>This form isn't connected yet, so nothing was sent.</p>
    {/if}
  </div>
{:else}
  <form novalidate onsubmit={submit}>
    <div class="row">
      <div class="field">
        <label for="r-email">Your email</label>
        <p class="hint" id="r-email-hint">The one I have on file for you. The confirmation goes there.</p>
        <input id="r-email" type="email" autocomplete="email" bind:value={email} aria-invalid={tried && !!errors.email} aria-describedby="r-email-hint r-email-err" />
        {#if tried && errors.email}<p class="error" id="r-email-err">{errors.email}</p>{/if}
      </div>
      <div class="field">
        <label for="r-business">Business name</label>
        <p class="hint" id="r-business-hint">As it appears on your website.</p>
        <input id="r-business" autocomplete="organization" bind:value={business} aria-invalid={tried && !!errors.business} aria-describedby="r-business-hint r-business-err" />
        {#if tried && errors.business}<p class="error" id="r-business-err">{errors.business}</p>{/if}
      </div>
    </div>

    {#each changes as change, i (i)}
      <fieldset class="change">
        <legend>Change {i + 1}</legend>
        <div class="field">
          <label for="r-kind-{i}">What would you like to do?</label>
          <select id="r-kind-{i}" bind:value={change.kind}>
            {#each kinds as kind (kind.id)}<option value={kind.id}>{kind.label}</option>{/each}
          </select>
        </div>

        {#if change.kind === 'text'}
          <div class="field">
            <label for="r-current-{i}">Current wording</label>
            <p class="hint" id="r-current-hint-{i}">Copy it exactly from your site.</p>
            <textarea id="r-current-{i}" rows="2" bind:value={change.current} aria-describedby="r-current-hint-{i}"></textarea>
          </div>
          <div class="field">
            <label for="r-new-{i}">New wording</label>
            <textarea id="r-new-{i}" rows="2" bind:value={change.replacement}></textarea>
          </div>
        {:else if change.kind === 'hours'}
          <div class="field">
            <span class="label">Your new opening hours (all of them)</span>
            {#each change.hours as row, j (j)}
              <div class="hours-row">
                <input aria-label="Days, line {j + 1}" placeholder="Monday to Friday" bind:value={row.days} />
                <input aria-label="Times, line {j + 1}" placeholder="9am – 5pm" bind:value={row.times} />
              </div>
            {/each}
            <button class="small" type="button" onclick={() => change.hours.push({ days: '', times: '' })}>Add another line</button>
          </div>
        {:else if change.kind === 'news'}
          <div class="field">
            <label for="r-title-{i}">Title</label>
            <input id="r-title-{i}" bind:value={change.title} />
          </div>
          <div class="field">
            <label for="r-excerpt-{i}">One-line summary</label>
            <input id="r-excerpt-{i}" bind:value={change.excerpt} />
          </div>
          <div class="field">
            <label for="r-body-{i}">The post</label>
            <textarea id="r-body-{i}" rows="4" bind:value={change.body}></textarea>
          </div>
        {:else if change.kind === 'other'}
          <div class="field">
            <label for="r-details-{i}">What would you like?</label>
            <p class="hint" id="r-details-hint-{i}">For a new photo, say where it goes and email me the photo.</p>
            <textarea id="r-details-{i}" rows="4" bind:value={change.details} aria-describedby="r-details-hint-{i}"></textarea>
          </div>
        {:else}
          <div class="field">
            <label for="r-name-{i}">Menu item name{change.kind === 'menu-add' ? '' : ', as it is on the menu'}</label>
            <input id="r-name-{i}" bind:value={change.name} />
          </div>
          {#if change.kind === 'menu-add'}
            <div class="field">
              <label for="r-description-{i}">Description</label>
              <textarea id="r-description-{i}" rows="2" bind:value={change.description}></textarea>
            </div>
            <div class="field">
              <label for="r-category-{i}">Menu section <span class="optional">(optional)</span></label>
              <input id="r-category-{i}" placeholder="Lunch" bind:value={change.category} />
            </div>
            <div class="checks">
              <label><input type="checkbox" bind:checked={change.vegan} /> Vegan</label>
              <label><input type="checkbox" bind:checked={change.glutenFree} /> Gluten-free</label>
            </div>
          {/if}
          {#if change.kind === 'menu-add' || change.kind === 'menu-price'}
            <div class="field">
              <label for="r-price-{i}">{change.kind === 'menu-add' ? 'Price' : 'New price'}</label>
              <input id="r-price-{i}" inputmode="decimal" placeholder="$6.50" bind:value={change.price} />
            </div>
          {/if}
          {#if change.kind === 'menu-sold-out'}
            <div class="checks">
              <label><input type="radio" name="r-sold-{i}" value={true} bind:group={change.soldOut} /> Sold out</label>
              <label><input type="radio" name="r-sold-{i}" value={false} bind:group={change.soldOut} /> Back on</label>
            </div>
          {/if}
        {/if}

        {#if tried && errors.changes[i]}<p class="error">{errors.changes[i]}</p>{/if}
        {#if changes.length > 1}
          <button class="small" type="button" onclick={() => changes.splice(i, 1)}>Remove this change</button>
        {/if}
      </fieldset>
    {/each}

    <button class="small add" type="button" onclick={() => changes.push(blank())}>Add another change</button>

    <input class="botcheck" type="checkbox" tabindex="-1" aria-hidden="true" bind:checked={botcheck} />
    <button class="button" type="submit" disabled={status === 'sending'}>
      {status === 'sending' ? 'Sending…' : 'Send request'}
    </button>
    {#if status === 'failed'}
      <p class="error" role="alert">Sorry, that didn't send. Please try again in a moment.</p>
    {/if}
    {#if !site.formKey}<p class="note">Not connected yet: this form doesn't send anything.</p>{/if}
  </form>
{/if}

<style>
  form {
    display: grid;
    gap: 1.5rem;
  }
  .row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
    gap: 1.1rem;
  }
  .field {
    display: grid;
    gap: 0.35rem;
  }
  label,
  .label {
    font-weight: 600;
  }
  .optional {
    font-weight: 400;
    color: var(--soft);
  }
  .hint {
    margin: 0;
    font-size: 0.92rem;
    color: var(--soft);
  }
  input:not([type='radio']):not([type='checkbox']),
  select,
  textarea {
    width: 100%;
    border: 2px solid var(--ink);
    border-radius: 0.4rem;
    background: var(--paper);
    padding: 0.65rem 0.8rem;
  }
  [aria-invalid='true'] {
    border-color: var(--error);
  }
  .change {
    display: grid;
    gap: 1rem;
    margin: 0;
    padding: 1.25rem;
    border: 2px solid var(--rule);
    border-radius: 0.6rem;
    min-width: 0;
  }
  legend {
    font-family: var(--display);
    font-size: 1.2rem;
    padding-inline: 0.4rem;
  }
  .hours-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }
  .checks {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1.5rem;
  }
  .checks label {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-weight: 500;
  }
  .small {
    justify-self: start;
    border: 2px solid var(--ink);
    border-radius: 0.4rem;
    background: none;
    padding: 0.4rem 0.8rem;
    font-weight: 600;
    cursor: pointer;
  }
  .error {
    margin: 0;
    color: var(--error);
    font-size: 0.92rem;
    font-weight: 600;
  }
  form .button {
    justify-self: start;
  }
  form .button:disabled {
    opacity: 0.6;
    cursor: wait;
  }
  .botcheck {
    display: none;
  }
  .note {
    margin: 0;
    font-size: 0.85rem;
    color: var(--soft);
  }
  .sent {
    display: grid;
    gap: 0.75rem;
  }
  .sent p {
    margin: 0;
  }
  .big {
    font-family: var(--display);
    font-size: 1.8rem;
  }
</style>
