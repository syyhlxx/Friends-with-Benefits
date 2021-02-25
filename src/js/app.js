App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // TODO: refactor conditional
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
      //web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("FriendsWithBenefits.json", function(friendswithbenefits) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.FriendsWithBenefits = TruffleContract(friendswithbenefits);
      // Connect provider to interact with contract
      App.contracts.FriendsWithBenefits.setProvider(App.web3Provider);

      return App.render();
    });
  },

  render: function() {
    var FWB;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });


    // Load Friends with Benefits contract data
    App.contracts.FriendsWithBenefits.deployed().then(function(instance) {
      FWB = instance;
      return FWB.crew();
    }).then(function(crew) {
      var friendZone = $("#relationshipStatus");
      friendZone.empty();

      var friendSelect = $("#friendSelect");
      friendSelect.empty();

      //Iterate through each friend property.
      for (var i = 1; i <= crew; i++) {
        FWB.friends(i).then(function(friend) {

          var Id = friend[0];
          var name = friend[1];
          var chaudacity = friend[2];
          var restrictions = friend[3];
          var violations = friend[4];

          // Render Friend Zone individual friend data.
          var displayTemplate = "<tr><th>" + Id + "</th><td>"
          + name + "</td><td>" + chaudacity + "</td><td>" + restrictions +
          "</td><td>" + violations + "</td><td>"
           "</tr></th>"
          friendZone.append(displayTemplate);

          // Render friend who will recieve the input.
         var relevantParty = "<option value= '" + Id + "' >" + name + "  " + chaudacity + " </ option>"
        friendSelect.append(relevantParty);
        });
      }

      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
},// End function


  // This block is called in the html and doesn't take a value.
    assertBreach: function() {
      var friendId = $('#friendSelect').val() || [];

    //  console.log(friendId);
    // Call the friends with benefits smart contract here passing in the
    // Id of the selected friend to either assert, revoke breach or clear
    // record...etc.
      App.contracts.FriendsWithBenefits.deployed().then(function(instance) {
        return instance.breachOfContract(friendId, { from: App.account });
      }).then(function(result) {

        // Wait for votes to update
       $("#content").hide();
       $("#loader").show();
      }).catch(function(err) {
        console.error(err);
      });
    },

    revokeBreach: function() {
      var friendId = $('#friendSelect').val();
      console.log(friendId);
      App.contracts.FriendsWithBenefits.deployed().then(function(instance) {
        return instance.revokeBreach(friendId, { from: App.account });
        // Here is where the smart contract function *breach is called
        //passing a value.

        console.log(friendId);
      }).then(function(result) {

        // Wait for votes to update
        $("#content").hide();
        $("#loader").show();
      }).catch(function(err) {
        console.error(err);
      });
    }

  };


$(function() {
  $(window).load(function() {
    App.init();
  });
});
