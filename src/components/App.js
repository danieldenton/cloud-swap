import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";

// Components
import Navigation from "./Navigation";
import Loading from "./Loading";

import {
  loadProvider,
  loadNetwork,
  loadAccount,
  loadTokens,
  loadBalances,
  loadAMM,
} from "../store/interactions";

// ABIs: Import your contract ABIs here
// import TOKEN_ABI from '../abis/Token.json'

// Config: Import your network config here
// import config from '../config.json';

function App() {
  let account = "0x0...";

  const dispatch = useDispatch();

  const loadBlockchainData = async () => {
    const provider = loadProvider(dispatch);

    const chainId = await loadNetwork(provider, dispatch);


    window.ethereum.on('chainChanged', () => {
      window.location.reload()
    })

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
    <Container>
      <Navigation />

      <h1 className="my-4 text-center">React Hardhat Template</h1>

      <>
        <p className="text-center">Edit App.js to add your code here.</p>
      </>
    </Container>
  );
}

export default App;
