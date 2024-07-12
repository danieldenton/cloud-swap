// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const Token = await hre.ethers.getContractFactory("Token");
  const rumpelina = "0x9360fecA696E9dEaaCD44334386677264747128a";

  let usd = await Token.deploy("USD Token", "USD", "1000000");
  await usd.deployed();
  console.log(`USD Token deployed to: ${usd.address}\n`);

  const CLOUD_SWAP = await hre.ethers.getContractFactory("AMM");
  let cloudSwap = await CLOUD_SWAP.deploy(rumpelina, usd.address);
  await cloudSwap.deployed();
  console.log(`Cloud Swap deployed to: ${cloudSwap.address}\n`);

  const BLOOD_MOON_SWAP = await hre.ethers.getContractFactory("AMM");
  let bloodMoonSwap = await BLOOD_MOON_SWAP.deploy(rumpelina, usd.address);
  await bloodMoonSwap.deployed();
  console.log(`Blood Moon Swap deployed to: ${bloodMoonSwap.address}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
