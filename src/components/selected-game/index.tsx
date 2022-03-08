import React, {
  useState,
  useEffect,
  MouseEvent,
  useCallback,
  useReducer,
  ReactElement,
} from 'react'
import { ButtonComponent } from '../button'
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

//useReducer to update multiple states
enum PlayerActionKind {
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  RESET = 'RESET',
}

interface PlayerAction {
  type: PlayerActionKind
}

interface PlayerState {
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

const playerReducer = (state: PlayerState, action: PlayerAction) => {
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
  const [showModal, setShowModal] = useState(false)
  const [grid, setGrid] = useState<Grid>({})
  const [selection, setSelection] = useState<string[]>([])
  const [winnerScore, setWinnerScore] = useState<Winner[]>([])
  const [count, setCount] = useState(0)
  const [timer, setTimer] = useState(0)
  const [singleCompleted, setSingleCompleted] = useState<boolean>()
  const [multiplayerCompletedGame, setMultiplayerCompletedGame] =
    useState<boolean>()
  const [randomArraySize, setRandomArraySize] = useState(0)
  const [iconsArrSize, setIconsArrSize] = useState(0)
  const [currentPlayer, setCurrentPlayer] = useState(1)
  const [width] = useState(window.innerWidth)
  const [state, dispatch] = useReducer(playerReducer, initialState)

  const setNewGame = () => {
    handleRestart()
    handleEndGame()
  }

  const handleRestart = () => {
    setGridValues()
    gridTimeout()
    setCount(0)
    setTimer(0)
    setCurrentPlayer(1)
    setSingleCompleted(false)
    setMultiplayerCompletedGame(false)
    setShowModal(false)
    setWinnerScore([])
    dispatch({ type: PlayerActionKind.RESET })
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
        let random = Math.floor(Math.random() * (numberOfCircles - 1 + 1) + 1)
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
    for (
      let i = 0;
      i < (theme === 'icon' ? iconsArrSize : randomArraySize);
      i++
    ) {
      setTimeout(
        () =>
          setGrid((grid) => {
            return {
              ...grid,
              [`grid-${i}`]: { ...grid[`grid-${i}`], selected: false },
            }
          }),
        1000
      )
    }
  }, [randomArraySize, iconsArrSize, theme])

  useEffect(() => {
    setGridValues()
  }, [setGridValues])

  useEffect(() => {
    gridTimeout()
  }, [gridTimeout])

  const updateTimer = () => {
    const getSeconds = `0${timer % 60}`.slice(-2)
    const minutes = `${Math.floor(timer / 60)}`
    // added + because of a typescript error 'The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type'
    const getMinutes = `0${+minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)
    return `${getHours} : ${getMinutes} : ${getSeconds}`
  }

  const handleClick = (ev: MouseEvent<HTMLDivElement>) => {
    ev.stopPropagation()
    let id = (ev.target as HTMLDivElement).getAttribute('data-id')

    setCount((count) => count + 1)
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
          if (currentPlayer === numberOfPlayers) {
            setCurrentPlayer(1)
          } else {
            setCurrentPlayer((prev) => prev + 1)
          }

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
        } else {
          setGrid((grid) => {
            return {
              ...grid,
              [selection[0]]: { ...target_1, disabled: true, selected: true },
              [id as string]: { ...target_2, disabled: true, selected: true },
            }
          })
          if (currentPlayer === numberOfPlayers) {
            setCurrentPlayer(1)
          } else {
            setCurrentPlayer((prev) => prev + 1)
          }

          dispatch({ type: currentPlayer })
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
      setSingleCompleted(finished)
      const timeInterval = setInterval(() => {
        if (!finished) {
          setTimer((timer) => timer + 1)
        }
      }, 1000)
      return () => {
        clearInterval(timeInterval)
      }
    } else {
      setMultiplayerCompletedGame(finished)
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
        winner.sort((a, b) => b.score - a.score)
        break
      case 3:
        winner.push(playerOne, playerTwo, playerThree)
        winner.sort((a, b) => b.score - a.score)
        break
      case 4:
        winner.push(playerOne, playerTwo, playerThree, playerFour)
        winner.sort((a, b) => b.score - a.score)
        break
    }

    setWinnerScore(winner)
  }, [numberOfPlayers, state])

  useEffect(() => showWinner(), [showWinner, multiplayerCompletedGame])

  return (
    <>
      <div className='Nav'>
        <h1 className='font-bold text-dark-blue text-2xl mb-10'>memory</h1>
        {width > 500 ? (
          <div>
            <ButtonComponent
              width='127px'
              height='52px'
              bgcolor='#FDA214'
              textcolor='#fff'
              handleClick={handleRestart}
              marginRight='15px'
            >
              Restart
            </ButtonComponent>
            <ButtonComponent
              width='149px'
              height='52px'
              bgcolor='#DFE7EC'
              textcolor='#304859'
              handleClick={setNewGame}
            >
              New Game
            </ButtonComponent>
          </div>
        ) : (
          <ButtonComponent
            width='78px'
            height='40px'
            bgcolor='#FDA214'
            textcolor='#fff'
            handleClick={() => setShowModal(true)}
          >
            Menu
          </ButtonComponent>
        )}
      </div>

      <div
        className='flex justify-between flex-wrap w-80 m-auto mt-5'
        onClick={handleClick}
      >
        {/* convert an object to array */}
        {Object.entries(grid).map(
          ([id, { value, icon, selected, disabled }]) => {
            return (
              <div
                key={id}
                data-id={id}
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
              <p className='text-grey font-semibold'>Time</p>
              <p>{updateTimer()}</p>
            </div>
            <div className='updates'>
              <p className='text-grey font-semibold'>Moves</p>
              <p>{count}</p>
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
                    'bg-ash': currentPlayer !== index + 1,
                    'bg-orange': currentPlayer === index + 1,
                  }
                )}
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
      {showModal && (
        <Modal handleClose={() => setShowModal(false)}>
          <>
            <ButtonComponent
              width='279px'
              height='48px'
              bgcolor='#FDA214'
              textcolor='#fff'
              marginBottom='20px'
              handleClick={handleRestart}
            >
              Restart
            </ButtonComponent>
            <ButtonComponent
              width='279px'
              height='48px'
              bgcolor='#DFE7EC'
              textcolor='#fff'
              handleClick={setNewGame}
            >
              New Game
            </ButtonComponent>
          </>
        </Modal>
      )}

      {/* show modal when game is completed for a single player */}
      {singleCompleted && (
        <Modal
          handleClose={() => setShowModal(false)}
          width={width > 500 ? '654px' : '327px'}
          height='376px'
        >
          <>
            <h1 className='modal2-heading'>You did it!</h1>
            <p className='modal2-subheading'>
              Game over! Here’s how you got on…
            </p>
            <div style={{ margin: '25px auto' }}>
              <div className='modal-timer-div' style={{ marginBottom: '10px' }}>
                <p className='modal-timer-text'>Time Elapsed</p>
                <p className='modal-timer-text2'>{updateTimer()}</p>
              </div>
              <div className='modal-timer-div'>
                <p className='modal-timer-text'>Moves Taken</p>
                <p className='modal-timer-text2'>{`${count} Moves`}</p>
              </div>
            </div>
            <ButtonComponent
              width='279px'
              height='48px'
              bgcolor='#FDA214'
              textcolor='#fff'
              marginBottom='15px'
              handleClick={handleRestart}
            >
              Restart
            </ButtonComponent>
            <ButtonComponent
              width='279px'
              height='48px'
              bgcolor='#DFE7EC'
              textcolor='#304859'
              handleClick={setNewGame}
            >
              Setup New Game
            </ButtonComponent>
          </>
        </Modal>
      )}

      {/* show modal when game is completed for multiplayer */}
      {multiplayerCompletedGame && (
        <Modal
          handleClose={() => setShowModal(false)}
          width={width > 500 ? '654px' : '327px'}
          height='488px'
        >
          <>
            <h1 className='modal2-heading'>
              {winnerScore[0].score === winnerScore[1].score
                ? 'It’s a tie!'
                : `Player ${winnerScore[0].player} Wins!`}
            </h1>
            <p className='modal2-subheading'>
              Game over! Here are the results…
            </p>
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
                            index === 0 ||
                            player.score === winnerScore[0].score,
                        }
                      )}
                    >
                      {player.score}Pairs
                    </p>
                  </div>
                )
              })}
            </div>
            <div className='lg:flex'>
              <ButtonComponent
                width={width > 500 ? '190px' : '279px'}
                height='48px'
                bgcolor='#FDA214'
                textcolor='#fff'
                marginBottom='15px'
                handleClick={handleRestart}
                marginRight='10px'
              >
                Restart
              </ButtonComponent>
              <ButtonComponent
                width={width > 500 ? '190px' : '279px'}
                height='48px'
                bgcolor='#DFE7EC'
                textcolor='#304859'
                handleClick={setNewGame}
              >
                Setup New Game
              </ButtonComponent>
            </div>
          </>
        </Modal>
      )}
    </>
  )
}

export default SelectedGame
