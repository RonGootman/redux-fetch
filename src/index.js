import {
  ActionTypes,
  CreateFetchActions,
  createReducer,
  defaultReducer,
  compressReducer
} from './utils'

export default class ReduxFetch {
  constructor(namespace, { initState = {}, reducer = {}, reducers = [] }) {
    this.types = new ActionTypes(namespace)
    this.actions = new CreateFetchActions(this.types)
    this.reducer = createReducer(
      { data: {}, isProcessing: true, ...initState },
      [defaultReducer, reducer, ...reducers].map(r =>
        compressReducer(r, this.types)
      )
    )
  }
}
