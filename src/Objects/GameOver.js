class GameOver extends Phaser.GameObjects.GameObject {
    constructor(scene, type) {
        super(scene, type);

        this.bgPanel = scene.add.sprite(512, 300, 'panel_large').setScale(5.0);
        // Text
        this.title = scene.add.bitmapText(512, 100, 'text_white', "Game Over", 70).setOrigin(0.5).setCenterAlign();
        this.subtitle = scene.add.bitmapText(512, 150, 'text_white', "Time ran out", 50).setOrigin(0.5).setCenterAlign();
        this.description = scene.add.bitmapText(512, 300, 'text_white', "Cases solved: "+casesSolved, 40).setMaxWidth(400).setOrigin(0.5).setCenterAlign();
        this.restartText = scene.add.bitmapText(640, 500, 'text_white', "Restart", 35).setMaxWidth(400).setOrigin(0.5).setCenterAlign();
        // Button
        this.restartButton = scene.add.sprite(720, 500, 'arrowRight_white').setScale(3.0).setInteractive({ useHandCursor: true })
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
        this.bgPanel.visible = false;
        this.title.visible = false;
        this.subtitle.visible = false;
        this.description.visible = false;
        this.restartText.visible = false;
        this.restartButton.visible = false;
    }

    show() {
        this.bgPanel.visible = true;
        this.title.visible = true;
        this.subtitle.visible = true;
        this.description.visible = true;
        this.restartText.visible = true;
        this.restartButton.visible = true;
        this.description.setText("You solved "+casesSolved+" cases"); // Update description text with cases solved
    }
}