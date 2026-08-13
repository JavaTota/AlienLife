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
