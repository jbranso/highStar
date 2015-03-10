var highStar = {};

var ledgeVelocity1 = 300;

highStar.gameState = function (game) {
  this.player;
  //anything hard that will not move and the player can stand on.
  this.ground;
  this.platforms;
  this.ledges;
  this.ledge;
  this.ledgeVelocity = 500;
  // the ledgePosition with have 3 possible values:  "x0"                   "x1"                     "x2"                  "x3"
  // It will be the X position on the screen where the highest ledge is.
  // It will determine where the next ledge will be put on the screen
  this.ledgeXPosition;
  // This will store thethis.alue of the ledges width
  this.ledgeWidth;
  this.stars;
  this.starsTimer;
  this.rocks;
  this.rocksTimer;
  this.hearts;
  this.heartsTimer;
  this.diamonds;
  this.diamondsTimer;
  //the object that will record user input via the arrow keys
  this.tempStar;
  this.cursors;
  this.sky;
  this.lives = 5;
  this.scoreLives;
  this.score = 0;
  this.scoreText;
  this.i = 1;
  this.x;
  //these will store the values of the various places on the screen I can put a ledge.
  // This is much easier than saying game.world.width / 2;
  this.x0;
  this.x1;
  this.x2;
  this.x3;
  this.y0;
  this.y1;
  this.y2;
  this.y3;
  this.restartImage;
};

highStar.gameState.prototype = {

  preload: function () {
    this.load.spritesheet ( 'dude', 'assets/dude.png', 32, 48 );
    this.load.image ('ground', 'assets/platform.png');
    this.load.image ( 'star', 'assets/star.png' );
    this.load.image ( 'baddie', 'assets/baddie.png' );
    this.load.image ( 'heart',  'assets/heart.png' );
    this.load.image ( 'sky', 'assets/sky.png' );
    this.load.image ( 'rock', 'assets/rock.png' );
    this.load.image ( 'diamond', 'assets/diamond.png' );
    this.load.image ( 'restart', 'assets/restart.png' );
  },

  addNewStar: function (stars, star) {
    if (this.stars.children.length < 99 ) {
      this.star = this.stars.create ( Math.floor (Math.random() * game.world.width ), 0, 'star');
      this.star.body.gravity.y = 300;
      this.star.checkWorldBounds = true;
      this.star.outOfBoundsKill = true;
    } else {
      this.star.recycleStar ();
    }
  },

  addNewRock: function (rock) {
    this.rock = this.rocks.create ( Math.floor (Math.random() * game.world.width ), 0, 'rock');
    this.rock.body.gravity.y = 300;
    this.rock.checkWorldBounds = true;
    this.rock.outOfBoundsKill = true;
  },

  addNewHeart: function (heart) {
    this.heart = this.hearts.create ( Math.floor (Math.random() * game.world.width ), 0, 'heart');
    this.heart.body.gravity.y = 300;
    this.heart.checkWorldBounds = true;
    this.heart.outOfBoundsKill = true;
  },

  addNewDiamond: function (diamond) {
    this.diamond = this.diamonds.create ( Math.floor (Math.random() * game.world.width ), 0, 'diamond');
    this.diamond.body.gravity.y = 300;
    this.diamond.checkWorldBounds = true;
    this.diamond.outOfBoundsKill = true;
  },

  createATempStar: function (player, star) {
    //if there is no original tempStar, create it.
    if (this.x < (game.world.width / 2)) {
      this.star = this.stars.create (this.x + this.i * 20, 0, 'star');
    } else if (this.x  > (game.world.width / 2)) {
      this.star = this.stars.create (this.x - this.i * 20, 0, 'star');
    }
    this.i++;
    this.star.body.gravity.y = 300;
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
  },

  //When the star hits the player, kill increase the score
  collectStar: function (player, star) {
    this.star.kill();
    this.score += 10;
    this.scoreText.text = 'Score: ' + this.score;
  },

  //When the rock hits the player, kill increase the score
  collectRock: function (player, rock) {
    this.rock.kill();
    this.lives -= 1;
    this.scoreLives.text = 'Lives: ' + this.lives;
  },

  //make function for collectHeart
  collectHeart: function (player, heart) {
    this.heart.kill();
    this.lives += 1;
    this.text = 'Lives: ' + this.lives;
  },

  collectDiamond: function (player, diamond) {
    this.diamond.kill();
    this.x = Math.floor (player.position.x);
    this.i = 1;
    // if stars already has 50+ stars, recyle 'em. Don't make more.
    if (this.stars.children.length > 98 ) {
      this.game.time.events.repeat(100, 15, this.recycleATempStar, this );
    } else {
      this.game.time.events.repeat(100, 15, this.createATempStar, this );
    }
  },

  ledgeSetWidth: function ( ledge ) {
    this.ledge.width = this.ledgeWidth;
  },

  recycleStar: function (stars) {
    this.star = this.stars.getFirstDead ();
    this.star.reset (Math.floor (Math.random() * this.game.world.width ), 0);
  },

  recycleATempStar: function (stars) {
    //if there is no original tempStar, create it.
    this.stars = this.getFirstDead ();
    if (this < game.world.width / 2) {
      this.reset (this.x + this.i * 20, 0);
    } else if (this.x > game.world.width / 2) {
      this.reset (this.x - this.i * 20, 0);
    }
    this.i++;
    this.body.gravity.y = 300;
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
  },

  recycleLedge: function (ledge, ledgeXPosition) {
    //  Move the alien to the top of the screen again
    switch (ledgeXPosition) {
    case "x0":
      ledge.reset(this.x1, 0);
      ledgeXPosition = "x1";
      break;
    case "x1":
      if (Math.floor ( Math.random() * 2)) {
        ledge.reset(this.x0, 0);
        ledgeXPosition = "x0";
      } else {
        ledge.reset(this.x2, 0);
        ledgeXPosition = "x2";
      }
      break;
    case "x2":
      if (Math.floor ( Math.random() * 2)) {
        ledge.reset(this.x1, 0);
        ledgeXPosition = "x1";
      } else {
        ledge.reset(this.x3, 0);
        ledgeXPosition = "x3";
      }
      break;
    case "x3":
      ledge.reset(this.x2, 0);
      ledgeXPosition = "x2";
      break;
    default:
      alert ("your switch statement is broken");
      break;
    }
  },

  create: function () {
    //  Make our game world 2000x2000 pixels in size (the default is to match the game size)
    // game.world.setBounds(0, 0, game.world.width, 2000);
    // game.camera.setPosition (0, 0);

    // Set the physics system
    this.game.physics.startSystem (Phaser.Physics.ARCADE);

    this.x0 = 0;
    this.x1 = this.game.world.width / 4;
    this.x2 = this.game.world.width / 2;
    this.x3 = this.game.world.width * ( 3 / 4);
    this.y0 = 0;
    this.y1 = this.game.world.height / 4;
    this.y2 = this.game.world.height / 2;
    this.y3 = this.game.world.height * (3 / 4);
    this.ledgeWidth = this.game.world.width / 4 / 1.5;
    this.sky = this.add.sprite (0, 0, 'sky');
    this.sky.width = this.game.world.width;
    this.sky.height = this.game.world.height;

    this.player = this.add.sprite(game.world.centerX, game.world.centerY, 'dude');
    this.game.physics.arcade.enable (this.player);

    // the platforms group shall be any object that is not movable, and the player can stand on it.
    this.platforms = game.add.group ();
    //enable physics for any object that is created in this group
    this.platforms.enableBody = true;

    this.ground = this.platforms.create (0, game.world.height - game.world.height * .1, 'ground');
    //scale the ground properly
    //ground.scale.setTo (2, 2);
    this.ground.width = game.world.width;
    this.ground.height = game.world.height;
    //don't let the ground move
    this.ground.body.immovable = true;

    //create a ledges group
    this.ledges = this.game.add.group();
    //add physics to the group
    this.ledges.enableBody = true;
    //ledges.forEach (ledgeSetWidth, this, false, this);
    game.physics.arcade.enable (this.ledges);

    // create the 4 ledges
    // //use arrays x [ ],  y [ ] to put this in a for loop help wanted
    // this.ledge = this.ledges.create (this.x0, this.y3, 'ground');
    // this.ledge.width = this.ledgeWidth;
    // this.ledge.body.immovable = true;
    // this.ledge.checkWorldBounds = true;
    // this.ledge.events.onOutOfBounds.add(this.recycleLedge, this);

    // this.ledge = this.ledges.create (this.x1, this.y2, 'ground');
    // this.ledge.width = this.ledgeWidth;
    // this.ledge.body.immovable = true;
    // this.ledge.checkWorldBounds = true;
    // this.ledge.events.onOutOfBounds.add(this.recycleLedge, this);

    // this.ledge = this.ledges.create (this.x2, this.y1, 'ground');
    // this.ledge.width = this.ledgeWidth;
    // this.ledge.body.immovable = true;
    // this.ledge.checkWorldBounds = true;
    // this.ledge.events.onOutOfBounds.add(this.recycleLedge, this);

    // this.ledge = this.ledges.create (this.x3, this.y0, 'ground');
    // this.ledge.width = this.ledgeWidth;
    // this.ledge.body.immovable = true;
    // this.ledge.checkWorldBounds = true;
    // this.ledge.events.onOutOfBounds.add(this.recycleLedge, this);
    this.ledges.createMultiple (4, 'ground');

    this.ledge = this.ledges.getFirstDead ();
    this.ledge.reset (this.x0, this.y0);
    this.ledge.width = this.ledgeWidth;
    this.ledge.body.immovable = true;
    this.ledge.checkWorldBounds = true;
    this.ledge.events.onOutOfBounds.add(this.recycleLedge, this, this.ledge, this.ledgeXPosition);

    this.ledge = this.ledges.getFirstDead ();
    this.ledge.reset (this.x1, this.y1);
    this.ledge.width = this.ledgeWidth;
    this.ledge.body.immovable = true;
    this.ledge.checkWorldBounds = true;
    this.ledge.events.onOutOfBounds.add(this.recycleLedge, this, this.ledge, this.ledgeXPosition);
    this.ledgeXPosition = "x1";


    //how fast the player falls
    this.player.body.gravity.y = 600;
    // if the player will collide with the world
    this.player.body.collideWorldBounds = true;

    this.player.animations.add ('left', [0, 1, 2, 3], 10, true);
    this.player.animations.add ('right', [5, 6, 7, 8], 10, true);

    this.cursors = game.input.keyboard.createCursorKeys ();

    // ---------------------- Falling things --------------------------- //

    // make stars its own group
    this.stars = game.add.group ();

    //enable physics for this group
    this.stars.enableBody = true;

    //add a timer that will make a new star every 300 milliseconds and place it randomonly on the screen
    //this.starsTimer = this.game.time.events.loop(1009, this.addNewStar, this);


    //make rocks its own group
    this.rocks = this.game.add.group ();
    //enable physics for the group
    this.rocks.enableBody = true;
    //add a timer that will add a new rock and place it randomly on the screen
    //in the addNewRock, function, subtract 1 from the lives variable
    //this.rocksTimer = this.game.time.events.loop (30011, this.addNewRock, this);

    //make a hearts game.add, enableBody =true, and heartsTimer //help wanted

    this.hearts = game.add.group ();
    this.hearts.enableBody = true ;
    //this.heartsTimer = game.time.events.loop (60000, this.addNewHeart, this);

    this.diamonds = game.add.group ();
    this.diamonds.enableBody = true ;
    //this.diamondsTimer = game.time.events.loop (10007, this.addNewDiamond, this);

    this.scoreText = game.add.text (game.world.width - game.world.width * .99, 16, 'score:0', {fontSize: '32px', fill: '#000' });
    this.scoreLives = game.add.text (game.world.width - game.world.width * .1, 16, 'lives:5', {fontSize: '32px', fill: '#000' });

  },
  //add a velocity to all alive ledges
  addVelocity: function ( ledge ) {
    ledge.body.velocity.y = ledgeVelocity1;
    // for (var i = 0; i < 4; i++) {
    //   game.state.getCurrentState().ledges.getAt(i).body.velocity.y = ledgeVelocity1;
    // }
  },

  update: function () {
    // if(userClicksRestart() || (lives == 0)){ // Check to see the game needs restarting
    //if the user has lost all of his lives...
    if ( this.lives == 0) {
      this.state.start ('gameEnd');
    }

    //collide the player with the platforms
    game.physics.arcade.collide (this.player, this.platforms);
    game.physics.arcade.collide (this.player, this.ledges);

    // ---------------------- Falling things --------------------------- //
    //college the player with any falling thing
    game.physics.arcade.overlap (this.player, this.stars, this.collectStar, null, this);
    game.physics.arcade.overlap (this.player, this.rocks, this.collectRock, null, this);
    game.physics.arcade.overlap (this.player, this.hearts, this.collectHeart, null, this)
    game.physics.arcade.overlap (this.player, this.diamonds, this.collectDiamond, null, this)
    this.ledges.forEachAlive (this.addVelocity, this, this);
    //this.ledges.forEachExists (this.addVelocity, this, this);

    //make function for collectDiamond
    this.player.body.velocity.x = 0;
    if (this.cursors.left.isDown) {
      // move to the left
      this.player.body.velocity.x = -250;
      this.player.animations.play ('left');
    } else if (this.cursors.right.isDown) {
      //move to the right
      this.player.body.velocity.x = 250;
      this.player.animations.play ('right');
    } else {
      //stop moving
      this.player.animations.stop();
      //make the player look at you.
      this.player.frame = 4;
    }
    //  allow the player to jump!!!
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.body.velocity.y = -450;
    }
  },

  gameEnd: function () {
    this.changeTimer = this.game.time.events.add(3000, this.gameEnd, this);
  },

};


highStar.gameEnd = function (game) {

};

highStar.gameEnd.prototype = {

};

var game = new Phaser.Game('100%', '100%', Phaser.AUTO, 'highStar' );

game.state.add('gameState', highStar.gameState);
game.state.add('gameEnd', highStar.gameEnd);
game.state.add('StateC', highStar.StateC);

game.state.start('gameState');
