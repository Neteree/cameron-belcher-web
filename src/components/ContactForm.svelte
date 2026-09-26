<script lang="ts">
  // Enquiry form. Not connected to anything yet: a live site would post to a
  // form service (e.g. Formspree) or a serverless function instead.
  let name = $state('');
  let email = $state('');
  let business = $state('');
  let need = $state('');
  let message = $state('');
  let tried = $state(false);
  let sent = $state(false);

  const errors = $derived({
    name: name.trim() ? '' : 'Tell me your name.',
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Enter an email address like you@example.com.',
    need: need ? '' : 'Choose what you need.',
  });
  const valid = $derived(Object.values(errors).every((e) => !e));

  function submit(event: SubmitEvent) {
    event.preventDefault();
    tried = true;
    if (valid) sent = true;
  }
</script>

{#if sent}
  <div class="sent" role="status">
    <p class="big">Thanks, {name.split(' ')[0]}.</p>
    <p>This form isn't connected yet, so nothing was sent. Once it's live, enquiries will arrive straight away.</p>
    <button class="button" type="button" onclick={() => (sent = tried = false)}>Back to the form</button>
  </div>
{:else}
  <form novalidate onsubmit={submit}>
    <div class="row">
      <div class="field">
        <label for="c-name">Your name</label>
        <input id="c-name" autocomplete="name" bind:value={name} aria-invalid={tried && !!errors.name} aria-describedby="c-name-err" />
        {#if tried && errors.name}<p class="error" id="c-name-err">{errors.name}</p>{/if}
      </div>
      <div class="field">
        <label for="c-email">Email</label>
        <input id="c-email" type="email" autocomplete="email" bind:value={email} aria-invalid={tried && !!errors.email} aria-describedby="c-email-err" />
        {#if tried && errors.email}<p class="error" id="c-email-err">{errors.email}</p>{/if}
      </div>
    </div>
    <div class="field">
      <label for="c-business">Business name <span class="optional">(optional)</span></label>
      <input id="c-business" autocomplete="organization" bind:value={business} />
    </div>
    <div class="field">
      <label for="c-need">What do you need?</label>
      <select id="c-need" bind:value={need} aria-invalid={tried && !!errors.need} aria-describedby="c-need-err">
        <option value="" disabled>Choose one</option>
        <option>A new website</option>
        <option>A new site to replace an old one</option>
        <option>Online orders or bookings</option>
        <option>Not sure yet, let's chat</option>
      </select>
      {#if tried && errors.need}<p class="error" id="c-need-err">{errors.need}</p>{/if}
    </div>
    <div class="field">
      <label for="c-message">Anything else? <span class="optional">(optional)</span></label>
      <textarea id="c-message" rows="4" bind:value={message} placeholder="Your current website, what's not working, what you'd love it to do…"></textarea>
    </div>
    <button class="button" type="submit">Send enquiry</button>
    <p class="note">Not connected yet: this form doesn't send anything.</p>
  </form>
{/if}

<style>
  form {
    display: grid;
    gap: 1.1rem;
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
  label {
    font-weight: 600;
  }
  .optional {
    font-weight: 400;
    color: var(--soft);
  }
  input,
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
  .error {
    margin: 0;
    color: var(--error);
    font-size: 0.92rem;
    font-weight: 600;
  }
  form .button {
    justify-self: start;
  }
  .note {
    margin: 0;
    font-size: 0.85rem;
    color: var(--soft);
  }
  .sent {
    display: grid;
    gap: 0.75rem;
    justify-items: start;
  }
  .sent p {
    margin: 0;
  }
  .big {
    font-family: var(--display);
    font-size: 1.8rem;
  }
</style>
