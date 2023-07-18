import { FC, ReactElement } from 'react'

interface ButtonProps {
  placeholder: string
  colors: string
}

export const Button: FC<ButtonProps> = ({ placeholder, colors }): ReactElement => {
  return (
    <button
      type='submit'
      className={`mt-4 w-[10rem] text-xl font-500 text-slate-3 h-[4rem] bg-gradient-to-r ${colors} border-none h-[2rem] rounded-2 [background-size:200%_auto] duration-500 hover:bg-right hover:scale-105`}
    >
      {placeholder}
    </button>
  )
}
