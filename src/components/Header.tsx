import { FC, ReactElement } from 'react'

export const Header: FC = (): ReactElement => {
  return (
    <header className='flex flex-col items-center py-10 gap-4'>
      <h1 className='text-9xl font-black text-transparent cursor-default select-none'>
        <span className='bg-gradient-to-t from-[#ff5f36] to-[#fd267a] bg-clip-text'>TIN</span>
        <span className='bg-gradient-to-t from-coolGray-400 to-gray-900 bg-clip-text'>DOGS</span>
      </h1>
      <p className='text-slate-3 text-3xl text-center'>
        Create your own Dog to be envolved into a relationship with any other dog
      </p>
    </header>
  )
}
