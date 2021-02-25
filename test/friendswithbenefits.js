
var FriendsWithBenefits = artifacts.require("./FriendsWithBenefits.sol");

contract("FriendsWithBenefits", function(accounts){

it("Initialized with four buddies", function(){
	return FriendsWithBenefits.deployed().then(function(instance){
		return instance.crew();
	}).then(function(count){
		assert.equal(count, 4);
	});

});// Initialization test

it("Initialize the crew with the appropriate restrictions.", function(){

	return FriendsWithBenefits.deployed().then(function(instance){
		fwbInstance = instance;

		return fwbInstance.friends(1);
	}).then(function(friends){
		assert.equal(friends[0],"Friend 000","Has the correct designation.")
		assert.equal(friends[1],"No holding hands","Has the correct benefits.")
		assert.equal(friends[2],8675309,"Has the correct cell number.")
		assert.equal(friends[3],1,"Has the correct number of violations.")

		return fwbInstance.friends(2);
	}).then(function(friends){
		assert.equal(friends[0],"Friend 001","Has the correct designation.")
		assert.equal(friends[1],"No shared feelings","Has the correct benefits.")
		assert.equal(friends[2],555777,"Has the correct cell number.")
		assert.equal(friends[3],0,"Has the correct number of violations.")

		return fwbInstance.friends(3);
	}).then(function(friends){
		assert.equal(friends[0],"Friend 010","Has the correct designation.")
		assert.equal(friends[1],"No cuddling","Has the correct benefits.")
		assert.equal(friends[2],222111,"Has the correct cell number.")
		assert.equal(friends[3],8,"Has the correct number of violations.")
	});
  });


});//Friends with Benefits contract test frame