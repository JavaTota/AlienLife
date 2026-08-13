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

  //Movement
  if (isLeft) {
    gameChar.x -= 5;
  }
  if (isRight) {
    gameChar.x += 5;
  }
  //Jumping
  if (isJumping) {
    gameChar.y -= 10;

    // stop going up after reaching jump height
    if (gameChar.y < floorPos_y - 150) {
      isJumping = false;
      isFalling = true;
    }
  }

  // Falling after jumping
  if (isFalling) {
    gameChar.y += 5;

    // stop falling when touching ground
    if (gameChar.y >= floorPos_y) {
      gameChar.y = floorPos_y;
      isFalling = false;
    }
  }

  if (isPlummeting) {
    gameChar.y += 5;
  }
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

// Function to draw clouds
function drawClouds(t_cloud) {
  stroke(0);
  fill(255);

  ellipse(t_cloud.x_pos, t_cloud.y_pos, t_cloud.size, t_cloud.size / 2);
  ellipse(
    t_cloud.x_pos - t_cloud.size / 2,
    t_cloud.y_pos + t_cloud.size / 40,
    t_cloud.size / 2,
    t_cloud.size / 3,
  );
  ellipse(
    t_cloud.x_pos + t_cloud.size / 2,
    t_cloud.y_pos + t_cloud.size / 40,
    t_cloud.size / 2,
    t_cloud.size / 3,
  );
}

//Function to draw the mountains
function drawMountains(t_mountain) {
  stroke(0);
  fill(100, 100, 100);

  triangle(
    t_mountain.x_pos,
    t_mountain.y_pos - t_mountain.size,
    t_mountain.x_pos - t_mountain.size / 2,
    t_mountain.y_pos,
    t_mountain.x_pos + t_mountain.size / 2,
    t_mountain.y_pos,
  );

  // Snowy top
  fill(255);
  triangle(
    t_mountain.x_pos,
    t_mountain.y_pos - t_mountain.size,
    t_mountain.x_pos - t_mountain.size / 5,
    t_mountain.y_pos - t_mountain.size * 0.65,
    t_mountain.x_pos + t_mountain.size / 5,
    t_mountain.y_pos - t_mountain.size * 0.65,
  );
}

//Function to draw the trees
function drawTrees(t_tree) {
  stroke(0);
  fill(120, 100, 40);
  rect(t_tree.x_pos, t_tree.y_pos - 150, 30, 150);

  // Tree top
  fill(0, 120, 0);
  ellipse(t_tree.x_pos + 13, t_tree.y_pos - 120, 90, 100);
  ellipse(t_tree.x_pos - 20, t_tree.y_pos - 100, 70, 70);
  ellipse(t_tree.x_pos + 40, t_tree.y_pos - 100, 70, 70);
}

//Function to draw the canyons
function drawCanyons(t_canyon) {
  noStroke();
  fill(139, 69, 19);
  rect(t_canyon.x_pos, floorPos_y, t_canyon.width, height - floorPos_y);
}

//Function to draw collectables
function drawCollectables(t_collectable) {
  if (!t_collectable.isFound) {
    stroke(0);
    fill(255, 215, 0);
    ellipse(
      t_collectable.x_pos,
      t_collectable.y_pos,
      t_collectable.size,
      t_collectable.size,
    );
  }
}

//Function to draw the flag pole
function drawFlagPole(t_flagPole) {
  stroke(0);
  fill(150, 75, 0);
  rect(
    t_flagPole.x_pos,
    t_flagPole.y_pos - t_flagPole.size,
    10,
    t_flagPole.size,
  );
  if (t_flagPole.isReached) {
    fill(0, 255, 0);
  } else {
    fill(255, 0, 0);
  }

  triangle(
    t_flagPole.x_pos + 10,
    t_flagPole.y_pos - t_flagPole.size,
    t_flagPole.x_pos + 30,
    t_flagPole.y_pos - t_flagPole.size + 15,
    t_flagPole.x_pos + 10,
    t_flagPole.y_pos - t_flagPole.size + 30,
  );
}

//Function to draw lives
function drawLives(t_lives) {
  for (var i = 0; i < t_lives; i++) {
    fill(0);
    textSize(20);
    text("Lives: " + t_lives, cameraPosX + 20, 60);
    fill(255, 0, 0);
    noStroke();

    ellipse(cameraPosX + i * 30 + 20, 80, 12, 12); // left bump
    ellipse(cameraPosX + i * 30 + 30, 80, 12, 12); // right bump
    triangle(
      cameraPosX + i * 30 + 15,
      82,
      cameraPosX + i * 30 + 35,
      82,
      cameraPosX + i * 30 + 25,
      95,
    ); // bottom point
  }
}

//Function to draw main character
function drawAlienChar(t_char) {
  //Game Character
  if (isLeft && isFalling) {
    //Character Jumping Left

    // Antennas
    stroke(0);
    strokeWeight(2);
    line(t_char.x - 5, t_char.y - 70, t_char.x - 13, t_char.y - 82);
    line(t_char.x + 4, t_char.y - 70, t_char.x + 10, t_char.y - 82);

    fill(120, 210, 80);
    ellipse(t_char.x - 14, t_char.y - 84, 6, 6);
    ellipse(t_char.x + 11, t_char.y - 84, 6, 6);

    // Head
    fill(120, 210, 80);
    ellipse(t_char.x, t_char.y - 60, 40, 35);

    // Eye facing left
    fill(0);
    ellipse(t_char.x - 10, t_char.y - 62, 11, 15);

    fill(255);
    ellipse(t_char.x - 12, t_char.y - 65, 3, 4);

    // Small nose pointing left
    fill(120, 210, 80);
    triangle(
      t_char.x - 19,
      t_char.y - 59,
      t_char.x - 25,
      t_char.y - 56,
      t_char.x - 19,
      t_char.y - 53,
    );

    // Body
    fill(100, 60, 180);
    rect(t_char.x - 12, t_char.y - 43, 24, 25, 5);

    // Belt
    fill(255, 200, 0);
    rect(t_char.x - 13, t_char.y - 25, 26, 4);

    // Arms jumping left
    stroke(0);
    line(t_char.x - 10, t_char.y - 38, t_char.x - 24, t_char.y - 48);
    line(t_char.x + 10, t_char.y - 38, t_char.x + 18, t_char.y - 30);

    // Legs
    line(t_char.x - 6, t_char.y - 18, t_char.x - 17, t_char.y - 7);
    line(t_char.x + 6, t_char.y - 18, t_char.x + 15, t_char.y - 10);

    // Boots
    fill(255);
    rect(t_char.x - 20, t_char.y - 10, 10, 5, 2);
    rect(t_char.x + 12, t_char.y - 10, 10, 5, 2);
  } else if (isRight && isFalling) {
    //Character Jumping Right

    // Antennas
    stroke(0);
    strokeWeight(2);
    line(t_char.x - 4, t_char.y - 70, t_char.x - 10, t_char.y - 82);
    line(t_char.x + 5, t_char.y - 70, t_char.x + 13, t_char.y - 82);

    fill(120, 210, 80);
    ellipse(t_char.x - 11, t_char.y - 84, 6, 6);
    ellipse(t_char.x + 14, t_char.y - 84, 6, 6);

    // Head
    fill(120, 210, 80);
    ellipse(t_char.x, t_char.y - 60, 40, 35);

    // Eye facing right
    fill(0);
    ellipse(t_char.x + 10, t_char.y - 62, 11, 15);

    fill(255);
    ellipse(t_char.x + 12, t_char.y - 65, 3, 4);

    // Small nose pointing right
    fill(120, 210, 80);
    triangle(
      t_char.x + 19,
      t_char.y - 59,
      t_char.x + 25,
      t_char.y - 56,
      t_char.x + 19,
      t_char.y - 53,
    );

    // Body
    fill(100, 60, 180);
    rect(t_char.x - 12, t_char.y - 43, 24, 25, 5);

    // Belt
    fill(255, 200, 0);
    rect(t_char.x - 13, t_char.y - 25, 26, 4);

    // Arms jumping right
    stroke(0);
    line(t_char.x + 10, t_char.y - 38, t_char.x + 24, t_char.y - 48);
    line(t_char.x - 10, t_char.y - 38, t_char.x - 18, t_char.y - 30);

    // Legs
    line(t_char.x + 6, t_char.y - 18, t_char.x + 17, t_char.y - 7);
    line(t_char.x - 6, t_char.y - 18, t_char.x - 15, t_char.y - 10);

    // Boots
    fill(255);
    rect(t_char.x - 20, t_char.y - 10, 10, 5, 2);
    rect(t_char.x + 12, t_char.y - 10, 10, 5, 2);
  } else if (isLeft) {
    //Character Walking Left - FACING LEFT

    // Antennas lean towards the left
    stroke(0);
    strokeWeight(2);
    line(t_char.x - 4, t_char.y - 70, t_char.x - 13, t_char.y - 82);
    line(t_char.x + 4, t_char.y - 70, t_char.x + 8, t_char.y - 82);

    fill(120, 210, 80);
    ellipse(t_char.x - 14, t_char.y - 84, 6, 6);
    ellipse(t_char.x + 9, t_char.y - 84, 6, 6);

    // Head
    fill(120, 210, 80);
    ellipse(t_char.x, t_char.y - 60, 40, 35);

    // Large eye on LEFT side makes alien face left
    fill(0);
    ellipse(t_char.x - 11, t_char.y - 62, 12, 16);

    // Eye highlight
    fill(255);
    ellipse(t_char.x - 13, t_char.y - 65, 3, 4);

    // Small nose pointing left
    fill(120, 210, 80);
    triangle(
      t_char.x - 19,
      t_char.y - 59,
      t_char.x - 25,
      t_char.y - 56,
      t_char.x - 19,
      t_char.y - 53,
    );

    // Body
    fill(100, 60, 180);
    rect(t_char.x - 12, t_char.y - 43, 24, 25, 5);

    // Belt
    fill(255, 200, 0);
    rect(t_char.x - 13, t_char.y - 25, 26, 4);

    // Arms walking
    stroke(0);
    line(t_char.x - 10, t_char.y - 38, t_char.x - 20, t_char.y - 28);
    line(t_char.x + 10, t_char.y - 38, t_char.x + 17, t_char.y - 45);

    // Legs walking
    line(t_char.x - 6, t_char.y - 18, t_char.x - 17, t_char.y);
    line(t_char.x + 6, t_char.y - 18, t_char.x + 15, t_char.y - 2);

    // Boots
    fill(255);
    rect(t_char.x - 20, t_char.y - 4, 10, 5, 2);
    rect(t_char.x + 10, t_char.y - 4, 10, 5, 2);
  } else if (isRight) {
    //Character Walking Right - FACING RIGHT

    // Antennas
    stroke(0);
    strokeWeight(2);
    line(t_char.x + 4, t_char.y - 70, t_char.x + 13, t_char.y - 82);
    line(t_char.x - 4, t_char.y - 70, t_char.x - 8, t_char.y - 82);

    fill(120, 210, 80);
    ellipse(t_char.x + 14, t_char.y - 84, 6, 6);
    ellipse(t_char.x - 9, t_char.y - 84, 6, 6);

    // Head
    fill(120, 210, 80);
    ellipse(t_char.x, t_char.y - 60, 40, 35);

    // Large eye on RIGHT side
    fill(0);
    ellipse(t_char.x + 11, t_char.y - 62, 12, 16);

    // Eye highlight
    fill(255);
    ellipse(t_char.x + 13, t_char.y - 65, 3, 4);

    // Small nose pointing right
    fill(120, 210, 80);
    triangle(
      t_char.x + 19,
      t_char.y - 59,
      t_char.x + 25,
      t_char.y - 56,
      t_char.x + 19,
      t_char.y - 53,
    );

    // Body
    fill(100, 60, 180);
    rect(t_char.x - 12, t_char.y - 43, 24, 25, 5);

    // Belt
    fill(255, 200, 0);
    rect(t_char.x - 13, t_char.y - 25, 26, 4);

    // Arms walking
    stroke(0);
    line(t_char.x + 10, t_char.y - 38, t_char.x + 20, t_char.y - 28);
    line(t_char.x - 10, t_char.y - 38, t_char.x - 17, t_char.y - 45);

    // Legs walking
    line(t_char.x + 6, t_char.y - 18, t_char.x + 17, t_char.y);
    line(t_char.x - 6, t_char.y - 18, t_char.x - 15, t_char.y - 2);

    // Boots
    fill(255);
    rect(t_char.x - 20, t_char.y - 4, 10, 5, 2);
    rect(t_char.x + 10, t_char.y - 4, 10, 5, 2);
  } else if (isFalling || isJumping || isPlummeting) {
    //Character Jumping Front

    // Antennas
    stroke(0);
    strokeWeight(2);
    line(t_char.x - 8, t_char.y - 70, t_char.x - 14, t_char.y - 84);
    line(t_char.x + 8, t_char.y - 70, t_char.x + 14, t_char.y - 84);

    fill(120, 210, 80);
    ellipse(t_char.x - 15, t_char.y - 86, 6, 6);
    ellipse(t_char.x + 15, t_char.y - 86, 6, 6);

    // Head
    fill(120, 210, 80);
    ellipse(t_char.x, t_char.y - 60, 42, 36);

    // Eyes
    fill(0);
    ellipse(t_char.x - 10, t_char.y - 62, 11, 15);
    ellipse(t_char.x + 10, t_char.y - 62, 11, 15);

    fill(255);
    ellipse(t_char.x - 12, t_char.y - 65, 3, 4);
    ellipse(t_char.x + 8, t_char.y - 65, 3, 4);

    // Body
    fill(100, 60, 180);
    rect(t_char.x - 13, t_char.y - 43, 26, 25, 5);

    // Belt
    fill(255, 200, 0);
    rect(t_char.x - 13, t_char.y - 25, 26, 4);

    // Arms raised
    stroke(0);
    line(t_char.x - 12, t_char.y - 38, t_char.x - 25, t_char.y - 50);
    line(t_char.x + 12, t_char.y - 38, t_char.x + 25, t_char.y - 50);

    // Legs raised
    line(t_char.x - 6, t_char.y - 18, t_char.x - 16, t_char.y - 8);
    line(t_char.x + 6, t_char.y - 18, t_char.x + 16, t_char.y - 8);

    // Boots
    fill(255);
    rect(t_char.x - 22, t_char.y - 9, 10, 5, 2);
    rect(t_char.x + 12, t_char.y - 9, 10, 5, 2);
  } else {
    //Character Standing Front Facing

    // Antennas
    stroke(0);
    strokeWeight(2);
    line(t_char.x - 8, t_char.y - 70, t_char.x - 14, t_char.y - 84);
    line(t_char.x + 8, t_char.y - 70, t_char.x + 14, t_char.y - 84);

    fill(120, 210, 80);
    ellipse(t_char.x - 15, t_char.y - 86, 6, 6);
    ellipse(t_char.x + 15, t_char.y - 86, 6, 6);

    // Head
    fill(120, 210, 80);
    ellipse(t_char.x, t_char.y - 60, 42, 36);

    // Eyes
    fill(0);
    ellipse(t_char.x - 10, t_char.y - 62, 11, 15);
    ellipse(t_char.x + 10, t_char.y - 62, 11, 15);

    // Eye highlights
    fill(255);
    ellipse(t_char.x - 12, t_char.y - 65, 3, 4);
    ellipse(t_char.x + 8, t_char.y - 65, 3, 4);

    // Smile
    noFill();
    stroke(0);
    arc(t_char.x, t_char.y - 53, 9, 6, 0, PI);

    //Body
    fill(100, 60, 180);
    rect(t_char.x - 13, t_char.y - 43, 26, 25, 5);

    // Belt
    fill(255, 200, 0);
    rect(t_char.x - 13, t_char.y - 25, 26, 4);

    // Arms
    stroke(0);
    line(t_char.x - 12, t_char.y - 38, t_char.x - 20, t_char.y - 22);
    line(t_char.x + 12, t_char.y - 38, t_char.x + 20, t_char.y - 22);

    // Legs
    line(t_char.x - 6, t_char.y - 18, t_char.x - 7, t_char.y);
    line(t_char.x + 6, t_char.y - 18, t_char.x + 7, t_char.y);

    // Boots
    fill(255);
    rect(t_char.x - 12, t_char.y - 4, 10, 5, 2);
    rect(t_char.x + 2, t_char.y - 4, 10, 5, 2);
  }

  strokeWeight(1);
}

//Function to check if collectable is found
function checkCollectable(t_collectable, t_char) {
  if (
    dist(t_char.x, t_char.y - 30, t_collectable.x_pos, t_collectable.y_pos) <
    t_collectable.size
  ) {
    t_collectable.isFound = true;
    gameScore += 1;
  }
}

//Function to check if character is over a canyon
function checkCanyon(t_canyon, t_char) {
  if (
    t_char.x > t_canyon.x_pos &&
    t_char.x < t_canyon.x_pos + t_canyon.width &&
    t_char.y >= floorPos_y
  ) {
    isPlummeting = true;
  }
}

//Function to check if character reached the flag pole
function checkFlagPole(t_flagPole, t_char) {
  if (dist(t_char.x, t_char.y, t_flagPole.x_pos, t_flagPole.y_pos) < 20) {
    t_flagPole.isReached = true;
  }
}

//Function to check if player dies
function checkPlayerDie(t_char) {
  if (t_char.y >= height) {
    lives -= 1;
    if (lives > 0) {
      startGame();
    }
  }
}

//Function to start the game
function startGame() {
  cameraPosX = 0;

  isLeft = false;
  isRight = false;
  isFalling = false;
  isJumping = false;
  isPlummeting = false;

  gameChar = {
    x: width / 2,
    y: floorPos_y,
  };

  collectables = [
    { x_pos: 50, y_pos: floorPos_y - 30, size: 30, isFound: false },
    { x_pos: 350, y_pos: floorPos_y - 30, size: 30, isFound: false },
    { x_pos: 750, y_pos: floorPos_y - 30, size: 30, isFound: false },
  ];

  canyons = [
    { x_pos: 100, width: 100 },
    { x_pos: 550, width: 100 },
  ];

  trees = [
    { x_pos: 900, y_pos: floorPos_y },
    { x_pos: 700, y_pos: floorPos_y },
    { x_pos: 500, y_pos: floorPos_y },
    { x_pos: 300, y_pos: floorPos_y },
    { x_pos: 50, y_pos: floorPos_y },
  ];

  mountains = [
    { x_pos: 150, y_pos: floorPos_y, size: 180 },
    { x_pos: 450, y_pos: floorPos_y, size: 180 },
    { x_pos: 750, y_pos: floorPos_y, size: 180 },
  ];

  clouds = [
    { x_pos: 180, y_pos: 90, size: 90 },
    { x_pos: 450, y_pos: 120, size: 90 },
    { x_pos: 720, y_pos: 80, size: 90 },
    { x_pos: 900, y_pos: 130, size: 90 },
  ];

  flagPole = {
    x_pos: width,
    y_pos: floorPos_y,
    size: 100,
    isReached: false,
  };

  gameScore = 0;
}
