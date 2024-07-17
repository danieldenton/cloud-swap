const hre = require("hardhat");
const config = require("../src/sepoliaConfig.json");

const tokens = (n) => {
  return hre.ethers.utils.parseUnits(n.toString(), "ether");
};

async function main() {
  console.log(`fetching accounts and network \n`);
  const deployer = await hre.ethers.getSigners();

  const { chainId } = await hre.ethers.provider.getNetwork();

  const rump = await hre.ethers.getContractAt(
    "Token",
    config[chainId].rump.address
  );

  console.log(`Rumpelina Token fetched at: ${rump.address}\n`);
  const usd = await hre.ethers.getContractAt(
    "Token",
    config[chainId].usd.address
  );
  console.log(`USD Token fetched at: ${usd.address}\n`);

  let transaction;

  const bloodMoon = await hre.ethers.getContractAt(
    "AMM",
    config[chainId].bloodMoonSwap.address
  );
  console.log(`Blood Moon fetched at: ${bloodMoon.address}\n`);

  let amount = tokens(70);

  transaction = await rump.connect(deployer[0]).approve(bloodMoon.address, amount);
  await transaction.wait();
  transaction = await usd.connect(deployer[0]).approve(bloodMoon.address, amount);
  await transaction.wait();

  console.log("Adding Liquidity");
  transaction = await bloodMoon.connect(deployer[0]).addLiquidity(amount, amount);
  await transaction.wait();
  console.log("Finished")
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
