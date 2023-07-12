import { supabase } from 'api'
import { FC, ReactElement, useEffect, useState } from 'react'
import { Database } from 'types/supabase'
import { DogCard } from './DogCard'

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
        <DogCard key={user.id} user={user} />
      ))}
    </section>
  )
}
