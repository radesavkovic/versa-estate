import { createContext, useContext, useEffect, useState } from "react";
import Web3 from "web3";
import erc20Abi from "../contracts/erc20.json";
import abi from "../contracts/abi.json";
import { useAuthContext } from "./AuthProvider";
import { config } from "../config";

export const ContractContext = createContext({
  usdccontract: null,
  contract: null,
  web: null,
  wrongNetwork: false,
  getUsdcBalance: () => null,
  fromWei: () => null,
  toWei: () => null,
  getUsdcApproved: () => null,
});

export const ContractProvider = ({ children }) => {
  const [contract, setContract] = useState();
  const [web3, setWeb3] = useState();
  const { chainId, setSnackbar } = useAuthContext();
  const [wrongNetwork, setWrongNetwork] = useState(false);

  useEffect(() => {
    if (!chainId) {
      return;
    }
    if (parseInt(chainId) !== config.chainId) {
      setSnackbar({
        type: "error",
        message: "Wrong network",
      });
      setWrongNetwork(true);
      return;
    }
    setWrongNetwork(false);
    const web3Instance = new Web3();
    web3Instance.setProvider(Web3.givenProvider);

    setWeb3(web3Instance);
    const contract = new web3Instance.eth.Contract(abi, config.contractAddress);
    setContract(contract);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId]);

  const web3Instance2 = new Web3();
  web3Instance2.setProvider(Web3.givenProvider);
  const usdcAddress = "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E";
  const usdccontract = new web3Instance2.eth.Contract(erc20Abi, usdcAddress);
  const getUsdcBalance = (address) => usdccontract.methods.balanceOf(address).call();
  const getUsdcApproved = (address) => usdccontract.methods.allowance(address,config.contractAddress).call();
  const fromWei = (wei, unit = "mwei") =>
    parseFloat(Web3.utils.fromWei(wei, unit)).toFixed(2);
  const toWei = (amount, unit = "mwei") => Web3.utils.toWei(amount, unit);

  return (
    <ContractContext.Provider
      value={{ web3, usdccontract, contract, wrongNetwork, getUsdcBalance, fromWei, toWei, getUsdcApproved }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export const useContractContext = () => useContext(ContractContext);
