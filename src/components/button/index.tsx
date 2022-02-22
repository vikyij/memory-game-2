interface ButtonProps {
  width: string
  height: string
  bgcolor: string
  textcolor: string
  children: string | number
  marginRight?: string
  marginBottom?: string
  borderRadius?: string
  fontSize?: string
  disabled?: boolean
  handleClick?: () => void
}

export const ButtonComponent: React.FC<ButtonProps> = ({
  width,
  height,
  bgcolor,
  textcolor,
  children,
  marginRight,
  marginBottom,
  borderRadius,
  fontSize,
  disabled,
  handleClick,
}) => {
  const btnStyle = {
    width,
    height,
    backgroundColor: bgcolor,
    color: textcolor,
    border: '0',
    borderRadius: borderRadius || '26px',
    marginRight: marginRight || '0px',
    marginBottom: marginBottom || '0px',
    fontSize: fontSize || '16px',
  }

  return (
    <button style={btnStyle} onClick={handleClick} disabled={disabled}>
      {children}
    </button>
  )
}
