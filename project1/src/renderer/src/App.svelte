<script lang="ts">
  import { onDestroy, onMount } from 'svelte'

  // import { onMount } from 'svelte'
  import { getRandomQuote } from './sampleQuotes'
  // import AppDefault from './AppDefault.svelte'

  let quote = $state(getRandomQuote())
  let timer: number = $state(null)
  let intervalId = $state(null)

  const clearExistingIntervalIfExists = (id) => {
    if (id) {
      console.log('🧹 Clearing old timer ...')
      clearInterval(id)
      intervalId = null
    }
  }

  onMount(() => {
    console.log(' 🚀🚀 onMount 🚀🚀')
    // @ts-ignore
    window.api.onCustomEvent((data) => {
      if (data.action === 'UPDATE_QUOTE') {
        quote = getRandomQuote()
        timer = data.interval
        clearExistingIntervalIfExists(intervalId)
        console.log('✅ Starting new interval')
        let scopedIntervalId = setInterval(() => {
          timer -= 1_000
          console.log('🚀 ~ timer:', timer)
          if (timer <= 0) {
            clearExistingIntervalIfExists(scopedIntervalId)
          }
        }, 1_000)
        intervalId = scopedIntervalId
      }
    })
  })
  onDestroy(async () => {
    console.log('❤️ on Destroy called. Clearing interval if exists.')
    clearExistingIntervalIfExists(intervalId)
  })

  // const sendToMainProcess = (): void => {
  //   window.electron.ipcRenderer.send('ding', { msg: 'hello', count: 5 })
  // }

  function formatTime(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    if (minutes === 0) {
      return `${seconds} seconds`
    }
    return `${minutes} mins and ${seconds} seconds`
  }

  // Example:
  // console.log(formatTime(123000)) // "2 mins and 3 seconds"
</script>

<div class="container">
  <strong>{quote.quote}</strong>
  <br />
  <p style="text-align: right;">— {quote.author}</p>

  <br />

  <!-- <p style="text-align: center;">{timer / 1_000} seconds</p> -->
  <p style="text-align: center;">{formatTime(timer)}</p>
</div>

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

  .container {
    padding: 2em;
  }
</style>
