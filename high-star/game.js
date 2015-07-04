//Make the game be as big as the browser
//and load the game in the div#highStar
var game = new Phaser.Game('100%', '100%', Phaser.AUTO, 'highStar' );

//We make the various game states. Each state has a casual name and a formal name
//The boot state starts the physics system and then calls the load state
//The Load state displays the loading text, leads the assets, and calls the menu state
//The Menu state displays teh game name, gets player input and start the Play state
//The Play state is where the actual game logic is stored
//The Win state will display a simple You won message
game.state.add('boot'     , bootState);
game.state.add('load'     , loadState);
game.state.add('menu'     , menuState);
game.state.add('highStar' , highStar);
game.state.add('lose'     , loseState);
game.state.add('win'      , winState);

//After we have created the states we go ahead and call the boot state
game.state.start('boot');
