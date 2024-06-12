class Tutorial extends Phaser.GameObjects.GameObject {  
    constructor(scene, type) {
        super(scene, type);

        this.bgPanel = scene.add.sprite(512, 300, 'panel_large').setScale(5.0);
        this.title = scene.add.bitmapText(512, 100, 'text_white', "Creature Case", 70).setOrigin(0.5).setCenterAlign();
        this.subtitle = scene.add.bitmapText(512, 150, 'text_white', "How to Play", 50).setOrigin(0.5).setCenterAlign();

        this.currTutorial = 0;
        this.tutorialImages = ['clue', 'suspect', 'panel', 'x', 'item', 'timer', 'check'];
        this.tutorialDesc = scene.gameText.TutorialDescriptions; // Grab the tutorial descriptions from the JSON file

        this.tutorialImage = scene.add.image(512, 300, this.tutorialImages[0]);
        this.description = scene.add.bitmapText(512, 400, 'text_white', this.tutorialDesc[0], 30).setMaxWidth(400).setOrigin(0.5).setCenterAlign();
        this.leftButton = scene.add.sprite(300, 300, 'arrowLeft_white').setScale(2.0).setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                scene.sound.play('click_arrow');
                this.leftButton.setScale(1.5);
                this.leftButton.setTexture('arrowLeft_darkGrey');
                this.rightButton.visible = true;
                this.currTutorial--;
                if (this.currTutorial == 0) { this.leftButton.visible = false; }
                this.next_tutorial();
            })
            .on('pointerup', () => { 
                this.leftButton.setScale(2.0);
                this.leftButton.setTexture('arrowLeft_grey');
            })
            .on('pointerover', () => { this.leftButton.setTexture('arrowLeft_grey'); })
            .on('pointerout', () => { 
                this.leftButton.setTexture('arrowLeft_white');
                this.leftButton.setScale(2.0);
            });
        this.rightButton = scene.add.sprite(724, 300, 'arrowRight_white').setScale(2.0).setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                scene.sound.play('click_arrow');
                this.rightButton.setScale(1.5);
                this.rightButton.setTexture('arrowRight_darkGrey');
                this.leftButton.visible = true;
                this.currTutorial++;
                if (this.currTutorial == this.tutorialImages.length-1) { this.rightButton.visible = false; }
                this.next_tutorial();
            })
            .on('pointerup', () => { 
                this.rightButton.setScale(2.0);
                this.rightButton.setTexture('arrowRight_grey');
            })
            .on('pointerover', () => { this.rightButton.setTexture('arrowRight_grey'); })
            .on('pointerout', () => { 
                this.rightButton.setTexture('arrowRight_white');
                this.rightButton.setScale(2.0);
            });
        this.xButton = scene.add.sprite(750, 65, 'x_grey').setScale(2.0).setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                scene.sound.play('click_exit');
                tutorialComplete = true;
                // Hide tutorial
                this.hide();
                // Show game elements
                scene.clues.show();
                scene.timer.show();
                scene.check.show();
                scene.credits.show_button();
                for (let panels of scene.suspectPanels) { panels.show_buttons(); }
                // Start game
                scene.roundActive = true;
            });
        // Left button hidden by default
        this.leftButton.visible = false;

        return this;
    }

    next_tutorial() {
        this.tutorialImage.setTexture(this.tutorialImages[this.currTutorial]);
        this.description.setText(this.tutorialDesc[this.currTutorial]);
    }

    hide() {
        this.bgPanel.visible = false;
        this.title.visible = false;
        this.subtitle.visible = false;
        this.leftButton.visible = false;
        this.rightButton.visible = false;
        this.description.visible = false;
        this.xButton.visible = false;
        this.tutorialImage.visible = false;
    }
}