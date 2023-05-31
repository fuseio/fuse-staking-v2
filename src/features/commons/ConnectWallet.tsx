import React, { useEffect } from "react";
import { useConnectWallet } from "@web3-onboard/react";
import { setWeb3OnboardProvider } from "../../utils/provider";
import { useAppDispatch } from "../../store/store";
import { fetchValidators } from "../../store/validatorSlice";
import ReactGA from "react-ga4";

const ConnectWallet = ({ className = "" }: { className?: string }) => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const dispatch = useAppDispatch();

const connectionEvent = (wallet:any) =>{
if(wallet) ReactGA.event({
    category: "Connection",
    action: "Connecting wallet",
    label:wallet?.label
  }) 
}

  useEffect(() => {
    setWeb3OnboardProvider(wallet?.provider);
    dispatch(fetchValidators());
    connectionEvent(wallet)
  }, [wallet]);
  
  return (
    <button
      className={
       wallet ? 'hidden': "bg-fuse-black text-white px-4 py-2  rounded-full font-medium md:text-sm " +
        className
      }
      onClick={() => {
        wallet ? disconnect(wallet) : connect();
      }}
    >
      {wallet
        ? "Disconnect Wallet"
        : connecting
        ? "Connecting..."
        : "Connect Wallet"}
    </button>
  );
};

export default ConnectWallet;
