class Check extends Phaser.GameObjects.GameObject {
    constructor(scene, type) {
        super(scene, type);

        this.popupTime = 90; // Used to count time for text pop-up
        this.popupCounter = this.popupTime;
        this.bonusTime = 120; // Time bonus for finishing a round

        // Text
        this.wrongText = scene.add.bitmapText(890, 30, 'text_white', "Not quite!", 30).setOrigin(0.5).setCenterAlign();
        this.rightText = scene.add.bitmapText(512, 90, 'text_white', "Case solved!", 70).setOrigin(0.5).setCenterAlign();
        this.nextCaseText = scene.add.bitmapText(900, 35, 'text_white', "Next Case", 30).setOrigin(0.5).setCenterAlign();
        this.bonusText = scene.add.bitmapText(620, 20, 'text_white', "+"+scene.timer.format_time(this.bonusTime), 30).setOrigin(0.5).setCenterAlign();

        // Buttons
        this.checkButton = scene.add.sprite(990, 30, 'check_white').setScale(2.0).setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                scene.sound.play('click_arrow');
                this.checkButton.setScale(1.5);
                this.checkButton.setTexture('check_darkGrey');
                // Check solution
                for (let solution of scene.solutions[scene.puzzle]) {
                    let suspectNum = scene.names[scene.solutions[scene.puzzle].indexOf(solution)]-1;
                    let suspect = scene.suspects[suspectNum];
                    // If any part of the solution is not right
                    if (solution[0] != suspect.get_shirt() || solution[1] != suspect.get_mask() || solution[2] != suspect.get_item()) {
                        scene.sound.play('not_quite');
                        this.wrongText.visible = true;
                        this.popupCounter = this.popupTime;
                        return; 
                    }
                }
                // If this part has been reached, solution is correct
                scene.sound.play('case_solved');
                casesSolved++;
                scene.roundActive = false; // Stop game
                // Hide game elements
                scene.clues.hide();
                scene.credits.hide_button();
                scene.credits.hide_credits();
                this.hide();
                for (let panels of scene.suspectPanels) { panels.close_all(); }
                // Show win elements
                this.rightText.visible = true;
                this.nextCaseButton.visible = true;
                this.nextCaseText.visible = true;
                this.bonusText.visible = true;
            })
            .on('pointerup', () => {
                this.checkButton.setScale(2.0);
                this.checkButton.setTexture('check_grey');
            })
            .on('pointerover', () => { this.checkButton.setTexture('check_grey'); })
            .on('pointerout', () => {
                this.checkButton.setScale(2.0);
                this.checkButton.setTexture('check_white');
            });
        this.nextCaseButton = scene.add.sprite(990, 35, 'arrowRight_white').setScale(3.0).setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                scene.sound.play('click_arrow');
                this.nextCaseButton.setScale(2.5);
                this.nextCaseButton.setTexture('arrowRight_darkGrey');
                // Add bonus time and reload scene
                roundTime = scene.timer.currTime + this.bonusTime;
                scene.scene.restart();
            })
            .on('pointerover', () => { this.nextCaseButton.setTexture('arrowRight_grey'); })
            .on('pointerout', () => {
                this.nextCaseButton.setScale(3.0);
                this.nextCaseButton.setTexture('arrowRight_white');
            });
        
        // Elements hidden by default
        this.wrongText.visible = false;
        this.rightText.visible = false;
        this.bonusText.visible = false;
        this.nextCaseButton.visible = false;
        this.nextCaseText.visible = false;

        return this;
    }
    
    show() {
        this.checkButton.visible = true;
    }

    hide() {
        this.checkButton.visible = false;
        this.wrongText.visible = false;
    }

    update() {
        if (this.popupCounter > -1) { this.popupCounter--; }
        if (this.popupCounter == 0) {
            this.wrongText.visible = false;
        }
    }
}