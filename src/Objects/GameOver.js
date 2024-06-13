class GameOver extends Phaser.GameObjects.GameObject {
    constructor(scene, type) {
        super(scene, type);

        // Text
        this.gameOver = scene.add.bitmapText(512, 40, 'text_white', "Game Over", 70).setOrigin(0.5).setCenterAlign();
        this.description = scene.add.bitmapText(512, 90, 'text_white', "Cases solved: "+casesSolved, 40).setMaxWidth(400).setOrigin(0.5).setCenterAlign();
        this.restartText = scene.add.bitmapText(900, 35, 'text_white', "Restart", 35).setMaxWidth(400).setOrigin(0.5).setCenterAlign();
        // Button
        this.restartButton = scene.add.sprite(990, 35, 'arrowRight_white').setScale(3.0).setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                scene.sound.play('click_arrow');
                this.restartButton.setScale(2.5);
                this.restartButton.setTexture('arrowRight_darkGrey');
                // Reset time and cases solved and reload scene
                roundTime = roundLength;
                casesSolved = 0;
                scene.scene.restart();
            })
            .on('pointerover', () => { this.restartButton.setTexture('arrowRight_grey'); })
            .on('pointerout', () => {
                this.restartButton.setScale(3.0);
                this.restartButton.setTexture('arrowRight_white');
            });

        return this;
    }

    hide() {
        this.gameOver.visible = false;
        this.restartText.visible = false;
        this.description.visible = false;
        this.restartButton.visible = false;
    }

    show() {
        this.gameOver.visible = true;
        this.restartText.visible = true;
        this.description.visible = true;
        this.restartButton.visible = true;
        this.description.setText("You solved "+casesSolved+" cases"); // Update description text with cases solved
    }
}