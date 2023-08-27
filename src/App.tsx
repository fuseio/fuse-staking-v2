import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./features/commons/Topbar";
import Home from "./features/staking/Home";
import Stake from "./features/staking/Stake";
import Footer from "./features/commons/Footer";
import ChainModal from "./features/commons/ChainModal";
import socialIcon from "./assets/socialIcon";
import info from "./assets/info";

const onboardStyle = document.createElement('style');
const onboardActionStyle = document.createElement('style');
const onboardAccountCenterStyle = document.createElement('style');

onboardStyle.textContent = `
  .modal .border-custom {
    border: 0;
  }

  .modal button.wallet-button-styling {
    border: none;
  }

  .modal .container .close-button::before {
    background: none;
  }

  .modal .description {
    color: rgba(77, 77, 77, 1);
    font-weight: 400;
  }

  .modal .header {
    visibility: hidden;
    padding: 0 1rem;
    border-bottom: none;
  }

  .modal .heading-container {
    display: none;
  }

  .modal .heading-container h3 {
    font-size: 14px;
    margin: 0;
  }

  @media screen and (min-width: 768px) {
    .modal .heading-container {
      display: block;
      grid-column: span 2;
    }

    .modal .heading-container h3 {
      margin-bottom: calc(0.75rem - 0.5rem);
    }

    .modal .inner-container {
      padding: 0;
    }
  }

  .modal .no-link {
    font-size: 0.75rem;
    font-weight: 500;
    padding: 0;
  }

  .modal .notice-container {
    display: none;
  }

  .modal .sidebar {
    border-right: 0;
  }

  @media screen and (min-width: 768px) {
    .modal .sidebar {
      padding: 1.75rem;
      align-items: flex-start;
    }
  }

  .modal .subheading {
    font-size: 20px;
    font-weight: 700;
  }

  .modal .wallet-button-container .name {
    font-size: 0.75rem;
    font-weight: 500;
  }

  @media screen and (min-width: 768px) {
    .modal .wallet-button-container-inner {
      gap: 0.5rem;
      width: max-content;
    }
  }
`;

onboardActionStyle.textContent = `
  .modal .button-neutral-solid.action-required-btn {
    color: white;
  }
`

onboardAccountCenterStyle.textContent = `
  .container .menu.absolute {
    border: 1px solid var(--onboard-gray-100, var(--gray-100));
  }
`

const App = () => {
  const insertStyle = (onboardShadowRootSelector: ShadowRoot, style: HTMLStyleElement) => {
    onboardShadowRootSelector.appendChild(style);
  }

  const createHeading = (modalWalletsContainer: Element, text: string) => {
    const modalWalletsHeadingContainer = document.createElement("div");
    const modalWalletsHeading = document.createElement("h3");

    modalWalletsHeadingContainer.classList.add("heading-container")
    modalWalletsHeading.innerText = text;

    modalWalletsHeadingContainer.append(modalWalletsHeading);
    modalWalletsContainer.prepend(modalWalletsHeadingContainer);
  }

  const selectTorus = (onboardShadowRootSelector: ShadowRoot) => {
    const walletButtonContainers = onboardShadowRootSelector.querySelectorAll(".wallet-button-container")
    let torusContainer: HTMLElement;

    for (const walletButtonContainer of walletButtonContainers) {
      if (walletButtonContainer?.textContent?.includes("Torus")) {
        torusContainer = walletButtonContainer as HTMLElement
      }
    }

    return torusContainer!
  }

  const updateTorus = (torusContainer: HTMLElement) => {
    const torusName = torusContainer!.querySelector(".name")! as HTMLElement
    torusName.innerText = "Log in with social account"
  }

  const copyTorus = (onboardShadowRootSelector: ShadowRoot, torusContainer: HTMLElement) => {
    const modalOuterContainer = onboardShadowRootSelector.querySelector(".outer-container")! as HTMLElement

    const modalOuterSocialContainer = modalOuterContainer.cloneNode(true) as HTMLElement;
    modalOuterSocialContainer.firstElementChild!.replaceChildren()

    modalOuterContainer.parentNode!.append(modalOuterSocialContainer)

    createHeading(modalOuterSocialContainer.querySelector(".wallets-container")!, "Don\'t have a wallet")
    modalOuterSocialContainer.firstElementChild!.appendChild(torusContainer!)

    return modalOuterSocialContainer
  }

  const updateIcons = (onboardShadowRootSelector: ShadowRoot, modalOuterSocialContainer: HTMLElement) => {
    setTimeout(() => {
      const torusIcon = modalOuterSocialContainer?.querySelector(".icon")!
      const infoIcon = onboardShadowRootSelector?.querySelector(".info-icon")!

      torusIcon.innerHTML = socialIcon;
      infoIcon.innerHTML = info;
    }, 200)
  }

  useEffect(() => {
    const onboardSelector = document.querySelector("onboard-v2")!
    const onboardShadowRootSelector = onboardSelector.shadowRoot!

    const onboardAccountCenterSelector = document.querySelector("onboard-account-center")!
    const onboardAccountCenterShadowRootSelector = onboardAccountCenterSelector.shadowRoot!

    const config = { attributes: true, childList: true, subtree: true };

    const callback = (mutationList: MutationRecord[]) => {
      for (const mutation of mutationList) {
        const addedNodesClassList = (mutation?.addedNodes[0] as HTMLElement)?.classList
        const walletsContainer = onboardShadowRootSelector.querySelector(".wallets-container")!
        let isModalContainer;
        let isActionRequiredBtn;

        if (addedNodesClassList && addedNodesClassList.length) {
          isModalContainer = addedNodesClassList.contains("wallets-container")
          isActionRequiredBtn = addedNodesClassList.contains("action-required-btn")
        }

        if (isModalContainer) {
          insertStyle(onboardShadowRootSelector, onboardStyle);
          createHeading(walletsContainer, "Connect with");
          const torusContainer = selectTorus(onboardShadowRootSelector);
          updateTorus(torusContainer);
          const modalOuterSocialContainer = copyTorus(onboardShadowRootSelector, torusContainer);
          updateIcons(onboardShadowRootSelector, modalOuterSocialContainer)
        }

        if(isActionRequiredBtn) {
          insertStyle(onboardShadowRootSelector, onboardActionStyle);
        }
      }
    };

    const accountCenterCallback = (mutationList: MutationRecord[]) => {
      for (const mutation of mutationList) {
        const addedNodesClassList = (mutation?.addedNodes[0] as HTMLElement)?.classList
        let isAccountCenterContainer;

        if (addedNodesClassList && addedNodesClassList.length) {
          isAccountCenterContainer = addedNodesClassList.contains("container")
        }

        if (isAccountCenterContainer) {
          insertStyle(onboardAccountCenterShadowRootSelector, onboardAccountCenterStyle);
        }
      }
    };

    const observer = new MutationObserver(callback);
    observer.observe(onboardShadowRootSelector, config);

    const accountCenterObserver = new MutationObserver(accountCenterCallback);
    accountCenterObserver.observe(onboardAccountCenterShadowRootSelector, config);

    return () => {
      observer.disconnect();
      accountCenterObserver.disconnect();
    }
  }, [])

  return (
    <div className="w-full font-mona justify-end">
      <div className="flex-col flex items-center bg-light-gray">
        <ChainModal />
        <Topbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stake/:id" element={<Stake />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
};

export default App;
