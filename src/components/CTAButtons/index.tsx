import classnames from 'classnames'
import { useState } from 'react'

interface CtaButtonsProps {
  handleRestart: () => void
  setNewGame: () => void
}

const CtaButtons: React.FC<CtaButtonsProps> = ({
  handleRestart,
  setNewGame,
}) => {
  const [width] = useState(window.innerWidth)

  return (
    <div className='md:flex'>
      <button
        className={classnames(
          'w-72 h-12 mb-5 md:mr-2.5 bg-orange hover:opacity-70 text-white rounded-3xl flex justify-center items-center cursor-pointer',
          {
            'w-48': width > 500,
            'w-72': width < 500,
          }
        )}
        onClick={handleRestart}
      >
        Restart
      </button>
      <button
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
      </button>
    </div>
  )
}

export default CtaButtons
