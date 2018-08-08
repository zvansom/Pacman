var game = new Phaser.Game(450, 500, Phaser.Auto, 'game');

// Create a new instance of a Phaser Game and give it these additional properties.
var PacmanGame = function(game) {
  //  Used in storing game assets.
  this.map = null;
  this.layer = null;
  this.pacman = null;

  this.prevX = null;
  this.prevY = null;

  // Sets character speed
  this.speed = 100;

  // The direction the character is currently traveling in.
  this.current = Phaser.UP;
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

    // Load spritesheet
    this.load.spritesheet('sprites', './assets/spritesheet.png', 16, 16);
  },

  // Add assets previously loaded into the game window.
  create: function() {
    // Add the tile map and background image.
    this.map = this.add.tilemap('map');
    this.map.addTilesetImage('Pacman Assets', 'spritesheet');
    this.layer = this.map.createLayer('Tile Layer 1');
    this.map.setCollisionByExclusion('0', true, this.layer);

    // Add the player controlled character
    this.pacman = this.add.sprite(32, 16, 'sprites');
    this.pacman.frame = 3;
    this.physics.arcade.enable(this.pacman);

    // Add the player animations
    this.pacman.animations.add('right', [0, 1, 2, 1], 10, true);
    this.pacman.animations.add('left', [14, 15, 2, 15], 10, true);
    this.pacman.animations.add('up', [28, 29, 2, 29], 10, true);
    this.pacman.animations.add('down', [42, 43, 2, 43], 10, true);

    // Add keyboard listeners.
    this.cursors = this.input.keyboard.createCursorKeys();

    // Spacebar included for convenience in testing.
    this.spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.move(Phaser.RIGHT);
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
      console.log('X:', this.pacman.x);
      console.log('Y:', this.pacman.y);
    }
  },

  getDirection: function() {
    // console.log('pacman x', this.pacman.x);
    // console.log('pacman y', this.pacman.y);
    // Get previous position
    var prevX = this.prevX;
    var prevY = this.prevY;
    // console.log('prevX:', prevX);
    // console.log('prevY:', prevY);
    // // Get current position
    var currX = Math.floor(this.pacman.x);
    var currY = Math.floor(this.pacman.y);
    // console.log('currX:' + currX);
    // console.log('currY:' + currY);
    // // if previous position has change in x: moving left/right
    if(prevX > currX) {
      console.log('left');
      this.pacman.animations.play('left');
    } else if(prevX < currX) {
      console.log('right');
      this.pacman.animations.play('right');
    } else if(prevY > currY) {
      this.pacman.animations.play('up');
    } else if(prevY < currY){
      this.pacman.animations.play('down');
    } else {
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
  },

  update: function() {
    this.physics.arcade.collide(this.pacman, this.layer);

    this.handleKeyPress();
    this.move(this.current);
    this.getDirection();
  }
}

game.state.add('Game', PacmanGame, true);
