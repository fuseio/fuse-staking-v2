import { init } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import fuseLogo from '../assets/fuselogo.svg'
import fuseIcon from '../assets/fuse.png'
import fuseToken from '../assets/tokenLogo'
import coinbaseWalletModule from '@web3-onboard/coinbase'
import frontierModule from '@web3-onboard/frontier'
import dcentModule from '@web3-onboard/dcent'
import enrkypt from '@web3-onboard/enkrypt'
import fortmaticModule from '@web3-onboard/fortmatic'
import gnosisModule from '@web3-onboard/gnosis'
import infinityWalletWalletModule from '@web3-onboard/infinity-wallet'
import keepkeyModule from '@web3-onboard/keepkey'
import ledgerModule from '@web3-onboard/ledger'
import portisModule from '@web3-onboard/portis'
import torusModule from '@web3-onboard/torus'
import trezorModule from '@web3-onboard/trezor'
import uauthModule from '@web3-onboard/uauth'
import walletConnectModule from '@web3-onboard/walletconnect'
import web3authModule from '@web3-onboard/web3auth'


const web3auth = web3authModule({
    clientId:
        'DJuUOKvmNnlzy6ruVgeWYWIMKLRyYtjYa9Y10VCeJzWZcygDlrYLyXsBQjpJ2hxlBO9dnl8t9GmAC2qOP5vnIGo'
})
const wcV1InitOptions = {
    bridge: 'YOUR_CUSTOM_BRIDGE_SERVER',
    qrcodeModalOptions: {
        mobileLinks: ['metamask', 'argent', 'trust']
    },
    connectFirstChainId: true
}
// const wcV2InitOptions = {
//     version: 2,
//     projectId: 'abc123...',
//     handleUri: (uri: string) => console.log(uri)
// }
const walletConnect = walletConnectModule(wcV1InitOptions)
const uauth = uauthModule({
    clientID: 'YOUR_CLIENT_ID',
    redirectUri: 'YOUR_REDIRECT_URI',
    scope: 'YOUR_SCOPES',
    shouldLoginWithRedirect: false,
    bridge: 'YOUR_CUSTOM_BRIDGE_SERVER',
    qrcodeModalOptions: {
        mobileLinks: ['rainbow', 'metamask', 'argent', 'trust', 'imtoken', 'pillar']
    },
    connectFirstChainId: true
})
const trezor = trezorModule({
    email: '<EMAIL_CONTACT>',
    appUrl: '<APP_URL>'
})
const torus = torusModule()
const portis = portisModule({ apiKey: 'API_KEY' })
const ledger = ledgerModule()
const keepkey = keepkeyModule()
const infinityWalletSDK = infinityWalletWalletModule()
const gnosis = gnosisModule()
const fortmatic = fortmaticModule({ apiKey: 'API_KEY' })
const enrkyptModule = enrkypt()
const dcent = dcentModule()
const frontier = frontierModule()
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
    frontier,
    dcent,
    enrkyptModule,
    fortmatic,
    gnosis,
    infinityWalletSDK,
    keepkey,
    portis,
    ledger,
    torus,
    trezor,
    uauth,
    walletConnect,
    web3auth
]

export const web3Onboard = init({
    wallets,
    chains,
    appMetadata: {
        name: "Fuse Staking",
        icon: fuseIcon,
        logo: fuseLogo,
        description: "The Fuse Staking Dapp enables users to participate in the Fuse network's consensus by staking FUSE tokens.",
    },
    accountCenter: {
        desktop: {
            enabled: true,
            position: 'bottomRight',
        },
        mobile: {
            enabled: true,
            position: 'bottomRight',
        }
    },
    connect: {
        iDontHaveAWalletLink: 'https://fuse.io/',
        disableUDResolution: true,
        autoConnectLastWallet: true,
    }
})