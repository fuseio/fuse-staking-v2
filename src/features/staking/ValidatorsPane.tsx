import React, { useEffect, useState } from "react";
import ValidatorCard from "./ValidatorCard";
import { ValidatorType } from "../../store/validatorSlice";
import Button from "../commons/Button";
import { eclipseAddress } from "../../utils/helpers";

const ValidatorsPane = ({
  validators,
  isLoading,
}: {
  validators: ValidatorType[];
  isLoading: boolean;
}) => {
  const [validatorsToDisplay, setValidatorsToDisplay] = useState<
    ValidatorType[]
  >([]);

  const [page, setPage] = useState(1);
  useEffect(() => {
    setValidatorsToDisplay(
      validators.slice(
        0,
        page * 12 < validators.length ? page * 12 : validators.length
      )
    );
  }, [validators, page]);

  return (
    <div className="flex w-full flex-col">
      <div className="w-full grid grid-cols-4 mt-9 gap-x-9 gap-y-10 md:grid-cols-1 md:gap-y-6">
        {isLoading &&
          Array.from([1, 2, 3, 4, 5, 6]).map((i) => {
            return (
              <ValidatorCard
                name=""
                commission=""
                stakedAmount=""
                state=""
                status=""
                isLoading
                key={i}
                address=""
                firstSeen=""
              />
            );
          })}
        {validatorsToDisplay.map((validator) => {
          return (
            <ValidatorCard
              name={
                (validator.name as string).length <= 20
                  ? (validator.name as string)
                  : eclipseAddress(validator.name as string)
              }
              commission={validator.fee + "%"}
              stakedAmount={new Intl.NumberFormat().format(
                parseFloat(validator.stakeAmount)
              )}
              state={validator.forDelegation ? "Open" : "Closed"}
              status={validator.status as string}
              image={validator.image}
              address={validator.address}
              key={validator.address}
              firstSeen={validator.firstSeen as string}
            />
          );
        })}
      </div>
      <div className="flex w-full justify-center mt-6">
        {validatorsToDisplay.length < validators.length ? (
          <Button
            text="Show More"
            className="bg-fuse-black text-white px-4 py-2 rounded-full font-medium"
            onClick={() => {
              setPage(page + 1);
            }}
          />
        ) : (
          <Button
            text="Show Less"
            className="bg-fuse-black text-white px-4 py-2 rounded-full font-medium"
            onClick={() => {
              setPage(1);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ValidatorsPane;
