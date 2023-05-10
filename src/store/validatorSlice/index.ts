import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AppState } from '../rootReducer'
import { fetchValidatorData, getJailedValidators, getStake, getTotalStakeAmount, getValidators } from '../../utils/contractInteract'
import Validators from '../../validators/validators.json'
import { fetchFuseTokenData, fetchNodeByAddress, fetchTokenPrice, fetchTotalSupply } from '../../utils/api'

export interface ValidatorType {
    address: string
    stakeAmount: string
    fee: string
    delegatorsLength: string
    selfStakeAmount?: string
    name?: string
    website?: string
    firstSeen?: string
    status?: string
    image?: string
    forDelegation?: boolean
    totalValidated?: number
    uptime?: number
    description?: string
}

export interface ValidatorStateType {
    totalStakeAmount: string
    myStakeAmount: string
    validatorMetadata: ValidatorType[]
    validators: string[]
    isLoading: boolean
    isMetadataLoading: boolean
    isBalanceLoading: boolean
    isError: boolean
    errorMessage: string
    totalDelegators: number
    fuseTokenUSDPrice: number
    fuseTokenTotalSupply: number
}

const INIT_STATE: ValidatorStateType = {
    totalDelegators: 0,
    totalStakeAmount: '0',
    myStakeAmount: '0',
    validatorMetadata: [],
    validators: [],
    isLoading: false,
    isMetadataLoading: false,
    isError: false,
    errorMessage: '',
    isBalanceLoading: false,
    fuseTokenUSDPrice: 0,
    fuseTokenTotalSupply: 0
}

export const fetchValidators = createAsyncThunk(
    'VALIDATORS/FETCH',
    async (_undefined, thunkAPI) => {
        return new Promise<any>(async (resolve, reject) => {
            getTotalStakeAmount().then((totalStakeAmount) => {
                getValidators().then(async (validators) => {
                    const jailedValidators = await getJailedValidators()
                    validators = validators.concat(jailedValidators)
                    const fuseTokenTotalSupply = await fetchTotalSupply()
                    let price: number = 0
                    fetchTokenPrice().then(data => {
                        price = data
                        resolve({ totalStakeAmount, validators, price, fuseTokenTotalSupply })
                    }).catch((e) => {
                        price = 0
                        resolve({ totalStakeAmount, validators, price, fuseTokenTotalSupply })
                    })
                }).catch((error) => {
                    reject(error)
                })
            })
        })
    }
)

export const fetchValidatorMetadata = createAsyncThunk(
    'VALIDATORS/FETCH_METADATA',
    async (validators: string[], thunkAPI) => {
        return new Promise<any>(async (resolve, reject) => {
            const validatorMetadata: Array<ValidatorType> = []
            let totalDelegators = 0
            const jailedValidators = await getJailedValidators()
            const validatorMap = new Map(Object.entries(Validators));
            Promise.all(validators.map(async (validator) => {
                const status = jailedValidators.includes(validator.toLowerCase()) ? 'inactive' : 'active'
                const metadata = await fetchValidatorData(validator)
                const validatorData = validatorMap.get(validator)
                totalDelegators += parseInt(metadata.delegatorsLength)
                if (status === 'inactive') {
                    validatorMetadata.push({
                        ...metadata,
                        address: validator,
                        name: validatorData?.name ? validatorData?.name : validator,
                        website: validatorData?.website,
                        image: validatorData?.image,
                        status
                    })
                } else {
                    let apiMetadata = await fetchNodeByAddress(validator)
                    apiMetadata = apiMetadata["Node"]
                    validatorMetadata.push({
                        ...metadata,
                        address: validator,
                        name: validatorData?.name,
                        website: validatorData?.website,
                        image: validatorData?.image,
                        firstSeen: apiMetadata?.firstSeen ? apiMetadata?.firstSeen : undefined,
                        forDelegation: apiMetadata?.forDelegation ? apiMetadata?.forDelegation : undefined,
                        totalValidated: apiMetadata?.totalValidated ? apiMetadata?.totalValidated : undefined,
                        uptime: apiMetadata?.upTime ? apiMetadata?.upTime : undefined,
                        description: apiMetadata?.description ? apiMetadata?.description : undefined,
                        status
                    })
                }
            })).then(() => {
                resolve({ validatorMetadata, totalDelegators })
            }).catch((error) => {
                reject(error)
            })
        })
    }
)

export const fetchSelfStake = createAsyncThunk(
    'VALIDATORS/FETCH_SELF_STAKE',
    async ({ address, validators }: { address: string, validators: string[] }, thunkAPI) => {
        return new Promise<any>(async (resolve, reject) => {
            const delegatedAmounts: Array<Array<string>> = []
            let amount = 0
            Promise.all(validators.map(async (validator) => {
                const delegatedAmount = await getStake(validator, address)
                amount += parseFloat(delegatedAmount)
                delegatedAmounts.push([validator, delegatedAmount])
            })).then(() => {
                resolve({ delegatedAmounts, amount })
            }).catch((error) => {
                reject(error)
            })
        })
    }
)



const validatorSlice = createSlice({
    name: 'VALIDATOR_STATE',
    initialState: INIT_STATE,
    reducers: {},
    extraReducers: {
        [fetchValidators.pending.toString()]: (state) => {
            state.isLoading = true
        },
        [fetchValidators.fulfilled.toString()]: (state, { payload }) => {
            state.isLoading = false
            state.totalStakeAmount = payload.totalStakeAmount
            state.validators = payload.validators
            state.fuseTokenUSDPrice = payload.price
            state.fuseTokenTotalSupply = payload.fuseTokenTotalSupply
        },
        [fetchValidators.rejected.toString()]: (state, { error }) => {
            state.isLoading = false
            state.isError = true
            state.errorMessage = error.message
        },
        [fetchValidatorMetadata.pending.toString()]: (state) => {
            state.isMetadataLoading = true
        },
        [fetchValidatorMetadata.fulfilled.toString()]: (state, { payload }) => {
            state.isMetadataLoading = false
            state.validatorMetadata = payload.validatorMetadata
            state.totalDelegators = payload.totalDelegators
        },
        [fetchValidatorMetadata.rejected.toString()]: (state, { error }) => {
            state.isMetadataLoading = false
            state.isError = true
            state.errorMessage = error.message
        },
        [fetchSelfStake.pending.toString()]: (state) => {
            state.isBalanceLoading = true
        },
        [fetchSelfStake.fulfilled.toString()]: (state, { payload }) => {
            state.isBalanceLoading = false
            state.myStakeAmount = payload.amount
            state.validatorMetadata = state.validatorMetadata.map((validator) => {
                const delegatedAmount = payload.delegatedAmounts.filter((delegatedAmount: Array<string>) => delegatedAmount[0] === validator.address)[0]
                return {
                    ...validator,
                    selfStakeAmount: delegatedAmount ? delegatedAmount[1] : '0'
                }
            })
        },
        [fetchSelfStake.rejected.toString()]: (state, { error }) => {
            state.isBalanceLoading = false
            state.isError = true
            state.errorMessage = error.message
        }
    }
})

export const selectValidatorSlice = (state: AppState): ValidatorStateType => state.validator
export const selectValidatorMetadata = (state: AppState, address: string): ValidatorType =>
    state.validator.validatorMetadata.filter(
        (validator) => validator.address === address
    )[0]

export default validatorSlice.reducer