import React from "react";
import ConnectWallet from "./ConnectWallet";
import fuseLogo from "../../assets/fuselogo.svg";

const Topbar = () => {
  return (
    <nav className="w-full h-20 sticky top-0 bg-light-gray/60 backdrop-blur-xl flex justify-center py-7 z-50">
      <div className="flex justify-between h-full items-center w-8/9">
        <span>
          <a href="/">
            <img src={fuseLogo} alt="fuse logo" className="h-10" />
          </a>
        </span>
        <ConnectWallet />
      </div>
    </nav>
  );
};

export default Topbar;
