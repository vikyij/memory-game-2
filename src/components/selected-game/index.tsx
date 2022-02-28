import React, { useState, useEffect, MouseEvent } from 'react'
import { ButtonComponent } from '../button'
import Modal from '../modal'
import './selected-game.css'
import classnames from 'classnames'

interface SelectedProps {
  gridSize: number
  numberOfplayers: number
}

type Grid = {
  [key: string]: {
    value: string
    selected: boolean
    disabled: boolean
  }
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array: number[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

const SelectedGame: React.FC<SelectedProps> = ({
  gridSize,
  numberOfplayers,
}) => {
  const [showModal, setShowModal] = useState(false)
  const [grid, setGrid] = useState<Grid>({})
  const [players, setPlayers] = useState(numberOfplayers)
  const [selection, setSelection] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [count, setCount] = useState(0)
  const [timer, setTimer] = useState(0)
  const [completed, setCompleted] = useState<boolean>()
  const [randomArraySize, setRandomArraySize] = useState(0)

  useEffect(() => {
    const randomArr: number[] = []
    const numberOfCircles = gridSize === 4 ? 16 : 36
    const grid: Grid = {}

    while (randomArr.length < numberOfCircles) {
      let random = Math.floor(Math.random() * (numberOfCircles - 1 + 1) + 1)
      if (randomArr.indexOf(random) === -1) {
        randomArr.push(...[random, random])
      }
    }
    shuffleArray(randomArr)
    setRandomArraySize(randomArr.length)
    for (let i = 0; i < randomArr.length; i++) {
      grid[`grid-${i}`] = {
        value: randomArr[i].toString(),
        selected: true,
        disabled: false,
      }
    }

    setGrid(grid)
  }, [gridSize])

  useEffect(() => {
    for (let i = 0; i < randomArraySize; i++) {
      setTimeout(
        () =>
          setGrid((grid) => {
            return {
              ...grid,
              [`grid-${i}`]: { ...grid[`grid-${i}`], selected: false },
            }
          }),
        1000
      )
    }
  }, [randomArraySize])

  const updateTimer = () => {
    const getSeconds = `0${timer % 60}`.slice(-2)
    const minutes = `${Math.floor(timer / 60)}`
    // added + because of a typescript error 'The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type'
    const getMinutes = `0${+minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)
    return `${getHours} : ${getMinutes} : ${getSeconds}`
  }

  const handleClick = (ev: MouseEvent<HTMLDivElement>) => {
    ev.stopPropagation()
    let id = (ev.target as HTMLDivElement).getAttribute('data-id')

    setCount((count) => count + 1)
    if (id) {
      if (selection.length === 0) {
        setGrid((grid) => {
          const target = grid[id as string]
          return {
            ...grid,
            [id as string]: { ...target, selected: !target.selected },
          }
        })
        setSelection([id])
      } else {
        const target_1 = grid[selection[0]]
        const target_2 = grid[id]

        if (target_1.value !== target_2.value) {
          // Set timeout and hide boxes
          setGrid((grid) => {
            return {
              ...grid,
              [id as string]: { ...target_2, selected: true },
            }
          })
          setTimeout(
            () =>
              setGrid((grid) => {
                return {
                  ...grid,
                  [selection[0]]: { ...target_1, selected: false },
                  [id as string]: { ...target_2, selected: false },
                }
              }),
            500
          )
        } else {
          setGrid((grid) => {
            return {
              ...grid,
              [selection[0]]: { ...target_1, disabled: true, selected: true },
              [id as string]: { ...target_2, disabled: true, selected: true },
            }
          })
        }
        setSelection([])
      }
    }
  }

  useEffect(() => {
    const finished = Object.entries(grid).every(
      ([id, { value, selected, disabled }]) => disabled === true
    )
    setCompleted(finished)
    const timeInterval = setInterval(() => {
      if (!finished) {
        setTimer((timer) => timer + 1)
      }
    }, 1000)
    return () => {
      clearInterval(timeInterval)
    }
  }, [grid])

  return (
    <>
      <div className='Nav'>
        <h1 className='font-bold text-dark-blue text-2xl mb-10'>memory</h1>
        <ButtonComponent
          width='78px'
          height='40px'
          bgcolor='#FDA214'
          textcolor='#fff'
          handleClick={() => setShowModal(true)}
        >
          Menu
        </ButtonComponent>
      </div>
      <div
        className='flex justify-between flex-wrap w-80 m-auto'
        onClick={handleClick}
      >
        {/* convert an object to array */}
        {Object.entries(grid).map(([id, { value, selected, disabled }]) => {
          return (
            <div
              key={id}
              data-id={id}
              className={classnames('circleStyle', {
                'opacity-50 pointer-events-none': disabled,
              })}
              style={{
                width: gridSize === 6 ? '46px' : '65px',
                height: gridSize === 6 ? '46px' : '65px',
                fontSize: gridSize === 6 ? '24px' : '40px',
              }}
            >
              <p
                data-id={id}
                className={classnames('circleValue', { hidden: !selected })}
              >
                {value}
              </p>
            </div>
          )
        })}
      </div>

      <div
        className='p-6 flex justify-between absolute bottom-2'
        style={{ left: players === 2 ? '26%' : '0' }}
      >
        {players === 1 ? (
          <>
            <div className='updates mr-3'>
              <p className='text-grey font-semibold'>Time</p>
              <p>{updateTimer()}</p>
            </div>
            <div className='updates'>
              <p className='text-grey font-semibold'>Moves</p>
              <p>{count}</p>
            </div>
          </>
        ) : (
          [...Array(players)].map((player, index) => {
            return (
              <div
                className='w-16 h-20 rounded-md flex flex-col justify-center mr-3'
                style={{ backgroundColor: '#DFE7EC' }}
              >
                <p className='player'>{`P ${index + 1}`}</p>
                <h3 className='score'>{score}</h3>
              </div>
            )
          })
        )}
      </div>

      {showModal && (
        <Modal handleClose={() => setShowModal(false)}>
          <>
            <ButtonComponent
              width='279px'
              height='48px'
              bgcolor='#FDA214'
              textcolor='#fff'
              marginBottom='20px'
              handleClick={() => setShowModal(true)}
            >
              Restart
            </ButtonComponent>
            <ButtonComponent
              width='279px'
              height='48px'
              bgcolor='#DFE7EC'
              textcolor='#fff'
              handleClick={() => setShowModal(true)}
            >
              New Game
            </ButtonComponent>
          </>
        </Modal>
      )}

      {completed && (
        <Modal
          handleClose={() => setShowModal(false)}
          width='327px'
          height='376px'
        >
          <>
            <h1 className='modal2-heading'>You did it!</h1>
            <p className='modal2-subheading'>
              Game over! Here’s how you got on…
            </p>
            <div style={{ margin: '25px auto' }}>
              <div className='modal-timer-div' style={{ marginBottom: '10px' }}>
                <p className='modal-timer-text'>Time ELapsed</p>
                <p className='modal-timer-text2'>{updateTimer()}</p>
              </div>
              <div className='modal-timer-div'>
                <p className='modal-timer-text'>Moves Taken</p>
                <p className='modal-timer-text2'>{`${count} Moves`}</p>
              </div>
            </div>
            <ButtonComponent
              width='279px'
              height='48px'
              bgcolor='#FDA214'
              textcolor='#fff'
              marginBottom='15px'
              handleClick={() => setShowModal(true)}
            >
              Restart
            </ButtonComponent>
            <ButtonComponent
              width='279px'
              height='48px'
              bgcolor='#DFE7EC'
              textcolor='#304859'
              handleClick={() => setShowModal(true)}
            >
              Setup New Game
            </ButtonComponent>
          </>
        </Modal>
      )}
    </>
  )
}

export default SelectedGame
