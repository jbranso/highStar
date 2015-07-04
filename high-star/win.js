var winState = {
  create: function () {
    var winLabel = game.add.text(80, 80, 'You Won!',
                                 {font: '50px Arial', fill: '#00FF00' });

    //explain to the player how to restart
    var startLabel = game.add.text(80, game.world.height - 80,
                                   'press the W key to restart',
                                   { font: '25px Arial', fill: '#ffffff' });

    //define the w key so we can use it to restart
    var wkey = game.input.keyboard.addKey (Phaser.Keyboard.W);

    //when the player presses the W key, call the restart function
    wkey.onDown.addOnce (this.restart, this);
  },

  //the restart function calls the menu state
  restart: function () {
    game.state.start ('menu');

  }
};
