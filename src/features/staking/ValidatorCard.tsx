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
  firstSeen: string;
  totalDelegators?: string;
  uptime?: string;
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
  firstSeen,
  totalDelegators,
  uptime,
}: ValidatorCardProps) => {
  const navigate = useNavigate();
  return (
    <div
      className={
        "bg-white rounded-xl flex flex-col justify-between p-4 hover:shadow-lg transition-all duration-300 cursor-pointer  " +
        className
      }
      onClick={() => {
        if (isLoading) return;
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
                className="rounded-lg h-16 w-16"
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
            ) : firstSeen ? (
              `Validating Since ${new Date(
                parseInt(firstSeen as string) * 1000
              ).toLocaleDateString()}`
            ) : (
              ""
            )}
          </p>
        </span>
      </div>
      <div className="flex justify-between pt-3">
        <p className="text-base font-normal text-text-gray">Staked</p>
        {isLoading ? (
          <span className="px-14 bg-dark-gray rounded-md animate-pulse"></span>
        ) : (
          <p className="text-base font-normal text-secondary-gray">
            {stakedAmount}
          </p>
        )}
      </div>
      <div className="flex justify-between pt-3">
        <p className="text-base font-normal text-text-gray">Total Delagators</p>
        {isLoading ? (
          <span className="px-5 bg-dark-gray rounded-md animate-pulse"></span>
        ) : (
          <p className="text-base font-normal text-secondary-gray">
            {totalDelegators}
          </p>
        )}
      </div>
      <div className="flex justify-between pt-3">
        <p className="text-base font-normal text-text-gray">Uptime</p>
        {isLoading ? (
          <span className="px-5 bg-dark-gray rounded-md animate-pulse"></span>
        ) : (
          <p className="text-base font-normal text-secondary-gray">{uptime}%</p>
        )}
      </div>
      <div className="flex justify-between pt-3">
        <p className="text-base font-normal text-text-gray">Commission</p>
        {isLoading ? (
          <span className="px-5 bg-dark-gray rounded-md animate-pulse"></span>
        ) : (
          <p className="text-base font-normal text-secondary-gray">
            {commission}
          </p>
        )}
      </div>
      <div className="flex justify-start pt-3">
        {state === "Open" ? (
          <Pill type="success" text={state} isLoading={isLoading} />
        ) : (
          <Pill type="inactive" text={state} isLoading={isLoading} />
        )}
        {status === "active" ? (
          <Pill
            type="success"
            text="Active"
            isLoading={isLoading}
            className="ms-3"
          />
        ) : (
          <Pill
            type="error"
            text="Inactive"
            isLoading={isLoading}
            className="ms-3"
          />
        )}
      </div>
    </div>
  );
};

export default ValidatorCard;
