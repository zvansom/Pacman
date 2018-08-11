var PacmanGame = {
  create: function() {
    // Add the tile map and background image.
    map = game.add.tilemap('map');
    map.addTilesetImage('Pacman Assets', 'spritesheet');
    sharedLayer = map.createLayer('Shared Layer');
    pacmanLayer = map.createLayer('Pacman Layer');
    ghostLayer = map.createLayer('Ghost Layer');

    // TODO: UPDATE EXLUSION LIST TO BE CHARACTER SPECIFIC
    // Add collision to all tiles with 'index' !== 0
    map.setCollisionByExclusion('224', true, pacmanLayer);
    map.setCollisionByExclusion('224', true, ghostLayer);
    map.setCollisionByExclusion('224', true, sharedLayer);

    // Add dot tiles to map, enable physics and body.
    dots = game.add.group();
    dots.enableBody = true;
    var dotCoords = getDotCoords();
    dots.remaining = dotCoords.length;

    // Add dot to all tiles with 'index' === 0;
    for(var i = 0; i < dotCoords.length; i++) {
      dots.create(dotCoords[i][0], dotCoords[i][1], 'dot', 149);
    }

    dots.callAll(body, 'setSize', 6, 6, 5, 5);

    // Add power pills to map, enable physics and body.
    power_pills = game.add.group();
    power_pills.enableBody = true;
    [[16, 96], [416, 96], [16, 416], [416, 416]].forEach(position => {
      power_pills.create(position[0], position[1], 'pill', 150);
    })

    // Add the player controlled character
    pacman = game.add.sprite(216, 320, 'pacman');
    initProps(pacman);
    game.physics.arcade.enable(pacman);
    pacman.body.setSize(12, 12, 2, 2);

    // Add ghosts
    blinky = game.add.sprite(176, 288, 'blinky');
    initProps(blinky);
    game.physics.arcade.enable(blinky);
    blinky.body.velocity.x = SPEED;
    blinky.frame = 56;
    blinky.body.setSize(12, 12, 2, 2);


    pinky = game.add.sprite(192, 288, 'pinky');
    initProps(pinky);
    game.physics.arcade.enable(pinky);
    pinky.body.velocity.x = -SPEED;
    pinky.frame = 70;

    inky = game.add.sprite(208, 288, 'inky');
    initProps(inky);
    game.physics.arcade.enable(inky);
    inky.body.velocity.x = -SPEED;
    inky.frame = 84;

    clyde = game.add.sprite(224, 288, 'clyde');
    initProps(clyde);
    game.physics.arcade.enable(clyde);
    clyde.body.velocity.x = -SPEED;
    clyde.frame = 98;

    // ----- ANIMATIONS -----
    // Add the player animations
    pacman.animations.add('RIGHT', [0, 1, 2, 1], 10, true);
    pacman.animations.add('LEFT', [14, 15, 2, 15], 10, true);
    pacman.animations.add('UP', [28, 29, 2, 29], 10, true);
    pacman.animations.add('DOWN', [42, 43, 2, 43], 10, true);
    pacman.animations.add('death', [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 27], 10, false);

    blinky.animations.add('RIGHT', [56, 57], 10, true);
    blinky.animations.add('LEFT', [58, 59], 10, true);
    blinky.animations.add('UP', [60, 61], 10, true);
    blinky.animations.add('DOWN', [62, 63], 10, true);
    blinky.animations.add('vulnerable', [64, 65], 10, true);
    blinky.animations.add('flashing', [64, 65, 66, 67], 10, true);

    pinky.animations.add('RIGHT', [70, 71], 10, true);
    pinky.animations.add('LEFT', [72, 73], 10, true);
    pinky.animations.add('UP', [74, 75], 10, true);
    pinky.animations.add('DOWN', [76, 77], 10, true);
    pinky.animations.add('vulnerable', [64, 65], 10, true);
    pinky.animations.add('flashing', [64, 65, 66, 67], 10, true);

    inky.animations.add('RIGHT', [84, 85], 10, true);
    inky.animations.add('LEFT', [86, 87], 10, true);
    inky.animations.add('UP', [88, 89], 10, true);
    inky.animations.add('DOWN', [90, 91], 10, true);
    inky.animations.add('vulnerable', [64, 65], 10, true);
    inky.animations.add('flashing', [64, 65, 66, 67], 10, true);

    clyde.animations.add('RIGHT', [98, 99], 10, true);
    clyde.animations.add('LEFT', [100, 101], 10, true);
    clyde.animations.add('UP', [102, 103], 10, true);
    clyde.animations.add('DOWN', [104, 105], 10, true);
    clyde.animations.add('vulnerable', [64, 65], 10, true);
    clyde.animations.add('flashing', [64, 65, 66, 67], 10, true);

    // Add dot animations
    dots.callAll('animations.add', 'animations', 'flashing', [149, 152], 10, true);
    power_pills.callAll('animations.add', 'animations', 'flashing', [150, 153], 10, true);

    // Score and lives display
    scoreText = game.add.text(20, 20, '1P:', {font: "20px Arial", fill: '#fff'});

    livesDisplay = game.add.text(20, 544, 'Lives:', {font: "20px Arial", fill: '#fff'});
    livesImage = game.add.group();
    for(var j = 0; j < lives; j++) {
      // Formula: (Align w/ above, margin, multiplier);
      livesImage.create(20 + 4 + (16 * j), 570, 'pacman', 0);
    }

    livesImage.callAll('animations.add', 'animations', 'flashing', [0, 1, 2, 1], 10, true);

    // Add keyboard listeners.
    cursors = game.input.keyboard.createCursorKeys();

    // Spacebar included for convenience in testing.
    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  },

  update: function() {

    game.physics.arcade.collide(pacman, sharedLayer);
    game.physics.arcade.collide(blinky, sharedLayer);
    game.physics.arcade.collide(pinky, sharedLayer);
    game.physics.arcade.collide(inky, sharedLayer);
    game.physics.arcade.collide(clyde, sharedLayer);
    game.physics.arcade.collide(blinky, ghostLayer);
    game.physics.arcade.collide(pinky, ghostLayer);
    game.physics.arcade.collide(inky, ghostLayer);
    game.physics.arcade.collide(clyde, ghostLayer);
    game.physics.arcade.collide(pacman, pacmanLayer);
    game.physics.arcade.overlap(pacman, dots, collectDot);
    game.physics.arcade.overlap(pacman, power_pills, collectPill);
    game.physics.arcade.collide(pacman, blinky, handleCollision);
    game.physics.arcade.collide(pacman, pinky, handleCollision);
    game.physics.arcade.collide(pacman, inky, handleCollision);
    game.physics.arcade.collide(pacman, clyde, handleCollision);
    dots.callAll('play', null, 'flashing');
    power_pills.callAll('play', null, 'flashing');
    livesImage.callAll('play', null, 'flashing');

    handleKeyPress();

    [pacman, blinky, pinky, inky, clyde].forEach(character => {
      setCurrentDirection(character);
      handleOffscreen(character);
      queueGhostMovement(character);
      move(character);
      animate(character);
    });

    if(dots.remaining === 0) {
      restartTimer = setTimeout(nextStage, 1000);
    }

    checkReleaseGhost();
  }, render: function() {
    game.debug.body(pacman);
    game.debug.body(blinky);
  }
};

function getDotCoords() {
  var tileCoords = [];
  for (var i = 0; i < sharedLayer.layer.data.length; i++) {
    sharedLayer.layer.data[i].forEach(cell => {
      if (cell.index === 224 || cell.index === 155) {
        tileCoords.push([cell.worldX, cell.worldY]);
      }
    });
  }
  return tileCoords;
}

function handleKeyPress() {
  if (cursors.left.isDown) {
    console.log('left');
    pacman.queuedDirection = 'LEFT';
  } else if (cursors.right.isDown) {
    console.log('right');
    pacman.queuedDirection = 'RIGHT';
  }

  if (cursors.up.isDown) {
    console.log('up');
    pacman.queuedDirection = 'UP';
  } else if (cursors.down.isDown) {
    console.log('down');
    pacman.queuedDirection = 'DOWN';
  }

  if (spaceKey.isDown) {
    console.log('q', blinky.queuedDirection);
    console.log('c', blinky.currentDirection);
  }
}

function restart() {

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

function nextStage() {
  ghostsInPlay = 0;
  game.state.restart('play');
}


function addScore(amount) {
  score += amount;
  scoreText.text = 'Score: ' + score.toString();
}
