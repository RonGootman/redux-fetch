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
