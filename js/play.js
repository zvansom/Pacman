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
    game.physics.arcade.enable(pacman);

    // Add ghosts


    // ----- ANIMATIONS -----
    // Add the player animations
    pacman.animations.add('right', [0, 1, 2, 1], 10, true);
    pacman.animations.add('left', [14, 15, 2, 15], 10, true);
    pacman.animations.add('up', [28, 29, 2, 29], 10, true);
    pacman.animations.add('down', [42, 43, 2, 43], 10, true);

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
    game.physics.arcade.collide(pacman, pacmanLayer);
    game.physics.arcade.overlap(pacman, dots, collectDot);

    dots.callAll('play', null, 'flashing');

    handleKeyPress();
    move(pacman);
    animate(pacman);

    if(pacman.body.x < 0) {
      pacman.reset(450, 272);
      pacman.body.velocity.x = -SPEED;
    }
    if(pacman.body.x > 450) {
      pacman.reset(0, 272);
      pacman.body.velocity.x = SPEED;
    }

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
    pacman.current = 'LEFT';
  } else if (cursors.right.isDown) {
    pacman.current = 'RIGHT';
  }

  if (cursors.up.isDown) {
    pacman.current = 'UP';
  } else if (cursors.down.isDown) {
    pacman.current = 'DOWN';
  }

  if (spaceKey.isDown) {
    console.log('Dots left:', dots.remaining);
  }
}
