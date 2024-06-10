import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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

  
  return <div>Charts</div>;
};

export default Charts;
