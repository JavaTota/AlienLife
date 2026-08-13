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

//Function to move the character
function charInteraction(t_char) {
  //Movement
  if (isLeft) {
    t_char.x -= 5;
  }
  if (isRight) {
    t_char.x += 5;
  }
  //Jumping
  if (isJumping) {
    t_char.y -= 10;

    // stop going up after reaching jump height
    if (t_char.y < floorPos_y - 150) {
      isJumping = false;
      isFalling = true;
    }
  }

  // Falling after jumping
  if (isFalling) {
    t_char.y += 5;

    // stop falling when touching ground
    if (t_char.y >= floorPos_y) {
      t_char.y = floorPos_y;
      isFalling = false;
    }
  }

  if (isPlummeting) {
    t_char.y += 5;
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

//Function to display messages
function displayMessage() {
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
}
