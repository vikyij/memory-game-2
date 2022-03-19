import { updateTimer } from '../utils'

interface SinglePlayerProps {
  time: number
  count: number
}

const SinglePlayer: React.FC<SinglePlayerProps> = ({ time, count }) => {
  return (
    <>
      <div className='updates mr-3'>
        <p className='text-grey font-semibold' data-testid='time'>
          Time
        </p>
        <p>{updateTimer(time)}</p>
      </div>
      <div className='updates'>
        <p className='text-grey font-semibold' data-testid='moves'>
          Moves
        </p>
        <p>{count}</p>
      </div>
    </>
  )
}

export default SinglePlayer
