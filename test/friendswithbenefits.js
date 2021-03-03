
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
		assert.equal(friends[0],1, "Has the correct index.")
		assert.equal(friends[1],"Friend 000","Has the correct designation.")
		assert.equal(friends[2],"Alpha","Has the correct chaudacity.")
		assert.equal(friends[3],"No raw dawgin randoms.","Has the correct restriction(s).")
		assert.equal(friends[4],100,"Has the correct number of violations.")

		return fwbInstance.friends(2);
	}).then(function(friends){
		assert.equal(friends[0],2,"Has the correct index.")
		assert.equal(friends[1],"Friend 001","Has the correct designation.")
		assert.equal(friends[2],"Beta Orbiter","Has the correct chaudacity.")
		assert.equal(friends[3],"No cuddling.","Has the correct restriction(s).")
		assert.equal(friends[4],0,"Has the correct number of violations.")

		return fwbInstance.friends(3);
	}).then(function(friends){
		assert.equal(friends[0],3,"Has the correct index.")
		assert.equal(friends[1],"Friend 010","Has the correct designation.")
		assert.equal(friends[2],"Theta Orbiter","Has the correct chaudacity.")
		assert.equal(friends[3],"No shared feelings.","Has the correct restriction(s).")
		assert.equal(friends[4],1,"Has the correct number of violations.")
	});
  });

});//Friends with Benefits contract test frame
