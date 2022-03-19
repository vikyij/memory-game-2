import { updateTimer } from '../utils'
import CtaButtons from '../CTAButtons'

interface SinglePlayerModalContentProps {
  time: number
  count: number
  handleRestart: () => void
  setNewGame: () => void
}

const SinglePlayerModalContent: React.FC<SinglePlayerModalContentProps> = ({
  time,
  count,
  handleRestart,
  setNewGame,
}) => {
  return (
    <>
      <h1 className='modal2-heading'>You did it!</h1>
      <p className='modal2-subheading'>Game over! Here's how you got on…</p>
      <div style={{ margin: '25px auto' }}>
        <div
          className='modal-timer-div w-64 md:w-96 h-12 bg-ash'
          style={{ marginBottom: '10px' }}
        >
          <p className='modal-timer-text text-grey'>Time Elapsed</p>
          <p className='modal-timer-text2 text-navy-blue'>
            {updateTimer(time)}
          </p>
        </div>
        <div className='modal-timer-div w-64 md:w-96 h-12 bg-ash'>
          <p className='modal-timer-text text-grey'>Moves Taken</p>
          <p className='modal-timer-text2 text-navy-blue'>{`${count} Moves`}</p>
        </div>
      </div>
      <CtaButtons handleRestart={handleRestart} setNewGame={setNewGame} />
    </>
  )
}

export default SinglePlayerModalContent
