var game = new Phaser.Game(800, 500, Phaser.Auto, 'game', {
  init: init,
  preload: preload,
  create: create,
  update: update
});

function init() {
}

function preload() {
  game.load.spritesheet('test', '../assets/spritesheet.png', 16, 16);

}

function create() {
  pacman = game.add.sprite(100, 100, 'test');
  sprite.frame = 0;
  sprite.scale.x = 0.5;
  sprite.scale.y = 0.5;
}

function update() {
}
