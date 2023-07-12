import { supabase } from 'api'
import { Heart } from 'lucide-react'
import { FC, ReactElement, useEffect, useState } from 'react'
import { Database } from 'types/supabase'

export const Gallery: FC = (): ReactElement => {
  const [users, setUsers] = useState<Database['public']['Tables']['DogsInfo']['Row'][] | null>(null)

  const getData = async () => {
    const { data } = await supabase.getDogs()
    setUsers(data)
  }

  useEffect(() => {
    getData()
  }, [])

  if (!users) {
    return <div>loading...</div>
  }
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 place-items-center gap-10 px-10 lg:px-48'>
      {users.map((user) => (
        <article
          key={user.id}
          className='flex flex-col justify-start h-f items-center text-2xl gap-y-2 text-slate-3 relative'
        >
          <div className='absolute flex flex-col items-end justify-end p-4 w-full h-full opacity-0 duration-300 bg-gradient-to-t from-[#080808] to-[#ffffff00] hover:opacity-100'>
            <h3>{user.name}</h3>
            <p>{user.description}</p>
            <Heart color='#c50606' size={30} className='fill-transparent transition-300 hover:fill-[#c50606]' />
          </div>
          <img
            src={user.image!}
            alt={user.name!}
            className='w-[280px] h-[500px] object-cover rounded-xl'
          />
        </article>
      ))}
    </section>
  )
}
