import { supabase } from 'api'
import { ChangeEvent, FC, FormEvent, ReactElement, useState } from 'react'

export const Form: FC = (): ReactElement => {
  const [name, setName] = useState<string | null>(null)
  const [description, setDescription] = useState<string | null>(null)
  const [mood, setMood] = useState<string | null>(null)
  const [cuteness, setCuteness] = useState<number | null>(null)
  const [picture, setPicture] = useState<File | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { path } = await supabase.uploadFile(picture!.name, picture!)
    await supabase.uploadDog({ name, description, cuteness, mood, image: path })

    setName(null)
    setDescription(null)
    setMood(null)
    setCuteness(null)
    setPicture(null)

    location.reload()
  }

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return

    setPicture(event.target.files[0])
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
      <div className='flex justify-center items-center flex-wrap bg-[#101010af] rounded-[5px] text-gray-2'>
        <label htmlFor='fileUpload' className='px-10 py-2'>
          {picture ? picture.name : 'Upload'}
        </label>
        <input
          title='upload'
          className='hidden'
          type='file'
          id='fileUpload'
          onChange={handleUpload}
        />
      </div>
      <button
        type='submit'
        className='mt-4 w-[10rem] text-xl font-500 text-slate-3 h-[4rem] bg-gradient-to-r from-[#1A2980] via-[#2670d0] to-[#1A2980] border-none h-[2rem] rounded-2 [background-size:200%_auto] duration-500 hover:bg-right hover:scale-105'
      >
        Create Dog
      </button>
    </form>
  )
}
