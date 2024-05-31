const hre = require("hardhat");
const config = require("../src/config.json");

const tokens = (n) => {
  return hre.ethers.utils.parseUnits(n.toString(), "ether");
};

const ether = tokens;
const shares = ether;

async function main() {
  console.log(`fetching accounts and network \n`);
  const accounts = await hre.ethers.getSigners();
  const deployer = accounts[0];
  const investor1 = accounts[1];
  const investor2 = accounts[2];
  const investor3 = accounts[3];
  const investor4 = accounts[4];

  const { chainId } = await hre.ethers.provider.getNetwork();

  const dapp = await hre.ethers.getContractAt(
    "Token",
    config[chainId].dapp.address
  );
  console.log(`Dapp Token fetched at: ${dapp.address}\n`);
  const usd = await hre.ethers.getContractAt(
    "Token",
    config[chainId].usd.address
  );
  console.log(`USD Token fetched at: ${usd.address}\n`);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
