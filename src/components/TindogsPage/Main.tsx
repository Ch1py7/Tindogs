import { FC, ReactElement } from 'react'
import { Header } from './Header'
import { Form } from './Form'

export const Main: FC = (): ReactElement => {
  return (
    <section className='flex flex-col justify-center items-center h-screen'>
      <Header />
      <Form />
    </section>
  )
}
