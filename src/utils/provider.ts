import { EIP1193Provider } from '@web3-onboard/core';
import { ethers } from 'ethers';
import { CONFIG } from '../constants/config';

export let web3OnboardProvider: ethers.Provider | ethers.Signer | null = null;

export const setWeb3OnboardProvider = async (provider: EIP1193Provider | undefined | null) => {
    if (provider) {
        let web3OnboardProviderTemp = new ethers.BrowserProvider(provider, 'any')
        web3OnboardProvider = await web3OnboardProviderTemp.getSigner()
    }
    else web3OnboardProvider = new ethers.JsonRpcProvider(CONFIG.fuseRPC, 'any')
}