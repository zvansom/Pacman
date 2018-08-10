var pacman, blinky, pinky, inky, clyde, dots, power_pills;
var score = 0;
var scoreText;
var lives = 3;
var livesDisplay;
var cursors, spaceKey;
var ghostsInPlay = 0;

var vulnerableTimer, restartTimer, releaseTimer;

var SPEED = 100;
//  Used in storing game assets.
var map, sharedLayer, pacmanLayer, ghostLayer, ghostTurns;
