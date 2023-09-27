import { contractAddress, abi } from "../../constants";
import { useState, useEffect } from "react";
import { useWeb3Contract } from "react-moralis";
import useWeb3 from "./useWeb3";
import { ethers } from "ethers";
const useDealStatus = () => {
  const { userAccount } = useWeb3();
  const { runContractFunction, fetch, data, error, isLoading } =
    useWeb3Contract({});
  const submitCid = async (cid) => {
    const parameters = {
      abi: abi.DealStatus,
      contractAddress: contractAddress.DealStatus,
      functionName: "submit",
      params: {
        _cid: ethers.utils.toUtf8Bytes(cid),
      },
    };
    try {
      const response = await runContractFunction({
        params: parameters,
        onSuccess: (response) => {
          console.log(response);
        },
        onError: (error) => {
          console.log(error);
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return { submitCid };
};
export default useDealStatus;
