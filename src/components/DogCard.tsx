import { Heart, MessageCircle } from 'lucide-react'
import { FC, ReactElement, useState } from 'react'
import { Database } from 'types/supabase'

interface DogCardProps {
  user: Database['public']['Tables']['DogsInfo']['Row']
  image: string | null
}

export const DogCard: FC<DogCardProps> = ({ user, image }): ReactElement => {
  const [isLiked, setIsLiked] = useState(false)

  return (
    <article
      key={user.id}
      className='flex flex-col justify-start h-f items-center text-2xl gap-y-2 text-slate-3 relative duration-300 hover:scale-105'
    >
      <div className='absolute flex flex-col items-end justify-end p-4 w-full h-full opacity-0 duration-300 bg-gradient-to-t from-[#080808] to-[#ffffff00] hover:opacity-100 rounded-[10px]'>
        <h3>{user.name}</h3>
        <p>{user.description}</p>
        <div className='flex justify-center items-center gap-2'>
          {isLiked ? (
            <Heart
              color='#c50606'
              size={30}
              className='fill-[#c50606] transition-300'
              onClick={() => {
                setIsLiked(!isLiked)
              }}
            />
          ) : (
            <Heart
              color='#c50606'
              size={30}
              className='fill-transparent transition-300 hover:fill-[#c50606]'
              onClick={() => {
                setIsLiked(!isLiked)
              }}
            />
          )}
          <MessageCircle
            size={30}
            className='fill-transparent transition-300 hover:fill-[#f3f3f3]'
          />
        </div>
      </div>
      <img src={image!} alt={user.name!} className='w-[280px] h-[500px] object-cover rounded-xl' />
    </article>
  )
}
