import { messagesPrioritiesTypes } from '../types'
import { setDatasetListToReducer } from './actions'
import { v4 as uuidv4 } from 'uuid'
import initialState from './initialState'
import { ADD_MESSAGE_REDUCER, SET_ITEM_TO_DATASET_REDUCER, snackBarErrorDefaultOptions, TOGGLE_MESSAGES_RUNNER_REDUCER } from '../constants'
import { toast } from 'react-toastify'

//===============================generic reducers handlers===========================================================
const debug = false
const itemToDataset = (state: any, action: any) => {
  let { data, dataset_name, options = { key: '' } } = action

  if (!dataset_name) state = { ...state, ...data }
  else if (!!options['key']) state[dataset_name][options.key] = data
  else state[dataset_name] = data

  state = { ...state }
  return state
}

const itemToDatasetList = (state: any, action: any) => {
  let { data, dataset_name } = action

  if (!Array.isArray(data)) data = [data]

  for (let item of data) if (!!item.id && !!state[dataset_name]) state[dataset_name][item.id] = item
  state = { ...state }
  return state
}

const multipleItemsToDataset = (state: any, action: any) => {
  for (let act of action['actions']) state = datasetHandler(state, act)

  return state
}

const datasetHandler = (state: any, action: any) => {
  //console.log('datasetHandler ===> ', action)
  let { multiple, replaceList } = action['options']

  if (multiple) state = multipleItemsToDataset(state, action)
  else if (replaceList) state = itemToDataset(state, action)
  else state = itemToDatasetList(state, action)

  return state
}
//==========================================================================================
const reducers = (state = initialState, action: any) => {
  if (debug)
    console.log('REDUCERS - datasetReducer ===> ', {
      action,
      state,
    })
  //throw 'REDUCER FETCH NAME IS REQUIRED'
  switch (action.type) {
    case SET_ITEM_TO_DATASET_REDUCER:
      state = datasetHandler(state, action)
      break

    case ADD_MESSAGE_REDUCER:
      if (!state.messagesAreRunning) break
      let newMessage = action?.payload?.message
      newMessage['id'] = uuidv4()
      newMessage['timestamp'] = new Date()
      state = datasetHandler(state, setDatasetListToReducer(newMessage, 'messages'))

      if (newMessage.priority === messagesPrioritiesTypes.ERROR) {
        toast(newMessage.message, snackBarErrorDefaultOptions)
        toast.clearWaitingQueue()
      }
      state = { ...state }
      break

    case TOGGLE_MESSAGES_RUNNER_REDUCER:
      state.messagesAreRunning = !state.messagesAreRunning
      if (!state.messagesAreRunning) toast.clearWaitingQueue()
      state = { ...state }
      break
  }
  return state
}
export default reducers
