import { Footer } from 'components/Footer'
import { Gallery } from 'components/Gallery'
import { Main } from 'components/Main'
import { FC, ReactElement } from 'react'

export const App: FC = (): ReactElement => {
  return (
    <div>
      <Main />
      <Gallery />
      <Footer />
    </div>
  )
}
