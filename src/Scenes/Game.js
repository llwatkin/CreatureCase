class Game extends Phaser.Scene {
    constructor() {
        super('gameScene');
    }

    init() {
        // Game variables
        this.roundActive = false;
        this.roundTime = 600;
        this.timeCount = 60; // Used to count time for the in-game timer
        this.timeCounter = this.timeCount;
        this.popupTime = 60; // Used to count time for text pop-ups
        this.popupCounter = this.popupTime;
        this.currTime = this.roundTime;
        this.currTutorial = 0;
        this.currClue = 0;

        this.gameText = this.cache.json.get('game_text'); // Used to fill following categories for random case generation
        this.names = ["1", "2", "3", "4", "5"];
        this.shuffle(this.names); // Names in a random order
        this.colors = ["red", "blue", "green", "yellow", "grey"];
        this.shuffle(this.colors); // Shirt colors in random order
        // Randomly fill the following arrays using JSON file
        this.possibleAnimals = this.gameText.AnimalMasks;
        this.possibleItems = this.gameText.Items;
        this.animals = [];
        this.items = [];
        for (let i = 0; i < 5; i++) {
            // Pick a random animal
            let rand_animal = Math.floor(Math.random() * this.possibleAnimals.length);
            this.animals[i] = this.possibleAnimals[rand_animal];
            this.possibleAnimals.splice(rand_animal, 1); // Remove this from the possibilities (no duplicates allowed)
            // Pick a random item
            let rand_item = Math.floor(Math.random() * this.possibleItems.length);
            this.items[i] = this.possibleItems[rand_item];
            this.possibleItems.splice(rand_item, 1); // Remove this from the possibilities (no duplicates allowed)
        }
        // This solution will always be the same for the set of clues I use
        this.solution = [
            [this.colors[4], this.animals[3], this.items[4]], // Suspect at names index 0
            [this.colors[3], this.animals[2], this.items[0]], // Suspect at names index 1
            [this.colors[2], this.animals[4], this.items[3]], // ect.
            [this.colors[1], this.animals[1], this.items[2]],
            [this.colors[0], this.animals[0], this.items[1]]
        ];
    }

    create() {
        this.init();

        this.background = this.add.image(512, 300, 'background');
        
        // Create all suspect game objects
        this.suspect1 = new Suspect(this, 'suspect', 112, 530, 1);
        this.suspect2 = new Suspect(this, 'suspect', 312, 530, 2);
        this.suspect3 = new Suspect(this, 'suspect', 512, 530, 3);
        this.suspect4 = new Suspect(this, 'suspect', 712, 530, 4);
        this.suspect5 = new Suspect(this, 'suspect', 912, 530, 5);
        // Array to hold suspects
        this.suspects = [
            this.suspect1, this.suspect2, this.suspect3,
            this.suspect4, this.suspect5
        ];
        for (let suspect of this.suspects) { suspect.randomize(); } // Randomize suspect appearances

        // Game clues
        this.clues = [
            "The suspect that wore the "+this.animals[0]+" mask had a "+this.colors[0]+" shirt.",
            "Suspects "+this.names[0]+" and "+this.names[1]+" did not have "+this.colors[0]+" or "+this.colors[1]+" shirts and neither held the "+this.items[1]+".",
            "The suspect that wore the "+this.animals[1]+" mask had a "+this.colors[1]+" shirt and was holding the "+this.items[2]+".",
            "Suspect "+this.names[2]+" had a "+this.colors[2]+" shirt and did not wear the "+this.animals[2]+" or "+this.animals[3]+" mask.",
            "The suspect that wore the "+this.animals[2]+" mask was holding the "+this.items[0]+".",
            "Suspect "+this.names[0]+" did not have a "+this.colors[3]+" shirt and was not holding the "+this.items[0]+" or the "+this.items[3]+".",
            "Suspect "+this.names[3]+" did not have a "+this.colors[0]+" shirt.",
            "Suspect "+this.names[2]+" was not holding the "+this.items[1]+"."
        ];
        this.shuffle(this.clues); // Show clues in a random order
        this.clueText = this.add.bitmapText(512, 100, 'text_white', this.clues[this.currClue], 40).setOrigin(0.5).setMaxWidth(900).setCenterAlign();
        this.clueText.visible = false;

        // Timer
        this.timerBackground = this.add.image(510, -10, 'panel_large').setScale(1.2);
        this.timerBackground.visible = false;
        this.timerText = this.add.bitmapText(512, 20, 'text_white', this.currTime, 60).setOrigin(0.5).setCenterAlign();
        this.timerText.visible = false;

        // Buttons
        this.leftClueButton = this.add.sprite(35, 100, 'arrowLeft_white').setScale(2.0).setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
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
        this.leftClueButton.visible = false;
        this.rightClueButton = this.add.sprite(989, 100, 'arrowRight_white').setScale(2.0).setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
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
        this.rightClueButton.visible = false;

        this.checkText = this.add.bitmapText(890, 30, 'text_white', "Not quite!", 30).setOrigin(0.5).setCenterAlign();
        this.checkText.visible = false;
        this.winText = this.add.bitmapText(512, 90, 'text_white', "Case solved!", 70).setOrigin(0.5).setCenterAlign();
        this.winText.visible = false;
        this.checkButton = this.add.sprite(990, 30, 'check_white').setScale(2.0).setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.checkButton.setScale(1.5);
                this.checkButton.setTexture('check_darkGrey');
                // Check solution
                for (let items of this.solution) {
                    let suspectNum = this.names[this.solution.indexOf(items)]-1;
                    let suspect = this.suspects[suspectNum];
                    if (items[0] != suspect.get_shirt() || items[1] != suspect.get_mask() || items[2] != suspect.get_item()) { 
                        this.checkText.visible = true;
                        this.popupCounter = this.popupTime;
                        return; 
                    }
                }
                // If this part has been reached, solution is correct
                console.log("solution correct");
                // Hide game elements
                this.roundActive = false;
                this.clueText.visible = false;
                this.leftClueButton.visible = false;
                this.rightClueButton.visible = false;
                this.checkButton.visible = false;
                for (let panels of this.suspectPanels) {
                    panels.close_all();
                }
                // Show win elements
                this.winText.visible = true;
                this.nextCaseButton.visible = true;
                this.nextCaseText.visible = true;
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
        this.checkButton.visible = false;
        this.nextCaseText = this.add.bitmapText(900, 35, 'text_white', "Next Case", 30).setOrigin(0.5).setCenterAlign();
        this.nextCaseButton = this.add.sprite(990, 35, 'arrowRight_white').setScale(3.0).setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.nextCaseButton.setScale(2.5);
                this.nextCaseButton.setTexture('arrowRight_darkGrey');
                // Reload scene
                this.scene.restart();
            })
            .on('pointerover', () => { this.nextCaseButton.setTexture('arrowRight_grey'); })
            .on('pointerout', () => {
                this.nextCaseButton.setScale(3.0);
                this.nextCaseButton.setTexture('arrowRight_white');
            });
        this.nextCaseButton.visible = false;
        this.nextCaseText.visible = false;

        // Suspect panel objects
        this.suspect1Panels = new Panels(this, 'panels', this.suspect1, this.colors, this.animals, this.items, 112);
        this.suspect2Panels = new Panels(this, 'panels', this.suspect2, this.colors, this.animals, this.items, 312);
        this.suspect3Panels = new Panels(this, 'panels', this.suspect3, this.colors, this.animals, this.items, 512);
        this.suspect4Panels = new Panels(this, 'panels', this.suspect4, this.colors, this.animals, this.items, 712);
        this.suspect5Panels = new Panels(this, 'panels', this.suspect5, this.colors, this.animals, this.items, 912);
        // Array to hold panels
        this.suspectPanels = [
            this.suspect1Panels, this.suspect2Panels, this.suspect3Panels,
            this.suspect4Panels, this.suspect5Panels
        ];
        for (let panels of this.suspectPanels) {
            panels.hide_buttons();
        }

        // Tutorial
        if (!tutorialComplete) {
            this.bigPanel = this.add.sprite(512, 300, 'panel_large').setScale(5.0);
            this.title = this.add.bitmapText(512, 100, 'text_white', "Creature Case", 70).setOrigin(0.5).setCenterAlign();
            this.subtitle = this.add.bitmapText(512, 150, 'text_white', "How to Play", 50).setOrigin(0.5).setCenterAlign();

            let tutorialImages = ['clue', 'suspect', 'panel', 'x', 'item', 'timer', 'check'];
            let tutorialDesc = this.gameText.TutorialDescriptions;

            this.tutorialImage = this.add.image(512, 300, tutorialImages[0]);
            this.description = this.add.bitmapText(512, 400, 'text_white', tutorialDesc[0], 30).setMaxWidth(400).setOrigin(0.5).setCenterAlign();
            this.leftButton = this.add.sprite(300, 300, 'arrowLeft_white').setScale(2.0).setInteractive({ useHandCursor: true })
                .on('pointerdown', () => {
                    this.leftButton.setScale(1.5);
                    this.leftButton.setTexture('arrowLeft_darkGrey');
                    this.rightButton.visible = true;
                    this.currTutorial--;
                    if (this.currTutorial == 0) { this.leftButton.visible = false; }
                    this.tutorialImage.setTexture(tutorialImages[this.currTutorial]);
                    this.description.setText(tutorialDesc[this.currTutorial]);
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
            this.leftButton.visible = false;
            this.rightButton = this.add.sprite(724, 300, 'arrowRight_white').setScale(2.0).setInteractive({ useHandCursor: true })
                .on('pointerdown', () => {
                    this.rightButton.setScale(1.5);
                    this.rightButton.setTexture('arrowRight_darkGrey');
                    this.leftButton.visible = true;
                    this.currTutorial++;
                    if (this.currTutorial == tutorialImages.length-1) { this.rightButton.visible = false; }
                    this.tutorialImage.setTexture(tutorialImages[this.currTutorial]);
                    this.description.setText(tutorialDesc[this.currTutorial]);
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
            this.xButton = this.add.sprite(750, 65, 'x_grey').setScale(2.0).setInteractive({ useHandCursor: true })
                .on('pointerdown', () => {
                    tutorialComplete = true;
                    // Hide tutorial
                    this.bigPanel.visible = false;
                    this.title.visible = false;
                    this.subtitle.visible = false;
                    this.leftButton.visible = false;
                    this.rightButton.visible = false;
                    this.description.visible = false;
                    this.xButton.visible = false;
                    this.tutorialImage.visible = false;
                    // Show game elements
                    this.clueText.visible = true;
                    this.timerBackground.visible = true;
                    this.timerText.visible = true;
                    this.leftClueButton.visible = true;
                    this.rightClueButton.visible = true;
                    this.checkButton.visible = true;
                    for (let panels of this.suspectPanels) {
                        panels.show_buttons();
                    }
                    // Start game
                    this.roundActive = true;
                });
        } else { // If the tutorial has already been completed, show game elements
            this.clueText.visible = true;
            this.timerBackground.visible = true;
            this.timerText.visible = true;
            this.leftClueButton.visible = true;
            this.rightClueButton.visible = true;
            this.checkButton.visible = true;
            for (let panels of this.suspectPanels) {
                panels.show_buttons();
            }
            // Start game
            this.roundActive = true;
        }
    }

    update() {
        // --------- Timer --------- //
        if (this.roundActive) {
            this.timeCounter--;
            if (this.timeCounter == 0) {
                this.currTime--;
                this.timeCounter = this.timeCount;
                this.timerText.setText(this.currTime);
            }
            if (this.popupCounter > 0) { this.popupCounter--; }
            if (this.popupCounter == 0) {
                this.checkText.visible = false;
            }
        }

        // Run every suspect's update function each frame
        for (let suspect of this.suspects) { suspect.update(); }
    }

    shuffle(array) {
        let currentIndex = array.length;
      
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
      
          // Pick a remaining element...
          let randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
    }
}