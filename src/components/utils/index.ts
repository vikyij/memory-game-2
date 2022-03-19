
// update timer 
export const updateTimer = (timer: number) => {
  const getSeconds = `0${timer % 60}`.slice(-2)
  const getMinutes =  `0${Math.floor(timer / 60) % 60}`.slice(-2)
  return ` ${getMinutes} : ${getSeconds}`
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
export const shuffleArray =(
  array: { icon: JSX.Element; value: string }[] | number[]
) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}