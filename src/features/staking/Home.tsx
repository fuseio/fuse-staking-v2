import React, { useEffect, useState } from "react";
import piggybank from "../../assets/piggybank.svg";
import FAQ from "../commons/FAQ";
import FilterBar from "../commons/FilterBar";
import InfoCard from "../commons/InfoCard";
import SearchBar from "../commons/SearchBar";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  ValidatorType,
  fetchSelfStake,
  fetchValidatorMetadata,
  fetchValidators,
  selectValidatorSlice,
} from "../../store/validatorSlice";
import {
  selectSearchSlice,
  setReduxSearch,
  setReduxStateFilter,
   setReduxStatusFilter,
    setReduxMyStakeFilter,
     setReduxSort 
} from "../../store/searchSlice";
import { useConnectWallet } from "@web3-onboard/react";
import ValidatorsPane from "./ValidatorsPane";
import Breadcrumb from "../commons/Breadcrumb";
import SortBar from "../commons/SortBar";


const Home = () => {
  const [{ wallet }] = useConnectWallet();
  const validatorSlice = useAppSelector(selectValidatorSlice);
  const SearchSlice = useAppSelector(selectSearchSlice);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchValidators());
  }, []);

  const [validatorsToDisplay, setValidatorsToDisplay] = useState<
    Array<ValidatorType>
  >([]);
  useEffect(() => {
    setValidatorsToDisplay(validatorSlice.validatorMetadata);
  }, [validatorSlice.validatorMetadata]);
  useEffect(() => {
    if (
      validatorSlice.validators.length > 0 &&
      validatorSlice.validatorMetadata.length === 0
    ) {
      dispatch(fetchValidatorMetadata(validatorSlice.validators));
    }
  }, [validatorSlice.validators]);

  useEffect(() => {
    if (wallet && validatorSlice.validatorMetadata.length > 0) {
      dispatch(
        fetchSelfStake({
          address: wallet.accounts[0].address,
          validators: validatorSlice.validators,
        })
      );
    } else if (!wallet && validatorSlice.validatorMetadata.length > 0) {
      dispatch(
        fetchSelfStake({
          address: "",
          validators: validatorSlice.validators,
        })
      );
    }
  }, [wallet, validatorSlice.validatorMetadata.length]);

  const [filter, setFilter] = useState(SearchSlice);

  const setSearch = (search: string) => {
    let oldFilter = JSON.parse(JSON.stringify(filter));
    oldFilter.search = search;
    setFilter(oldFilter);
   dispatch(setReduxSearch(oldFilter.search))
  };

  const setStateFilter = (stateFilter: number) => {
    let oldFilter = JSON.parse(JSON.stringify(filter));
    oldFilter.stateFilter = stateFilter;
    setFilter(oldFilter);
    dispatch(setReduxStateFilter(oldFilter.stateFilter))
  };

  const setStatusFilter = (statusFilter: number) => {
    let oldFilter = JSON.parse(JSON.stringify(filter));
    oldFilter.statusFilter = statusFilter;
    setFilter(oldFilter);
    dispatch(setReduxStatusFilter(oldFilter.statusFilter))
  };

  const setMyStakeFilter = (myStakeFilter: number) => {
    let oldFilter = JSON.parse(JSON.stringify(filter));
    oldFilter.myStakeFilter = myStakeFilter;
    setFilter(oldFilter);
    dispatch(setReduxMyStakeFilter(oldFilter.myStakeFilter))
  };

  const setSort = (sort: number) => {
    let oldFilter = JSON.parse(JSON.stringify(filter));
    oldFilter.sort = sort;
    setFilter(oldFilter);
    dispatch(setReduxSort(oldFilter.sort))
  };

  const filterValidators = () => {
    if (validatorSlice.validatorMetadata.length === 0) return;
    const filteredValidators = validatorSlice.validatorMetadata.filter(
      (validator) => {
        return (
          (validator.name
            ?.toLowerCase()
            .includes(filter.search.toLowerCase()) ||
            validator.address
              ?.toLowerCase()
              .includes(filter.search.toLowerCase())) &&
          (filter.stateFilter === 0 ||
            (filter.stateFilter === 1 && validator.forDelegation) ||
            (filter.stateFilter === 2 && !validator.forDelegation)) &&
          (filter.statusFilter === 0 ||
            (filter.statusFilter === 1 && validator.status === "active") ||
            (filter.statusFilter === 2 && validator.status === "inactive")) &&
          (filter.myStakeFilter === 0 ||
            (filter.myStakeFilter === 1 &&
              validator?.selfStakeAmount &&
              parseFloat(validator.selfStakeAmount) > 0))
        );
      }
    );
    if (filter.sort === 0) {
      filteredValidators.sort((a, b) => {
        return parseFloat(b.stakeAmount) - parseFloat(a.stakeAmount);
      });
    } else if (filter.sort === 1) {
      filteredValidators.sort((a, b) => {
        return parseFloat(b.delegatorsLength) - parseFloat(a.delegatorsLength);
      });
    } else if (filter.sort === 2) {
      filteredValidators.sort((a, b) => {
        return (b.uptime ? b.uptime : 0) - (a.uptime ? a.uptime : 0)||parseFloat(b.stakeAmount) - parseFloat(a.stakeAmount);
      });
    } else if (filter.sort === 3) {
      filteredValidators.sort((a, b) => {
        return (
          (a.firstSeen ? parseInt(a.firstSeen) : 0) -
          (b.firstSeen ? parseInt(b.firstSeen) : 0)
        );
      });
    }

    setValidatorsToDisplay(filteredValidators);
  };

  useEffect(() => {
    filterValidators();
  }, [filter, validatorSlice.validatorMetadata]);

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
        links={[]}
        states={[]}
        className="w-8/9 mt-4 md:w-9/10 max-w-7xl"
      />
      <div className="w-8/9 flex flex-col mt-8 md:w-9/10 max-w-7xl">
        <div className="flex w-full items-start">
          <div className="flex flex-col w-3/5 md:w-full">
            <span className="font-black text-5xl md:text-4xl">
              Fuse Staking
            </span>
            <span className="text-xl font-normal mt-6 text-text-dark-gray md:text-base">
              The Fuse Staking Dapp enables users to participate in the Fuse
              network's consensus by staking FUSE tokens. Through a
              user-friendly interface, validators and delegators can manage
              their stakes, monitor rewards, and contribute to network security.
              Explore the Dapp to maximize your staking experience on the Fuse
              network.
            </span>
          </div>
          <div className="w-2/5 flex justify-end md:hidden">
            <img src={piggybank} alt="piggybank" />
          </div>
        </div>
        <div className="grid grid-cols-4 mt-9 gap-x-2 justify-between md:mt-12 md:grid-cols-1 md:gap-y-3 md:gap-x-3">
          <InfoCard
            Header={
              new Intl.NumberFormat().format(
                parseFloat(
                  parseFloat(validatorSlice.totalStakeAmount).toFixed(1)
                )
              ) + " FUSE"
            }
            Body={
              "~$ " +
              new Intl.NumberFormat().format(
                parseFloat(validatorSlice.totalStakeAmount) *
                  validatorSlice.fuseTokenUSDPrice
              )
            }
            Footer="Total Fuse Staked"
            classname="mr-4"
            key={1}
            isLoading={validatorSlice.isLoading}
            size="large"
          />
          <InfoCard
            Header={
              new Intl.NumberFormat().format(
                parseFloat(validatorSlice.myStakeAmount)
              ) + " FUSE"
            }
            Body={
              "~$ " +
              new Intl.NumberFormat().format(
                parseFloat(validatorSlice.myStakeAmount) *
                  validatorSlice.fuseTokenUSDPrice
              )
            }
            Footer="My Total Stake"
            classname="mr-4"
            key={2}
            isLoading={validatorSlice.isBalanceLoading}
            size="large"
          />
          <InfoCard
            Header={validatorSlice.validators.length.toString()}
            Footer="Total Validators"
            type={2}
            classname="mr-4"
            key={3}
            isLoading={validatorSlice.isLoading}
            size="large"
          />
          <InfoCard
            Header={new Intl.NumberFormat().format(
              validatorSlice.totalDelegators
            )}
            Footer="Total Delegators"
            type={2}
            key={4}
            isLoading={
              validatorSlice.isMetadataLoading || validatorSlice.isLoading
            }
            size="large"
          />
        </div>
        <div className="flex mt-16 justify-between items-center md:flex-col md:justify-start md:items-start">
          <SearchBar
            className="w-1/6 md:w-full"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={filter.search}
          />
          <SortBar
            className="w-1/5 md:w-full md:mt-4"
            options={[
              "Highest Stake",
              "Highest Delegators",
              "Highest Uptime",
              "Earliest Validation Start Date",
            ]}
            selected={filter.sort}
            onChange={(i) => {
              setSort(i);
            }}
          />
          <FilterBar
            className="w-3/10 md:mt-8 md:pe-0"
            name="State"
            states={["All", "Open", "Closed"]}
            background={["#DDF5FF", "#E0FFDD", "#EBEBEB"]}
            text={["#003D75", "#0A7500", "#000000"]}
            onClick={(i, _) => {
              setStateFilter(i);
            }}
            select={filter.stateFilter}
            tooltip={`Validators can be "open" or "closed" for delegation. You can only delegate tokens to open validators. If a validator you've delegated to becomes closed, you can still unstake your tokens anytime.`}
          />
          <FilterBar
            className="w-3/10 md:w-full md:mt-12"
            name="Status"
            states={["All", "Active", "Inactive"]}
            background={["#DDF5FF", "#E0FFDD", "#FFDDDD"]}
            text={["#003D75", "#0A7500", "#750000"]}
            onClick={(i, _) => {
              setStatusFilter(i);
            }}
            select={filter.statusFilter}
            tooltip={`Validators can be "active" or "inactive". Active validators are currently validating blocks, while inactive validators are not, due to maintenance or being jailed.`}
          />
        </div>
        <ValidatorsPane
          isLoading={
            validatorSlice.validatorMetadata.length === 0 &&
            (validatorSlice.isMetadataLoading || validatorSlice.isLoading)
          }
          validators={validatorsToDisplay}
          filters={["All", "My Staked"]}
          selected={filter.myStakeFilter}
          onClick={(i) => {
            setMyStakeFilter(i);
          }}
        />
        <FAQ className="mt-28 mb-16" questions={faqs} answers={faqAnswers} />
      </div>
    </div>
  );
};

export default Home;
