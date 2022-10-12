import contract from '@truffle/contract';

export const loadContract = async (name, provider) => {
  const result = await fetch(`/contact/${name}.json`);
  const Artifact = await result.json();

  const _contract = contract(Artifact);
  _contract.setProvider(provider);

  let deployedContract = null;

  try {
    deployedContract = await _contract.deployed();
  } catch {
    console.log(`Contract ${name} cannot be loaded`);
  }

  return deployedContract;
};
