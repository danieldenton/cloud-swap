// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const Token = await hre.ethers.getContractFactory("Token");

  let usd = await Token.deploy("USD Token", "USD", "1000000");
  await usd.deployed();
  console.log(`USD Token deployed to: ${usd.address}\n`);

  let rump = await Token.deploy("Rumpelina Token", "RUMP", "1000000");
  await rump.deployed();
  console.log(`RUMP Token deployed to: ${rump.address}\n`);

  const CLOUD_SWAP = await hre.ethers.getContractFactory("AMM");
  let cloudSwap = await CLOUD_SWAP.deploy(rump.address, usd.address);
  await cloudSwap.deployed();
  console.log(`Cloud Swap deployed to: ${cloudSwap.address}\n`);

  const BLOOD_MOON_SWAP = await hre.ethers.getContractFactory("AMM");
  let bloodMoonSwap = await BLOOD_MOON_SWAP.deploy(rump.address, usd.address);
  await bloodMoonSwap.deployed();
  console.log(`Blood Moon Swap deployed to: ${bloodMoonSwap.address}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
