import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import { Provider } from "react-redux";
import store from "./store/store";
import { Web3OnboardProvider } from "@web3-onboard/react";
import { web3Onboard } from "./utils/web3onboard";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Web3OnboardProvider web3Onboard={web3Onboard}>
        <Provider store={store}>
          <App />
        </Provider>
      </Web3OnboardProvider>
    </BrowserRouter>
  </React.StrictMode>
);
