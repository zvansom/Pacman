// Initialize map objects
var map, sharedLayer, pacmanLayer, ghostLayer, ghostTurns;

// Initialize on-screen objects
var pacman, blinky, pinky, inky, clyde, dots, power_pills;
var characters;

// Initialize text-based displays
var scoreText, highScore, livesDisplay;

// Initialize event listener objects
var cursors, spaceKey;

// Initialize timers used throughout
var vulnerableTimer, restartTimer, releaseTimer, buffer;

//Initialize game wide variables
var SPEED = 100;
var lives = 3;
var score = 0;
var ghostsInPlay = 0;
var highScore;
