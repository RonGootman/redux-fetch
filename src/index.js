import { createReducer, defaultReducer, compressReducer } from './utils'

export default class ReduxFetch {
  constructor(namespace, { initState = {}, reducer = {} }) {
    this.types = {
      process: `@@ReduxFetch [${namespace}] FETCH IS PROCESS`,
      success: `@@ReduxFetch [${namespace}] FETCH IS SUCCESS`,
      fail: `@@ReduxFetch [${namespace}] FETCH IS FAIL`
    }
  }

  reducer() {
    return createReducer(
      { data: {}, isProcessing: true, ...initState },
      [defaultReducer, reducer].map(r => compressReducer(r, this.types))
    )
  }

  process() {
    return { type: this.types.process }
  }

  success(data) {
    return { type: this.types.success, data }
  }

  fail() {
    return { type: this.types.fail }
  }
}
