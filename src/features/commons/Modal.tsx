import React, { useEffect, useState } from "react";
import cross from "../../assets/close.svg";
import sort from "../../assets/sort.svg";
import search from "../../assets/search.svg";

interface ModalProps {
  delegators?: Array<Array<string>> | undefined;
  isOpen: boolean;
  onToggle: (arg: boolean) => void;
  isLoading?: boolean;
}
const Modal = ({
  isOpen,
  onToggle,
  delegators = [],
  isLoading = false,
}: ModalProps): JSX.Element => {
  const [delegatorsToDisplay, setDelegatorsToDisplay] = useState<
    Array<Array<string>>
  >([]);
  useEffect(() => {
    window.addEventListener("click", (e) => {
      if ((e.target as HTMLElement).id === "modal-bg") {
        onToggle(false);
      }
    });
  }, [onToggle]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    setDelegatorsToDisplay(delegators);
  }, [delegators]);
  return (
    <>
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center"
          id="modal-bg"
        >
          <div className="bg-white w-5/12 h-[519px] rounded-xl flex flex-col items-start justify-start px-4 py-3 modal relative md:w-[95%]">
            <div className="font-semibold text-text-primary text-lg flex items-start justify-between w-full">
              <span className="font-bold">All Delegators</span>
              <img
                src={cross}
                className="cursor-pointer w-6 h-6"
                onClick={() => {
                  onToggle(!isOpen);
                }}
                alt="close"
              />
            </div>
            <div className="flex w-full rounded bg-modal-bg text-text-gray py-2 px-3 mt-2 items-center">
              <img src={search} alt="search" className="w-4 h-4" />
              <input
                type="text"
                className="w-full bg-modal-bg focus:outline-none px-2 pt-1 text-sm"
                placeholder="Search an address"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length > 0) {
                    setDelegatorsToDisplay(
                      delegators.filter((delegator) =>
                        delegator[0].toLowerCase().includes(value.toLowerCase())
                      )
                    );
                  } else {
                    setDelegatorsToDisplay(delegators);
                  }
                  setPage(1);
                }}
              />
            </div>
            <div className="flex flex-col items-start justify-start w-full mt-2">
              {delegatorsToDisplay &&
                delegatorsToDisplay
                  .slice(11 * (page - 1), 11 * page)
                  .map((delegator, index) => {
                    return (
                      <div
                        className="flex justify-between w-full py-2 px-4 border-text-gray border-b-0 border-t-0.5 border-r-0.5 border-l-0.5 last:border-b-0.5 first:rounded-t-md last:rounded-b-md"
                        key={index}
                      >
                        <span className="text-xs text-text-gray">
                          {delegator[0]}
                        </span>
                        {isLoading ? (
                          <div className="px-14 h-4 bg-modal-bg animate-pulse rounded"></div>
                        ) : (
                          <div className="text-xs text-text-gray">
                            {delegator[1]}
                          </div>
                        )}
                      </div>
                    );
                  })}
            </div>
            <div className="w-full justify-end flex mt-auto">
              <div
                className="cursor-pointer p-2 bg-modal-bg bg-opacity-50 rounded-sm"
                onClick={() => {
                  if (page > 1) {
                    setPage(page - 1);
                  }
                }}
              >
                <img src={sort} alt="p" className="rotate-90 h-4" />
              </div>
              {delegatorsToDisplay != null &&
                [...Array(Math.ceil(delegatorsToDisplay?.length / 11))].map(
                  (pageNo, i) => {
                    return (
                      <div
                        className={
                          page === i + 1
                            ? "cursor-pointer px-3 py-2 bg-fuse-green-light bg-opacity-50 rounded-sm ml-0.5 text-xs font-medium"
                            : "cursor-pointer px-3 py-2 bg-modal-bg bg-opacity-50 rounded-sm ml-0.5 text-button-inactive text-xs font-medium"
                        }
                        key={i}
                        onClick={() => {
                          setPage(i + 1);
                        }}
                      >
                        {i + 1}
                      </div>
                    );
                  }
                )}
              <div
                className="cursor-pointer p-2 bg-modal-bg bg-opacity-50 rounded-sm ml-0.5"
                onClick={() => {
                  if (
                    delegatorsToDisplay != null &&
                    page < Math.ceil(delegatorsToDisplay?.length / 11)
                  ) {
                    setPage(page + 1);
                  }
                }}
              >
                <img src={sort} alt="p" className="-rotate-90 h-4" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Modal;
