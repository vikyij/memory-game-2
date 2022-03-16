import React, {
  useState,
  useEffect,
  MouseEvent,
  useCallback,
  useReducer,
  ReactElement,
} from 'react'
import Modal from '../modal'
import './selected-game.css'
import classnames from 'classnames'
import { FaVolleyballBall } from 'react-icons/fa'
import { FaBug } from 'react-icons/fa'
import { FaCar } from 'react-icons/fa'
import { FaRegMoon } from 'react-icons/fa'
import { FaSun } from 'react-icons/fa'
import { FaAnchor } from 'react-icons/fa'
import { FaFlask } from 'react-icons/fa'
import { FaLaptopCode } from 'react-icons/fa'
import { FaHandSpock } from 'react-icons/fa'

interface SelectedProps {
  gridSize: number
  numberOfPlayers: number
  theme: string
  handleEndGame: () => void
}

type Grid = {
  [key: string]: {
    value?: string
    icon?: ReactElement
    selected: boolean
    disabled: boolean
  }
}

interface Winner {
  player: number
  score: number
}

//enum for action type
enum PlayerActionKind {
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  RESET = 'RESET',
}

enum PlayerStateTypes {
  count = 'COUNT',
  timer = 'TIMER',
  singleCompleted = 'SINGLECOMPLETED',
  currentPlayer = 'CURRENTPLAYER',
  multiplayerCompleted = 'MULTIPLAYERCOMPLETED',
  showMenuModal = 'SHOWMENUMODAL',
  resetCurrentPlayer = 'RESETCURRENTPLAYER',
  resetGame = 'RESETGAME',
}

// interfaces
interface PlayersScoreAction {
  type: PlayerActionKind
}

interface PlayersActions {
  type: PlayerStateTypes
  singleCompletedPayload?: boolean
  multiCompletedPayload?: boolean
  menuModalPayload?: boolean
}

interface PlayersScoreState {
  player1: number
  player2: number
  player3: number
  player4: number
}

const initialState = {
  player1: 0,
  player2: 0,
  player3: 0,
  player4: 0,
}

const playerScoreReducer = (
  state: PlayersScoreState,
  action: PlayersScoreAction
) => {
  switch (action.type) {
    case 1:
      return { ...state, player1: state.player1 + 1 }

    case 2:
      return { ...state, player2: state.player2 + 1 }

    case 3:
      return { ...state, player3: state.player3 + 1 }

    case 4:
      return { ...state, player4: state.player4 + 1 }

    case 'RESET':
      return { ...initialState }

    default:
      return state
  }
}

interface PlayersState {
  count: number
  timer: number
  currentPlayer: number
  singleCompleted?: boolean
  multiCompleted?: boolean
  showMenuModal?: boolean
}

const initialPlayersState = {
  count: 0,
  timer: 0,
  currentPlayer: 1,
  singleCompleted: false,
  multiCompleted: false,
  showMenuModal: false,
}

const PlayersReducer = (state: PlayersState, action: PlayersActions) => {
  switch (action.type) {
    case 'COUNT':
      return { ...state, count: state.count + 1 }

    case 'TIMER':
      return { ...state, timer: state.timer + 1 }

    case 'CURRENTPLAYER':
      return { ...state, currentPlayer: state.currentPlayer + 1 }

    case 'RESETCURRENTPLAYER':
      return { ...state, currentPlayer: 1 }

    case 'SINGLECOMPLETED':
      return { ...state, singleCompleted: action.singleCompletedPayload }

    case 'MULTIPLAYERCOMPLETED':
      return { ...state, multiCompleted: action.multiCompletedPayload }

    case 'SHOWMENUMODAL':
      return { ...state, showMenuModal: action.menuModalPayload }

    case 'RESETGAME':
      return { ...initialPlayersState }

    default:
      return state
  }
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(
  array: { icon: JSX.Element; value: string }[] | number[]
) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}
const icons = [
  { icon: <FaVolleyballBall />, value: 'volleyBall' },
  { icon: <FaBug />, value: 'bug' },
  { icon: <FaCar />, value: 'car' },
  { icon: <FaRegMoon />, value: 'moon' },
  { icon: <FaSun />, value: 'sun' },
  { icon: <FaAnchor />, value: 'anchor' },
  { icon: <FaFlask />, value: 'flask' },
  { icon: <FaLaptopCode />, value: 'laptopCode' },
  { icon: <FaHandSpock />, value: 'laptopCode' },
]

const SelectedGame: React.FC<SelectedProps> = ({
  gridSize,
  numberOfPlayers,
  theme,
  handleEndGame,
}) => {
  const [grid, setGrid] = useState<Grid>({})
  const [selection, setSelection] = useState<string[]>([])
  const [winnerScore, setWinnerScore] = useState<Winner[]>([])
  const [randomArraySize, setRandomArraySize] = useState(0)
  const [iconsArrSize, setIconsArrSize] = useState(0)

  const [width] = useState(window.innerWidth)
  const [state, dispatch] = useReducer(playerScoreReducer, initialState)
  const [playersUpdatedState, playersDispatch] = useReducer(
    PlayersReducer,
    initialPlayersState
  )

  const setNewGame = () => {
    handleRestart()
    handleEndGame()
  }

  const handleRestart = () => {
    setGridValues()
    gridTimeout()
    setWinnerScore([])
    dispatch({ type: PlayerActionKind.RESET })
    playersDispatch({ type: PlayerStateTypes.resetGame })
  }

  const setGridValues = useCallback(() => {
    const randomArr: number[] = []
    const numberOfCircles = gridSize === 4 ? 16 : 36
    const grid: Grid = {}
    const iconsArr = []

    if (theme === 'icon' && gridSize === 4) {
      for (let i = 0; i < 8; i++) {
        iconsArr.push(
          ...[
            { icon: icons[i].icon, value: icons[i].value },
            { icon: icons[i].icon, value: icons[i].value },
          ]
        )
      }
    }

    if (theme === 'icon' && gridSize === 6) {
      for (let i = 0; i < 9; i++) {
        iconsArr.push(
          ...[
            { icon: icons[i].icon, value: icons[i].value },
            { icon: icons[i].icon, value: icons[i].value },
            { icon: icons[i].icon, value: icons[i].value },
            { icon: icons[i].icon, value: icons[i].value },
          ]
        )
      }
    }

    shuffleArray(iconsArr)

    setIconsArrSize(iconsArr.length)

    if (theme === 'number') {
      while (randomArr.length < numberOfCircles) {
        let random = Math.floor(Math.random() * numberOfCircles + 1)
        if (randomArr.indexOf(random) === -1) {
          randomArr.push(...[random, random])
        }
      }
    }

    shuffleArray(randomArr)

    setRandomArraySize(randomArr.length)

    if (theme === 'number') {
      for (let i = 0; i < randomArr.length; i++) {
        grid[`grid-${i}`] = {
          value: randomArr[i].toString(),
          selected: true,
          disabled: false,
        }
      }
    }

    if (theme === 'icon') {
      for (let i = 0; i < iconsArr.length; i++) {
        grid[`grid-${i}`] = {
          value: iconsArr[i].value,
          icon: iconsArr[i].icon,
          selected: true,
          disabled: false,
        }
      }
    }

    setGrid(grid)
  }, [gridSize, theme])

const gridTimeout = useCallback(() => {
  let initialTimeout: ReturnType<typeof setTimeout>
  for (
    let i = 0;
    i < (theme === 'icon' ? iconsArrSize : randomArraySize);
    i++
  ) {
    initialTimeout = setTimeout(
      () =>
        setGrid((grid) => {
          return {
            ...grid,
            [`grid-${i}`]: { ...grid[`grid-${i}`], selected: false },
          }
        }),
      2000
    )
  }

  return () => clearTimeout(initialTimeout)
}, [randomArraySize, iconsArrSize, theme])

useEffect(() => {
  setGridValues()
}, [setGridValues])

useEffect(() => {
  gridTimeout()
}, [gridTimeout])

const updateTimer = () => {
  const getSeconds = `0${playersUpdatedState.timer % 60}`.slice(-2)
  const minutes = `${Math.floor(playersUpdatedState.timer / 60)}`
  // added + because of a typescript error 'The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type'
  const getMinutes = `0${+minutes % 60}`.slice(-2)
  const getHours = `0${Math.floor(playersUpdatedState.timer / 3600)}`.slice(-2)
  return `${getHours} : ${getMinutes} : ${getSeconds}`
}

const handleClick = (ev: MouseEvent<HTMLDivElement>) => {
  ev.stopPropagation()
  let id = (ev.target as HTMLDivElement).getAttribute('data-id')

  playersDispatch({ type: PlayerStateTypes.count })

  if (id) {
    if (selection.length === 0) {
      setGrid((grid) => {
        const target = grid[id as string]
        return {
          ...grid,
          [id as string]: { ...target, selected: !target.selected },
        }
      })
      setSelection([id])
    } else {
      const target_1 = grid[selection[0]]
      const target_2 = grid[id]

      if (target_1.value !== target_2.value) {
        // Set timeout and hide boxes
        setGrid((grid) => {
          return {
            ...grid,
            [id as string]: { ...target_2, selected: true },
          }
        })

        setTimeout(
          () =>
            setGrid((grid) => {
              return {
                ...grid,
                [selection[0]]: { ...target_1, selected: false },
                [id as string]: { ...target_2, selected: false },
              }
            }),
          500
        )
        if (playersUpdatedState.currentPlayer === numberOfPlayers) {
          playersDispatch({ type: PlayerStateTypes.resetCurrentPlayer })
        } else {
          playersDispatch({ type: PlayerStateTypes.currentPlayer })
        }
      } else {
        setGrid((grid) => {
          return {
            ...grid,
            [selection[0]]: { ...target_1, disabled: true, selected: true },
            [id as string]: { ...target_2, disabled: true, selected: true },
          }
        })

        if (playersUpdatedState.currentPlayer === numberOfPlayers) {
          playersDispatch({ type: PlayerStateTypes.resetCurrentPlayer })
        } else {
          playersDispatch({ type: PlayerStateTypes.currentPlayer })
        }

        dispatch({ type: playersUpdatedState.currentPlayer })
      }
      setSelection([])
    }
  }
}

useEffect(() => {
  const finished = Object.entries(grid).every(
    ([id, { value, selected, disabled }]) => disabled === true
  )

  if (numberOfPlayers === 1) {
    playersDispatch({
      type: PlayerStateTypes.singleCompleted,
      singleCompletedPayload: finished,
    })
    const timeInterval = setInterval(() => {
      if (!finished) {
        playersDispatch({ type: PlayerStateTypes.timer })
      }
    }, 1000)
    return () => {
      clearInterval(timeInterval)
    }
  } else {
    playersDispatch({
      type: PlayerStateTypes.multiplayerCompleted,
      multiCompletedPayload: finished,
    })
  }
}, [grid, numberOfPlayers])

const showWinner = useCallback(() => {
  let winner: Winner[] = []
  let playerOne = { player: 1, score: state.player1 }
  let playerTwo = { player: 2, score: state.player2 }
  let playerThree = { player: 3, score: state.player3 }
  let playerFour = { player: 4, score: state.player4 }

  switch (numberOfPlayers) {
    case 2:
      winner.push(playerOne, playerTwo)
      break
    case 3:
      winner.push(playerOne, playerTwo, playerThree)
      break
    case 4:
      winner.push(playerOne, playerTwo, playerThree, playerFour)
      break
  }
  winner.sort((a, b) => b.score - a.score)
  setWinnerScore(winner)
}, [numberOfPlayers, state])

useEffect(() => showWinner(), [showWinner, playersUpdatedState.multiCompleted])

return (
  <>
    <div className='Nav'>
      <h1 className='font-bold text-dark-blue text-2xl mb-10'>memory</h1>
      {width > 500 ? (
        <div className='flex justify-center items-center'>
          <div
            className='w-32 h-12 bg-orange hover:opacity-70 text-white mr-3.5 rounded-3xl flex justify-center items-center cursor-pointer'
            onClick={handleRestart}
          >
            Restart
          </div>
          <div
            className='w-40 h-12 bg-ash hover:bg-light-blue text-navy-blue hover:text-off-white mr-3.5 rounded-3xl flex justify-center items-center cursor-pointer'
            onClick={setNewGame}
          >
            New Game
          </div>
        </div>
      ) : (
        <div
          className='w-20 h-10 bg-orange hover:opacity-70 text-white rounded-3xl flex justify-center items-center cursor-pointer'
          onClick={() =>
            playersDispatch({
              type: PlayerStateTypes.showMenuModal,
              menuModalPayload: true,
            })
          }
        >
          Menu
        </div>
      )}
    </div>

    <div
      className='flex justify-between flex-wrap w-80 m-auto mt-5'
      onClick={handleClick}
    >
      {/* convert an object to array */}
      {Object.entries(grid).map(
        ([id, { value, icon, selected, disabled }], index) => {
          return (
            <div
              key={id}
              data-id={id}
              data-testid={index + 1}
              className={classnames('circleStyle', {
                'pointer-events-none': selected,
                'bg-navy-blue': !selected,
                'bg-light-grey': selected && disabled,
                'bg-orange': selected && !disabled,
              })}
              style={{
                width: gridSize === 6 ? '46px' : '65px',
                height: gridSize === 6 ? '46px' : '65px',
                fontSize: gridSize === 6 ? '24px' : '40px',
              }}
            >
              <p
                data-id={id}
                data-testid={`grid-value${index + 1}`}
                className={classnames('circleValue', {
                  hidden: !selected,
                  'p-2': theme === 'icon' && gridSize === 6,
                  'p-4': theme === 'icon' && gridSize === 4,
                  'text-2xl': theme === 'icon' && gridSize === 4,
                })}
              >
                {theme === 'icon' ? icon : value}
              </p>
            </div>
          )
        }
      )}
    </div>

    <div
      className='p-6 flex justify-center mt-32'
      style={{ left: numberOfPlayers === 2 ? '26%' : '0' }}
    >
      {numberOfPlayers === 1 ? (
        <>
          <div className='updates mr-3'>
            <p className='text-grey font-semibold' data-testid='time'>
              Time
            </p>
            <p>{updateTimer()}</p>
          </div>
          <div className='updates'>
            <p className='text-grey font-semibold' data-testid='moves'>
              Moves
            </p>
            <p>{playersUpdatedState.count}</p>
          </div>
        </>
      ) : (
        [...Array(numberOfPlayers)].map((player, index) => {
          return (
            <div
              key={index}
              className={classnames(
                'w-16 md:w-64 h-20 rounded-md flex flex-col md:flex-row justify-center md:justify-around mr-3 items-center',
                {
                  'bg-ash': playersUpdatedState.currentPlayer !== index + 1,
                  'bg-orange': playersUpdatedState.currentPlayer === index + 1,
                }
              )}
              data-testid={`player ${index + 1}`}
            >
              <p className='player'>{`P ${index + 1}`}</p>
              <h3 className='score'>
                {index + 1 === 1
                  ? state.player1
                  : index + 1 === 2
                  ? state.player2
                  : index + 1 === 3
                  ? state.player3
                  : index + 1 === 4 && state.player4}
              </h3>
            </div>
          )
        })
      )}
    </div>

    {/* show modal on click of menu button */}
    {playersUpdatedState.showMenuModal && (
      <Modal
        handleClose={() =>
          playersDispatch({
            type: PlayerStateTypes.showMenuModal,
            menuModalPayload: false,
          })
        }
      >
        <>
          <div
            className='w-72 h-12 mb-5 bg-orange hover:opacity-70 text-white rounded-3xl flex justify-center items-center cursor-pointer'
            onClick={handleRestart}
          >
            Restart
          </div>
          <div
            className='w-72 h-12 bg-ash hover:bg-light-blue text-navy-blue hover:text-off-white rounded-3xl flex justify-center items-center cursor-pointer'
            onClick={setNewGame}
          >
            New Game
          </div>
        </>
      </Modal>
    )}

    {/* show modal when game is completed for a single player */}
    {playersUpdatedState.singleCompleted && (
      <Modal width={width > 500 ? '654px' : '327px'} height='376px'>
        <>
          <h1 className='modal2-heading'>You did it!</h1>
          <p className='modal2-subheading'>Game over! Here’s how you got on…</p>
          <div style={{ margin: '25px auto' }}>
            <div
              className='modal-timer-div w-64 md:w-96 h-12 bg-ash'
              style={{ marginBottom: '10px' }}
            >
              <p className='modal-timer-text text-grey'>Time Elapsed</p>
              <p className='modal-timer-text2 text-navy-blue'>
                {updateTimer()}
              </p>
            </div>
            <div className='modal-timer-div w-64 md:w-96 h-12 bg-ash'>
              <p className='modal-timer-text text-grey'>Moves Taken</p>
              <p className='modal-timer-text2 text-navy-blue'>{`${playersUpdatedState.count} Moves`}</p>
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
      </Modal>
    )}

    {/* show modal when game is completed for multiplayer */}
    {playersUpdatedState.multiCompleted && (
      <Modal width={width > 500 ? '654px' : '327px'} height='488px'>
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
                    className={classnames(
                      'modal-timer-text2',
                      'text-dark-blue',
                      {
                        'text-white':
                          index === 0 || player.score === winnerScore[0].score,
                      }
                    )}
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
      </Modal>
    )}
  </>
)
}

export default SelectedGame
