const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

const ether = tokens

describe('AMM', () => {
  let amm, accounts, deployer, receiver, exchange

  beforeEach(async () => {
    const AMM = await ethers.getContractFactory('AMM')
    amm = await AMM.deploy('Dapp University', 'DAPP', '1000000')

    accounts = await ethers.getSigners()
    deployer = accounts[0]
    receiver = accounts[1]
    exchange = accounts[2]
  })

  describe('Deployment', () => {

    it('', async () => {
    })
    it('', async () => {
    })
    it('', async () => {
    })
    it('', async () => {
    })
    it('', async () => {
    })

  })

})
