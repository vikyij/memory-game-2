import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import StartCard from './index'

describe('test start game', () => {
  test('when a numbers theme, a single player and 4x4 grid is selected', async () => {
    render(<StartCard />)

    const numbers = screen.getByTestId('numbers')
    const singlePlayer = screen.getByTestId('player number 1')
    const grid = screen.getByTestId('4x4')
    const startGame = screen.getByTestId('start-game')

    userEvent.click(numbers)
    userEvent.click(singlePlayer)
    userEvent.click(grid)
    userEvent.click(startGame)

    // number of grids for a 4x4 game
    const numberOfGrid = await screen.findByTestId(16)

    const timer = await screen.findByTestId('time')
    const moves = await screen.findByTestId('moves')

    expect(numberOfGrid).toBeInTheDocument()

    //timer and moves should be visible in a single player gamer
    expect(timer).toBeInTheDocument()
    expect(moves).toBeInTheDocument()
  })

  test('when an icon, a single player and 4x4 grid is selected', async () => {
    render(<StartCard />)

    const icons = screen.getByTestId('icons')
    const singlePlayer = screen.getByTestId('player number 1')
    const grid = screen.getByTestId('4x4')
    const startGame = screen.getByTestId('start-game')

    userEvent.click(icons)
    userEvent.click(singlePlayer)
    userEvent.click(grid)
    userEvent.click(startGame)

    const timer = await screen.findByTestId('time')
    const moves = await screen.findByTestId('moves')
    const numberOfGrid = await screen.findByTestId(16)

    expect(numberOfGrid).toBeInTheDocument()
    expect(timer).toBeInTheDocument()
    expect(moves).toBeInTheDocument()
  })

  test('when a numbers theme, multiplayer and 4x4 grid is selected', async () => {
    render(<StartCard />)

    const numbers = screen.getByTestId('numbers')
    const multiPlayer = screen.getByTestId('player number 2')
    const grid = screen.getByTestId('4x4')
    const startGame = screen.getByTestId('start-game')

    userEvent.click(numbers)
    userEvent.click(multiPlayer)
    userEvent.click(grid)
    userEvent.click(startGame)

    const numberOfGrid = await screen.findByTestId(16)
    const multiPlayerValue = await screen.findByTestId('player 2')

    expect(numberOfGrid).toBeInTheDocument()
    expect(multiPlayerValue).toBeInTheDocument()
  })

  test('when an icon theme, multiplayer and 4x4 grid is selected', async () => {
    render(<StartCard />)

    const icons = screen.getByTestId('icons')
    const multiPlayer = screen.getByTestId('player number 2')
    const grid = screen.getByTestId('4x4')
    const startGame = screen.getByTestId('start-game')

    userEvent.click(icons)
    userEvent.click(multiPlayer)
    userEvent.click(grid)
    userEvent.click(startGame)

    const numberOfGrid = await screen.findByTestId(16)
    const multiPlayerValuue = await screen.findByTestId('player 2')

    expect(numberOfGrid).toBeInTheDocument()
    expect(multiPlayerValuue).toBeInTheDocument()
  })

  test('when a numbers theme, multiplayer and 6x6 grid is selected', async () => {
    render(<StartCard />)

    const numbers = screen.getByTestId('numbers')
    const multiPlayer = screen.getByTestId('player number 2')
    const grid = screen.getByTestId('6x6')
    const startGame = screen.getByTestId('start-game')

    userEvent.click(numbers)
    userEvent.click(multiPlayer)
    userEvent.click(grid)
    userEvent.click(startGame)

    const numberOfGrid = await screen.findByTestId(36)
    const multiPlayerValuue = await screen.findByTestId('player 2')

    expect(numberOfGrid).toBeInTheDocument()
    expect(multiPlayerValuue).toBeInTheDocument()
  })
})
