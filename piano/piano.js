
// create an new instance of a pixi stage
var stage = new PIXI.Stage(0x66FF99);

// this sets the size of the thing to the computer screen size
//var renderer = PIXI.autoDetectRenderer(screen.width, screen.height);

var a = new Audio('a.ogg');
var b = new Audio('b.ogg');
var c = new Audio('c.ogg');
var d = new Audio('d.ogg');
var e = new Audio('e.ogg');
var f = new Audio('f.ogg');
var g = new Audio('g.ogg');

a.loop = true;
b.loop = true;
c.loop = true;
d.loop = true;
e.loop = true;
f.loop = true;
g.loop = true;

// create a renderer instance: width first, height second
// This sets the renderer to be the size of the browser window
var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;
var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);

// add the renderer view element to the DOM
document.body.appendChild(renderer.view);

requestAnimFrame( animate );

var graphics = new PIXI.Graphics;

//Make the inner key by white
graphics.beginFill(0xFFFFFF);

// set the line style to have a width of 5 and set the color to black
graphics.lineStyle(2, 0x000000);
// draw a rectangle
//var key = graphics.drawRect (200, 150, 20, 300);
//stage.addChild(key);

// var xmlhttp = new XMLHttpRequest();
// var url = "keys.json";
var keyboard =
      {
        "x"      : null,
        "y"      : null,
        "width"  : null,
        "height" : null,
        "keyWidth" : null,
        "keyHeight": null,
        "keys" : [{"x": null,
                   "y": null,
                   "keySpace" : null
                  },
                  {"x": null,
                   "y": null,
                   "keySpace" : null
                  },
                  {"x": null,
                   "y": null,
                   "keySpace" : null
                  },
                  {"x": null,
                   "y": null,
                   "keySpace" : null
                  },
                  {"x": null,
                   "y": null,
                   "keySpace" : null
                  },
                  {"x": null,
                   "y": null,
                   "keySpace" : null
                  },
                  {"x": null,
                   "y": null,
                   "keySpace" : null
                  }]
      };

// xmlhttp.onreadystatechange = function() {
//   if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//     keyboard = JSON.parse(xmlhttp.responseText);
//   }
// }
// xmlhttp.open("GET", url, true);
// xmlhttp.send();

//make the width of the piano
keyboard.width  = Math.floor( canvasWidth  * 0.8);
keyboard.height = Math.floor( canvasHeight * 0.8);
keyboard.x = Math.floor ( canvasWidth * 0.1 );
keyboard.y = Math.floor ( canvasHeight * 0.1);
keyboard.keyWidth = keyboard.width / 7;
keyboard.keyHeight = keyboard.height;

var keyArea = [];
var tempObject;

// do not use this function after you have rendered the first image. If you do, then keyArea
keyboard.drawInitialKey = function (i) {
  if (i > 6 ) {
    alert ("You tried to draw too many keys. i == ".concat(i));
  } else if (i < 0) {
    alert ("You tried to draw too many keys. i == ".concat(i));
  } else {
    //This next line works
    //stage.addChild (  graphics.drawRect ( keyboard.x + keyboard.keyWidth * i, keyboard.y, keyboard.keyWidth, keyboard.keyHeight ));
    //why does not this not work?
    //keyboard.keys[i].keySpace = graphics.drawRect ( keyboard.x + keyboard.keyWidth * i, keyboard.y, keyboard.keyWidth, keyboard.keyHeight );
    //console.log ("i == ".concat(i));
    // aBoringKey = graphics.drawRect ( keyboard.x + keyboard.keyWidth * i, keyboard.y, keyboard.keyWidth, keyboard.keyHeight );
    tempObject = graphics.drawRect ( this.x + this.keyWidth * i, this.y, this.keyWidth, this.keyHeight );
    tempObject.interactive = true;
    tempObject.buttonMode = true;
    tempObject.mousedown = function () {
      var currentMouseX = stage.getMousePosition().x;
      if (currentMouseX < (keyboard.x + keyboard.keyWidth * 0)) {
        // this should never happen
        alert ("the User clicked a key, then moved the mouse out of the stage");
      } else if ( (currentMouseX > keyboard.x ) && (currentMouseX < keyboard.x + keyboard.keyWidth * 1)) {
        keyboard.colorKeyBlack(0);
        a.play();
      } else if ( (currentMouseX > keyboard.x + keyboard.keyWidth * 1 ) && (currentMouseX < keyboard.x + keyboard.keyWidth * 2)) {
        keyboard.colorKeyBlack(1);
        b.play();
      } else if ( (currentMouseX > keyboard.x + keyboard.keyWidth * 2 ) && (currentMouseX < keyboard.x + keyboard.keyWidth * 3)) {
        keyboard.colorKeyBlack(2);
        c.play();
      } else if ( (currentMouseX > keyboard.x + keyboard.keyWidth * 3 ) && (currentMouseX < keyboard.x + keyboard.keyWidth * 4)) {
        keyboard.colorKeyBlack(3);
        d.play();
      } else if ( (currentMouseX > keyboard.x + keyboard.keyWidth * 4 ) && (currentMouseX < keyboard.x + keyboard.keyWidth * 5)) {
        keyboard.colorKeyBlack(4);
        e.play();
      } else if ( (currentMouseX > keyboard.x + keyboard.keyWidth * 5 ) && (currentMouseX < keyboard.x + keyboard.keyWidth * 6)) {
        keyboard.colorKeyBlack(5);
        f.play();
      } else if ( (currentMouseX > keyboard.x + keyboard.keyWidth * 6 ) && (currentMouseX < keyboard.x + keyboard.keyWidth * 7)) {
        keyboard.colorKeyBlack(6);
        g.play();
      }
    };

    tempObject.mouseup = function () {
      var currentMouseX = stage.getMousePosition().x;
      if (currentMouseX < (keyboard.x + keyboard.keyWidth * 0)) {
        // this should never happen
        alert ("the User clicked a key, then moved the mouse out of the stage");
      } else if ( (currentMouseX > keyboard.x ) && (currentMouseX < keyboard.x + keyboard.keyWidth * 1)) {
        keyboard.colorKeyWhite(0);
        a.pause();
      } else if ( (currentMouseX > keyboard.x + keyboard.keyWidth * 1 ) && (currentMouseX < keyboard.x + keyboard.keyWidth * 2)) {
        keyboard.colorKeyWhite(1);
        b.pause();
      } else if ( (currentMouseX > keyboard.x + keyboard.keyWidth * 2 ) && (currentMouseX < keyboard.x + keyboard.keyWidth * 3)) {
        keyboard.colorKeyWhite(2);
        c.pause();
      } else if ( (currentMouseX > keyboard.x + keyboard.keyWidth * 3 ) && (currentMouseX < keyboard.x + keyboard.keyWidth * 4)) {
        keyboard.colorKeyWhite(3);
        d.pause();
      } else if ( (currentMouseX > keyboard.x + keyboard.keyWidth * 4 ) && (currentMouseX < keyboard.x + keyboard.keyWidth * 5)) {
        keyboard.colorKeyWhite(4);
        e.pause();
      } else if ( (currentMouseX > keyboard.x + keyboard.keyWidth * 5 ) && (currentMouseX < keyboard.x + keyboard.keyWidth * 6)) {
        keyboard.colorKeyWhite(5);
        f.pause();
      } else if ( (currentMouseX > keyboard.x + keyboard.keyWidth * 6 ) && (currentMouseX < keyboard.x + keyboard.keyWidth * 7)) {
        keyboard.colorKeyWhite(6);
        g.pause();
      }
    };

    keyArea.push ( tempObject );
    // keyArea.push [i] = tempObject;
    stage.addChild (keyArea [i]);
  }
};

keyboard.drawKey = function (i) {
  if (i > 6 ) {
    alert ("You tried to draw too many keys. i == ".concat(i));
  } else if (i < 0) {
    alert ("You tried to draw too many keys. i == ".concat(i));
  } else {
    //This next line works
    //stage.addChild (  graphics.drawRect ( keyboard.x + keyboard.keyWidth * i, keyboard.y, keyboard.keyWidth, keyboard.keyHeight ));
    //why does not this not work?
    //keyboard.keys[i].keySpace = graphics.drawRect ( keyboard.x + keyboard.keyWidth * i, keyboard.y, keyboard.keyWidth, keyboard.keyHeight );
    //console.log ("i == ".concat(i));
    // aBoringKey = graphics.drawRect ( keyboard.x + keyboard.keyWidth * i, keyboard.y, keyboard.keyWidth, keyboard.keyHeight );
    tempObject = graphics.drawRect ( keyboard.x + keyboard.keyWidth * i, keyboard.y, keyboard.keyWidth, keyboard.keyHeight );
    keyArea [ i ] = tempObject;
    // keyArea.push [i] = tempObject;
    stage.addChild (keyArea [i]);
  }
};

// do not use this function after the page is loaded.
keyboard.drawAllKeys = function () {
  for (var i = 0; i < 7; i++) {
    keyboard.drawInitialKey(i);
  }
};

keyboard.colorKeyBlack = function (i) {
  graphics.beginFill(0x000000);
  keyboard.drawKey(i);
  graphics.beginFill(0xFFFFFF);
  // I should at some point be using this.
  // keyArea[i].tint = 0x000000;
}


keyboard.colorKeyWhite = function (i) {
  graphics.beginFill(0xFFFFFF);
  keyboard.drawKey(i);
  graphics.beginFill(0x000000);
}

//draw all the keys
keyboard.drawAllKeys ();
// keyboard.drawInitialKey(0);
// keyboard.drawInitialKey(1);

//draw the testKeyboard
// var testKeyboard = graphics.drawRect (keyboard.x, keyboard.y, keyboard.width, keyboard.height);
// stage.addChild(testKeyboard);

// var firstKey = graphics.drawRect ( keyboard.x, keyboard.y, keyboard.keyWidth, keyboard.keyHeight );
// stage.addChild(firstKey);

function animate() {

  requestAnimFrame( animate );

  // just for fun, lets rotate mr rabbit a little
  // bunny.rotation += 0.1;

  // render the stage
  renderer.render(stage);
}
