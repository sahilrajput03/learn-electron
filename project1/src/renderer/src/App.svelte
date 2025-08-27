<script lang="ts">
  // import { onMount } from 'svelte'
  import { getRandomQuote } from './sampleQuotes'
  // import AppDefault from './AppDefault.svelte'

  let quote = $state(getRandomQuote())

  // onMount(() => { })

  // const sendToMainProcess = (): void => {
  //   window.electron.ipcRenderer.send('ding', { msg: 'hello', count: 5 })
  // }

  // @ts-ignore
  window.api.onCustomEvent((data) => {
    if (data.action === 'UPDATE_QUOTE') {
      quote = getRandomQuote()
    }
  })
</script>

<strong>{quote.quote}</strong>
<br />
<p>— {quote.author}</p>

<!-- / // & Send event with data to main process. -->
<!-- <button onclick={sendToMainProcess}> Send "ping" to Main Process (check console) </button> -->

<!-- Show default code provided by elecron + svelte project. -->
<!-- <AppDefault /> -->

<style>
  button {
    color: white;
    background: transparent;
    border-radius: 5px;
    padding: 0.5em 1em;
    margin-top: 1em;
  }
</style>
