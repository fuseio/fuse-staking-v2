import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import warning from "../../assets/warning.svg";
import Button from "./Button";
import { useSetChain } from "@web3-onboard/react";

const ChainModal = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [{ connectedChain }, setChain] = useSetChain();

  useEffect(() => {
    console.log(connectedChain?.id);
    if (connectedChain?.id !== "0x7a") setIsOpen(true);
    else setIsOpen(false);
  }, [connectedChain]);
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
            className="bg-white w-[400px] h-[170px] rounded-xl flex flex-col items-start justify-start relative top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 md:w-full md:top-full md:-translate-y-full md:rounded-b-none"
          >
            <div className="flex w-full bg-warning-yellow rounded-t-xl h-[50px] items-center px-4 border-b-[1px] border-warning-gray">
              <img src={warning} alt="warning" />
              <span className="text-base/4 font-bold text-warning-gray ms-3">
                Warning
              </span>
            </div>
            <div className="flex flex-col w-full h-[87%] p-4 justify-between items-center">
              <span className="font-semibold text-text-heading-gray text-lg">
                You are not connected to Fuse Mainnet
              </span>
              <Button
                text="Switch To Fuse"
                className="bg-black font-medium text-white rounded-full w-full"
                padding="py-3"
                disabledClassname="bg-black/25 font-medium text-white rounded-full w-full"
                onClick={async () => {
                  await setChain({
                    chainId: "0x7a",
                  });
                }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default ChainModal;
