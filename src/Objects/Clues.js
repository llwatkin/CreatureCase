class Clues extends Phaser.GameObjects.GameObject {
    constructor(scene, type) {
        super(scene, type);
        this.scene = scene;

        // Clues
        this.currClue = 0;
        this.clues = [
            [
            "The suspect that wore the "+scene.masks[0]+" mask had a "+scene.colors[0]+" shirt.",
            "Suspects "+scene.names[0]+" and "+scene.names[1]+" did not have "+scene.colors[0]+" or "+scene.colors[1]+" shirts and neither held the "+scene.items[1]+".",
            "The suspect that wore the "+scene.masks[1]+" mask had a "+scene.colors[1]+" shirt and held the "+scene.items[2]+".",
            "Suspect "+scene.names[2]+" had a "+scene.colors[2]+" shirt and did not wear the "+scene.masks[2]+" or the "+scene.masks[3]+" mask.",
            "The suspect that wore the "+scene.masks[2]+" mask held the "+scene.items[0]+".",
            "Suspect "+scene.names[0]+" did not have a "+scene.colors[3]+" shirt and did not hold the "+scene.items[0]+" or the "+scene.items[3]+".",
            "Suspect "+scene.names[3]+" did not have a "+scene.colors[0]+" shirt.",
            "Suspect "+scene.names[2]+" did not hold the "+scene.items[1]+"."
            ],
            [
            "The suspect that wore a "+scene.colors[0]+" shirt held the "+scene.items[3]+".",
            "Suspects "+scene.names[0]+" and "+scene.names[3]+" did not hold the "+scene.items[0]+" or "+scene.items[3]+" and neither wore the "+scene.masks[0]+" mask.",
            "The suspect that wore a "+scene.colors[1]+" shirt wore the "+scene.masks[1]+" mask and held the "+scene.items[0]+".",
            "Suspect "+scene.names[1]+" held the "+scene.items[1]+" and did not have a "+scene.colors[3]+" or "+scene.colors[4]+" shirt.",
            "The suspect that wore a "+scene.colors[4]+" shirt wore the "+scene.masks[3]+" mask.",
            "Suspect "+scene.names[0]+" did not hold the "+scene.items[4]+" and did not wear the "+scene.masks[4]+" or the "+scene.masks[3]+" mask.",
            "Suspect "+scene.names[4]+" did not hold the "+scene.items[3]+".",
            "Suspect "+scene.names[1]+" did not wear the "+scene.masks[0]+" mask."
            ],
            [
            "The suspect that held the "+scene.items[4]+" wore the "+scene.masks[2]+" mask.",
            "Suspects "+scene.names[4]+" and "+scene.names[0]+" did not wear the "+scene.masks[4]+" or "+scene.masks[2]+" masks and neither had a "+scene.colors[4]+" shirt.",
            "The suspect that held the "+scene.items[0]+" had a "+scene.colors[1]+" shirt and wore the "+scene.masks[4]+" mask.",
            "Suspect "+scene.names[2]+" wore the "+scene.masks[1]+" mask and did not hold the "+scene.items[1]+" or the "+scene.items[2]+" .",
            "The suspect that held the "+scene.items[2]+" had a "+scene.colors[0]+" shirt.",
            "Suspect "+scene.names[4]+" did not wear the "+scene.masks[0]+" mask and did not have a "+scene.colors[2]+" or "+scene.colors[0]+" shirt.",
            "Suspect "+scene.names[1]+" did not wear the "+scene.masks[2]+" mask.",
            "Suspect "+scene.names[2]+" did not have a "+scene.colors[4]+" shirt."
            ]
        ];
        this.clueText = scene.add.bitmapText(512, 100, 'text_white', '', 40).setOrigin(0.5).setMaxWidth(900).setCenterAlign();
        this.clueCountText = scene.add.bitmapText(300, 40, 'text_white', '', 30).setOrigin(0.5).setMaxWidth(900).setCenterAlign();

        // Buttons
        this.leftClueButton = scene.add.sprite(35, 100, 'arrowLeft_white').setScale(2.0).setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                scene.sound.play('click_arrow');
                this.leftClueButton.setScale(1.5);
                this.leftClueButton.setTexture('arrowLeft_darkGrey');
                this.currClue--;
                if (this.currClue == -1) { this.currClue = this.clues[this.scene.puzzle].length-1; }
                this.update_clue();
            })
            .on('pointerup', () => { 
                this.leftClueButton.setScale(2.0);
                this.leftClueButton.setTexture('arrowLeft_grey');
            })
            .on('pointerover', () => { this.leftClueButton.setTexture('arrowLeft_grey'); })
            .on('pointerout', () => { 
                this.leftClueButton.setTexture('arrowLeft_white');
                this.leftClueButton.setScale(2.0);
            });
        this.rightClueButton = scene.add.sprite(989, 100, 'arrowRight_white').setScale(2.0).setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                scene.sound.play('click_arrow');
                this.rightClueButton.setScale(1.5);
                this.rightClueButton.setTexture('arrowRight_darkGrey');
                this.currClue++;
                if (this.currClue == this.clues[this.scene.puzzle].length) { this.currClue = 0; }
                this.update_clue();
            })
            .on('pointerup', () => { 
                this.rightClueButton.setScale(2.0);
                this.rightClueButton.setTexture('arrowRight_grey');
            })
            .on('pointerover', () => { this.rightClueButton.setTexture('arrowRight_grey'); })
            .on('pointerout', () => { 
                this.rightClueButton.setTexture('arrowRight_white');
                this.rightClueButton.setScale(2.0);
            });
        
        return this;
    }

    get_clues() {
        return this.clues[this.scene.puzzle];
    }

    update_clue() {
        this.clueText.setText(this.clues[this.scene.puzzle][this.currClue]);
        let clueNum = this.currClue + 1;
        this.clueCountText.setText("Clue "+clueNum+"/"+this.clues[this.scene.puzzle].length);
    }

    show() {
        this.clueText.visible = true;
        this.leftClueButton.visible = true;
        this.rightClueButton.visible = true;
        this.clueCountText.visible = true;
    }

    hide() {
        this.clueText.visible = false;
        this.leftClueButton.visible = false;
        this.rightClueButton.visible = false;
        this.clueCountText.visible = false;
    }
}