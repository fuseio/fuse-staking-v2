import React from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./features/commons/Topbar";
import Home from "./features/staking/Home";
import Stake from "./features/staking/Stake";
import Footer from "./features/commons/Footer";

const App = () => {
  return (
    <div className="w-full font-mona justify-end">
      <div className="flex-col flex items-center bg-light-gray">
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
