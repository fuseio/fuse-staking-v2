import ConnectWallet from "./ConnectWallet";
import Hamburger from "./Hamburger";

type NavButtonProps = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

const NavButton = ({ isOpen, setOpen }: NavButtonProps) => {
  return (
    <div className="flex order-2">
      <ConnectWallet />
      <button
        type="button"
        className="p-2 w-10 h-10 hidden md:inline-flex focus:outline-none"
        aria-controls="navbar-sticky"
        aria-expanded="false"
        onClick={() => setOpen(!isOpen)}
      >
        <span className="sr-only">Open main menu</span>
        <Hamburger
          isOpen={isOpen}
        />
      </button>
    </div>
  )
}

export default NavButton;