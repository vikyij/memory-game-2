import React from 'react'
import './modal.css'

interface ModalProps {
  children: React.ReactNode
  handleClose: () => void
}

const Modal: React.FC<ModalProps> = ({ handleClose, children }) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }
  return (
    <div className='overlay' onClick={handleClose}>
      <div
        className='w-11/12 h-60 bg-off-white flex flex-col justify-center items-center rounded-md'
        onClick={handleClick}
      >
        {children}
      </div>
    </div>
  )
}

export default Modal
