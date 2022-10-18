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
      const account = accounts[0];

      if (!account) {
        throw new Error("Cannot retreive an account. Please refresh the browser.")
      }
      return account;
    }
  );

  useEffect(() => {
    const mutator = accounts => mutate(accounts[0] ?? null)
    provider?.on("accountsChanged", mutator)
    return () => {
      provider?.removeListener("accountsChanged", mutator)
    }
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
