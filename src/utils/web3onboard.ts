import { init } from '@web3-onboard/react'
import fuseConsoleLogo from '../assets/fuse-console-logo.svg'
import fuseIcon from '../assets/fuse.png'
import fuseToken from '../assets/tokenLogo'
import coinbaseWalletModule from '@web3-onboard/coinbase'
import ledgerModule from '@web3-onboard/ledger'
import torusModule from '@web3-onboard/torus'
import trezorModule from '@web3-onboard/trezor'
import walletConnectModule from '@web3-onboard/walletconnect'
import transactionPreviewModule from '@web3-onboard/transaction-preview'
import injectedModule from '@web3-onboard/injected-wallets'
import { ThemingMap } from '@web3-onboard/core/dist/types'

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

const wcV2InitOptions = {
    projectId: import.meta.env.VITE_WALLET_CONNECT_PUBLIC_KET as string,
    requiredChains: [122],
    dappUrl: 'https://staking.fuse.io'
}

const walletConnect = walletConnectModule(wcV2InitOptions)

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
    walletConnect,
    coinbaseWalletSdk,
    ledger,
    trezor,
    torus
]

const customTheme: ThemingMap = {
    '--w3o-background-color': 'rgba(255, 255, 255, 1)',
    '--w3o-foreground-color': 'linear-gradient(180deg, #E0FFDD 0%, rgba(242, 242, 242, 0) 100%)',
    '--w3o-text-color': 'var(--primary-text-color)',
    '--w3o-border-radius': '8px'
}

export const web3Onboard = init({
    theme: customTheme,
    transactionPreview,
    apiKey: import.meta.env.VITE_BLOCKNATIVE_API_KEY as string,
    wallets,
    chains,
    appMetadata: {
        name: "Fuse Staking",
        icon: fuseIcon,
        logo: fuseConsoleLogo,
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