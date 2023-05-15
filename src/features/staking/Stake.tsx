import React, { useEffect, useState } from "react";
import copy from "../../assets/copy.svg";
import InfoCard from "../commons/InfoCard";
import Pill from "../commons/Pill";
import StakeCard from "./StakeCard";
import StickyBox from "react-sticky-box";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import link from "../../assets/link.svg";
import {
  ValidatorType,
  fetchSelfStake,
  fetchValidatorMetadata,
  fetchValidators,
  selectValidatorSlice,
} from "../../store/validatorSlice";
import { eclipseAddress } from "../../utils/helpers";
import Jazzicon from "react-jazzicon";
import { useConnectWallet } from "@web3-onboard/react";
import Breadcrumb from "../commons/Breadcrumb";
const Stake = () => {
  const { id } = useParams();
  const [{ wallet }] = useConnectWallet();
  const [validator, setValidator] = useState<ValidatorType | undefined>(
    undefined
  );
  const dispatch = useAppDispatch();
  const validators = useAppSelector(selectValidatorSlice);

  useEffect(() => {
    if (validators.validatorMetadata.length > 0) {
      setValidator(
        validators.validatorMetadata.filter(
          (v) => v.address.toLowerCase() === id?.toLowerCase()
        )[0]
      );
    } else {
      dispatch(fetchValidators());
    }
  }, [id, validators]);

  useEffect(() => {
    if (
      validators.validators.length > 0 &&
      validators.validatorMetadata.length === 0
    ) {
      dispatch(fetchValidatorMetadata(validators.validators));
    }
  }, [validators.validators]);

  useEffect(() => {
    if (wallet && validator) {
      dispatch(
        fetchSelfStake({
          address: wallet.accounts[0].address,
          validators: validators.validators,
        })
      );
    }
  }, [wallet, validator]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-light-gray flex flex-col items-center">
      <Breadcrumb
        links={["/"]}
        states={["Fuse Staking", validator?.name || "Validator"]}
        className="w-8/9 mt-4 md:w-9/10 max-w-7xl"
      />
      <div className="flex w-8/9 md:flex-col md:w-9/10 max-w-7xl">
        <div className="w-[65%] flex flex-col md:w-full">
          <div className="flex mt-8 items-start justify-start md:flex-col">
            <div className="w-2/3 flex justify-start h-20 md:w-full">
              <div className="h-20">
                {!validator ? (
                  <div className="h-20 w-20 rounded-md bg-dark-gray animate-pulse"></div>
                ) : validator.image ? (
                  <img
                    src={
                      new URL(
                        `../../assets/${validator.image}`,
                        import.meta.url
                      ).href
                    }
                    alt="validator"
                    width="80"
                    height="80"
                    className="rounded-md"
                  />
                ) : (
                  <Jazzicon
                    diameter={80}
                    seed={parseInt(validator.name as string, 16)}
                  />
                )}
              </div>
              <div className="flex flex-col h-full justify-between ms-6">
                {validator ? (
                  <p className="font-black text-fuse-black text-[40px]/10 md:text-2xl">
                    {validator.name}
                  </p>
                ) : (
                  <p className="px-28 py-5 bg-dark-gray rounded-lg animate-pulse" />
                )}
                {validator ? (
                  <span className="text-text-dark-gray text-base flex">
                    {eclipseAddress(id as string)}
                    <img
                      src={copy}
                      alt="Copy"
                      className="ms-2 cursor-pointer"
                      onClick={() => {
                        navigator.clipboard.writeText(validator.address);
                      }}
                    />
                  </span>
                ) : (
                  <span className="px-14 py-3 bg-dark-gray rounded-lg animate-pulse" />
                )}
              </div>
            </div>
            <div className="flex flex-col items-end justify-between w-1/3 h-full ms-6 md:w-full md:items-start md:ms-0 md:mt-8">
              <p className="text-text-heading-gray text-base">
                Validating Since
                {validator ? (
                  <span className="ms-1 font-semibold">
                    {new Date(
                      parseInt(validator.firstSeen as string) * 1000
                    ).toLocaleDateString()}
                  </span>
                ) : (
                  <span className="ms-2 px-14 py-1 bg-dark-gray rounded-lg animate-pulse" />
                )}
              </p>
              <p className="text-text-heading-gray text-base md:mt-4">
                Validated Blocks
                {validator ? (
                  <span className="ms-1 font-semibold">
                    {validator.totalValidated}
                  </span>
                ) : (
                  <span className="ms-2 px-7 py-1 bg-dark-gray rounded-lg animate-pulse" />
                )}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 mt-10 gap-4 md:grid-cols-1">
            <InfoCard
              size="large"
              Header={new Intl.NumberFormat().format(
                parseFloat(validator?.stakeAmount as string)
              )}
              Body="Staked Amount"
              type={3}
              isLoading={!validator}
            />
            <InfoCard
              size="large"
              Header={new Intl.NumberFormat().format(
                parseInt(validator?.delegatorsLength as string)
              )}
              Body="Total Delegators"
              type={3}
              isLoading={!validator}
            />
            <InfoCard
              size="large"
              Header={validator?.uptime + "%"}
              Body="Uptime"
              type={3}
              isLoading={!validator}
            />
            <InfoCard
              size="large"
              Header={validator?.fee + "%"}
              Body="Fee"
              type={3}
              isLoading={!validator}
            />
          </div>
          <div className="flex mt-6">
            <div className="flex flex-col w-1/2">
              <p className="text-2xl font-bold">State</p>
              {!validator ? (
                <span className="px-8 mt-4 py-3 me-auto bg-dark-gray rounded-lg animate-pulse" />
              ) : validator?.forDelegation ? (
                <Pill type="success" text={"Open"} className="me-auto mt-4" />
              ) : (
                <Pill type="error" text={"Closed"} className="me-auto mt-4" />
              )}
            </div>
            <div className="flex flex-col w-1/2">
              <p className="text-2xl font-bold">Status</p>
              {!validator ? (
                <span className="px-8 mt-4 py-3 me-auto bg-dark-gray rounded-lg animate-pulse" />
              ) : validator?.status === "active" ? (
                <Pill type="success" text={"Active"} className="me-auto mt-4" />
              ) : (
                <Pill type="error" text={"Inactive"} className="me-auto mt-4" />
              )}
            </div>
          </div>
          {validator?.description && (
            <div className="flex flex-col mt-6">
              <p className="font-bold text-2xl">Description</p>
              <p className="text-text-heading-gray mt-4">
                {validator?.description}
              </p>
            </div>
          )}

          {validator?.website && (
            <div className="flex flex-col my-6">
              <p className="font-bold text-2xl">Links</p>
              <span className="flex mt-4 items-center">
                <img src={link} alt="link" className="me-1" height={8} />
                <a
                  className="text-text-heading-gray me-auto hover:underline"
                  target="_blank"
                  rel="noreferrer"
                  href={validator.website}
                >
                  {validator.website}
                </a>
              </span>
            </div>
          )}
        </div>
        <div className="w-[35%] ps-16 h-full pt-8 pb-6 md:w-full md:ps-0">
          <StickyBox offsetTop={80}>
            <StakeCard
              validator={validator}
              closed={!validator?.forDelegation}
            />
          </StickyBox>
        </div>
      </div>
    </div>
  );
};

export default Stake;
