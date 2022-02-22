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
  //let numberOfCircles = gridSize * gridSize
  const [showModal, setShowModal] = useState(false)
  const [grid, setGrid] = useState(gridSize)
  const [players, setPlayers] = useState(numberOfplayers)
  const [score, setScore] = useState(0)
  const [uniqueRandomNumbers, setUniqueRandomNumbers] = useState<number[]>([])
  console.log(grid)

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
    console.log(allRandom)
  }, [gridSize])

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
            <ButtonComponent
              width={gridSize === 6 ? '46px' : '65px'}
              height={gridSize === 6 ? '46px' : '65px'}
              bgcolor='#FDA214'
              textcolor='#fff'
              borderRadius='50%'
              marginBottom='10px'
              fontSize={gridSize === 6 ? '24px' : '40px'}
              handleClick={() => console.log(value)}
            >
              {value}
            </ButtonComponent>
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
              <p>1:53</p>
            </div>
            <div className='updates'>
              <p className='text-grey font-semibold'>Moves</p>
              <p>39</p>
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
    </>
  )
}

export default SelectedGame
