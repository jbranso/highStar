//here we use the offical name to start the bootstate
var bootState = {

  //make the create function
  create: function () {

    //start the physics engine
    game.physics.startSystem (Phaser.Physics.ARCADE);

    //call the load state
    game.state.start ('load');
  }
};
