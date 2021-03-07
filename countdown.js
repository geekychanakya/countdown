const setStart = document.querySelector('#timer-start')
const setPause = document.querySelector('#timer-pause')
const setReset = document.querySelector('#timer-reset')
const display = document.querySelector('#time')
const timerSound = document.createElement('audio')
timerSound.src='smb_powerup.wav'
let destTimer = 0
let baseTimer = 0

const countdown = (timer) => {
  destTimer = setInterval(() => {
    let minutes = parseInt(timer / 60, 10)
    let seconds = parseInt(timer % 60, 10)

    minutes = minutes < 10 ? "0" + minutes : minutes
    seconds = seconds < 10 ? "0" + seconds : seconds

    display.textContent = minutes + ":" + seconds
    baseTimer = timer

    if (--timer < 0) {
      clearInterval(destTimer)
      timerSound.play()
      setStart.disabled = false
      setPause.disabled = true
      setReset.disabled = true
    }
  }, 1000)
}

setStart.addEventListener('click', () => {
  const duration = document.querySelector('#time-input').value
  if (duration !== '') {
    const existingTimer = baseTimer ? (baseTimer - 1) : (duration * 60)
    countdown(existingTimer)
    setStart.disabled = true
    setPause.disabled = false
    setReset.disabled = false
  }
})

setReset.addEventListener('click', () => {
  clearInterval(destTimer)
  baseTimer = 0
  display.textContent = "00:00"
  setStart.disabled = false
  setPause.disabled = true
  setReset.disabled = true
})

setPause.addEventListener('click', () => {
  clearInterval(destTimer)
  setStart.disabled = false
  setPause.disabled = true
  setReset.disabled = false
})
