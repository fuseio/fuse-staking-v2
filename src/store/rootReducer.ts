import {
    AnyAction,
    CombinedState,
    combineReducers,
    Reducer
} from '@reduxjs/toolkit'
import validatorReducer from './validatorSlice'

const appReducer = combineReducers({
    validator: validatorReducer
})

export type AppState = CombinedState<{
    validator: ReturnType<typeof validatorReducer>
}>

const rootReducer: Reducer = (state: AppState, action: AnyAction) => {
    return appReducer(state, action)
}

export default rootReducer