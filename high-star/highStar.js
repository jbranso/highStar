var highStar = {};

highStar.gameState = function (game) {
  this.player;
  //anything hard that will not move and the player can stand on.
  this.ground;
  this.platforms;
  this.ledges;
  this.ledge;
  this.ledgeVelocity = 50;
  // the ledgePosition with have 3 possible values:  "x0"                   "x1"                     "x2"                  "x3"
  // It will be the X position on the screen where the highest ledge is.
  // It will determine where the next ledge will be put on the screen
  this.ledgeXPosition;
  // This will store thethis.alue of the ledges width
  this.ledgeWidth;
  //This is the individual star falling on the screen
  this.star;
  //this is the object from which I can create more individual stars
  this.stars;
  //This is the individual temp star that falls after I hit a diamond.
  this.tempStar;
  //This is the object that produces more temp stars when I a diamond
  this.tempStars;
  this.starsTimer;
  this.rocks;
  this.rock;
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
  //This is the variable that is displayed on the screen as my score
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

  //The first argument is the child star
  starsAddGravity: function (star) {
    star.body.gravity.y = 300;
    star.checkWorldBounds = true;
    star.outOfBoundsKill = true;
  },

  //The first argument is the child star
  tempStarsAddGravity: function (tempStar) {
    tempStar.body.gravity.y = 300;
    tempStar.checkWorldBounds = true;
    tempStar.outOfBoundsKill = true;
  },

  recycleRock: function (rock) {
    var rock = this.rocks.getFirstDead();
    rock.reset ( Math.floor (Math.random() * game.world.width ), 0);
    rock.body.gravity.y = 300;
    rock.checkWorldBounds = true;
    rock.outOfBoundsKill = true;
  },

  recycleHeart: function (timer) {
    var heart = this.hearts.getFirstDead();
    if ( Math.floor( Math.random() * 2)) {
      heart.reset ( Math.floor (this.player.position.x) + this.ledgeWidth * Math.random() / 2, 0);
    } else {
      heart.reset  ( Math.floor (this.player.position.x) - this.ledgeWidth * Math.random() / 3, 0);
    }
    //this.heart = this.hearts.create ( Math.floor (Math.random() * game.world.width ), 0, 'heart');
    heart.body.gravity.y = 300;
    heart.checkWorldBounds = true;
    heart.outOfBoundsKill = true;
  },

  recycleDiamond: function (timer) {
    var diamond = this.diamonds.getFirstDead();
    if ( Math.floor( Math.random() * 2)) {
      diamond.reset ( Math.floor (this.player.position.x) + this.ledgeWidth * Math.random() / 2, 0);
    } else {
      diamond.reset ( Math.floor (this.player.position.x) - this.ledgeWidth * Math.random() / 2, 0);
    }
    diamond.body.gravity.y = 300;
    diamond.checkWorldBounds = true;
    diamond.outOfBoundsKill = true;
  },

  deleteGround: function (ground) {
    this.ground.kill();
  },

  //When the star hits the player, kill increase the score
  collectStar: function (player, star) {
    star.kill();
    this.score += 10;
    this.scoreText.text = 'Score: ' + this.score;
  },

  //When the star hits the player, kill increase the score
  collectTempStar: function (player, tempStar) {
    tempStar.kill();
    this.score += 10;
    this.scoreText.text = 'Score: ' + this.score;
  },

  //When the rock hits the player, kill increase the score
  collectRock: function (player, rock) {
    rock.kill();
    this.lives -= 1;
    this.scoreLives.text = 'Lives: ' + this.lives;
  },

  //make function for collectHeart
  collectHeart: function (player, heart) {
    heart.kill();
    this.lives += 1;
    this.scoreLives.text = 'Lives: ' + this.lives;
  },

  collectDiamond: function (player, diamond) {
    diamond.kill();
    this.x = Math.floor (player.position.x);
    this.i = 1;
    // if stars already has 50+ stars, recyle 'em. Don't make more.
    this.game.time.events.repeat(100, 15, this.recycleATempStar, this );
  },

  ledgeSetWidth: function ( ledge ) {
    ledge.width = this.ledgeWidth;
  },

  //this makes stars fall from the top
  recycleStar: function (timer) {
    var star = this.stars.getFirstDead ();
    if ( Math.floor( Math.random() * 2)) {
      star.reset (this.player.position.x + Math.random() * this.ledgeWidth / 2, 0);
    } else {
      star.reset (this.player.position.x - Math.random() * this.ledgeWidth / 2, 0);
    }
    star.body.gravity.y = 300;
    star.checkWorldBounds = true;
    star.outOfBoundsKill = true;
  },

  //This is the function that is called when the player hits a diamond
  recycleATempStar: function (tempStars) {
    //if there is no original tempStar, create it.
    this.tempStar = this.tempStars.getFirstDead ();
    if (this.x < game.world.width / 2) {
      this.tempStar.reset (this.x + this.i * 20, 0);
    } else if (this.x > game.world.width / 2) {
      this.tempStar.reset (this.x - this.i * 20, 0);
    }
    this.i++;
    this.tempStar.body.gravity.y = 300;
    this.tempStar.checkWorldBounds = true;
    this.tempStar.outOfBoundsKill = true;
  },

  recycleLedge: function (ledge) {
    //  Move the alien to the top of the screen again
    switch (this.ledgeXPosition) {
    case "x0":
      ledge.reset(this.x1, 0);
      this.ledgeXPosition = "x1";
      break;
    case "x1":
      if (Math.floor ( Math.random() * 2)) {
        ledge.reset(this.x0, 0);
        this.ledgeXPosition = "x0";
      } else {
        ledge.reset(this.x2, 0);
        this.ledgeXPosition = "x2";
      }
      break;
    case "x2":
      if (Math.floor ( Math.random() * 2)) {
        ledge.reset(this.x1, 0);
        this.ledgeXPosition = "x1";
      } else {
        ledge.reset(this.x3, 0);
        this.ledgeXPosition = "x3";
      }
      break;
    case "x3":
      ledge.reset(this.x2, 0);
      this.ledgeXPosition = "x2";
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
    this.groundTimer = this.game.time.events.loop(5000, this.deleteGround, this);
    this.groundTimer.autoDestroy = true;

    //create a ledges group
    this.ledges = this.game.add.group();
    //add physics to the group
    this.ledges.enableBody = true;
    //ledges.forEach (ledgeSetWidth, this, false, this);
    game.physics.arcade.enable (this.ledges);

    this.ledges.createMultiple (4, 'ground');
    this.ledge = this.ledges.getFirstDead ();
    this.ledge.reset (this.x0, this.y0);
    this.ledge.width = this.ledgeWidth;
    this.ledge.body.immovable = true;
    this.ledge.checkWorldBounds = true;
    this.ledge.events.onOutOfBounds.add(this.recycleLedge, this);

    this.ledge = this.ledges.getFirstDead ();
    this.ledge.reset (this.x1, this.y1);
    this.ledge.width = this.ledgeWidth;
    this.ledge.body.immovable = true;
    this.ledge.checkWorldBounds = true;
    this.ledge.events.onOutOfBounds.add(this.recycleLedge, this);

    this.ledge = this.ledges.getFirstDead ();
    this.ledge.reset (this.x2, this.y2);
    this.ledge.width = this.ledgeWidth;
    this.ledge.body.immovable = true;
    this.ledge.checkWorldBounds = true;
    this.ledge.events.onOutOfBounds.add(this.recycleLedge, this);

    this.ledge = this.ledges.getFirstDead ();
    this.ledge.reset (this.x3, this.y3);
    this.ledge.width = this.ledgeWidth;
    this.ledge.body.immovable = true;
    this.ledge.checkWorldBounds = true;
    this.ledge.events.onOutOfBounds.add(this.recycleLedge, this);
    this.ledgeXPosition = "x3";

    //how fast the player falls
    this.player.body.gravity.y = 600;
    // if the player will collide with the world
    this.player.body.collideWorldBounds = true;

    this.player.animations.add ('left', [0, 1, 2, 3], 10, true);
    this.player.animations.add ('right', [5, 6, 7, 8], 10, true);

    this.cursors = game.input.keyboard.createCursorKeys ();

    // ---------------------- Falling things --------------------------- //

    // make stars its own group
    this.tempStars = this.game.add.group ();

    //enable physics for this group
    this.tempStars.enableBody = true;

    this.tempStars.createMultiple (99, 'tempStar');
    this.tempStars.forEach (this.tempStarsAddGravity, this);

    // make stars its own group
    this.stars = this.game.add.group ();
    //enable physics for this group
    this.stars.enableBody = true;

    this.stars.createMultiple (99, 'star');
    this.stars.forEach (this.starsAddGravity, this);

    //add a timer that will make a new star every 300 milliseconds and place it randomonly on the screen
    this.starsTimer = this.game.time.events.loop(1009, this.recycleStar, this);

    //make rocks its own group
    this.rocks = this.game.add.group ();
    //enable physics for the group
    this.rocks.enableBody = true;

    //add a timer that will add a new rock and place it randomly on the screen
    //in the recycleRock, function, subtract 1 from the lives variable
    this.rocks.createMultiple (20, 'rock');
    this.rocksTimer = this.game.time.events.loop (30011, this.recycleRock, this);

    //make a hearts game.add, enableBody =true, and heartsTimer //help wanted

    this.hearts = game.add.group ();
    this.hearts.enableBody = true ;
    this.hearts.createMultiple (20, 'heart');
    this.heartsTimer = this.game.time.events.loop (60013, this.recycleHeart, this);

    this.diamonds = game.add.group ();
    this.diamonds.enableBody = true ;
    this.diamonds.createMultiple (20, 'diamond');
    this.diamondsTimer = game.time.events.loop (10007, this.recycleDiamond, this);

    this.scoreText = game.add.text (game.world.width - game.world.width * .99, 16, 'score:0', {fontSize: '32px', fill: '#000' });
    this.scoreLives = game.add.text (game.world.width - game.world.width * .1, 16, 'lives:5', {fontSize: '32px', fill: '#000' });

  },
  //add a velocity to all alive ledges
  addVelocity: function ( ledge ) {
    ledge.body.velocity.y = this.ledgeVelocity;
    // for (var i = 0; i < 4; i++) {
    //   game.state.getCurrentState().ledges.getAt(i).body.velocity.y = ledgeVelocity1;
    // }
  },

  //Make all the falling tempStars fall right into the player
  updateTempStarPositionX: function ( tempStar ) {
      tempStar.body.position.x = this.player.body.position.x;
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
    game.physics.arcade.overlap (this.player, this.hearts, this.collectHeart, null, this);
    game.physics.arcade.overlap (this.player, this.diamonds, this.collectDiamond, null, this);
    this.ledges.forEachAlive (this.addVelocity, this, this);

    this.tempStars.forEach (this.updateTempStarPositionX, this);

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

};

game.state.add('gameState', highStar.gameState);
game.state.start('gameState');
