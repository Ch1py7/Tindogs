import { SupabaseService } from 'api'
import { Button, Input } from 'components/common'
import { Header } from 'components/TindogsPage'
import { FC, FormEvent, ReactElement, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const LoginPage: FC = (): ReactElement => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [logError, setLogError] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { error } = await SupabaseService.signInUser({ email, password })
    if (error?.message === 'Invalid login credentials') {
      setLogError('Invalid login credentials')
    } else if (error?.message === 'Email is not confirmed') {
      setLogError('Email is not confirmed')
    } else {
      setLogError(null)
      await SupabaseService.signInUser({ email, password })

      setEmail('')
      setPassword('')

      location.href = '/'
    }
  }

  useEffect(() => {
    const isLogin = async () => {
      const { session } = await SupabaseService.getSession()
      if (session) {
        location.href = '/'
      }
    }

    isLogin()
  }, [])

  return (
    <div className='LoginBg flex flex-col justify-center items-center h-screen'>
      <Header />
      <form className='flex flex-col w-sm gap-2 items-center' onSubmit={handleSubmit}>
        <Input placeholder='email' value={email || ''} onChange={(e) => setEmail(e.target.value)} />
        <Input
          type='password'
          placeholder='Password'
          value={password || ''}
          onChange={(e) => setPassword(e.target.value)}
        />
        {logError && <p className='text-red-500'>{logError}</p>}
        <Link to='/register' className='text-white decoration-none'>
          You do not have an account?
        </Link>
        <Button colors='from-[#801a1a] via-[#d02626] to-[#801a1a]' placeholder='Login' />
      </form>
    </div>
  )
}
