interface FormState {
  name: string
  description: string
  mood: string
  breed: string
  picture: File | null
  isLogin: boolean
}

type FormAction =
  | { type: 'setField'; field: string; value: string }
  | { type: 'setPicture'; payload: File | null }
  | { type: 'setIsLogin'; payload: boolean }
  | { type: 'reset' }

export const initialState: FormState = {
  name: '',
  description: '',
  mood: '',
  breed: '',
  picture: null,
  isLogin: true,
}

export const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
  case 'setField':
    return { ...state, [action.field]: action.value }
  case 'setPicture':
    return { ...state, picture: action.payload }
  case 'setIsLogin':
    return { ...state, isLogin: action.payload }
  case 'reset':
    return initialState
  default:
    return state
  }
}
