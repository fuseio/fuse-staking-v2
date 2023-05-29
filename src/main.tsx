import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import { Provider } from "react-redux";
import store from "./store/store";
import { Web3OnboardProvider } from "@web3-onboard/react";
import { web3Onboard } from "./utils/web3onboard";
import { BrowserRouter } from "react-router-dom";
import ReactGA from "react-ga4";
import { YMInitializer } from "react-yandex-metrika";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
ReactGA.initialize(import.meta.env.VITE_GOOGLE_ANALYTICS_ID as string);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Web3OnboardProvider web3Onboard={web3Onboard}>
        <Provider store={store}>
          <YMInitializer
            accounts={[parseInt(import.meta.env.VITE_YANDEX_METRICA_ID)]}
          />
          <App />
        </Provider>
      </Web3OnboardProvider>
    </BrowserRouter>
  </React.StrictMode>
);
