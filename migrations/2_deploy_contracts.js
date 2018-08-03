//var SimpleBank = artifacts.require("./SimpleBank.sol");
var SupplyChain = artifacts.require("./SupplyChain.sol");

module.exports = function(deployer) {
  //deployer.deploy(SimpleBank);
  deployer.deploy(SupplyChain);
};
