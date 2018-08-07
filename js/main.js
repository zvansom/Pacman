var game = new Phaser.Game(450, 500, Phaser.Auto, 'game');

// Create a new instance of a Phaser Game and give it these additional properties.
var PacmanGame = function(game) {
  //  Used in storing game assets.
  this.map = null;
  this.layer = null;
  this.pacman = null;

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

    // Add keyboard listeners.
    this.cursors = this.input.keyboard.createCursorKeys();

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
  }
}

game.state.add('Game', PacmanGame, true);
