const hre = require("hardhat");
const config = require("../src/sepoliaConfig.json");

const tokens = (n) => {
  return hre.ethers.utils.parseUnits(n.toString(), "ether");
};

const ether = tokens;
const shares = ether;

async function main() {
  console.log(`fetching accounts and network \n`);
  const accounts = await hre.ethers.getSigners();
  const deployer = accounts[0];
  const investor1 = "0x1Eb4f0eade5278f629e24d32eB6b722aD379B09b" //DevAcc1
  const investor2 = "0x64A502b94B232e95f4D68CA5BE74F4586BF58a6c" //DevAcc2
  const investor3 = "0x4104353f717b5f943C620870E4E45AC1bf9090A9" //DevAcc3
  const investor4 = "0xb1417B952075fE8695A0FA7326918350700c8522" //DevAcc4

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

  transaction = await rump
    .connect(deployer)
    .transfer(investor1, tokens(10));
  transaction = await usd
    .connect(deployer)
    .transfer(investor2, tokens(10));
  transaction = await rump
    .connect(deployer)
    .transfer(investor3, tokens(10));
  transaction = await usd
    .connect(deployer)
    .transfer(investor4, tokens(10));

  const amm = await hre.ethers.getContractAt(
    "AMM",
    config[chainId].amm.address
  );
  console.log(`AMM fetched at: ${amm.address}\n`);
  
  console.log("Swapping");
  transaction = await rump.connect(deployer).approve(amm.address, tokens(10));
  await transaction.wait();

  transaction = await amm
    .connect(investor1)
    .swapToken(rump.address, usd.address, tokens(1));
  await transaction.wait();

  transaction = await usd.connect(deployer).approve(amm.address, tokens(10));
  await transaction.wait();

  transaction = await amm
    .connect(investor2)
    .swapToken(usd.address, rump.address, tokens(1));
  await transaction.wait();

  transaction = await rump.connect(investor3).approve(amm.address, tokens(10));
  await transaction.wait();

  transaction = await amm
    .connect(investor3)
    .swapToken(rump.address, usd.address, tokens(10));
  await transaction.wait();

  transaction = await usd.connect(investor4).approve(amm.address, tokens(10));
  await transaction.wait();

  transaction = await amm
    .connect(investor4)
    .swapToken(usd.address, rump.address, tokens(5));
  await transaction.wait();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
