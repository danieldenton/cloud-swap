const { expect } = require("chai");
const { ethers } = require("hardhat");
const { transform } = require("lodash");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

const ether = tokens;

describe("AMM", () => {
  let amm, accounts, deployer, token1, token2, liquidityProvider;

  beforeEach(async () => {
    accounts = await ethers.getSigners();
    deployer = accounts[0];
    liquidityProvider = accounts[1];

    const Token = await ethers.getContractFactory("Token");
    token1 = await Token.deploy("Dapp University", "DAPP", "1000000");
    token2 = await Token.deploy("USD Token", "USD", "1000000");

    let transaction = await token1
      .connect(deployer)
      .transfer(liquidityProvider.address, tokens(100000));
    await transaction.wait();
    transaction = await token2
      .connect(deployer)
      .transfer(liquidityProvider.address, tokens(100000));
    await transaction.wait();

    const AMM = await ethers.getContractFactory("AMM");
    amm = await AMM.deploy(token1.address, token2.address);
  });

  describe("Deployment", () => {
    it("has an address", async () => {
      expect(amm.address).to.not.equal(0x0);
    });
    it("returns token1", async () => {
      expect(await amm.token1()).to.equal(token1.address);
    });
    it("returns token2", async () => {
      expect(await amm.token2()).to.equal(token2.address);
    });
  });
  describe("Swapping Tokens", () => {
    let amount;
    it("facilitates swaps", async () => {
      amount = tokens(100000);
      transaction = await token1.connect(deployer).approve(amm.address, amount);
      await transaction.wait();
      transaction = await token2.connect(deployer).approve(amm.address, amount);
      await transaction.wait();
      transaction = await amm.connect(deployer).addLiquidity(amount, amount);
      await transaction.wait();
      expect(await token1.balanceOf(amm.address)).to.equal(amount);
      expect(await token2.balanceOf(amm.address)).to.equal(amount);
      expect(await amm.token1Balance()).to.equal(amount);
      expect(await amm.token2Balance()).to.equal(amount);
      expect(await amm.shares(deployer.address)).to.equal(tokens(100));
      expect(await amm.totalShares()).to.equal(tokens(100));

      amount = tokens(50000);
      transaction = await token1
        .connect(liquidityProvider)
        .approve(amm.address, amount);
      await transaction.wait();
      transaction = await token2
        .connect(liquidityProvider)
        .approve(amm.address, amount);
      await transaction.wait();

      let token2Deposit = await amm.calculateToken2Deposit(amount);
      transaction = await amm
        .connect(liquidityProvider)
        .addLiquidity(amount, token2Deposit);
      await transaction.wait();
      expect(await amm.shares(liquidityProvider.address)).to.equal(tokens(50));
      expect(await amm.shares(deployer.address)).to.equal(tokens(100));
      expect(await amm.totalShares()).to.equal(tokens(150));
    });
  });
});
