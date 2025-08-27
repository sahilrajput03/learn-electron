<script lang="ts">
  import { onMount } from 'svelte'
  import { getRandomQuote } from './sampleQuotes'

  // import AppDefault from './AppDefault.svelte'

  let quote = $state(getRandomQuote())

  onMount(() => {
    setInterval(() => {
      quote = getRandomQuote()
    }, 5_000)
  })
</script>

<strong>{quote.quote}</strong>
<br />
<p>— {quote.author}</p>

<!-- Show default code provided by elecron + svelte project. -->
<!-- <AppDefault /> -->
