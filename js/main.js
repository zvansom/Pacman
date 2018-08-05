var game = new Phaser.Game(450, 500, Phaser.Auto, 'game', {
  init: init,
  preload: preload,
  create: create,
  update: update
});

function init() {
}

function preload() {
  // game.load.spritesheet('test', '../assets/spritesheet.png', 16, 16);
  game.load.tilemap('map', './assets/pacman_tile_map.json', null, Phaser.Tilemap.TILED_JSON);

  game.load.image('walls', './assets/spritesheet.png', )
}

function create() {

  game.stage.backgroundColor = '#000000';

  map = game.add.tilemap('map');
  map.addTilesetImage('Pacman Assets', 'walls');

  layer = map.createLayer('Tile Layer 1');

  // layer.resizeWorld();

  // pacman = game.add.sprite(100, 100, 'test');
  // sprite.frame = 0;
  // sprite.scale.x = 0.5;
  // sprite.scale.y = 0.5;
}

function update() {
}
