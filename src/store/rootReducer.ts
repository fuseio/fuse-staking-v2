import {
    AnyAction,
    CombinedState,
    combineReducers,
    Reducer
} from '@reduxjs/toolkit'
import validatorReducer from './validatorSlice'
import searchReducer from './searchSlice'

const appReducer = combineReducers({
    validator: validatorReducer,
    search: searchReducer

})

export type AppState = CombinedState<{
    validator: ReturnType<typeof validatorReducer>,
    search: ReturnType<typeof searchReducer>
}>

const rootReducer: Reducer = (state: AppState, action: AnyAction) => {
    return appReducer(state, action)
}

export default rootReducer