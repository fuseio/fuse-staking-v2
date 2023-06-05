import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import warning from "../../assets/warning.svg";
import cross from "../../assets/close.svg";
import Button from "./Button";

type WarningModalProps = {
  isOpen: boolean;
  onToggle: (arg: boolean) => void;
  onConfirm: (arg: boolean) => void;
  minStake?: string;
  isAknoledged: boolean;
};

const WarningModal = ({
  isOpen,
  onToggle,
  onConfirm,
  minStake = "100K",
  isAknoledged
}: WarningModalProps): JSX.Element => {
  useEffect(() => {
    window.addEventListener("click", (e) => {
      if ((e.target as HTMLElement).id === "modal-bg") {
        onToggle(false);
      }
    });
  }, [onToggle]);
  const [isChecked, setIsChecked] = useState(isAknoledged);

  return (
    <>
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex"
          id="modal-bg"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
            }}
            className="bg-white w-[400px] h-[360px] rounded-xl flex flex-col items-start justify-start relative top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 md:w-full md:top-full md:-translate-y-full md:rounded-b-none"
          >
            <div className="flex w-full bg-warning-yellow rounded-t-xl h-[13%] items-center px-4">
              <img src={warning} alt="warning" />
              <span className="text-base/4 font-bold text-warning-gray ms-3">
                Notice
              </span>
              <img
                src={cross}
                className="cursor-pointer w-6 h-6 ms-auto"
                onClick={() => {
                  onToggle(!isOpen);
                }}
                alt="close"
              />
            </div>
            <div className="flex flex-col w-full h-[87%] p-4 justify-between items-center">
              <span className="font-normal text-text-heading-gray text-sm">
                If you unstake an amount that brings a validator's total staked
                FUSE below {new Intl.NumberFormat().format(parseInt(minStake))},
                the validator node will be removed from the pending list. Your
                unstaked funds won't be returned directly to your wallet in this
                cycle, but rest assured, your funds are safe. In the next cycle,
                you can request to unstake again. This second request will
                successfully return your unstaked funds to your wallet and
                deactivate the validator node. Please ensure you understand this
                process before proceeding.
              </span>
              <span className="flex w-full items-center text-sm">
                <input
                  type="checkbox"
                  className="h-5 w-5 border-1 border-black me-2"
                  checked={isChecked}
                  onChange={() => {
                    setIsChecked(!isChecked);
                  }}
                />
                I understand
              </span>
              <Button
                text="Continue"
                className="bg-black font-medium text-white rounded-full w-full"
                padding="py-3"
                disabledClassname="bg-black/25 font-medium text-white rounded-full w-full"
                disabled={!isChecked}
                onClick={() => {
                  onConfirm(isChecked);
                  onToggle(false);
                }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default WarningModal;
