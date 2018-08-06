var game = new Phaser.Game(450, 500, Phaser.Auto, 'game', {
  init: init,
  preload: preload,
  create: create,
  update: update
});

function init() {
}

function preload() {
  // Enable physics
  game.physics.startSystem(Phaser.Physics.ARCADE);

  // Tilemap object and image for tilemap.
  game.load.tilemap('map', './assets/pacman_tile_map.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('spritesheet', './assets/spritesheet.png');

  // Load spritesheet
  game.load.spritesheet('sprites', './assets/spritesheet.png', 16, 16);

  // pacman
  game.load.spritesheet
}

function create() {

  game.stage.backgroundColor = '#000000';

  map = game.add.tilemap('map');
  map.addTilesetImage('Pacman Assets', 'spritesheet');

  layer = map.createLayer('Tile Layer 1');

  pacman = game.add.sprite(32, 16, 'sprites');
  pacman.frame = 3;
  game.physics.enable(pacman);

  cursors = game.input.keyboard.createCursorKeys();

}

function update() {
  pacman.body.velocity.set(0);

  if(cursors.left.isDown) {
    pacman.body.velocity.x = -50;
  } else if(cursors.right.isDown) {
    pacman.body.velocity.x = 50;
  }

  if(cursors.up.isDown) {
    pacman.body.velocity.y = -50;
  } else if(cursors.down.isDown) {
    pacman.body.velocity.y = 50;
  }
}
