const Parking = artifacts.require("parkingSystem.sol");

module.exports = function(deployer){
    deployer.deploy(Parking);
}