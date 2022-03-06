import { useState } from 'react'
import classNames from 'classnames'
import Game from '../../components/selected-game'

import './start-game.css'

const StartCard = () => {
  const [gridSize, setGridSize] = useState(0)
  const [numberOfPlayers, setNumberOfPlayers] = useState(0)
  const [startGame, setStartGame] = useState(false)

  const handleEndGame = () => {
    setGridSize(0)
    setNumberOfPlayers(0)
    setStartGame(false)
  }

  return (
    <>
      {startGame ? (
        <Game
          gridSize={gridSize}
          numberOfPlayers={numberOfPlayers}
          handleEndGame={handleEndGame}
        />
      ) : (
        <div className='bg-dark-blue w-screen h-screen flex flex-col justify-center items-center'>
          <h1 className='font-bold text-off-white text-2xl mb-10'>memory</h1>

          <div className='card-container w-80 lg:w-3/6 h-96 lg:h-2/3 py-2.5 lg:py-5 px-0'>
            <div className='section-container'>
              <h3 className='sub-heading'>Select Theme</h3>
              <div className='flex'>
                <div className='w-32 lg:w-64 h-10 lg:h-12 bg-navy-blue text-off-white mr-2.5 rounded-3xl flex justify-center items-center cursor-pointer'>
                  Numbers
                </div>
                <div className='w-32 lg:w-64 h-10 lg:h-12 bg-light-grey text-off-white rounded-3xl flex justify-center items-center cursor-pointer'>
                  Icons
                </div>
              </div>
            </div>

            <div className='section-container'>
              <h3 className='sub-heading'>Numbers of Players</h3>
              <div className='flex'>
                {[...Array(4)].map((item, index) => {
                  return (
                    <div
                      className='w-14 lg:w-32 h-10 lg:h-12 bg-light-grey text-off-white mr-2.5 rounded-3xl flex justify-center items-center cursor-pointer'
                      onClick={() => setNumberOfPlayers(index + 1)}
                    >
                      {(index + 1).toString()}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className='section-container'>
              <h3 className='sub-heading'>Grid Size</h3>
              <div className='flex'>
                <div
                  className='w-32 lg:w-64 h-10 lg:h-12 bg-navy-blue text-off-white mr-2.5 rounded-3xl flex justify-center items-center cursor-pointer'
                  onClick={() => setGridSize(4)}
                >
                  4x4
                </div>
                <div
                  className='w-32 lg:w-64 h-10 lg:h-12 bg-light-grey text-off-white rounded-3xl flex justify-center items-center cursor-pointer'
                  onClick={() => setGridSize(6)}
                >
                  6x6
                </div>
              </div>
            </div>

            <div
              style={{ marginTop: '20px' }}
              className='flex justify-center w-full'
            >
              <div
                className={classNames(
                  'w-72 lg:w-4/5 h-10 lg:h-12 bg-orange text-off-white rounded-3xl flex justify-center items-center',
                  {
                    'cursor-pointer': gridSize !== 0 && numberOfPlayers !== 0,
                  }
                )}
                onClick={
                  gridSize !== 0 && numberOfPlayers !== 0
                    ? () => setStartGame(true)
                    : () => {}
                }
              >
                Start Game
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default StartCard
