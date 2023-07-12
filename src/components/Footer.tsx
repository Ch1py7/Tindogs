import { Heart } from 'lucide-react'
import { FC, ReactElement } from 'react'

export const Footer: FC = (): ReactElement => {
  return (
    <footer className='w-full text-center h-[4rem] flex justify-center items-center mt-10 border-t-cyan border-1 border-solid'>
      <small className='text-slate-3 text-lg'>
        Made with{' '}
        <Heart
          color='red'
          size={18}
          className='duration-300 hover:[filter:_drop-shadow(0_1px_2px_red)]'
        />{' '}
        by Gerardo Garcia
      </small>
    </footer>
  )
}
