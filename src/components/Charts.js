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
  const swaps = useSelector((state) => state.amm.swaps);

  useEffect(() => {
    if (provider && amm) {
      loadAllSwaps(provider, amm, dispatch);
    }
  }, [provider, amm, dispatch]);

  const formatHash = (hash) => {
    const formattedString = hash.slice(0, 5) + "..." + hash.slice(61, 66);
    return formattedString;
  };

  const formatAddress = (address) => {
    const formattedAddy = address.slice(0, 5) + "..." + address.slice(38, 42);
    return formattedAddy;
  };

  const getSymbol = (token) => {
    if (token === tokens[0].address) {
      return symbols[0];
    } else if (token === tokens[1].address) {
      return symbols[1];
    } else {
      return "";
    }
  };

  const formatEther = (amount) => {
    const formattedEther = ethers.utils.formatUnits(amount.toString(), "ether");
    return formattedEther;
  };

  const formatDate = (date) => {
    const formattedDate = new Date(
      Number(date.toString() + "000")
    ).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    return formattedDate;
  };

  const tabledSwaps =
    swaps &&
    swaps.map((swap, idx) => {
      return (
        <tr key={idx}>
          <td>{formatHash(swap.hash)}</td>
          <td>{getSymbol(swap.args.tokenGive)}</td>
          <td>{formatEther(swap.args.tokenGiveAmount)}</td>
          <td>{getSymbol(swap.args.tokenGet)}</td>
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
