import React from "react";
import Pill from "../commons/Pill";
import { useNavigate } from "react-router-dom";
import Jazzicon from "react-jazzicon";

type ValidatorCardProps = {
  className?: string;
  onClick?: () => void;
  name: string;
  stakedAmount: string;
  status: string;
  state: string;
  commission: string;
  isLoading?: boolean;
  image?: string;
  address: string;
};

const ValidatorCard = ({
  name,
  stakedAmount,
  state,
  status,
  className = "",
  commission,
  onClick = () => {},
  isLoading = false,
  image = "",
  address,
}: ValidatorCardProps) => {
  const navigate = useNavigate();
  return (
    <div
      className={
        "bg-white rounded-xl flex flex-col justify-between p-4 hover:shadow-lg transition-all duration-300 cursor-pointer  " +
        className
      }
      onClick={() => {
        navigate(`/stake/${address}`);
      }}
    >
      <div className="flex items-center">
        {isLoading ? (
          <div className="h-16 w-16 rounded-lg bg-dark-gray animate-pulse"></div>
        ) : (
          <div className="h-16 w-16">
            {image ? (
              <img
                src={new URL(`../../assets/${image}`, import.meta.url).href}
                alt="validator"
                className="rounded-full h-16 w-16"
              />
            ) : (
              <Jazzicon diameter={64} seed={parseInt(name, 16)} />
            )}
          </div>
        )}
        <span className="text-black font-bold text-base ms-3">
          {isLoading ? (
            <span className="px-12 py-[1px] bg-dark-gray rounded-md animate-pulse"></span>
          ) : (
            name
          )}
          <br />
          <p className="font-normal text-sm text-text-gray">
            {isLoading ? (
              <span className="px-16 py-[1px] bg-dark-gray rounded-md animate-pulse"></span>
            ) : (
              "Validating Since 20/11/22"
            )}
          </p>
        </span>
      </div>
      <div className="flex justify-between pt-3">
        <p className="text-base font-normal text-text-gray">Staked</p>
        {isLoading ? (
          <span className="px-14 bg-dark-gray rounded-md animate-pulse"></span>
        ) : (
          <p className="text-base font-normal text-text-gray">{stakedAmount}</p>
        )}
      </div>
      <div className="flex justify-between pt-3">
        <p className="text-base font-normal text-text-gray">Commission</p>
        {isLoading ? (
          <span className="px-5 bg-dark-gray rounded-md animate-pulse"></span>
        ) : (
          <p className="text-base font-normal text-text-gray">{commission}</p>
        )}
      </div>
      <div className="flex justify-between pt-3">
        <p className="text-base font-normal text-text-gray">State</p>
        {state === "Open" ? (
          <Pill type="success" text={state} isLoading={isLoading} />
        ) : (
          <Pill type="error" text={state} isLoading={isLoading} />
        )}
      </div>
      <div className="flex justify-between pt-3">
        <p className="text-base font-normal text-text-gray">Status</p>
        {status === "active" ? (
          <Pill type="success" text="Active" isLoading={isLoading} />
        ) : (
          <Pill type="error" text="Inactive" isLoading={isLoading} />
        )}
      </div>
    </div>
  );
};

export default ValidatorCard;
