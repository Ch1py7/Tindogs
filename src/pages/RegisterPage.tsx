import { SupabaseService } from 'api'
import { Button, Input } from 'components/common'
import { Header } from 'components/TindogsPage'
import { FC, FormEvent, ReactElement, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const RegisterPage: FC = (): ReactElement => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [regError, setRegError] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { data, error } = await SupabaseService.signUpUser({ email, password })
    
    if (error?.message === 'Password should be at least 6 characters') {
      setRegError('Password should be at least 6 characters')
    } else if (error?.message === 'User with this email address already exists') {
      setRegError('User with this email address already exists')
    } else {
      setRegError(null)
      await SupabaseService.createUser({ name, id: data.user!.id })
      setName('')
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
    <div className='RegisterBg flex flex-col justify-center items-center h-screen'>
      <Header />
      <form className='flex flex-col w-sm gap-2 items-center' onSubmit={handleSubmit}>
        <Input placeholder='Name' value={name || ''} onChange={(e) => setName(e.target.value)} />
        <Input placeholder='Email' value={email || ''} onChange={(e) => setEmail(e.target.value)} />
        <Input
          type='password'
          placeholder='Password'
          value={password || ''}
          onChange={(e) => setPassword(e.target.value)}
        />
        {regError && <p className='text-red-500'>{regError}</p>}
        <Link to='/login' className='text-white decoration-none'>
          Do you already have an account?
        </Link>
        { }
        <Button colors='from-[#331a80] via-[#5f26d0] to-[#321a80]' placeholder='Register' />
      </form>
    </div>
  )
}
