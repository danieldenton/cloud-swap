import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "react-bootstrap/Table";
import { ethers } from "ethers";
import Loading from "./Loading";
import { loadAllSwaps } from "../store/interactions";

export const Charts = () => {
  const dispatch = useDispatch();

  const provider = useSelector((state) => state.provider.connection);
  const tokens = useSelector((state) => state.tokens.contracts);
  const symbols = useSelector((state) => state.tokens.symbols);
  const amm = useSelector((state) => state.amm.contract);

  useEffect(() => {
    if (provider && amm) {
      loadAllSwaps(provider, amm, dispatch);
    }
  }, [provider, amm, dispatch]);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Transaction Hash</th>
          <th>Token Give</th>
          <th>Amount Give</th>
          <th>Token Get</th>
          <th>Amount Get</th>
          <th>User</th>
          <th>Time</th>
        </tr>
      </thead>
    </Table>
  );
};

export default Charts;
