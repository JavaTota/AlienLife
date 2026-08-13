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
