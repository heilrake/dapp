import { useEffect } from "react";
import useSWR from "swr";

const adminAddresses = {
  "0x55580C85ACAf0dc4efC400468b8aF4e5b16C72f0": true // kecak256
};

export const handler = (web3, provider) => () => {

  const { data, mutate, ...rest } = useSWR(() =>
    web3 ? "web3/accounts" : null,
    async () => {
      const accounts = await web3.eth.getAccounts();
      return accounts[0];
    }
  );

  useEffect(() => {
    provider && provider.on("accountChanged",
      accounts => mutate(accounts[0] ?? null))
  }, [provider]);

  return {
    data,
    isAdmin: (
      data &&
      adminAddresses[data]) ?? false, // web3.utils.keccak256(data) it is commit
    mutate,
    ...rest
  }
}
