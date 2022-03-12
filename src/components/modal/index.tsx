import React from 'react'
import './modal.css'

interface ModalProps {
  width?: string
  height?: string
  children: React.ReactNode
  handleClose?: () => void
}

const Modal: React.FC<ModalProps> = ({
  handleClose,
  children,
  width,
  height,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }
  return (
    <div className='overlay' onClick={handleClose}>
      <div
        className='w-11/12 h-60 bg-off-white flex flex-col justify-center items-center rounded-md'
        style={{ width: width && width, height: height && height }}
        onClick={handleClick}
      >
        {children}
      </div>
    </div>
  )
}

export default Modal
