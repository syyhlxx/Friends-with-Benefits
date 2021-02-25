pragma solidity ^0.5.0;

contract FriendsWithBenefits{

	//Model a friend
	struct Friend{
	uint id;
	string name;
	string chaudacity;
	string restrictions;
	uint violations;
	// Declarations must follow order in which they appear
	// in the constructor.

	}

	//Store Friends
	//Fetch Friends
	mapping(uint => Friend) public friends;
	//mapping(address => bool) public voters;

	//Store friends count
	uint public crew;

	 // voted event
    event votedEvent (
        uint indexed _candidateId
    );


	//Constructor
	constructor() public {

		//Automatically add friends to the contract.
		addFriend(crew,"Friend 000","Alpha","No raw dawgin randoms.",100);
		addFriend(crew,"Friend 001","Beta Orbiter","No cuddling.",0);
		addFriend(crew,"Friend 010","Theta","No shared feelings.",1);
		addFriend(crew,"Friend 011","Zeta Orbiter","No holding hands.", 0);

	}

	function addFriend(uint _index, string memory _name, string memory _chaudacity,
		string memory _restrictions, uint _violations) private {
		crew ++;

		friends[crew] = Friend(crew, _name, _chaudacity, _restrictions, _violations);
	}

	function getCrew(uint _index) public{
		//return friends[_index].value;
	}

	function breachOfContract(uint _index) public {
		//Update friend violations.
		friends[_index].violations++;

    // record that voter has voted
    voters[msg.sender] = true;
	}

	function revokeBreach(uint _index) public {
		//Update friend violations.
		friends[_index].violations--;

		// record that voter has voted
		//	voters[msg.sender] = true;
	}

	function eraseRecord(uint _index) public {
		//Update friend violations.
		friends[_index].violations = 0;
	}

}
