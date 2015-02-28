
//Set up the phaser game.
var game = new Phaser.Game ('100%', '100%', Phaser.AUTO, 'myDiv', {preload: preload, create: create, update: update});


// function init() {
//   game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
// }

function preload () {
  game.load.spritesheet ( 'dude', 'assets/dude.png', 32, 48 );
  game.load.image ('ground', 'assets/platform.png');
  game.load.image ( 'star', 'assets/star.png' );
  game.load.image ( 'baddie', 'assets/baddie.png' );
  game.load.image ( 'heart',  'assets/heart.png' );
  game.load.image ( 'sky', 'assets/sky.png' );
}

var player;
var platforms;
var stars;
var score = 0;
var scoreText;


function create () {
  // Set the physics system
  game.physics.startSystem (Phaser.Physics.ARCADE);

  game.add.sprite (0, 0, 'sky');

  // // the platforms group shall be any object that is not movable, and the player can stand on it.
  platforms = game.add.group ();
  // //enable physics for any object that is created in this group
  platforms.enableBody = true;

  var ground = platforms.create (0, game.world.height - game.world.height * .1, 'ground');
  //scale the ground properly
  ground.scale.setTo (2, 2);
  //don't let the ground move
  ground.body.immovable = true;


  // Display the bird on the screen
  player = game.add.sprite (32, game.world.height - 150, 'dude');
  //player.body.collideWorldBounds = true;
  player.body.gravity.y = 300;

  game.physics.arcade.enable (player);

}

function  update () {
  //collide the player with the platforms
  game.physics.arcade.collide (player, platforms);

}
