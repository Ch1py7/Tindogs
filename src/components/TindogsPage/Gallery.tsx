import { SupabaseService } from 'api'
import { FC, ReactElement, useEffect, useState } from 'react'
import { Supabase } from 'types/supabase'
import { DogCard } from './DogCard'

export const Gallery: FC = (): ReactElement => {
  const [users, setUsers] = useState<Supabase.RowDogs[] | null>(null)
  const [urls, setUrls] = useState<string[]>([''])

  const getData = async () => {
    const { data } = await SupabaseService.getDogs()
    setUsers(data)
  }

  const getUrl = async () => {
    const data = await SupabaseService.getPicUrl()
    const paths = data.map((url) => Object.values(url!).toString())
    const urls = await Promise.all(paths.map((path) => SupabaseService.getFiles(path!)))
    setUrls(Object.values(urls).map((url) => Object.values(url!).toString()))
  }

  useEffect(() => {
    getData()
    getUrl()
  }, [])

  if (!users || !urls) {
    return <div>loading...</div>
  }
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 place-items-center gap-10 px-10 lg:px-48'>
      {users.map((user, index) => (
        <DogCard key={user.id} user={user} image={urls[index]} />
      ))}
    </section>
  )
}
