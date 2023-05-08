import React, { useEffect } from "react";
import { useConnectWallet } from "@web3-onboard/react";
import { setWeb3OnboardProvider } from "../../utils/provider";
import { useAppDispatch } from "../../store/store";
import { fetchValidators } from "../../store/validatorSlice";

const ConnectWallet = () => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  const dispatch = useAppDispatch();
  useEffect(() => {
    setWeb3OnboardProvider(wallet?.provider);
    dispatch(fetchValidators());
  }, [wallet]);
  return (
    <button
      className="bg-fuse-black text-white px-4 py-2 rounded-full font-medium"
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
