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
import { useConnectWallet } from "@web3-onboard/react";
import ValidatorsPane from "./ValidatorsPane";
import Breadcrumb from "../commons/Breadcrumb";

const Home = () => {
  const [{ wallet }] = useConnectWallet();
  const validatorSlice = useAppSelector(selectValidatorSlice);
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
    if (wallet) {
      dispatch(
        fetchSelfStake({
          address: wallet.accounts[0].address,
          validators: validatorSlice.validators,
        })
      );
    }
  }, [wallet]);

  const [filter, setFilter] = useState({
    search: "",
    stateFilter: 1,
    statusFilter: 1,
  });

  const setSearch = (search: string) => {
    let oldFilter = JSON.parse(JSON.stringify(filter));
    oldFilter.search = search;
    setFilter(oldFilter);
  };

  const setStateFilter = (stateFilter: number) => {
    let oldFilter = JSON.parse(JSON.stringify(filter));
    oldFilter.stateFilter = stateFilter;
    setFilter(oldFilter);
  };

  const setStatusFilter = (statusFilter: number) => {
    let oldFilter = JSON.parse(JSON.stringify(filter));
    oldFilter.statusFilter = statusFilter;
    setFilter(oldFilter);
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
            (filter.statusFilter === 2 && validator.status === "inactive"))
        );
      }
    );
    setValidatorsToDisplay(filteredValidators);
  };

  useEffect(() => {
    filterValidators();
  }, [filter, validatorSlice.validatorMetadata]);

  return (
    <div className="w-full bg-light-gray flex flex-col items-center">
      <Breadcrumb
        links={["/"]}
        states={["Fuse Staking"]}
        className="w-8/9 mt-4 md:w-4/5"
      />
      <div className="w-8/9 flex flex-col mt-8 md:w-4/5">
        <div className="flex w-full items-start">
          <div className="flex flex-col w-3/5 md:w-full">
            <span className="font-black text-5xl md:text-4xl">Fuse Staking</span>
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
        <div className="grid grid-cols-4 mt-9 gap-x-9 gap-y-10 justify-between md:mt-12 md:grid-cols-1 md:gap-y-3 md:gap-x-3">
          <InfoCard
            Header={
              new Intl.NumberFormat().format(
                parseFloat(validatorSlice.totalStakeAmount)
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
            className="w-3/10 md:w-full"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <FilterBar
            className="w-3/10 pe-7 md:w-full md:mt-8 md:pe-0"
            name="State"
            states={["All", "Open", "Closed"]}
            background={["#DDF5FF", "#E0FFDD", "#EBEBEB"]}
            text={["#003D75", "#0A7500", "#000000"]}
            onClick={(i, _) => {
              setStateFilter(i);
            }}
            select={1}
          />
          <FilterBar
            className="w-2/5 md:w-full md:mt-12"
            name="Status"
            states={["All", "Active", "Inactive"]}
            background={["#DDF5FF", "#E0FFDD", "#FFDDDD"]}
            text={["#003D75", "#0A7500", "#750000"]}
            onClick={(i, _) => {
              setStatusFilter(i);
            }}
            select={1}
          />
        </div>
        <ValidatorsPane
          isLoading={
            validatorSlice.isMetadataLoading || validatorSlice.isLoading
          }
          validators={validatorsToDisplay}
        />
        <FAQ
          className="mt-16"
          questions={[
            "Do I still need $FUSE after I acquire $VOLT?",
            "Do I still need $FUSE after I acquire $VOLT?",
          ]}
          answers={[
            "Text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text",
            "Text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text",
          ]}
        />
      </div>
    </div>
  );
};

export default Home;
