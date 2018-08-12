var PacmanGame = {

  create: function() {
    // Add the tile map and background image.
    map = game.add.tilemap('map');
    map.addTilesetImage('Pacman Assets', 'spritesheet');
    dotLayer = map.createLayer('Dot Layer');
    charLayer = map.createLayer('Character Layer');

    // Add collision to all tiles with 'index' !== 0
    map.setCollisionByExclusion('224', true, dotLayer);
    map.setCollisionByExclusion('224', true, charLayer);

    // Add dot tiles to map, enable physics and body.
    dots = game.add.group();
    dots.enableBody = true;
    var dotCoords = getDotCoords();
    dots.remaining = dotCoords.length;

    // Add dot to all tiles with 'index' === 0;
    for(var i = 0; i < dotCoords.length; i++) {
      dots.create(dotCoords[i][0], dotCoords[i][1], 'dot', 149);
    }

    // Add power pills to map, enable physics and body.
    power_pills = game.add.group();
    power_pills.enableBody = true;
    powerPillCoords.forEach(position => {
      power_pills.create(position[0], position[1], 'pill', 150);
    });

    // Add pacman and ghosts at starting locations with starting frames.
    pacman = game.add.sprite(216, 320, 'pacman');
    pacman.frame = 0;
    blinky = game.add.sprite(176, 288, 'blinky');
    blinky.frame = 56;
    pinky = game.add.sprite(192, 288, 'pinky');
    pinky.frame = 70;
    inky = game.add.sprite(208, 288, 'inky');
    inky.frame = 84;
    clyde = game.add.sprite(224, 288, 'clyde');
    clyde.frame = 98;

    // Collect all characters and set initial shared properties.
    characters = [pacman, blinky, pinky, inky, clyde];
    characters.forEach(character => {initProps(character)});

    // ----- ANIMATIONS -----
    // Add the unique player animations.
    pacman.animations.add('RIGHT', [0, 1, 2, 1], 10, true);
    pacman.animations.add('LEFT', [14, 15, 2, 15], 10, true);
    pacman.animations.add('UP', [28, 29, 2, 29], 10, true);
    pacman.animations.add('DOWN', [42, 43, 2, 43], 10, true);
    pacman.animations.add('death', [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 27], 10, false);

    blinky.animations.add('RIGHT', [56, 57], 10, true);
    blinky.animations.add('LEFT', [58, 59], 10, true);
    blinky.animations.add('UP', [60, 61], 10, true);
    blinky.animations.add('DOWN', [62, 63], 10, true);

    pinky.animations.add('RIGHT', [70, 71], 10, true);
    pinky.animations.add('LEFT', [72, 73], 10, true);
    pinky.animations.add('UP', [74, 75], 10, true);
    pinky.animations.add('DOWN', [76, 77], 10, true);

    inky.animations.add('RIGHT', [84, 85], 10, true);
    inky.animations.add('LEFT', [86, 87], 10, true);
    inky.animations.add('UP', [88, 89], 10, true);
    inky.animations.add('DOWN', [90, 91], 10, true);

    clyde.animations.add('RIGHT', [98, 99], 10, true);
    clyde.animations.add('LEFT', [100, 101], 10, true);
    clyde.animations.add('UP', [102, 103], 10, true);
    clyde.animations.add('DOWN', [104, 105], 10, true);

    // Add dot animations
    dots.callAll('animations.add', 'animations', 'flashing', [149, 152], 10, true);
    power_pills.callAll('animations.add', 'animations', 'flashing', [150, 153], 10, true);

    // Score and lives display
    scoreText = game.add.text(40, 10, '1P', {fill: '#ffffff'});
    scoreText.font = 'Press Start 2P';
    scoreText.fontSize = '14px';

    scoreDisplay = game.add.text(40, 26, '0', {fill: '#ffffff'});
    scoreDisplay.font = 'Press Start 2P';
    scoreDisplay.fontSize = '14px';
    scoreDisplay.align = 'right';

    livesDisplay = game.add.text(20, 550
      , 'Lives', {fill: '#fff'});
    livesDisplay.font = 'Press Start 2P';
    livesDisplay.fontSize = '14px';

    livesImage = game.add.group();
    for(var j = 0; j < lives; j++) {
      // x position formula: (to 1st child + margin between + position multiplier);
      livesImage.create(20 + 4 + (16 * j), 570, 'pacman', 0);
    }

    //
    livesImage.callAll('animations.add', 'animations', 'flashing', [0, 1, 2, 1], 10, true);

    // Add keyboard listeners.
    cursors = game.input.keyboard.createCursorKeys();
  },

  update: function() {
    //  Game loop
    characters = [pacman, blinky, pinky, inky, clyde];
    animateItems = [dots, power_pills, livesImage];

    animateItems.forEach(item => {item.callAll('play', null, 'flashing')});

    characters.forEach(character => {
      checkAllCollisions(character)
      setCurrentDirection(character);
      handleOffscreen(character);
      queueGhostMovement(character);
      setCharacterVelocity(character);
      playActiveAnimation(character);
    });

    handleKeyPress();
    checkReleaseGhost();

    // Check win condition
    if(dots.remaining === 0) {
      characters.forEach(character => { toggleFreeze(character)});
      restartTimer = setTimeout(resetStage, 3000);
    }
  }
};

// Used for initial map generation.
function getDotCoords() {
  var tileCoords = [];
  for (var i = 0; i < dotLayer.layer.data.length; i++) {
    dotLayer.layer.data[i].forEach(cell => {
      if (cell.index === 224 || cell.index === 155) {
        tileCoords.push([cell.worldX, cell.worldY]);
      }
    });
  }
  return tileCoords;
}

// Update the scoreboard to reflect player score.
function addScore(amount) {
  score += amount;
  scoreDisplay.text = score.toString();
}

// Only allow 1 keypress at a time.
function handleKeyPress() {
  if (cursors.left.isDown) {
    pacman.queuedDirection = 'LEFT';
  } else if (cursors.right.isDown) {
    pacman.queuedDirection = 'RIGHT';
  } else if (cursors.up.isDown) {
    pacman.queuedDirection = 'UP';
  } else if (cursors.down.isDown) {
    pacman.queuedDirection = 'DOWN';
  }
}

// Reset all characters after Pacman death.
function resetAll() {
  clearTimeout(restartTimer);
  pacman.animations.stop('death');
  pacman.body.enable = true;
  pacman.body.moves = true;
  pacman.frame = 0;
  pacman.reset(216, 320);
  blinky.reset(176, 288);
  pinky.reset(192, 288);
  inky.reset(208, 288);
  clyde.reset(224, 288);
  ghostsInPlay = 0;
}

// Reset whole stage on dots cleared.
function resetStage(characters) {
  clearTimeout(restartTimer);
  ghostsInPlay  = 0;
  game.state.restart('play');
}

// End game.
function gameOver() {
  clearTimeout(restartTimer);
  var gameOverText = game.add.text(150, 320, 'GAME OVER', {fill: '#ffffff'});
  gameOverText.fontSize = '16px';
  gameOverText.font = 'Press Start 2P';

  menuTimer = setInterval(function() {flashTitle(gameOverText)}, 1000);
}
