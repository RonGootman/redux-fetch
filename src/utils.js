export class ActionTypes {
    constructor(namespace) {
      this.process = `@@ReduxFetch [${namespace}] FETCH IS PROCESS`
      this.success = `@@ReduxFetch [${namespace}] FETCH IS SUCCESS`
      this.fail = `@@ReduxFetch [${namespace}] FETCH IS FAIL`
    }
  }
  
  export class CreateFetchActions {
    constructor(types) {
      this.process = defaultActions.default(types.process)
      this.success = defaultActions.withPayload(types.success)
      this.fail = defaultActions.default(types.fail)
    }
  }
  
  export const defaultActions = {
    default: () => () => ({ type }),
    withPayload: type => data => ({ type, data })
  }
  
  export function createReducer(initialState, reducers) {
    return function reducer(state = initialState, action) {
      return reducers.reduce((state, reducer) => {
        if (reducer.hasOwnProperty(action.type)) {
          state = reducer[action.type](state, action)
        }
        return state
      }, state)
    }
  }
  
  export const defaultReducer = (process, success, fail) => ({
    [process]: state => ({
      ...state,
      isProcessing: true
    }),
    [success]: (state, { data }) => ({
      ...state,
      data: { ...state.data, ...data },
      isProcessing: false
    }),
    [fail]: state => ({
      ...state,
      isProcessing: false
    })
  })
  
  export const compressReducer = (reducer, types) => {
    if (typeof reducer === 'function') {
      return reducer.apply(null, Object.values(types))
    }
    return reducer
  }
  