import { useEffect } from "react";
import useSWR from "swr";

const adminAddresses = {
  "0xA5BF836C0895CEB07E3f5d3f78cfadf2dacDBbfd": true // kecak256
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
      adminAddresses[web3.utils.keccak256(data)]) ?? false,
    mutate,
    ...rest
  }
}
