var menuState = {
  create: function () {

    //Display the name of the game
    var nameLable = game.add.text(80, 80, 'My First Game',
                                  { font: '50px Arial', fill: '#ffffff' });

    //Give the play instructions on how to start the game
    var startLable = game.add.text( 80, game.world.height - 80,
                                    "press w key to start",
                                    {font: '25px Arial', fill: '#ffffff' });

    //define a key so that when the player presses W we can start the game
    var wkey = game.input.keyboard.addKey (Phaser.Keyboard.w);

    //When the player plesses the W key, we call the start function
    wkey.onDown.addOnce (this.start, this);
  },

  //The start function calls the play state
  start: function () {
    game.state.start ('highStar');
  }
};
