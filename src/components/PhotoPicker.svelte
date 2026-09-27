<script lang="ts">
  // Choosing photos to upload: each chosen photo shows a small preview and can
  // be removed, and choosing again adds to the list instead of replacing it.
  // With `max` 1 (a logo), choosing again swaps the photo.
  let {
    label,
    photos = $bindable([]),
    descriptions = $bindable([]),
    max = 12,
    describe = true,
  }: { label: string; photos?: File[]; descriptions?: string[]; max?: number; describe?: boolean } = $props();

  let previews = $state<string[]>([]);
  $effect(() => {
    const urls = photos.map((file) => URL.createObjectURL(file));
    previews = urls;
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  });

  function add(event: Event & { currentTarget: HTMLInputElement }) {
    const chosen = [...(event.currentTarget.files ?? [])];
    event.currentTarget.value = '';
    if (!chosen.length) return;
    if (max === 1) {
      photos = chosen.slice(0, 1);
      descriptions = [''];
    } else {
      photos = [...photos, ...chosen];
      descriptions = [...descriptions, ...chosen.map(() => '')];
    }
  }

  function remove(index: number) {
    photos = photos.filter((_, i) => i !== index);
    descriptions = descriptions.filter((_, i) => i !== index);
  }
</script>

<div class="picker">
  <label class="choose">
    {photos.length ? (max === 1 ? `Change ${label}` : `Add more ${label}`) : `Choose ${label}`}
    <input type="file" accept="image/jpeg,image/png,image/webp" multiple={max > 1} onchange={add} />
  </label>
  {#if photos.length}
    <ul>
      {#each photos as photo, i (photo)}
        <li>
          {#if previews[i]}<img src={previews[i]} alt="" width="64" height="64" />{/if}
          {#if describe}
            <label class="describe">
              <span>What’s in “{photo.name}”? <span class="optional">(optional)</span></span>
              <input maxlength="150" bind:value={descriptions[i]} />
            </label>
          {:else}
            <span class="name">{photo.name}</span>
          {/if}
          <button type="button" onclick={() => remove(i)} aria-label="Remove {photo.name}">Remove</button>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .picker {
    display: grid;
    gap: 0.6rem;
  }
  .choose {
    position: relative;
    justify-self: start;
    border: 2px solid var(--ink);
    border-radius: 0.4rem;
    padding: 0.5rem 0.9rem;
    font-weight: 600;
    cursor: pointer;
  }
  .choose:focus-within {
    outline: 3px solid var(--ink);
    outline-offset: 2px;
  }
  .choose input {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    overflow: hidden;
  }
  ul {
    display: grid;
    gap: 0.6rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  li {
    display: grid;
    grid-template-columns: 4rem 1fr auto;
    align-items: center;
    gap: 0.75rem;
  }
  img {
    width: 4rem;
    height: 4rem;
    object-fit: cover;
    border-radius: 0.3rem;
  }
  .describe {
    display: grid;
    gap: 0.25rem;
    min-width: 0;
    font-weight: 600;
    font-size: 0.92rem;
    overflow-wrap: anywhere;
  }
  .describe input {
    width: 100%;
    border: 2px solid var(--ink);
    border-radius: 0.4rem;
    background: var(--paper);
    padding: 0.5rem 0.7rem;
    font-weight: 400;
  }
  .optional {
    font-weight: 400;
    color: var(--soft);
  }
  .name {
    min-width: 0;
    overflow-wrap: anywhere;
  }
  button {
    border: 2px solid var(--ink);
    border-radius: 0.4rem;
    background: none;
    padding: 0.35rem 0.7rem;
    font-weight: 600;
    cursor: pointer;
  }
</style>
