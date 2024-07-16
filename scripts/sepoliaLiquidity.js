const hre = require("hardhat");
const config = require("../src/sepoliaConfig.json");

const tokens = (n) => {
  return hre.ethers.utils.parseUnits(n.toString(), "ether");
};

async function main() {
  console.log(`fetching accounts and network \n`);
  const deployer = await hre.ethers.getSigners();
  const deployerAddress = deployer[0].address
//   const deployer = accounts[0];
//   const deployer = "0x10a845E3ff30B4c88aF9E097f092382BfFC0b7eb"

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

  const amm = await hre.ethers.getContractAt(
    "AMM",
    config[chainId].amm.address
  );
  console.log(`AMM fetched at: ${amm.address}\n`);

  let amount = tokens(100);
console.log(deployer[0].address)
    transaction = await rump.connect(deployer).approve(amm.address, amount);
    await transaction.wait();
    transaction = await usd.connect(deployer).approve(amm.address, amount);
    await transaction.wait();
    console.log("Adding Liquidity");
    transaction = await amm.connect(deployer).addLiquidity(amount, amount);
    await transaction.wait();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
