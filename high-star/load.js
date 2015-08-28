var loadState = {
  //the preload function will load all our assets
  preload:function () {
    //add a loading label on the screen
    var loadingLabel = game.add.text(80, 150, 'loading...',
                                     {font: '30px Arial', fill: '#ffffff' });

    //load all of your assets
    this.load.spritesheet ( 'dude'            , 'assets/dude.png', 32, 48 );
    this.load.spritesheet ( 'rocket'          , 'assets/rocket.png', 59, 21 );
    this.load.spritesheet ( 'explodingRocket' , 'assets/explodingRocket.png', 69, 33 );
    this.load.image       ( 'fullscreen'      , 'assets/fullscreen.png', 100, 300 );
    this.load.image       ('ground'           , 'assets/platform.png');
    //each frame started out as 24 wide and 22 high
    //now each frame is 35 wide and 22 high
    this.load.image       ( 'star'          , 'assets/star.png' );
    this.load.spritesheet ( 'explodingStar' , 'assets/explodingStar.png', 35, 34);
    this.load.image       ( 'tempStar'      , 'assets/star.png' );
    this.load.image       ( 'baddie'        , 'assets/baddie.png' );
    this.load.image       ( 'heart'         , 'assets/heart.png' );
    this.load.image       ( 'sky'           , 'assets/sky.png' );
    this.load.image       ( 'rock'          , 'assets/rock.png' );
    this.load.image       ( 'diamond'       , 'assets/diamond.png' );
    this.load.image       ( 'restart'       , 'assets/restart.png' );
  },

  create: function () {
    //call the menu state
    game.state.start('menu');
  }
};
