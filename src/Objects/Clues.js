class Clues extends Phaser.GameObjects.GameObject {
    constructor(scene, type) {
        super(scene, type);

        // Clues
        this.currClue = 0;
        this.clues = [
            "The suspect that wore the "+scene.animals[0]+" mask had a "+scene.colors[0]+" shirt.",
            "Suspects "+scene.names[0]+" and "+scene.names[1]+" did not have "+scene.colors[0]+" or "+scene.colors[1]+" shirts and neither held the "+scene.items[1]+".",
            "The suspect that wore the "+scene.animals[1]+" mask had a "+scene.colors[1]+" shirt and was holding the "+scene.items[2]+".",
            "Suspect "+scene.names[2]+" had a "+scene.colors[2]+" shirt and did not wear the "+scene.animals[2]+" or "+scene.animals[3]+" mask.",
            "The suspect that wore the "+scene.animals[2]+" mask was holding the "+scene.items[0]+".",
            "Suspect "+scene.names[0]+" did not have a "+scene.colors[3]+" shirt and was not holding the "+scene.items[0]+" or the "+scene.items[3]+".",
            "Suspect "+scene.names[3]+" did not have a "+scene.colors[0]+" shirt.",
            "Suspect "+scene.names[2]+" was not holding the "+scene.items[1]+"."
        ];
        this.clueText = scene.add.bitmapText(512, 100, 'text_white', this.clues[this.currClue], 40).setOrigin(0.5).setMaxWidth(900).setCenterAlign();

        // Buttons
        this.leftClueButton = scene.add.sprite(35, 100, 'arrowLeft_white').setScale(2.0).setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                scene.sound.play('click_arrow');
                this.leftClueButton.setScale(1.5);
                this.leftClueButton.setTexture('arrowLeft_darkGrey');
                this.currClue--;
                if (this.currClue == -1) { this.currClue = this.clues.length-1; }
                this.clueText.setText(this.clues[this.currClue]);
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
                if (this.currClue == this.clues.length) { this.currClue = 0; }
                this.clueText.setText(this.clues[this.currClue]);
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
        return this.clues;
    }

    show() {
        this.clueText.visible = true;
        this.leftClueButton.visible = true;
        this.rightClueButton.visible = true;
    }

    hide() {
        this.clueText.visible = false;
        this.leftClueButton.visible = false;
        this.rightClueButton.visible = false;
    }
}