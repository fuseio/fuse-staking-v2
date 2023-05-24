import React, { useEffect, useState } from "react";
import copy from "../../assets/copy.svg";
import InfoCard from "../commons/InfoCard";
import Pill from "../commons/Pill";
import StakeCard from "./StakeCard";
import StickyBox from "react-sticky-box";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import link from "../../assets/link.svg";
import arrow from "../../assets/arrow.svg";
import {
  ValidatorType,
  fetchDelegatedAmounts,
  fetchSelfStake,
  fetchValidatorMetadata,
  fetchValidators,
  selectValidatorSlice,
} from "../../store/validatorSlice";
import { eclipseAddress } from "../../utils/helpers";
import Jazzicon from "react-jazzicon";
import { useConnectWallet } from "@web3-onboard/react";
import Breadcrumb from "../commons/Breadcrumb";
import Modal from "../commons/Modal";
import FAQ from "../commons/FAQ";
const Stake = () => {
  const { id } = useParams();
  const [{ wallet }] = useConnectWallet();
  const [validator, setValidator] = useState<ValidatorType | undefined>(
    undefined
  );
  const dispatch = useAppDispatch();
  const validators = useAppSelector(selectValidatorSlice);
  const [isOpen, setIsOpen] = useState(false);

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

  const faqs = [
    "What is the Fuse Staking Dapp?",
    "What information can I see on the Staking Dapp?",
    "How do I connect to the Staking Dapp?",
    "How do I use the Staking Dapp?",
    "How are Projected Rewards calculated?",
    "When I stake my FUSE, can I unstake at any time?",
    "How do I run a validator?",
    "How can validators manage their own nodes' information?",
    "How can I learn more about Fuse Staking?",
  ];

  const faqAnswers = [
    <p>
      The Fuse Staking Dapp is an application that enables users to view
      information about current validator nodes on the Fuse Network. It is
      designed to help users make informed decisions about staking their Fuse to
      validators.
    </p>,
    <p>
      On the Staking Dapp, you can view the amounts staked to each particular
      validator, as well as understand the APY and stability (Up Time) of each
      validator. Additionally, you can filter validators based on different
      criteria.
    </p>,
    <p>
      To interact with the Staking Dapp, you need a wallet. Click on the
      "Connect Wallet" button on the top right to see all available options.
      Please note that you must be connected to the Fuse network with your
      wallet.
    </p>,
    <p>
      If you need help using the Staking Dapp, you can refer to our
      easy-to-follow tutorials [link to tutorials].
    </p>,
    <p>
      Projected rewards depend on the total locked supply in the network at each
      checkpoint, which may vary as more FUSE tokens are staked. For details on
      staking economics, see this article.
    </p>,
    <p>
      Yes, you can stake or unstake your FUSE tokens at any time, without any
      locking periods.
    </p>,
    <p>
      To become a validator, you must stake a minimum of 100K FUSE and run a
      full node. However, being a validator requires some technical knowledge,
      so if you lack it, it may be better to delegate your tokens. For more
      information on how to become a validator, please refer to{" "}
      <a
        href="https://docs.fuse.io/docs/validators/how-to-become-a-validator/"
        className="underline"
      >
        https://docs.fuse.io/docs/validators/how-to-become-a-validator/
      </a>
    </p>,
    <p>
      Validators can manage their own nodes' information by opening a pull
      request (PR) in the repository{" "}
      <a href="https://github.com/fuseio/fuse-staking" className="underline">
        https://github.com/fuseio/fuse-staking.
      </a>
    </p>,
    <p>
      You can find out all the information about Fuse Staking in our{" "}
      <a
        href="https://docs.fuse.io/docs/validators/participating-in-network-consensus/stake-delegate-and-withdraw"
        className="underline"
      >
        documentation
      </a>
    </p>,
  ];

  return (
    <div className="w-full bg-light-gray flex flex-col items-center">
      <Breadcrumb
        links={["/"]}
        states={["Fuse Staking", validator?.name || "Validator"]}
        className="w-8/9 mt-4 md:w-9/10 max-w-7xl"
      />
      <Modal
        isOpen={isOpen}
        onToggle={setIsOpen}
        delegators={validator?.delegators}
        isLoading={validators.isDelegatedAmountLoading}
      />
      <div className="flex w-8/9 flex-col md:w-9/10 max-w-7xl">
        <div className="flex w-full md:flex-col">
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
              <div className="flex flex-col items-end justify-center w-1/3 h-full ms-6 md:w-full md:items-start md:ms-0 md:mt-8">
                <p className="text-text-heading-gray text-base mb-1">
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
                <p className="text-text-heading-gray text-base md:mt-4 mt-1">
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
                Header={
                  new Intl.NumberFormat().format(
                    parseFloat(validator?.stakeAmount as string)
                  ) + " FUSE"
                }
                Body={
                  "~$ " +
                  new Intl.NumberFormat().format(
                    parseFloat(validator?.stakeAmount as string) *
                      validators.fuseTokenUSDPrice
                  )
                }
                Footer="Staked Amount"
                isLoading={!validator}
                size="large"
              />
              <InfoCard
                size="large"
                Header={new Intl.NumberFormat().format(
                  parseInt(validator?.delegatorsLength as string)
                )}
                Footer="Total Delegators"
                type={2}
                isLoading={!validator}
                icon={arrow}
                onClick={() => {
                  setIsOpen(true);
                  let delegatorsFilter: string[] = [];
                  validator?.delegators.forEach((delegator) => {
                    delegatorsFilter.push(delegator[0]);
                  });
                  dispatch(
                    fetchDelegatedAmounts({
                      address: validator?.address as string,
                      delegators: delegatorsFilter,
                    })
                  );
                }}
              />
              <InfoCard
                size="large"
                Header={validator?.uptime + "%"}
                Body="&nbsp;"
                Footer="Uptime"
                type={2}
                isLoading={!validator}
              />
              <InfoCard
                size="large"
                Header={validator?.fee + "%"}
                Body="&nbsp;"
                Footer="Fee"
                type={2}
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
                  <Pill
                    type="success"
                    text={"Active"}
                    className="me-auto mt-4"
                  />
                ) : (
                  <Pill
                    type="error"
                    text={"Inactive"}
                    className="me-auto mt-4"
                  />
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
          <div className="w-[35%] ps-16 pt-8 md:pb-6 md:w-full md:ps-0">
            <StickyBox offsetTop={90}>
              <StakeCard
                validator={validator}
                closed={validator?.forDelegation ? false : true}
              />
            </StickyBox>
          </div>
        </div>
        <FAQ
          className="mt-28 mb-16 w-8/9"
          questions={faqs}
          answers={faqAnswers}
        />
      </div>
    </div>
  );
};

export default Stake;
