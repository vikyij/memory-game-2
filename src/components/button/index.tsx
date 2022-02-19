interface ButtonProps {
  width: string
  height: string
  bgcolor: string
  textcolor: string
  children: string
  marginRight?: string
}

export const ButtonComponent: React.FC<ButtonProps> = ({
  width,
  height,
  bgcolor,
  textcolor,
  children,
  marginRight,
}) => {
  const btnStyle = {
    width,
    height,
    backgroundColor: bgcolor,
    color: textcolor,
    border: '0',
    borderRadius: '26px',
    marginRight: marginRight || '0px',
  }

  return <button style={btnStyle}>{children}</button>
}
