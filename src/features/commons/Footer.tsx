import React from "react";
import medium from "../../assets/medium.svg";
import tele from "../../assets/tele.svg";
import discord from "../../assets/discord.svg";
import twitter from "../../assets/twitter.svg";
import gh from "../../assets/gh.svg";
import youtube from "../../assets/youtube.svg";
import SubscribeBar from "./SubscribeBar";

const Footer = () => {
  return (
    <footer className="w-full bg-white">
      <div className="bg-light-gray w-full flex justify-center py-10">
        <div className="flex justify-between w-full md:grid md:grid-cols-2 md:gap-x-9 md:gap-y-10 md:ps-5 md:w-9/10 max-w-7xl">
          <span className="flex">
            <a
              href="https://www.youtube.com/c/fusenetwork"
              target="_blank"
              rel="noreferrer"
            >
              <div className="flex">
                <img src={youtube} alt="medium" />
                <span className="font-bold text-lg pt-1 ms-4">YouTube</span>
              </div>
            </a>
          </span>
          <span className="flex">
            <a
              href="https://github.com/fuseio"
              target="_blank"
              rel="noreferrer"
            >
              <div className="flex">
                <img src={gh} alt="medium" />
                <span className="font-bold text-lg pt-1 ms-4">GitHub</span>
              </div>
            </a>
          </span>
          <span className="flex">
            <a
              href="https://twitter.com/fuse_network"
              target="_blank"
              rel="noreferrer"
            >
              <div className="flex">
                <img src={twitter} alt="medium" />
                <span className="font-bold text-lg pt-1 ms-4">Twitter</span>
              </div>
            </a>
          </span>
          <span className="flex">
            <a href="https://t.me/fuseio" target="_blank" rel="noreferrer">
              <div className="flex">
                <img src={tele} alt="medium" />
                <span className="font-bold text-lg pt-1 ms-4">Telegram</span>
              </div>
            </a>
          </span>
          <span className="flex">
            <a
              href="https://discord.com/invite/jpPMeSZ"
              target="_blank"
              rel="noreferrer"
            >
              <div className="flex">
                <img src={discord} alt="medium" />
                <span className="font-bold text-lg pt-1 ms-4">Discord</span>
              </div>
            </a>
          </span>
          <span className="flex">
            <a href="https://docs.fuse.io" target="_blank" rel="noreferrer">
              <div className="flex">
                <img src={medium} alt="medium" />
                <span className="font-bold text-lg pt-1 ms-4">Docs</span>
              </div>
            </a>
          </span>
        </div>
      </div>
      <div className="bg-white flex justify-center my-16 w-full">
        <div className="flex flex-col w-5/6 max-w-7xl">
          <div className="flex justify-between w-full md:flex-col">
            <div className="flex justify-between w-2/5 md:w-full">
              <div className="flex flex-col w-1/2">
                <p className="font-bold">Getting Started</p>
                <a href="https://www.fuse.io/network">
                  <p className="text-text-dark-gray mt-4">Fuse Network</p>
                </a>
                <a href="https://www.fuse.io/mobile">
                  <p className="text-text-dark-gray mt-4">Mobile Stack</p>
                </a>
                <a href="https://chargeweb3.com/">
                  <p className="text-text-dark-gray mt-4">Fuse Charge</p>
                </a>
                <a href="https://voltage.finance/">
                  <p className="text-text-dark-gray mt-4">Voltage Finance</p>
                </a>
              </div>
              <div className="flex flex-col w-1/2">
                <p className="font-bold">Under the hood</p>
                <a href="https://explorer.fuse.io">
                  <p className="text-text-dark-gray mt-4">Explorer</p>
                </a>
                <a href="https://docs.fuse.io">
                  <p className="text-text-dark-gray mt-4">Documentation</p>
                </a>
                <a href="https://staking.fuse.io">
                  <p className="text-text-dark-gray mt-4">Fuse Staking</p>
                </a>
                <a href="https://forum.fuse.io/">
                  <p className="text-text-dark-gray mt-4">Governance</p>
                </a>
                <a href="https://status.fuse.io/">
                  <p className="text-text-dark-gray mt-4">Service Status</p>
                </a>
              </div>
            </div>
            <div className="flex flex-col w-1/5 md:w-full md:mt-4">
              <p className="font-bold">General</p>
              <a href="https://fuse.cash/privacy-policy">
                <p className="text-text-dark-gray mt-4">Privacy Policy</p>
              </a>
              <a href="https://uploads-ssl.webflow.com/63a6d0820bd1f472b4150067/63f758e4017a399398360f78_Brand%20kit.pdf">
                <p className="text-text-dark-gray mt-4">Brand Kit</p>
              </a>
              <a href="https://fuse.freshteam.com/jobs">
                <p className="text-text-dark-gray mt-4">Jobs</p>
              </a>
            </div>
            <div className="w-2/5 flex flex-col md:w-full md:mt-10">
              <p className="font-bold">Subscribe to our newsletter</p>
              <p className="text-text-dark-gray my-4">
                Get the latest news directly to your inbox
              </p>
              <SubscribeBar />
            </div>
          </div>
          <p className="text-text-dark-gray mt-16">
            © 2023 Fuse. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
