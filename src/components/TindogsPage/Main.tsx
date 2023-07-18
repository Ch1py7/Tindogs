import { Session } from '@supabase/supabase-js'
import { SupabaseService } from 'api'
import { LogIn, LogOut } from 'lucide-react'
import { FC, ReactElement, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form } from './Form'
import { Header } from './Header'

export const Main: FC = (): ReactElement => {
  const [session, setSession] = useState<Session | null>({} as Session)

  const isLogin = async () => {
    const { session } = await SupabaseService.getSession()
    setSession(session!)
  }

  useEffect(() => {
    isLogin()
  }, [])

  return (
    <section className='flex flex-col justify-center items-center h-screen'>
      {session ? (
        <button
          className='absolute top-6 right-6 bg-transparent border-none'
          onClick={() => {
            SupabaseService.logOut(), setSession(null)
          }}
          title='logout'
        >
          <LogOut
            size={32}
            color='#f0f0f0'
            className='duration-300 hover:[filter:_drop-shadow(0_1px_2px_white)]'
          />
        </button>
      ) : (
        <Link to='/login' className='absolute top-6 right-6' title='login'>
          <LogIn size={32} color='#f0f0f0' />
        </Link>
      )}
      <Header />
      <Form />
    </section>
  )
}
