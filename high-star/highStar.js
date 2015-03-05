var highStar = {};

highStar.gameState = function (game) {
  this.player;
  //anything hard that will not move and the player can stand on.
  this.ground;
  this.platforms;
  this.ledges;
  this.ledge;
  this.ledgeVelocity = 50;
  // the ledgePosition with have 3 possible values:  0                   1                     2                  3
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
    game.load.spritesheet ( 'dude', 'assets/dude.png', 32, 48 );
    game.load.image ('ground', 'assets/platform.png');
    game.load.image ( 'star', 'assets/star.png' );
    game.load.image ( 'baddie', 'assets/baddie.png' );
    game.load.image ( 'heart',  'assets/heart.png' );
    game.load.image ( 'sky', 'assets/sky.png' );
    game.load.image ( 'rock', 'assets/rock.png' );
    game.load.image ( 'diamond', 'assets/diamond.png' );
    game.load.image ( 'restart', 'assets/restart.png' );
  },

  create: function () {

    // all this code needs work //help wanted
    this.ledge = ledges.getFirstDead ();
    this.ledge.width = randomLength[ Math.floor (Math.random() * 3) ];
    this.ledge.body.immovable = true;
    this.ledge.checkWorldBounds = true;
    this.ledge.events.onOutOfBounds.add(recycleLedge, this);
    //If this is the first time you are drawing a ledge
    this.ledge.reset ( x0, y0 );
    this.ledge.reset ( x1, y1 );
    this.ledge.reset ( x2, y2 );
    this.ledge.reset ( x3, y3 );
    this.ledge.reset ( x4, y4 );
  },

  //When the star hits the player, kill increase the score
  collectStar: function (player, star) {
    star.kill();
    this.score += 10;
    this.scoreText.text = 'Score: ' + score;
  },

  //When the rock hits the player, kill increase the score
  collectRock: function (player, rock) {
    rock.kill();
    lives -= 1;
    scoreLives.text = 'Lives: ' + lives;
  },

  //make function for collectHeart
  collectHeart: function (player, heart) {
    heart.kill();
    lives += 1;
    scoreLives.text = 'Lives: ' + lives;
  },

  collectDiamond: function (player, diamond) {
    diamond.kill();
    var x = Math.floor (player.position.x);
    var i = 1;
    // if stars already has 50+ stars, recyle 'em. Don't make more.
    if (stars.children.length > 98 ) {
      game.time.events.repeat(100, 15, recycleATempStar, this );
    } else {
      game.time.events.repeat(100, 15, createATempStar, this );
    }
    function createATempStar () {
      //if there is no original tempStar, create it.
      if (x < game.world.width / 2) {
        tempStar = stars.create (x + i * 20, 0, 'star');
      } else if (x > game.world.width / 2) {
        tempStar = stars.create (x - i * 20, 0, 'star');
      }
      i++;
      tempStar.body.gravity.y = 300;
      tempStar.checkWorldBounds = true;
      tempStar.outOfBoundsKill = true;
    }

    function recycleATempStar () {
      //if there is no original tempStar, create it.
      tempStar = stars.getFirstDead ();
      if (x < game.world.width / 2) {
        tempStar.reset (x + i * 20, 0);
      } else if (x > game.world.width / 2) {
        tempStar.reset (x - i * 20, 0);
      }
      i++;
      tempStar.body.gravity.y = 300;
      tempStar.checkWorldBounds = true;
      tempStar.outOfBoundsKill = true;
    }
  },

  //add a velocity to all alive ledges
  addVelocity: function ( ledge ) {
    ledge.body.velocity.y = ledgeVelocity;
  },

  ledgeSetWidth: function ( ledge ) {
    ledge.scale.setTo (2, 1);
    ledge.width = ledgeWidth;
  },

  create: function () {
    //  Make our game world 2000x2000 pixels in size (the default is to match the game size)
    // game.world.setBounds(0, 0, game.world.width, 2000);
    // game.camera.setPosition (0, 0);

    // Set the physics system
    game.physics.startSystem (Phaser.Physics.ARCADE);

    x0 = 0;
    x1 = game.world.width / 4;
    x2 = game.world.width / 2;
    x3 = game.world.width * ( 3 / 4);
    y0 = 0;
    y1 = game.world.height / 4;
    y2 = game.world.height / 2;
    y3 = game.world.height * (3 / 4);
    ledgeWidth = game.world.width / 4 / 1.5;
    sky = game.add.sprite (0, 0, 'sky');
    sky.width = game.world.width;
    sky.height = game.world.height;

    player = game.add.sprite(game.world.centerX, game.world.centerY, 'dude');
    game.physics.arcade.enable (player);

    // the platforms group shall be any object that is not movable, and the player can stand on it.
    platforms = game.add.group ();
    //enable physics for any object that is created in this group
    platforms.enableBody = true;

    ground = platforms.create (0, game.world.height - game.world.height * .1, 'ground');
    //scale the ground properly
    //ground.scale.setTo (2, 2);
    ground.width = game.world.width;
    ground.height = game.world.height;
    //don't let the ground move
    ground.body.immovable = true;

    //create a ledges group
    ledges = game.add.group();
    //add physics to the group
    ledges.enableBody = true;
    //ledges.forEach (ledgeSetWidth, this, false, this);
    game.physics.arcade.enable (ledges);

    // create the 4 ledges
    //use arrays x [ ],  y [ ] to put this in a for loop help wanted
    ledge = ledges.create (x0, y3, 'ground');
    ledge.width = ledgeWidth;
    ledge.body.immovable = true;
    ledge.checkWorldBounds = true;
    ledge.events.onOutOfBounds.add(recycleLedge, this);

    ledge = ledges.create (x1, y2, 'ground');
    ledge.width = ledgeWidth;
    ledge.body.immovable = true;
    ledge.checkWorldBounds = true;
    ledge.events.onOutOfBounds.add(recycleLedge, this);

    ledge = ledges.create (x2, y1, 'ground');
    ledge.width = ledgeWidth;
    ledge.body.immovable = true;
    ledge.checkWorldBounds = true;
    ledge.events.onOutOfBounds.add(recycleLedge, this);

    ledge = ledges.create (x3, y0, 'ground');
    ledge.width = ledgeWidth;
    ledge.body.immovable = true;
    ledge.checkWorldBounds = true;
    ledgeXPosition = "x3";
    ledge.events.onOutOfBounds.add(recycleLedge, this);

    function recycleLedge(ledge) {
      //  Move the alien to the top of the screen again
      switch (ledgeXPosition) {
      case "x0":
        ledge.reset(x1, 0);
        ledgeXPosition = "x1";
        break;
      case "x1":
        if (Math.floor ( Math.random() * 2)) {
          ledge.reset(x0, 0);
          ledgeXPosition = "x0";
        } else {
          ledge.reset(x2, 0);
          ledgeXPosition = "x2";
        }
        break;
      case "x2":
        if (Math.floor ( Math.random() * 2)) {
          ledge.reset(x1, 0);
          ledgeXPosition = "x1";
        } else {
          ledge.reset(x3, 0);
          ledgeXPosition = "x3";
        }
        break;
      case "x3":
        ledge.reset(x2, 0);
        ledgeXPosition = "x2";
        break;
      default:
        alert ("your switch statement is broken");
      }
    }

    //how fast the player falls
    player.body.gravity.y = 600;
    // if the player will collide with the world
    player.body.collideWorldBounds = true;

    player.animations.add ('left', [0, 1, 2, 3], 10, true);
    player.animations.add ('right', [5, 6, 7, 8], 10, true);

    cursors = game.input.keyboard.createCursorKeys ();

    // ---------------------- Falling things --------------------------- //

    // make stars its own group
    stars = game.add.group ();

    //enable physics for this group
    stars.enableBody = true;

    //add a timer that will make a new star every 300 milliseconds and place it randomonly on the screen
    starsTimer = game.time.events.loop(1009, addNewStar, this);

    function addNewStar () {
      if (stars.children.length < 99 ) {
        star = stars.create ( Math.floor (Math.random() * game.world.width ), 0, 'star');
        star.body.gravity.y = 300;
        star.checkWorldBounds = true;
        star.outOfBoundsKill = true;
      } else {
        recycleStar ();
      }
    }

    function recycleStar () {
      star = stars.getFirstDead ();
      star.reset (Math.floor (Math.random() * game.world.width ), 0);
    }

    //make rocks its own group
    rocks = game.add.group ();
    //enable physics for the group
    rocks.enableBody = true;
    //add a timer that will add a new rock and place it randomly on the screen
    //in the addNewRock, function, subtract 1 from the lives variable
    rocksTimer = game.time.events.loop (30011, addNewRock, this);

    function addNewRock () {
      rock = rocks.create ( Math.floor (Math.random() * game.world.width ), 0, 'rock');
      rock.body.gravity.y = 300;
      rock.checkWorldBounds = true;
      rock.outOfBoundsKill = true;
    }

    //make a hearts game.add, enableBody =true, and heartsTimer //help wanted

    hearts = game.add.group ();
    hearts.enableBody = true ;
    heartsTimer = game.time.events.loop (60000, addNewHeart, this);

    function addNewHeart () {
      heart = hearts.create ( Math.floor (Math.random() * game.world.width ), 0, 'heart');
      heart.body.gravity.y = 300;
      heart.checkWorldBounds = true;
      heart.outOfBoundsKill = true;
    }

    diamonds = game.add.group ();
    diamonds.enableBody = true ;
    diamondsTimer = game.time.events.loop (10007, addNewDiamond, this);

    function addNewDiamond () {
      diamond = diamonds.create ( Math.floor (Math.random() * game.world.width ), 0, 'diamond');
      diamond.body.gravity.y = 300;
      diamond.checkWorldBounds = true;
      diamond.outOfBoundsKill = true;
    }

    // ---------------------- Falling things --------------------------- //


    scoreText = game.add.text (game.world.width - game.world.width * .99, 16, 'score:0', {fontSize: '32px', fill: '#000' });

    scoreLives = game.add.text (game.world.width - game.world.width * .1, 16, 'lives:5', {fontSize: '32px', fill: '#000' });

  },

  update: function () {
    if ( gameValue == "blocked" ) {
      //do not update the game at all
    } else {

      // if(userClicksRestart() || (lives == 0)){ // Check to see the game needs restarting
      //if the user has lost all of his lives...
      if ( lives == 0) {
        score = 0;   // Reset the score to zero
        lives = 5;
        ledges.kill();
        player.kill();
        diamonds.kill();
        hearts.kill();
        rocks.kill();
        restartImage = game.add.sprite(game.world.centerX, game.world.centerY, 'einstein');
        //center the image well
        restartImage.anchor.set(0.5);
        //  Enables all kind of input actions on this image (click, etc)
        restartImage.inputEnabled = true;
        restartImage.events.onInputDown.add(restartGame, this);
        gameValue = "blocked";
      }

      //collide the player with the platforms
      game.physics.arcade.collide (player, platforms);
      game.physics.arcade.overlap (player, stars, collectStar, null, this);
      game.physics.arcade.collide (player, ledges);
      ledges.forEachAlive (addVelocity, this, this);

      game.physics.arcade.overlap (player, rocks, collectRock, null, this);

      game.physics.arcade.overlap (player, hearts, collectHeart, null, this)

      game.physics.arcade.overlap (player, diamonds, collectDiamond, null, this)
      //make function for collectDiamond

      player.body.velocity.x = 0;
      if (cursors.left.isDown) {
        // move to the left
        player.body.velocity.x = -250;
        player.animations.play ('left');
      } else if (cursors.right.isDown) {
        //move to the right
        player.body.velocity.x = 250;
        player.animations.play ('right');
      } else {
        //stop moving
        player.animations.stop();
        //make the player look at you.
        player.frame = 4;
      }
      //  allow the player to jump!!!
      if (cursors.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -450;
      }

    }
  }
};

var game = new Phaser.Game(100%, 100%, Phaser.AUTO, 'highStar' );

game.state.add('gameState', P2Game.gameState);
game.state.add('StateB', P2Game.StateB);
game.state.add('StateC', P2Game.StateC);

game.state.start('gameState');
