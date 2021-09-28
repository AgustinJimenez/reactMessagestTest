import { toast, ToastOptions } from 'react-toastify'
export const snackBarErrorDefaultOptions: ToastOptions = {
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 2000,
  type: 'error',
  theme: 'colored',
}

export const SET_ITEM_TO_DATASET_REDUCER = 'SET_ITEM_TO_DATASET_REDUCER'
export const ADD_MESSAGE_REDUCER = 'ADD_MESSAGE_REDUCER'
export const TOGGLE_MESSAGES_RUNNER_REDUCER = 'TOGGLE_MESSAGES_RUNNER_REDUCER'
