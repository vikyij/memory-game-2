import classnames from 'classnames'
import CtaButtons from '../CTAButtons'

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
      <CtaButtons handleRestart={handleRestart} setNewGame={setNewGame} />
    </>
  )
}

export default MultiPlayerModalContent
