import { useEffect } from "react";
import useSWR from "swr";

const adminAddresses = {
  "0x7870ddcb65831a69910194a6e4a331201686ed034194af59d2b0637ff626473f": true // kecak256
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
    account: {
      data,
      isAdmin: (data && adminAddresses[web3.utils.keccak256(data)]) ?? false,
      mutate, ...rest
    }
  }
}
