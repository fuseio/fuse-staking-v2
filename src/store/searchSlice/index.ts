import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppState } from '../rootReducer'
import { getDelegatedAmount, fetchValidatorData, getJailedValidators, getStake, getTotalStakeAmount, getValidators, getMaxStake } from '../../utils/contractInteract'
import Validators from '../../validators/validators.json'
import { fetchNodeByAddress, fetchTokenPrice, fetchTotalSupply } from '../../utils/api'

export interface SearchStateType {
    search: String,
    stateFilter: number,
    statusFilter: number,
    myStakeFilter: number,
    sort: number,
}

const INIT_STATE: SearchStateType = {
    search: "",
    stateFilter: 1,
    statusFilter: 1,
    myStakeFilter: 0,
    sort: 0,
}




const searchSlice = createSlice({
    name: 'SEARCH_STATE',
    initialState: INIT_STATE,
    reducers: {
        setReduxSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
            console.log(state.search)
        },
        setReduxStateFilter: (state, action: PayloadAction<number>) => {
            state.stateFilter = action.payload;
        },
        setReduxStatusFilter: (state, action: PayloadAction<number>) => {
            state.statusFilter = action.payload;
        },
        setReduxMyStakeFilter: (state, action: PayloadAction<number>) => {
            state.myStakeFilter = action.payload;
        },
        setReduxSort: (state, action: PayloadAction<number>) => {
            state.sort = action.payload;
        },
    },
})

export const selectSearchSlice = (state: AppState): SearchStateType => state.search
export const { setReduxSearch, setReduxStateFilter, setReduxStatusFilter, setReduxMyStakeFilter, setReduxSort } = searchSlice.actions;

export default searchSlice.reducer