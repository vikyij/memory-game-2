import { useState } from 'react'
import { ButtonComponent } from '../button'
import Game from '../../components/selected-game'

import './start-game.css'

const StartCard = () => {
  const [gridSize, setGridSize] = useState(0)
  const [numberOfplayers, setNumberOfPlayers] = useState(0)
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
          numberOfplayers={numberOfplayers}
          handleEndGame={handleEndGame}
        />
      ) : (
        <div className='bg-dark-blue w-screen h-screen flex flex-col justify-center items-center'>
          <h1 className='font-bold text-off-white text-2xl mb-10'>memory</h1>

          <div className='card-container'>
            <div className='section-container'>
              <h3 className='sub-heading'>Select Theme</h3>
              <div>
                <ButtonComponent
                  width='134px'
                  height='40px'
                  bgcolor='#304859'
                  textcolor='#FCFCFC'
                  marginRight='10px'
                >
                  Numbers
                </ButtonComponent>

                <ButtonComponent
                  width='134px'
                  height='40px'
                  bgcolor='#BCCED9'
                  textcolor='#FCFCFC'
                >
                  icons
                </ButtonComponent>
              </div>
            </div>

            <div className='section-container'>
              <h3 className='sub-heading'>Numbers of Players</h3>
              <div>
                {[...Array(4)].map((item, index) => {
                  return (
                    <ButtonComponent
                      width='62px'
                      height='40px'
                      bgcolor='#304859'
                      textcolor='#FCFCFC'
                      marginRight='10px'
                      handleClick={() => setNumberOfPlayers(index + 1)}
                    >
                      {(index + 1).toString()}
                    </ButtonComponent>
                  )
                })}
              </div>
            </div>

            <div className='section-container'>
              <h3 className='sub-heading'>Grid Size</h3>
              <div>
                <ButtonComponent
                  width='134px'
                  height='40px'
                  bgcolor='#304859'
                  textcolor='#FCFCFC'
                  marginRight='10px'
                  handleClick={() => setGridSize(4)}
                >
                  4x4
                </ButtonComponent>

                <ButtonComponent
                  width='134px'
                  height='40px'
                  bgcolor='#BCCED9'
                  textcolor='#FCFCFC'
                  handleClick={() => setGridSize(6)}
                >
                  6x6
                </ButtonComponent>
              </div>
            </div>

            <div style={{ marginTop: '20px' }}>
              <ButtonComponent
                width='279px'
                height='48px'
                bgcolor='#FDA214'
                textcolor='#FCFCFC'
                disabled={gridSize === 0 || numberOfplayers === 0}
                handleClick={() => setStartGame(true)}
              >
                Start Game
              </ButtonComponent>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default StartCard
