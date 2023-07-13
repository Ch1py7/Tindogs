import { Footer, Gallery, Main } from 'components/TindogsPage'
import { FC, ReactElement } from 'react'

export const TindogsPage: FC = (): ReactElement => {
  return (
    <div className='TindogsBg'>
      <Main />
      <Gallery />
      <Footer />
    </div>
  )
}
