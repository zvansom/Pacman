var game = new Phaser.Game(450, 500, Phaser.Auto, 'game');

// Create a new instance of a Phaser Game and give it these additional properties.
var PacmanGame = function(game) {
  //  Used in storing game assets.
  this.map = null;
  this.layer = null;
  this.pacman = null;
  this.dots = null;

  this.prevX = null;
  this.prevY = null;

  // Sets character speed
  this.speed = 200;

  // The direction the character is currently traveling in.
  this.current = null;
};

// Add methods to the game prototype.
PacmanGame.prototype = {
  // Initialize Phaser Arcade physics
  init: function() {
    this.physics.startSystem(Phaser.Physics.ARCADE);
  },

  // Load assets for use in game.
  preload: function() {
    // Tilemap object and image for tilemap.
    this.load.tilemap('map', './assets/pacman_tile_map.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('spritesheet', './assets/spritesheet.png');

    // Load pacman
    this.load.spritesheet('pacman', './assets/spritesheet.png', 16, 16);

    // Load dot
    this.load.spritesheet('dot', './assets/spritesheet.png', 16, 16);

  },

  // Add assets previously loaded into the game window.
  create: function() {
    // Add the tile map and background image.
    this.map = this.add.tilemap('map');
    // Add the tileset for the maze.
    this.map.addTilesetImage('Pacman Assets', 'spritesheet');
    this.layer = this.map.createLayer('Tile Layer 1');
    // Add collision to all tiles with 'index' !== 0
    this.map.setCollisionByExclusion('224', true, this.layer);

    // Add dot tiles to map, enable physics and body.
    this.dots = this.add.group();
    this.dots.enableBody = true;

    // Add dot to all tiles with 'index' === 0;
    var dotCoords = this.getDotCoords();
    for(var i = 0; i < dotCoords.length; i++) {
      this.dots.create(dotCoords[i][0], dotCoords[i][1], 'dot', 149);
    }

    this.dots.remaining = dotCoords.length;

    // Add the player controlled character
    this.pacman = this.add.sprite(224, 272, 'pacman');
    this.physics.arcade.enable(this.pacman);
    // this.pacman.body.friction = 0;
    // this.pacman.body.drag = 0;
    this.pacman.score = 0;

    // ----- ANIMATIONS -----
    // Add the player animations
    this.pacman.animations.add('right', [0, 1, 2, 1], 10, true);
    this.pacman.animations.add('left', [14, 15, 2, 15], 10, true);
    this.pacman.animations.add('up', [28, 29, 2, 29], 10, true);
    this.pacman.animations.add('down', [42, 43, 2, 43], 10, true);

    // Add dot animations
    this.dots.callAll('animations.add', 'animations', 'flashing', [149, 152], 10, true);

    // Add keyboard listeners.
    this.cursors = this.input.keyboard.createCursorKeys();

    // Spacebar included for convenience in testing.
    this.spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    // this.move(Phaser.RIGHT);
  },

  // Handle keypress event
  handleKeyPress: function() {
    if (this.cursors.left.isDown) {
      this.current = Phaser.LEFT;
    }else if (this.cursors.right.isDown) {
      this.current = Phaser.RIGHT;
    }

    if (this.cursors.up.isDown) {
      this.current = Phaser.UP;
    }else if (this.cursors.down.isDown) {
      this.current = Phaser.DOWN;
    }

    if (this.spaceKey.isDown) {
      console.log('Dots left:', this.dots.remaining);
    }
  },

  getDotCoords: function() {
    var tileCoords = [];
    for(var i = 0; i < this.layer.layer.data.length; i++){
      this.layer.layer.data[i].forEach(cell => {
        if(cell.index === -1) {
          tileCoords.push([cell.worldX, cell.worldY]);
        }
      });
    }
    return tileCoords;
  },

  // TODO: Need to separate into separate 'Get Direction' and 'Animate' methods.
  // TODO: Need to catch 'twitching' bug.  (I think it's a decimal rounding error.)
          // Only occurs when moving in y with x movement queued.
  animatePacman: function() {
    var prevX = Math.floor(this.prevX);
    var prevY = Math.floor(this.prevY);
    var currX = Math.floor(this.pacman.x);
    var currY = Math.floor(this.pacman.y);

    if(prevX > currX) {
      this.pacman.animations.play('left');
    } else if(prevY > currY) {
      this.pacman.animations.play('up');
    } else if(prevX < currX) {
      this.pacman.animations.play('right');
    } else if(prevY < currY){
      this.pacman.animations.play('down');
    } else {
      // Do nothing.
    }
    this.prevX = currX;
    this.prevY = currY;
  },

  move: function(direction) {
    var speed = this.speed;
    if (direction === Phaser.LEFT || direction === Phaser.UP) {
      speed = -speed;
    }
    if (direction === Phaser.LEFT || direction === Phaser.RIGHT) {
      this.pacman.body.velocity.x = speed;
    } else {
      this.pacman.body.velocity.y = speed;
    }
    this.current = direction;
    this.animatePacman();
  },

  collectDot: function(pacman, dot) {
    pacman.score += 10;
    dot.parent.remaining--;
    dot.kill();
  },

  update: function() {
    this.physics.arcade.collide(this.pacman, this.layer);
    this.physics.arcade.overlap(this.pacman, this.dots, this.collectDot)

    this.dots.callAll('play', null, 'flashing');
    this.handleKeyPress();
    this.move(this.current);

    if(this.pacman.body.x < 0) {
      this.pacman.reset(450, 224);
      this.pacman.body.velocity.x = -this.speed;
    }
    if(this.pacman.body.x > 450) {
      this.pacman.reset(0, 224);
      this.pacman.body.velocity.x = this.speed;
    }

    if(this.dots.remaining === 0) {
      console.log('Game over');
    }
  }
}

game.state.add('Game', PacmanGame, true);
