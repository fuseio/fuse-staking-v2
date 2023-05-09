import axios from 'axios'

import { CONFIG } from '../constants/config'
export const fetchAllNodes = () =>
    axios.get(`${CONFIG.bootApi}/nodes`).then(response => response.data)

export const fetchOldNodes = () =>
    axios.get(`${CONFIG.bootApi}/oldNodes`).then(response => response.data)

export const fetchNodeByAddress = async (address: string) =>
    axios.get(`${CONFIG.bootApi}/node=${address}`).then(response => response.data)

export const fetchDelegatedNodes = () =>
    axios.get(`${CONFIG.bootApi}/delegatedNodes`).then(response => response.data)

export const fetchDelegatedNodesSorted = () =>
    axios.get(`${CONFIG.bootApi}/delegatedNodes_sorted`).then(response => response.data)

export const fetchFuseTokenData = () =>
    axios.get(`${CONFIG.bootApi}/stats/circulating`).then(response => response.data)

export const fetchTokenPrice = async () => {
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=fuse-network-token&vs_currencies=usd`)
    return response.data['fuse-network-token'].usd
}
