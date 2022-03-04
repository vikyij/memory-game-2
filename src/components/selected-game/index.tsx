import React, { useState, useEffect, MouseEvent, useCallback } from 'react'
import { ButtonComponent } from '../button'
import Modal from '../modal'
import './selected-game.css'
import classnames from 'classnames'

interface SelectedProps {
  gridSize: number
  numberOfplayers: number
  handleEndGame: () => void
}

type Grid = {
  [key: string]: {
    value: string
    selected: boolean
    disabled: boolean
  }
}

interface PlayerScore {
  player: number
}

interface Winner {
  player: number
  score: number
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array: number[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

const SelectedGame: React.FC<SelectedProps> = ({
  gridSize,
  numberOfplayers,
  handleEndGame,
}) => {
  const [showModal, setShowModal] = useState(false)
  const [grid, setGrid] = useState<Grid>({})
  const [players] = useState(numberOfplayers)
  const [selection, setSelection] = useState<string[]>([])
  const [winnerScore, setWinnerScore] = useState<Winner[]>([])
  const [count, setCount] = useState(0)
  const [timer, setTimer] = useState(0)
  const [singleCompleted, setSingleCompleted] = useState<boolean>()
  const [multiplayerCompletedGame, setMultiplayerCompletedGame] =
    useState<boolean>()
  const [randomArraySize, setRandomArraySize] = useState(0)
  const [currentPlayer, setCurrentPlayer] = useState(1)
  const [playerScore, setPlayerScore] = useState<PlayerScore[]>([])
  const [player1Score, setPlayer1Score] = useState({ player: 1, score: 0 })
  const [player2Score, setPlayer2Score] = useState({ player: 2, score: 0 })
  const [player3Score, setPlayer3Score] = useState({ player: 3, score: 0 })
  const [player4Score, setPlayer4Score] = useState({ player: 4, score: 0 })

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
    setPlayerScore([])
    setSingleCompleted(false)
    setMultiplayerCompletedGame(false)
    setShowModal(false)
    setPlayer1Score({ player: 1, score: 0 })
    setPlayer2Score({ player: 2, score: 0 })
    setPlayer3Score({ player: 3, score: 0 })
    setPlayer4Score({ player: 4, score: 0 })
    setWinnerScore([])
  }

  const setGridValues = useCallback(() => {
    const randomArr: number[] = []
    const numberOfCircles = gridSize === 4 ? 16 : 36
    const grid: Grid = {}

    while (randomArr.length < numberOfCircles) {
      let random = Math.floor(Math.random() * (numberOfCircles - 1 + 1) + 1)
      if (randomArr.indexOf(random) === -1) {
        randomArr.push(...[random, random])
      }
    }
    shuffleArray(randomArr)
    setRandomArraySize(randomArr.length)
    for (let i = 0; i < randomArr.length; i++) {
      grid[`grid-${i}`] = {
        value: randomArr[i].toString(),
        selected: true,
        disabled: false,
      }
    }

    setGrid(grid)
  }, [gridSize])

  const gridTimeout = useCallback(() => {
    for (let i = 0; i < randomArraySize; i++) {
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
  }, [randomArraySize])

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
          if (currentPlayer === numberOfplayers) {
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
          if (currentPlayer === numberOfplayers) {
            setCurrentPlayer(1)
          } else {
            setCurrentPlayer((prev) => prev + 1)
          }

          setPlayerScore((prev) => [...prev, { player: currentPlayer }])
        }
        setSelection([])
      }
    }
  }

  useEffect(() => {
    playerScore.map((player) => {
      if (player.player === 1) {
        setPlayer1Score({ player: 1, score: player1Score.score + 1 })
      } else {
        setPlayer1Score({ player: 1, score: player1Score.score })
      }

      if (player.player === 2) {
        setPlayer2Score({ player: 2, score: player2Score.score + 1 })
      } else {
        setPlayer2Score({ player: 2, score: player2Score.score })
      }

      if (player.player === 3) {
        setPlayer3Score({ player: 3, score: player3Score.score + 1 })
      } else {
        setPlayer3Score({ player: 3, score: player3Score.score })
      }

      if (player.player === 4) {
        setPlayer4Score({ player: 4, score: player4Score.score + 1 })
      } else {
        setPlayer4Score({ player: 4, score: player4Score.score })
      }
    })
    // console.log(player.player === 1)
  }, [playerScore])

  useEffect(() => {
    const finished = Object.entries(grid).every(
      ([id, { value, selected, disabled }]) => disabled === true
    )

    if (numberOfplayers === 1) {
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
  }, [grid, numberOfplayers])

  const showWinner = useCallback(() => {
    let winner: Winner[] = []

    switch (numberOfplayers) {
      case 2:
        winner.push(player1Score, player2Score)
        winner.sort((a, b) => b.score - a.score)
        break
      case 3:
        winner.push(player1Score, player2Score, player3Score)
        winner.sort((a, b) => b.score - a.score)
        break
      case 4:
        winner.push(player1Score, player2Score, player3Score, player4Score)
        winner.sort((a, b) => b.score - a.score)
        break
    }

    setWinnerScore(winner)
  }, [numberOfplayers, player1Score, player2Score, player3Score, player4Score])

  useEffect(() => showWinner(), [showWinner, multiplayerCompletedGame])

  return (
    <>
      <div className='Nav'>
        <h1 className='font-bold text-dark-blue text-2xl mb-10'>memory</h1>
        <ButtonComponent
          width='78px'
          height='40px'
          bgcolor='#FDA214'
          textcolor='#fff'
          handleClick={() => setShowModal(true)}
        >
          Menu
        </ButtonComponent>
      </div>
      <div
        className='flex justify-between flex-wrap w-80 m-auto'
        onClick={handleClick}
      >
        {/* convert an object to array */}
        {Object.entries(grid).map(([id, { value, selected, disabled }]) => {
          return (
            <div
              key={id}
              data-id={id}
              className={classnames('circleStyle', {
                'pointer-events-none': disabled,
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
                className={classnames('circleValue', { hidden: !selected })}
              >
                {value}
              </p>
            </div>
          )
        })}
      </div>

      <div
        className='p-6 flex justify-between absolute bottom-2'
        style={{ left: players === 2 ? '26%' : '0' }}
      >
        {players === 1 ? (
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
          [...Array(players)].map((player, index) => {
            return (
              <div
                className={classnames(
                  'w-16 h-20 rounded-md flex flex-col justify-center mr-3 ',
                  {
                    'bg-ash': currentPlayer !== index + 1,
                    'bg-orange': currentPlayer === index + 1,
                  }
                )}
              >
                <p className='player'>{`P ${index + 1}`}</p>
                <h3 className='score'>
                  {index + 1 === 1
                    ? player1Score.score
                    : index + 1 === 2
                    ? player2Score.score
                    : index + 1 === 3
                    ? player3Score.score
                    : index + 1 === 4 && player4Score.score}
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
          width='327px'
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
          width='327px'
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
                    className={classnames(
                      'modal-timer-div',
                      'bg-ash',
                      'text-grey',
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
    </>
  )
}

export default SelectedGame
