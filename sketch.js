/*

GAME PROJECT 6

*/

var gameChar;
var floorPos_y;
var cameraPosX;

var isLeft;
var isRight;
var isFalling;
var isJumping;
var isPlummeting;

var collectables;
var trees;
var mountains;
var canyons;
var clouds;
var flagPole;

var gameScore;
var lives;

function setup() {
  createCanvas(1024, 576);
  floorPos_y = (height * 3) / 4;
  lives = 3;
  startGame();
}

function draw() {
  ///////////DRAWING CODE//////////

  // Sky
  background(100, 155, 255);

  // Camera follows the character
  cameraPosX = gameChar.x - width / 2;

  // Ground
  stroke(0);
  fill(0, 155, 0);
  rect(0, floorPos_y, width, height - floorPos_y);

  // Start scrolling world
  push();
  translate(-cameraPosX, 0);

  // Mountains
  for (var i = 0; i < mountains.length; i++) {
    drawMountains(mountains[i]);
  }

  // Clouds
  for (var i = 0; i < clouds.length; i++) {
    drawClouds(clouds[i]);
  }

  // Canyons
  for (var i = 0; i < canyons.length; i++) {
    drawCanyons(canyons[i]);
    checkCanyon(canyons[i], gameChar);
  }

  // Trees
  for (var i = 0; i < trees.length; i++) {
    drawTrees(trees[i]);
  }
  //Drawing and checking for collectable items

  for (var i = 0; i < collectables.length; i++) {
    if (!collectables[i].isFound) {
      drawCollectables(collectables[i]);
      checkCollectable(collectables[i], gameChar);
    }
  }

  // Flag Pole

  if (!flagPole.isReached) {
    checkFlagPole(flagPole, gameChar);
  }
  drawFlagPole(flagPole);

  //Display lives
  checkPlayerDie(gameChar);
  drawLives(lives);

  //Display score
  fill(0);
  textSize(20);
  text("Score: " + gameScore, cameraPosX + 20, 30);

  // Display game over message if character falls into a canyon

  if (flagPole.isReached) {
    fill(0);
    textSize(30);
    text(
      "Level Complete! Press space to continue.",
      cameraPosX + width / 4,
      height / 2,
    );
  } else if (lives < 1) {
    fill(0);
    textSize(30);
    text(
      "Game Over. Press space to continue.",
      cameraPosX + width / 4,
      height / 2,
    );
  }

  //Game Character
  drawAlienChar(gameChar);

  // Stop scrolling world
  pop();

  ////////////INTERFACE CODE//////////
  charInteraction(gameChar);
}

function keyPressed() {
  // if statements to control the animation of the character when
  // keys are pressed.
  if (keyCode === 37) // left arrow
  {
    isLeft = true;
  }
  if (keyCode === 39) // right arrow
  {
    isRight = true;
  }
  if (keyCode === 38 && gameChar.y == floorPos_y) {
    isJumping = true;
  }

  // // Restart the game when space is pressed after falling into a canyon
  if (keyCode === 32 && flagPole.isReached) {
    startGame();
  } else if (keyCode === 32 && lives < 1) {
    lives = 3;
    startGame();
  }
}

function keyReleased() {
  // if statements to control the animation of the character when
  // keys are released.
  if (keyCode === 37) // left arrow
  {
    isLeft = false;
  }
  if (keyCode === 39) // right arrow
  {
    isRight = false;
  }
}
