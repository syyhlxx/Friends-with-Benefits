var FriendsWithBenefits = artifacts.require("./FriendsWithBenefits.sol");

module.exports = function(deployer) {
  deployer.deploy(FriendsWithBenefits);
};
