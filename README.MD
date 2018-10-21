## Motivation
These days, SPA's(Single Page Apps) are on the rise in the world of web technologies.
wich probably should make lot of http request to retrieve data and update the UI accordingly, it make sense in SPA.
I don't need to explain why redux is awesome, But dealing with async operations can be annoying after a while. 

### Problem
Usually each async operation requires:

Action Types - constants (processs, success, fail).
```js
const FETCH_PREFIX_PROCESS = '[PREFIX] FETCH_PREFIX_PROCESS'
const FETCH_PREFIX_SUCCESS = '[PREFIX] FETCH_PREFIX_SUCCESS'
const FETCH_PREFIX_FAIL = '[PREFIX] FETCH_PREFIX_FAIL'
```
Action Creators = functions that return a plain object with type and payload.
```js
cosnt fetchPrefixSuccess = (data) => ({
    type: FETCH_PREFIX_SUCCESS,
    data
})
cosnt fetchPrefixProcess = () =>  ({type: FETCH_PREFIX_SUCCESS})
cosnt fetchPrefixFail = () =>  ({type: FETCH_PREFIX_FAIL})
```
Reducer - Repeatedly behavior, probably update data on state and set a flag to indicate fetch status.
```js
const prefixReducer = (state = { data: {}, isProcessing: false }, action) => {
  switch (action.type) {
    case FETCH_PREFIX_PROCESS:
      return {
        ...state,
        isProcessing: true
      }
    case FETCH_PREFIX_SUCCESS:
      return {
        ...state,
        data: { ...state.data, ...data },
        isProcessing: false
      }
    case FETCH_PREFIX_FAIL:
      return {
        ...state,
        isProcessing: false
      }
    default:
      return state
  }
}
```

## Basic Usage
Redux-Fetch goal is to reduce this boilareplate for one line. and still get the power of redux and async operations.

```js
import ReduxFetch from 'redux-fetch'
export default new ReduxFetch('todos')
```

# Implementation

ReduxFetch automaticly generate reducer for you. Definitely you can expand the reducer (API Guide).

```js
import { combineReducers } from 'redux';
import todos from './todos'

const applicationReducer = combineReducers({
  todos: todos.reducer()
})
```


ReduxFetch automaticly generate action creators for you. (redux-thunk example)

```js
import { getTodosAsync } from ...
import todos from './todos'

export const getTodosThunk = () => next => {
    next(todos.process())
    getTodosAsync()
        .then(data => next(todos.success(data)))
        .catch(error => next(todos.fail()))
}
```
