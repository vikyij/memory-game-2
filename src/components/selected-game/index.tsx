import { time } from 'console'
import React, { useState, useEffect } from 'react'
import { ButtonComponent } from '../button'
import Modal from '../modal'
import './selected-game.css'

interface SelectedProps {
  gridSize: number
  numberOfplayers: number
}

const SelectedGame: React.FC<SelectedProps> = ({
  gridSize,
  numberOfplayers,
}) => {
  const [showModal, setShowModal] = useState(false)
  const [grid, setGrid] = useState(gridSize)
  const [players, setPlayers] = useState(numberOfplayers)
  const [score, setScore] = useState(0)
  const [uniqueRandomNumbers, setUniqueRandomNumbers] = useState<number[]>([])
  const [selectedValues, setSelectedValues] = useState<number[]>([])
  const [count, setCount] = useState(0)
  const [timer, setTimer] = useState(0)
  const [pairs, setPairs] = useState<number[]>([])

  useEffect(() => {
    let randomArr = []
    let randomArr2 = []
    let allRandom = []
    let numberOfCircles = gridSize === 4 ? 8 : 18

    while (randomArr.length < numberOfCircles) {
      let random = Math.floor(Math.random() * (numberOfCircles - 1 + 1) + 1)
      if (randomArr.indexOf(random) === -1) {
        randomArr.push(random)
        randomArr2.push(random)
      }
    }

    allRandom = randomArr.concat(randomArr2)
    setUniqueRandomNumbers(allRandom)
  }, [gridSize])

  useEffect(() => {
    let timer = setTimeout(() => {
      let elem = document.getElementsByClassName(
        'circleValue'
      ) as HTMLCollectionOf<HTMLElement>

      for (let i = 0; i < elem.length; i++) {
        elem[i].style.display = 'none'
      }
    }, 2000)
    return () => {
      clearTimeout(timer)
    }
  }, [])

  const updateTimer = () => {
    const getSeconds = `0${timer % 60}`.slice(-2)
    const minutes = `${Math.floor(timer / 60)}`
    // added + because of a typescript error 'The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type'
    const getMinutes = `0${+minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

    return `${getHours} : ${getMinutes} : ${getSeconds}`
  }

  const handleClick = (value: number, index: number) => {
    if (selectedValues.indexOf(value) !== -1) {
      setPairs((prev) => [...prev, value])
    }

    setSelectedValues((prev) => [...prev, value])

    setCount((count) => count + 1)

    let elem = document.getElementsByClassName(
      'circleValue'
    ) as HTMLCollectionOf<HTMLElement>

    elem[index].style.display = 'block'
    console.log(pairs)
  }

  useEffect(() => {
    const timeInterval = setInterval(() => setTimer((timer) => timer + 1), 1000)
    return () => clearInterval(timeInterval)
  }, [])

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
      <div className='flex justify-between flex-wrap w-80 m-auto'>
        {uniqueRandomNumbers.map((value, index) => {
          return (
            <div
              key={index}
              onClick={() => handleClick(value, index)}
              className='circleStyle'
              style={{
                width: gridSize === 6 ? '46px' : '65px',
                height: gridSize === 6 ? '46px' : '65px',
                fontSize: gridSize === 6 ? '24px' : '40px',
              }}
            >
              <p className='circleValue'>{value}</p>
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

      {pairs.length === 8 && (
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
