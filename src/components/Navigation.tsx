import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Blockies from "react-blockies";

import { loadAccount, loadBalances } from "../store/interactions";
import { RootState } from "../types/state";
import { Config } from "../types/interactionTypes";

import logo from "../logo.jpg";

import sepoliaData from "../sepoliaConfig.json";
import localhostData from "../localhostConfig.json";

declare var window: any;

const Navigation = () => {
  const chainId = useSelector((state: RootState) => state.provider.chainId);
  const account = useSelector((state: RootState) => state.provider.account);
  const tokens = useSelector((state: RootState) => state.tokens.contracts);
  const amm = useSelector((state: RootState) => state.amm.contract);
  const dispatch = useDispatch();
  const config: Config = chainId === 11155111 ? sepoliaData : localhostData;

  const handleConnect = async () => {
    const account = await loadAccount(dispatch);
    await loadBalances(amm, tokens, account, dispatch);
  };

  const handleNetwork = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value, chainId);
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: e.target.value }],
    });
  };

  return (
    <>
      <Navbar className="my-3 bg-lt-g" expand="lg">
        <img
          alt="logo"
          src={logo}
          width="50"
          height="50"
          style={{ borderRadius: "100%", border: "solid purple 2px" }}
          className="d-inline-block align-top mx-3"
        />
        <Navbar.Brand className="purple fw-bold" href="#">
          Cloud Swap
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="nav" />
        <Navbar.Collapse id="nav" className="justify-content-end">
          <div className="d-flex justify-content-end mt-3 bg-lt-g border-danger">
            <Form.Select
              className="border-primary purple fw-bold"
              aria-label="Network Selector"
              value={config[chainId] ? `0x${chainId.toString(16)}` : `0`}
              onChange={handleNetwork}
              style={{ maxWidth: "200px", marginRight: "20px" }}
            >
              <option value="0" disabled>
                Select Network
              </option>
              <option value="0x7A69">Localhost</option>
              <option value="0xaa36a7">Sepolia</option>
            </Form.Select>

            {account ? (
              <Navbar.Text className="d-flex align-items-center purple fw-bold">
                {account.slice(0, 5) + "..." + account.slice(38, 42)}
                <Blockies
                  seed={account}
                  size={10}
                  scale={3}
                  color="purple"
                  bgColor="white"
                  spotColor="blue"
                  className="identicon mx-2"
                />
              </Navbar.Text>
            ) : (
              <Button
                className="purple fw-bold"
                style={{
                  backgroundColor: "#D8BFD8",
                  border: "solid 2px purple",
                  borderRadius: "10px",
                }}
                onClick={handleConnect}
              >
                Connect
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Navigation;
