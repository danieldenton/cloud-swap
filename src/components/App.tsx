import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { HashRouter, Routes, Route } from "react-router-dom";
import "../App.css"

import Navigation from "./Navigation.tsx";
import Tabs from "./Tabs.tsx";
import Swap from "./Swap.tsx";
import Deposit from "./Deposit.tsx";
import Charts from "./Charts";
import Withdraw from "./Withdraw.tsx";

import {
  loadProvider,
  loadNetwork,
  loadAccount,
  loadTokens,
  loadAMM,
} from "../store/interactions.ts";

function App() {
  const dispatch = useDispatch();

  const loadBlockchainData = async () => {
    const provider = loadProvider(dispatch);

    const chainId = await loadNetwork(provider, dispatch);

    window.ethereum.on("chainChanged", () => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", async () => {
      await loadAccount(dispatch);
    });

    await loadTokens(provider, chainId, dispatch);
    await loadAMM(provider, chainId, dispatch);
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <Container className="bg-lt-g" style={{ height: '100%'}}>
      <HashRouter>
        <Navigation />
        <hr />
        <Tabs />
        <Routes>
          <Route path="/" element={<Swap />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/charts" element={<Charts />} />
        </Routes>
      </HashRouter>
    </Container>
  );
}

export default App;