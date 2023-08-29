import fuseLogo from "../../assets/fuselogo.svg";
import ConnectWallet from "./ConnectWallet";

const Topbar = () => {
  return (
    <nav className="w-full h-20 sticky top-0 bg-light-gray/60 backdrop-blur-xl flex justify-center py-7 z-40 md:py-0 md:h-[68px]">
      <div className="flex justify-between h-full items-center w-8/9 md:w-9/10 max-w-7xl" >
        <span>
          <a href="/">
            <img src={fuseLogo} alt="fuse logo" className="h-10 md:h-6 z-50" />
          </a>
        </span>
        <ConnectWallet />
      </div>
    </nav>
  );
};

export default Topbar;
