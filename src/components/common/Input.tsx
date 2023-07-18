import { ChangeEvent, FC, ReactElement } from 'react'

interface InputProps {
  value: string | number
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  type?: string
}

export const Input: FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  type = 'text',
}): ReactElement => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className='text-gray-2 h-[4rem] px-4 bg-[#101010af] border-none rounded-2 w-full font-500 text-xl'
      value={value}
      onChange={onChange}
    />
  )
}
