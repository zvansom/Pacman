var PacmanGame = {
  // ALL PRELOAD FROM IN LOAD STATE
  preload: function() {
    game.load.tilemap('map', './assets/pacman_tile_map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('spritesheet', './assets/spritesheet.png');

    // Load pacman
    game.load.spritesheet('pacman', './assets/spritesheet.png', 16, 16);

    // Load ghosts
    game.load.spritesheet('blinky', './assets/spritesheet.png', 16, 16);
    game.load.spritesheet('pinky', './assets/spritesheet.png', 16, 16);
    game.load.spritesheet('inky', './assets/spritesheet.png', 16, 16);
    game.load.spritesheet('clyde', './assets/spritesheet.png', 16, 16);

    // Load dot
    game.load.spritesheet('dot', './assets/spritesheet.png', 16, 16);
  },


  create: function() {
    // FROM BOOT
    game.physics.startSystem(Phaser.Physics.ARCADE);
    // END BOOT

    // Add the tile map and background image.
    map = game.add.tilemap('map');
    map.addTilesetImage('Pacman Assets', 'spritesheet');
    sharedLayer = map.createLayer('Shared Layer');
    pacmanLayer = map.createLayer('Pacman Layer');
    ghostLayer = map.createLayer('Ghost Layer');

    // TODO: UPDATE EXLUSION LIST TO BE CHARACTER SPECIFIC
    // Add collision to all tiles with 'index' !== 0
    map.setCollisionByExclusion('224', true, sharedLayer);
    map.setCollisionByExclusion('224', true, pacmanLayer);
    map.setCollisionByExclusion('224', true, ghostLayer);

    // Add dot tiles to map, enable physics and body.
    dots = PacmanGame.add.group();
    dots.enableBody = true;
    var dotCoords = getDotCoords();
    dots.remaining = dotCoords.length;

    // Add dot to all tiles with 'index' === 0;
    for(var i = 0; i < dotCoords.length; i++) {
      dots.create(dotCoords[i][0], dotCoords[i][1], 'dot', 149);
    }

    // Add the player controlled character
    pacman = game.add.sprite(216, 320, 'pacman');
    initProps(pacman);
    pacman.score = 0;
    pacman.lives = 3;
    game.physics.arcade.enable(pacman);

    // Add ghosts
    blinky = game.add.sprite(216, 320, 'blinky');
    initProps(blinky);
    game.physics.arcade.enable(blinky);
    blinky.body.velocity.x = SPEED;
    blinky.frame = 56;

    pinky = game.add.sprite(232, 224, 'pinky');
    initProps(pinky);
    game.physics.arcade.enable(pinky);
    pinky.body.velocity.x = -SPEED;

    inky = game.add.sprite(232, 224, 'inky');
    initProps(inky);
    game.physics.arcade.enable(inky);
    inky.body.velocity.x = -SPEED;

    clyde = game.add.sprite(232, 224, 'clyde');
    initProps(clyde);
    game.physics.arcade.enable(clyde);
    clyde.body.velocity.x = -SPEED;

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
    //
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
    game.physics.arcade.collide(pacman, blinky, handleCollision);
    game.physics.arcade.collide(pacman, pinky, handleCollision);
    game.physics.arcade.collide(pacman, inky, handleCollision);
    game.physics.arcade.collide(pacman, clyde, handleCollision);

    dots.callAll('play', null, 'flashing');
    handleKeyPress();
    handleOffscreen(pacman);
    setCurrentDirection(pacman);
    move(pacman);
    animate(pacman);

    setCurrentDirection(blinky);
    handleOffscreen(blinky);
    queueGhostMovement(blinky);
    move(blinky);
    animate(blinky);

    setCurrentDirection(pinky);
    handleOffscreen(pinky);
    queueGhostMovement(pinky);
    move(pinky);
    animate(pinky);

    setCurrentDirection(inky);
    handleOffscreen(inky);
    queueGhostMovement(inky);
    move(inky);
    animate(inky);

    setCurrentDirection(clyde);
    handleOffscreen(clyde);
    queueGhostMovement(clyde);
    move(clyde);
    animate(clyde);

    if(dots.remaining === 0) {
      game.pause();
    }
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
    blinky.queuedDirection = 'LEFT';
  } else if (cursors.right.isDown) {
    blinky.queuedDirection = 'RIGHT';
  }

  if (cursors.up.isDown) {
    blinky.queuedDirection = 'UP';
  } else if (cursors.down.isDown) {
    blinky.queuedDirection = 'DOWN';
  }

  if (spaceKey.isDown) {
    console.log('q', blinky.queuedDirection);
    console.log('c', blinky.currentDirection);
  }
}
