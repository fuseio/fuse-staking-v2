import React, { useEffect } from "react";
import fuseToken from "../../assets/fuseToken.svg";
import Button from "../commons/Button";
import {
  ValidatorType,
  selectMaxStake,
  selectMinStake,
  selectValidatorSlice,
} from "../../store/validatorSlice";
import { useConnectWallet } from "@web3-onboard/react";
import { useAppSelector } from "../../store/store";
import info from "../../assets/info-black.svg";
import ConnectWallet from "../commons/ConnectWallet";

type StakeCardProps = {
  className?: string;
  validator: ValidatorType | undefined;
  closed?: boolean;
  warningToggle?: () => void;
  isWarningAknowledged?: boolean;
  handleStake: () => void;
  handleUnstake: () => void;
  amount: string | null;
  setAmount: (amount: string | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};
const StakeCard = ({
  className = "",
  validator,
  closed = false,
  warningToggle = () => { },
  isWarningAknowledged = false,
  handleStake = () => { },
  handleUnstake = () => { },
  amount,
  setAmount,
  isLoading,
  setIsLoading,
}: StakeCardProps) => {
  const [cardMode, setCardMode] = React.useState(closed ? 1 : 0);
  const maxStake = useAppSelector(selectMaxStake);
  const minStake = useAppSelector(selectMinStake);

  useEffect(() => {
    if (closed) {
      setCardMode(1);
    } else {
      setCardMode(0);
    }
  }, [closed]);

  const setMode = (mode: number) => {
    if (closed) return;
    setCardMode(mode);
  };
  const [{ wallet }] = useConnectWallet();
  const [balance, setBalance] = React.useState<number>(0.0);
  useEffect(() => {
    // @ts-ignore
    if (wallet?.accounts[0].balance) {
      // @ts-ignore
      setBalance(wallet?.accounts[0].balance["Fuse"]);
    }
  }, [wallet?.accounts[0].balance]);

  const getPredictedReward = (amt: number) => {
    if (validator) {
      const reward =
        validatorSlice.fuseTokenTotalSupply *
        0.05 *
        (amt / parseFloat(validatorSlice.totalStakeAmount)) *
        (1 - parseFloat(validator.fee) / 100);
      return reward;
    }
    return 0;
  };

  const handleWithdraw = () => {
    if (
      parseFloat(validator?.stakeAmount as string) - getAmount() <
      parseFloat(minStake as string)
    )
      warningToggle();
    else handleUnstake();
  };

  const getPredictedIncrease = () => {
    if (validator) {
      const reward =
        (validatorSlice.fuseTokenTotalSupply /
          parseFloat(validatorSlice.totalStakeAmount)) *
        0.05 *
        (1 - parseFloat(validator.fee) / 100);
      return reward;
    }
    return 0;
  };

  const [reward, setReward] = React.useState<number>(0.0);

  useEffect(() => {
    if (cardMode === 0) {
      if (validator?.selfStakeAmount)
        setReward(
          getPredictedReward(
            parseFloat(validator.selfStakeAmount) + getAmount()
          )
        );
      else setReward(getPredictedReward(getAmount()));
    } else {
      if (validator?.selfStakeAmount)
        setReward(
          getPredictedReward(
            parseFloat(validator.selfStakeAmount) - getAmount()
          )
        );
      else setReward(getPredictedReward(getAmount()));
    }
  }, [amount, validator]);

  const getAmount = () => {
    if (isNaN(parseFloat(amount as string))) return 0;
    return parseFloat(amount as string);
  };

  const validatorSlice = useAppSelector(selectValidatorSlice);
  return (
    <div className="w-full bg-white rounded-xl p-4 flex flex-col">
      <div className="flex w-full bg-modal-bg rounded-md p-[2px]">
        <p
          className={
            cardMode === 0
              ? "text-primary font-semibold py-2 rounded-md cursor-pointer w-1/2 bg-white text-center text-sm"
              : "text-primary font-medium py-2 cursor-pointer w-1/2 text-center text-sm"
          }
          onClick={() => {
            setMode(0);
            setAmount(null);
          }}
        >
          Stake
        </p>
        <p
          className={
            cardMode === 1
              ? "text-primary font-semibold py-2 rounded-md cursor-pointer w-1/2 bg-white text-center text-sm"
              : "text-primary font-medium py-2 cursor-pointer w-1/2 text-center text-sm"
          }
          onClick={() => {
            setAmount(null);
            setMode(1);
          }}
        >
          Unstake
        </p>
      </div>
      <div className="flex w-full justify-end mt-6">
        {cardMode === 0 && (
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
            value={amount ? amount.toString() : ""}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
          <div className="w-2/12 flex justify-end">
            <Button
              text="Max"
              className="bg-black font-medium text-sm text-white rounded-[4px]"
              padding="px-[8px] py-[6px] "
              onClick={() => {
                if (cardMode === 0) {
                  if (balance < 0.1) return;
                  setAmount((balance - 0.1).toString());
                } else {
                  setAmount(validator?.selfStakeAmount as string);
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
          {cardMode === 0 ? "Added Stake" : "Removed Stake"}
        </p>
        <p className="text-sm font-semibold text-[#071927]">
          {new Intl.NumberFormat().format(getAmount())} FUSE
        </p>
      </div>
      <hr className="w-full h-[0.5px] border-[#D1D1D1] my-3" />
      <div className="flex justify-between">
        <p className="text-sm font-semibold text-text-gray">Total</p>
        {validator ? (
          <p className="text-sm font-semibold text-[#071927]">
            {cardMode === 0
              ? validator.selfStakeAmount
                ? new Intl.NumberFormat().format(
                  getAmount() + parseFloat(validator.selfStakeAmount)
                )
                : new Intl.NumberFormat().format(getAmount())
              : validator.selfStakeAmount
                ? new Intl.NumberFormat().format(
                  parseFloat(validator.selfStakeAmount) - getAmount()
                )
                : new Intl.NumberFormat().format(getAmount())}{" "}
            FUSE
          </p>
        ) : (
          <span className="ms-2 px-11 py-1 bg-dark-gray rounded-lg animate-pulse" />
        )}
      </div>
      <div className="flex justify-between mt-2">
        <div className="flex relative">
          <p className="text-sm font-semibold text-text-gray">
            Projected
            <br className="hidden md:block" /> Rewards (1y)
          </p>
          <img
            src={info}
            alt="info"
            className="peer mb-1 ms-1 cursor-pointer"
          />
          <div className="hidden absolute top-5 left-0 rounded-lg bg-white shadow-xl w-80 py-3 px-4 md:w-full peer-hover:block text-sm z-50">
            The rewards displayed are estimates. Actual rewards depend on the
            total locked supply in the network at each checkpoint, which may
            vary as more FUSE tokens are staked.
          </div>
        </div>

        {validator ? (
          <p className="text-sm font-semibold text-[#071927] text-right">
            {new Intl.NumberFormat().format(reward)} FUSE
            <br className="hidden md:block" />
            <span className="text-[#66E070]">
              {" (+"}
              {(getPredictedIncrease() * 100).toFixed(1)}
              {"%)"}
            </span>
          </p>
        ) : (
          <span className="ms-2 px-11 py-1 bg-dark-gray rounded-lg animate-pulse" />
        )}
      </div>
      {wallet ? (
        <Button
          text={
            isLoading
              ? "Loading..."
              : cardMode === 0 &&
                parseFloat(validator?.stakeAmount || "0") + getAmount() >
                parseFloat(maxStake)
                ? "Maximum Stake Reached"
                : cardMode === 0
                  ? "Stake"
                  : "Unstake"
          }
          className="bg-black font-medium text-white mt-6 rounded-full"
          disabledClassname="bg-black/25 font-medium text-white rounded-full w-full mt-6"
          disabled={
            getAmount() === 0 ||
            isLoading ||
            (cardMode === 0 &&
              parseFloat(validator?.stakeAmount || "0") + getAmount() >
              parseFloat(maxStake))
          }
          onClick={() => {
            if (!wallet) return;
            if (!validator) return;
            if (getAmount() === 0) return;
            if (cardMode === 0) {
              handleStake();
            } else {
              handleWithdraw();
            }
          }}
        />
      ) : (
        <ConnectWallet className="mt-6" />
      )}
    </div>
  );
};

export default StakeCard;
