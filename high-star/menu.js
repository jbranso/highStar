var menuState = {
  create: function () {

    //create the blue background
    var out = [];
    var bmd = game.add.bitmapData(game.world.width, game.world.height);
    bmd.addToWorld();

    var y = 0;

    for (var i = 0; i < game.world.height / 2; i++)
    {
      var c = Phaser.Color.interpolateColor(0x009acd, 0x87ceeb, game.world.height / 2, i);

      // console.log(Phaser.Color.getWebRGB(c));

      bmd.rect(0, y, game.world.width, game.world.height, Phaser.Color.getWebRGB(c));

      out.push(Phaser.Color.getWebRGB(c));

      y += 2;
    }

    //Display the name of the game
    var nameLable = game.add.text(game.world.centerX -150, 80, 'High Star',
                                  { font: '50px Arial', fill: '#ffffff', align: 'center' });
    nameLable.setShadow (3, 3, 'rgba(0,0,0,0.5)', 5);

    //Give the play instructions on how to start the game
    var startLable = game.add.text( 80, game.world.height - 80,
                                    "press T key to start",
                                    {font: '25px Arial', fill: '#ffffff' });
    startLable.setShadow (3, 3, 'rgba(0,0,0,0.5)', 5);

    //define a key so that when the player presses W we can start the game
    var tkey = game.input.keyboard.addKey (Phaser.Keyboard.T);

    //When the player plesses the W key, we call the start function
    tkey.onDown.addOnce (this.start, this);

    var button = game.add.button (game.world.centerX - 200, game.world.centerY - 50, 'fullscreen', function () {
      if (game.scale.isFullScreen)
      {
        game.scale.stopFullScreen();
      }
      else
      {
        game.scale.startFullScreen(false);
      }
    }, this);
  },

  //The start function calls the play state
  start: function () {
    game.state.start ('play');
  }
};
