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

  let transaction;

  transaction = await dapp
    .connect(deployer)
    .transfer(investor1.address, tokens(10));
  transaction = await usd
    .connect(deployer)
    .transfer(investor2.address, tokens(10));
  transaction = await dapp
    .connect(deployer)
    .transfer(investor3.address, tokens(10));
  transaction = await usd
    .connect(deployer)
    .transfer(investor4.address, tokens(10));

  let amount = tokens(100);

  const amm = await hre.ethers.getContractAt(
    "AMM",
    config[chainId].amm.address
  );
  console.log(`AMM Token fetched at: ${amm.address}\n`);

  transaction = await dapp.connect(deployer).approve(amm.address, amount);
  await transaction.wait();
  transaction = await usd.connect(deployer).approve(amm.address, amount);
  await transaction.wait();

  console.log("Adding Liquidity");
  transaction = await amm.connect(deployer).addLiquidity(amount, amount);
  await transaction.wait();

  console.log("Swapping");
  transaction = await dapp.connect(investor1).approve(amm.address, tokens(10));
  await transaction.wait();

  transaction = await amm.connect(investor1).swapToken1(tokens(1));
  await transaction.wait();

  transaction = await usd.connect(investor2).approve(amm.address, tokens(10));
  await transaction.wait();

  transaction = await amm.connect(investor2).swapToken2(tokens(1));
  await transaction.wait();

  transaction = await dapp.connect(investor3).approve(amm.address, tokens(10));
  await transaction.wait();

  transaction = await amm.connect(investor3).swapToken1(tokens(10));
  await transaction.wait();

  transaction = await usd.connect(investor4).approve(amm.address, tokens(10));
  await transaction.wait();

  transaction = await amm.connect(investor4).swapToken2(tokens(5));
  await transaction.wait();

  console.log("finished");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
