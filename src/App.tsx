import { LoginPage, RegisterPage, TindogsPage } from 'pages'
import { FC, ReactElement } from 'react'
import { Route, Routes } from 'react-router-dom'

export const App: FC = (): ReactElement => {
  return (
    <Routes>
      <Route path='/' element={<TindogsPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
    </Routes>
  )
}
