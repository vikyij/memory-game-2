import { useState } from 'react'
import classnames from 'classnames'

interface MultiPlayerProps {
  numberOfPlayers: number
  currentPlayer: number
  players: {
    player1: number
    player2: number
    player3: number
    player4: number
  }
}

const MultiPlayer: React.FC<MultiPlayerProps> = ({
  numberOfPlayers,
  currentPlayer,
  players,
}) => {
  const [width] = useState(window.innerWidth)

  return (
    <>
      {[...Array(numberOfPlayers)].map((player, index) => {
        return (
          <div className='flex flex-col' key={index}>
            <div
              key={index}
              className={classnames(
                'w-16 md:w-64 h-20 rounded-md flex flex-col md:flex-row justify-center md:justify-around mr-3 items-center',
                {
                  'bg-ash': currentPlayer !== index + 1,
                  'bg-orange': currentPlayer === index + 1,
                }
              )}
              data-testid={`player ${index + 1}`}
            >
              <p className='player'>{`${width < 500 ? 'P' : 'Player'} ${
                index + 1
              }`}</p>
              <h3 className='score'>
                {index + 1 === 1
                  ? players.player1
                  : index + 1 === 2
                  ? players.player2
                  : index + 1 === 3
                  ? players.player3
                  : index + 1 === 4 && players.player4}
              </h3>
            </div>
            {width > 500 && (
              <p className='text-dark-blue text-xs font-bold text-center mt-2.5 tracking-widest'>
                {currentPlayer === index + 1 && 'CURRENT TURN'}
              </p>
            )}
          </div>
        )
      })}
    </>
  )
}

export default MultiPlayer
