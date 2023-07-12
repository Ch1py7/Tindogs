import { supabase } from 'api'
import { FC, FormEvent, ReactElement, useState } from 'react'

export const Form: FC = (): ReactElement => {
  const [name, setName] = useState<string | null>(null)
  const [description, setDescription] = useState<string | null>(null)
  const [mood, setMood] = useState<string | null>(null)
  const [cuteness, setCuteness] = useState<number | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await supabase.uploadDog({ name, description, cuteness, mood })

    setName(null)
    setDescription(null)
    setMood(null)
    setCuteness(null)
  }

  return (
    <form className='flex flex-col w-sm gap-2 items-center' onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Name'
        className='text-gray-2 h-[4rem] px-4 bg-[#101010af] border-none rounded-2 w-full font-500 text-xl'
        value={name || ''}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type='text'
        placeholder='Description'
        className='text-gray-2 h-[4rem] px-4 bg-[#101010af] border-none rounded-2 w-full font-500 text-xl'
        value={description || ''}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type='text'
        placeholder='Mood'
        className='text-gray-2 h-[4rem] px-4 bg-[#101010af] border-none rounded-2 w-full font-500 text-xl'
        value={mood || ''}
        onChange={(e) => setMood(e.target.value)}
      />
      <input
        type='number'
        min={1}
        max={10}
        placeholder='Cuteness'
        className='text-gray-2 h-[4rem] px-4 bg-[#101010af] border-none rounded-2 w-full font-500 text-xl'
        value={cuteness || ''}
        onChange={(e) => setCuteness(parseInt(e.target.value))}
      />
      <button
        type='submit'
        className='mt-4 w-[10rem] text-xl font-500 text-slate-3 h-[4rem] bg-gradient-to-r from-[#1A2980] via-[#2670d0] to-[#1A2980] border-none h-[2rem] rounded-2 [background-size:200%_auto] duration-500 hover:bg-right hover:scale-105'
      >
        Create Dog
      </button>
    </form>
  )
}
