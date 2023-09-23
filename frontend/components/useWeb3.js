import { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";

const useWeb3 = () => {
  const {
    enableWeb3,
    isWeb3Enabled,
    isWeb3EnableLoading,
    account,
    Moralis,
    authenticate,
    deactivateWeb3,
    user,
    isAuthenticated,
    chainId: chainIdHex,
    web3,
  } = useMoralis();
  const [chainId, setChainId] = useState(parseInt(chainIdHex));
  useEffect(() => {
    const getIds = async () => {
      Moralis.onChainChanged((chainIdHex) => {
        setChainId(parseInt(chainIdHex));
      });
      Moralis.onAccountChanged((account) => {
        console.log(`Account changed to ${account}`);
        if (account == null) {
          window.localStorage.removeItem("connected");
          deactivateWeb3();
          console.log("Null Account found");
        }
      });
    };

    getIds();
  }, []);
  useEffect(() => {
    setChainId(parseInt(chainIdHex));
  }, [chainIdHex]);
  return { chainId, userAccount: account, Moralis, isWeb3Enabled, web3 };
};

export default useWeb3;
