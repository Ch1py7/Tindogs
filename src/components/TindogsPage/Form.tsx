import { SupabaseService } from 'api'
import { Button, Input } from 'components/common'
import { ChangeEvent, FC, FormEvent, ReactElement, useReducer } from 'react'
import { formReducer, initialState } from 'utils/reducer'

export const Form: FC = (): ReactElement => {
  const [state, dispatch] = useReducer(formReducer, initialState)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { path } = await SupabaseService.uploadFile(state.picture!.name, state.picture!)
    const { session } = await SupabaseService.getSession()
    if (session) {
      await SupabaseService.uploadDog({
        name: state.name,
        description: state.description,
        breed: state.breed,
        mood: state.mood,
        image: path,
        owner: session!.user.id,
      })
      dispatch({ type: 'reset' })
      location.reload()
    } else {
      dispatch({ type: 'setIsLogin', payload: false })
    }
  }

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return

    dispatch({ type: 'setPicture', payload: event.target.files[0] })
  }

  return (
    <form className='flex flex-col w-sm gap-2 items-center' onSubmit={handleSubmit}>
      <Input
        placeholder='Name'
        value={state.name}
        onChange={(e) => dispatch({ type: 'setField', field: 'name', value: e.target.value })}
      />
      <Input
        placeholder='Description'
        value={state.description}
        onChange={(e) =>
          dispatch({ type: 'setField', field: 'description', value: e.target.value })
        }
      />
      <Input
        placeholder='Mood'
        value={state.mood}
        onChange={(e) => dispatch({ type: 'setField', field: 'mood', value: e.target.value })}
      />
      <Input
        placeholder='Breed'
        value={state.breed}
        onChange={(e) => dispatch({ type: 'setField', field: 'breed', value: e.target.value })}
      />
      {state.isLogin ? null : <p className='text-red-6'>You are not login!</p>}
      <div className='flex justify-center items-center flex-wrap rounded-[5px] text-gray-2 duration-500 bg-gradient-to-b from-[#101010af] via-[#1d1d1d] to-[#101010af] [background-size:auto_200%] hover:bg-bottom'>
        <label htmlFor='fileUpload' className='px-10 py-3'>
          {state.picture ? state.picture.name : 'Upload'}
        </label>
        <input
          title='upload'
          className='hidden'
          type='file'
          id='fileUpload'
          onChange={handleUpload}
        />
      </div>
      <Button colors='from-[#1A2980] via-[#2670d0] to-[#1A2980]' placeholder='Upload Dog' />
    </form>
  )
}
