import { init } from '@web3-onboard/react'
import fuseLogo from '../assets/fuselogo.svg'
import whiteFuseLogo from '../assets/fuse-staking-logo-white.svg'
import fuseIcon from '../assets/fuse.png'
import fuseToken from '../assets/tokenLogo'
import coinbaseWalletModule from '@web3-onboard/coinbase'
import ledgerModule from '@web3-onboard/ledger'
import torusModule from '@web3-onboard/torus'
import trezorModule from '@web3-onboard/trezor'
import walletConnectModule from '@web3-onboard/walletconnect'
import transactionPreviewModule from '@web3-onboard/transaction-preview'
import injectedModule from '@web3-onboard/injected-wallets'



// const web3auth = web3authModule({
//     clientId:
//         import.meta.env.VITE_WEB3AUTH_CLIENTID as string,
//     chainConfig: {
//         chainId: '0x7A',
//         chainNamespace: 'eip155',
//         displayName: 'Fuse',
//         blockExplorer: 'https://explorer.fuse.io',
//         rpcTarget: 'https://rpc.fuse.io',
//     }
// })
const transactionPreview = transactionPreviewModule({
    requireTransactionApproval: true
})

const walletConnect = walletConnectModule({
    bridge: 'https://walletconnect.fuse.io',
    version: 1,
    connectFirstChainId: true,
})
const trezor = trezorModule({
    email: 'hello@fuse.io',
    appUrl: 'https://staking.fuse.io'
})
const torus = torusModule()
const ledger = ledgerModule()
const coinbaseWalletSdk = coinbaseWalletModule()

const fuse = {
    id: '0x7A',
    token: 'Fuse',
    label: 'Fuse Mainnet',
    rpcUrl: "https://rpc.fuse.io",
    icon: fuseToken,
    blockExplorerUrl: 'https://explorer.fuse.io',
}

const chains = [fuse]
const wallets = [
    injectedModule(),
    coinbaseWalletSdk,
    walletConnect,
    torus,
    ledger,
    trezor,
]

export const web3Onboard = init({
    theme: 'dark',
    transactionPreview,
    apiKey: import.meta.env.VITE_BLOCKNATIVE_API_KEY as string,
    wallets,
    chains,
    appMetadata: {
        name: "Fuse Staking",
        icon: fuseIcon,
        logo: whiteFuseLogo,
        description: "The Fuse Staking Dapp enables users to participate in the Fuse network's consensus by staking FUSE tokens.",
    },
    accountCenter: {
        desktop: {
            enabled: true,
        },
        mobile: {
            enabled: true,
        }
    },
    connect: {
        iDontHaveAWalletLink: 'https://fuse.io/ecosystem',
        disableUDResolution: true,
        autoConnectLastWallet: true,
    },
    containerElements: {
        accountCenter: '#onboard-container'
    }
})