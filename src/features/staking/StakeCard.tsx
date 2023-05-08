import React, { useEffect } from "react";
import fuseToken from "../../assets/fuseToken.svg";
import Button from "../commons/Button";
import { ValidatorType, fetchSelfStake } from "../../store/validatorSlice";
import { useConnectWallet } from "@web3-onboard/react";
import { delegate, withdraw } from "../../utils/contractInteract";
import { useAppDispatch } from "../../store/store";
type StakeCardProps = {
  className?: string;
  validator: ValidatorType | undefined;
};
const StakeCard = ({ className = "", validator }: StakeCardProps) => {
  const [mode, setMode] = React.useState(0);
  const [amount, setAmount] = React.useState<number>(0.0);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [{ wallet }, connect, disconnect, updateBalances] = useConnectWallet();
  const [balance, setBalance] = React.useState<number>(0.0);
  const dispatch = useAppDispatch();
  useEffect(() => {
    // @ts-ignore
    if (wallet?.accounts[0].balance) {
      // @ts-ignore
      setBalance(wallet?.accounts[0].balance["Fuse"]);
    }
  }, [wallet?.accounts[0].balance]);
  return (
    <div className="w-full bg-white rounded-xl p-4 flex flex-col">
      <div className="flex">
        <p
          className={
            mode === 0
              ? "font-bold cursor-pointer"
              : "font-bold text-inactive cursor-pointer"
          }
          onClick={() => {
            setMode(0);
            setAmount(0);
          }}
        >
          Stake
        </p>
        <p
          className={
            mode === 1
              ? "font-bold ms-5 cursor-pointer"
              : "font-bold text-inactive ms-5 cursor-pointer"
          }
          onClick={() => {
            setAmount(0);
            setMode(1);
          }}
        >
          Unstake
        </p>
      </div>
      <div className="flex w-full justify-end mt-6">
        {mode === 0 && (
          <p className="text-xs text-text-gray">
            Available Balance:{" "}
            {wallet ? new Intl.NumberFormat().format(balance) : "0"} Fuse
          </p>
        )}
      </div>
      <div className="flex w-full">
        <div className="w-full bg-bg-dark-gray rounded-lg flex py-[9px] ps-2 pe-4 mt-2 items-center">
          <div className="w-1/12">
            <img src={fuseToken} alt="Fuse" />
          </div>
          <input
            className="bg-bg-dark-gray ms-2 outline-none h-full w-9/12"
            placeholder="0.0"
            value={amount}
            onChange={(e) => {
              const amt = parseFloat(e.target.value);
              if (isNaN(amt)) {
                setAmount(0);
              } else {
                if (
                  mode === 1 &&
                  amt > parseFloat(validator?.selfStakeAmount as string)
                ) {
                  return;
                }
                setAmount(amt);
              }
            }}
          />
          <div className="w-2/12 flex justify-end">
            <Button
              text="Max"
              className="bg-black font-medium text-sm text-white rounded-[4px]"
              padding="px-[8px] py-[6px] "
              onClick={() => {
                if (mode === 0) {
                  setAmount(balance);
                } else {
                  setAmount(
                    parseFloat(validator?.selfStakeAmount as string) || 0
                  );
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <p className="text-sm font-semibold text-text-gray">Current Stake</p>
        {validator ? (
          <p className="text-sm font-semibold text-[#071927]">
            {validator.selfStakeAmount
              ? new Intl.NumberFormat().format(
                  parseFloat(validator.selfStakeAmount)
                )
              : "0.0"}{" "}
            FUSE
          </p>
        ) : (
          <span className="ms-2 px-11 py-1 bg-dark-gray rounded-lg animate-pulse" />
        )}
      </div>
      <div className="flex justify-between mt-2">
        <p className="text-sm font-semibold text-text-gray">
          {mode === 0 ? "New Stake" : "Removed Stake"}
        </p>
        <p className="text-sm font-semibold text-[#071927]">
          {new Intl.NumberFormat().format(amount)} FUSE
        </p>
      </div>
      <hr className="w-full h-[0.5px] border-[#D1D1D1] my-3" />
      <div className="flex justify-between">
        <p className="text-sm font-semibold text-text-gray">Total</p>
        {validator ? (
          <p className="text-sm font-semibold text-[#071927]">
            {mode === 0
              ? validator.selfStakeAmount
                ? new Intl.NumberFormat().format(
                    amount + parseFloat(validator.selfStakeAmount)
                  )
                : new Intl.NumberFormat().format(amount)
              : validator.selfStakeAmount
              ? new Intl.NumberFormat().format(
                  parseFloat(validator.selfStakeAmount) - amount
                )
              : new Intl.NumberFormat().format(amount)}{" "}
            FUSE
          </p>
        ) : (
          <span className="ms-2 px-11 py-1 bg-dark-gray rounded-lg animate-pulse" />
        )}
      </div>
      <div className="flex justify-between mt-2">
        <p className="text-sm font-semibold text-text-gray">
          Projected Rewards (1y)
        </p>

        {validator ? (
          <p className="text-sm font-semibold text-[#071927]">
            {mode === 0
              ? validator.selfStakeAmount
                ? new Intl.NumberFormat().format(
                    ((amount + parseFloat(validator.selfStakeAmount)) *
                      parseFloat(validator?.fee)) /
                      100
                  )
                : new Intl.NumberFormat().format(
                    (amount * parseFloat(validator.fee)) / 100
                  )
              : validator.selfStakeAmount
              ? new Intl.NumberFormat().format(
                  ((parseFloat(validator.selfStakeAmount) - amount) *
                    parseFloat(validator?.fee)) /
                    100
                )
              : new Intl.NumberFormat().format(
                  (amount * parseFloat(validator.fee)) / 100
                )}{" "}
            FUSE
            <span className="text-[#66E070]"> (+{validator?.fee}%)</span>
          </p>
        ) : (
          <span className="ms-2 px-11 py-1 bg-dark-gray rounded-lg animate-pulse" />
        )}
      </div>
      <Button
        text={isLoading ? "Loading..." : mode === 0 ? "Stake" : "Unstake"}
        className="bg-black font-medium text-white mt-6 rounded-full"
        disabled={isLoading}
        onClick={() => {
          if (!wallet) return;
          if (!validator) return;
          if (mode === 0) {
            setIsLoading(true);
            delegate(amount.toString(), validator?.address as string)
              .then(() => {
                dispatch(
                  fetchSelfStake({
                    address: wallet.accounts[0].address,
                    validators: [validator?.address as string],
                  })
                );
                setAmount(0);
                setIsLoading(false);
                updateBalances();
              })
              .catch((e) => {
                console.log(e);
                setIsLoading(false);
              });
          } else {
            setIsLoading(true);
            withdraw(amount.toString(), validator?.address as string)
              .then(() => {
                dispatch(
                  fetchSelfStake({
                    address: wallet.accounts[0].address,
                    validators: [validator?.address as string],
                  })
                );
                setAmount(0);
                setIsLoading(false);
                updateBalances();
              })
              .catch((e) => {
                console.log(e);
                setIsLoading(false);
              });
          }
        }}
      />
    </div>
  );
};

export default StakeCard;
