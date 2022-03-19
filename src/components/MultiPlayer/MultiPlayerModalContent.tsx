import { useState } from 'react'
import classnames from 'classnames'

interface MultiPlayerModalContentProps {
  winnerScore: { player: number; score: number }[]
  handleRestart: () => void
  setNewGame: () => void
}

const MultiPlayerModalContent: React.FC<MultiPlayerModalContentProps> = ({
  winnerScore,
  handleRestart,
  setNewGame,
}) => {
  const [width] = useState(window.innerWidth)

  return (
    <>
      <h1 className='modal2-heading'>
        {winnerScore[0].score === winnerScore[1].score
          ? 'It’s a tie!'
          : `Player ${winnerScore[0].player} Wins!`}
      </h1>
      <p className='modal2-subheading'>Game over! Here are the results…</p>
      <div style={{ margin: '25px auto' }}>
        {winnerScore.map((player, index) => {
          return (
            <div
              key={index}
              className={classnames(
                'modal-timer-div',
                'bg-ash',
                'text-grey',
                'w-72',
                'md:w-96',
                {
                  'text-white':
                    index === 0 || player.score === winnerScore[0].score,
                  'bg-dark-blue':
                    index === 0 || player.score === winnerScore[0].score,
                }
              )}
              style={{ marginBottom: '10px' }}
            >
              <p className='modal-timer-text'>Player {player.player}</p>
              <p
                className={classnames('modal-timer-text2', {
                  'text-dark-blue': player.score !== winnerScore[0].score,
                  'text-white':
                    index === 0 || player.score === winnerScore[0].score,
                })}
              >
                {player.score}Pairs
              </p>
            </div>
          )
        })}
      </div>
      <div className='md:flex'>
        <div
          className={classnames(
            'w-72 h-12 mb-5 mr-2.5 bg-orange hover:opacity-70 text-white rounded-3xl flex justify-center items-center cursor-pointer',
            {
              'w-48': width > 500,
              'w-72': width < 500,
            }
          )}
          onClick={handleRestart}
        >
          Restart
        </div>
        <div
          className={classnames(
            'w-72 h-12 bg-ash hover:bg-light-blue text-navy-blue hover:text-off-white rounded-3xl flex justify-center items-center cursor-pointer',
            {
              'w-48': width > 500,
              'w-72': width < 500,
            }
          )}
          onClick={setNewGame}
        >
          New Game
        </div>
      </div>
    </>
  )
}

export default MultiPlayerModalContent
