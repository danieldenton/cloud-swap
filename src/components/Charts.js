import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "react-bootstrap/Table";
import { ethers } from "ethers";
import Loading from "./Loading";
import { loadAllSwaps } from "../store/interactions";
import { formatEther, formatAddress, formatHash, formatDate, getSymbol } from "../utils";

export const Charts = () => {
  const dispatch = useDispatch();

  const provider = useSelector((state) => state.provider.connection);
  const tokens = useSelector((state) => state.tokens.contracts);
  const symbols = useSelector((state) => state.tokens.symbols);
  const amm = useSelector((state) => state.amm.contract);
  const swaps = useSelector((state) => state.amm.swaps);

  useEffect(() => {
    if (provider && amm) {
      loadAllSwaps(provider, amm, dispatch);
    }
  }, [provider, amm, dispatch]);


  const tabledSwaps =
    swaps &&
    swaps.map((swap, idx) => {
      return (
        <tr key={idx}>
          <td>{formatHash(swap.hash)}</td>
          <td>{getSymbol(swap.args.tokenGive, tokens, symbols)}</td>
          <td>{formatEther(swap.args.tokenGiveAmount)}</td>
          <td>{getSymbol(swap.args.tokenGet, tokens, symbols)}</td>
          <td>{formatEther(swap.args.tokenGetAmount)}</td>
          <td>{formatAddress(swap.args.user)}</td>
          <td>{formatDate(swap.args.timestamp)}</td>
        </tr>
      );
    });

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Transaction string</th>
          <th>Token Give</th>
          <th>Amount Give</th>
          <th>Token Get</th>
          <th>Amount Get</th>
          <th>User</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>{tabledSwaps}</tbody>
    </Table>
  );
};

export default Charts;
