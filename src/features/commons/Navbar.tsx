import React from "react";
import logo from "../../assets/fuselogo.svg";
import home from "../../assets/home.svg";
import homeGreen from "../../assets/homeGreen.svg";

type NavbarProps = {
  selected?: string;
};

const Navbar = ({ selected = "staking" }: NavbarProps) => {
  return (
    <nav className="h-screen w-1/9 border-r-0.5 border-gray flex flex-col sticky top-0 z-999">
      <a href="/">
        <img src={logo} alt="logo" width="60%" className="pt-7 ms-7" />
      </a>
      <div className="mt-16">
        <div
          className={
            selected === "staking"
              ? "text-fuse-green py-5 align-bottom cursor-pointer bg-white ps-7"
              : "py-5 align-bottom cursor-pointer ps-7"
          }
        >
          <img
            src={selected === "staking" ? homeGreen : home}
            alt="home"
            className="inline align-text-top"
          />
          <span className="ms-3 align-text-top font-medium">Staking</span>
        </div>
        <div
          className={
            selected === "safe"
              ? "text-fuse-green py-5 align-bottom cursor-pointer bg-white ps-7"
              : "py-5 align-bottom cursor-pointer ps-7"
          }
        >
          <img
            src={selected === "safe" ? homeGreen : home}
            alt="home"
            className="inline align-text-top"
          />
          <span className="ms-3 align-text-top font-medium">Safe</span>
        </div>
        <div
          className={
            selected === "bridge"
              ? "text-fuse-green py-5 align-bottom cursor-pointer bg-white ps-7"
              : "py-5 align-bottom cursor-pointer ps-7"
          }
        >
          <img
            src={selected === "bridge" ? homeGreen : home}
            alt="home"
            className="inline align-text-top"
          />
          <span className="ms-3 align-text-top font-medium">Bridge</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
