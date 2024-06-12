// Lyle Watkins
// Created: 6/10/2024
// Phaser: 3.70.0
//
// Creature Case
//
// Game in which you're tasked with solving Perplexors-inspired puzzles.

// debug with extreme prejudice
"use strict"

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    width: 1024,
    height: 600,
    scene: [Load, Game],
    backgroundColor: "#4488AA",
    fps: { forceSetTimeOut: true, target: 60 }
}

let tutorialComplete = false;
const roundLength = 300; // 5 minutes
let roundTime = roundLength; // Changes as you play
let casesSolved = 0;

const game = new Phaser.Game(config);