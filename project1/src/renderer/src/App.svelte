<script lang="ts">
  import { onDestroy, onMount } from 'svelte'

  // import { onMount } from 'svelte'
  import { getRandomQuote } from './sampleQuotes'
  import { getDateAfterMs, getHourWithMinutes } from './time-utils'
  // import AppDefault from './AppDefault.svelte'

  let quote = $state(getRandomQuote())
  let timer: number = $state(null)
  let intervalId = $state(null)
  let pomodoroEndTimeString: string = $state(null)
  // let pomodoroEndTimeString: string = $state('11:22 PM') // testing only

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
        pomodoroEndTimeString = getHourWithMinutes(getDateAfterMs(data.interval))
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

<div class="pomodoro-end-time">
  {pomodoroEndTimeString}
</div>

<!-- Learn: I'm refreshing because on restart button so that in main process
`ready-to-show` event is fired and we have fresh start for the application. -->
<button class="restart-btn" onclick={() => location.reload()}>Restart</button>

<!-- / // & Send event with data to main process. -->
<!-- <button onclick={sendToMainProcess}> Send "ping" to Main Process (check console) </button> -->

<!-- Show default code provided by elecron + svelte project. -->
<!-- <AppDefault /> -->

<style>
  .pomodoro-end-time {
    margin: auto;
    align-self: flex-end;
    text-align: center;
    border: 1px solid white;
    width: fit-content;
    padding: 5px 10px;
    /* Not making it round because I want to make it look squared (stricter) */
    /* border-radius: 10px; */
  }
  .restart-btn {
    position: absolute;
    bottom: 20px;
  }
  button {
    color: white;
    background: transparent;
    border-radius: 5px;
    padding: 0.5em 1em;
    margin-top: 1em;
  }

  .container {
    padding: 2em;
    /* border: 1px solid white; */
  }
</style>
