import { useState } from 'react'
import classnames from 'classnames'
import { updateTimer } from '../utils'

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
  const [width] = useState(window.innerWidth)

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

export default SinglePlayerModalContent
