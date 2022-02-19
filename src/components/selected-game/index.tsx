import { ButtonComponent } from '../button'
import './selected-game.css'

const SelectedGame = () => {
  return (
    <div className='Nav'>
      <h1 className='font-bold text-dark-blue text-2xl mb-10'>memory</h1>
      <ButtonComponent
        width='78px'
        height='40px'
        bgcolor='#FDA214'
        textcolor='#fff'
      >
        Menu
      </ButtonComponent>
    </div>
  )
}

export default SelectedGame
