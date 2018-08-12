var bootState = {
  preload: function() {
    game.load.image('bg', './assets/images/bgMaze.png');
  },

  create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.state.start('load');
  }
};

var loadState = {
  preload: function() {
    loadingText = game.add.text(175, 280, 'Loading...', {fill: '#ffffff'});
    loadingText.font = 'Press Start 2P';
    loadingText.fontSize = '14px';

    game.load.image('tutorial1', './assets/images/tuts1.png');
    game.load.image('tutorial2', './assets/images/tuts2.png');
    game.load.image('tutorial3', './assets/images/tuts3.png');
    game.load.image('tutorial4', './assets/images/tuts4.png');

    game.load.image('title', './assets/images/pacman_title.png');

    game.load.tilemap('map', './assets/maps/pacman_tile_map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('spritesheet', './assets/images/spritesheet.png');

    // Load pacman
    game.load.spritesheet('pacman', './assets/images/spritesheet.png', 16, 16);

    // Load ghosts
    game.load.spritesheet('blinky', './assets/images/spritesheet.png', 16, 16);
    game.load.spritesheet('pinky', './assets/images/spritesheet.png', 16, 16);
    game.load.spritesheet('inky', './assets/images/spritesheet.png', 16, 16);
    game.load.spritesheet('clyde', './assets/images/spritesheet.png', 16, 16);

    // Load dot
    game.load.spritesheet('dot', './assets/images/spritesheet.png', 16, 16);
    game.load.spritesheet('pill', './assets/images/spritesheet.png', 16, 16);

    game.load.audio('chompSound', '../assets/audio/pacman_chomp.mp3');
    game.load.audio('deathSound', '../assets/audio/pacman_death.mp3');
    game.load.audio('openingSong', '../assets/audio/pacman_beginning.mp3');
    game.load.audio('eatGhost', '../assets/audio/pacman_eatghost.mp3');
  },

  create: function() {
    game.state.start('menu');
  }
};
