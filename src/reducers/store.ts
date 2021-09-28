import reducers from '.'
import initialState from './initialState'

const store = {
  state: initialState,
  reducer: reducers,
}

export default store
