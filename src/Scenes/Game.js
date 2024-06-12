class Game extends Phaser.Scene {
    constructor() {
        super('gameScene');
    }

    init() {
        // Game variables
        this.roundActive = false;
        this.roundTime = 600;
        this.timeCount = 60;
        this.timeCounter = this.timeCount;
        this.currTime = this.roundTime;
        this.currClue = 0;

        this.gameText = this.cache.json.get('game_text'); // Used to fill following categories for random case generation
        this.names = ["1", "2", "3", "4", "5"];
        this.shuffle(this.names); // Names in a random order
        this.colors = ["red", "blue", "green", "yellow", "grey"];
        this.shuffle(this.colors);
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

        // Game text
        this.clues = [
            "The suspect that wore the "+this.animals[0]+" mask had a "+this.colors[0]+" shirt.",
            "Suspects "+this.names[0]+" and "+this.names[1]+" did not have "+this.colors[0]+" or "+this.colors[1]+" shirts and neither held the "+this.items[1]+".",
            "The suspect that wore the "+this.animals[1]+" mask had a "+this.colors[1]+" shirt and was holding the "+this.items[2]+".",
            "Suspect "+this.names[2]+" had a "+this.colors[2]+" shirt and did not wear the "+this.animals[2]+" or the "+this.animals[3]+" mask.",
            "The suspect that wore the "+this.animals[2]+" mask was holding the "+this.items[0]+".",
            "Suspect "+this.names[0]+" did not have a "+this.colors[3]+" shirt and was not holding the "+this.items[0]+" or the "+this.items[3]+".",
            "Suspect "+this.names[3]+" did not have a "+this.colors[0]+" shirt.",
            "Suspect "+this.names[2]+" was not holding the "+this.items[1]+"."
        ];
        this.shuffle(this.clues); // Show clues in a random order
        this.clueText = this.add.bitmapText(512, 100, 'text_white', this.clues[this.currClue], 40).setOrigin(0.5).setMaxWidth(900).setCenterAlign();
        this.clueText.visible = false;

        // Timer
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
                if (this.currClue % this.clues.length == 0) { this.currClue = 0; }
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
        this.winText = this.add.bitmapText(512, 80, 'text_white', "Case solved!", 70).setOrigin(0.5).setCenterAlign();
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
                        return; 
                    }
                }
                // If this part has been reached, solution is correct
                console.log("solution correct");
                this.roundActive = false;
                this.clueText.visible = false;
                this.leftClueButton.visible = false;
                this.rightClueButton.visible = false;
                this.checkButton.visible = false;
                for (let panels of this.suspectPanels) {
                    panels.close_all();
                }
                this.winText.visible = true;
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
        //this.tutorialPanel = this.add.sprite(512, 300, 'panel_large').setScale(5.0);
        //this.title = this.add.bitmapText(512, 100, 'text_white', "Creature Case", 70).setOrigin(0.5).setCenterAlign();
        //this.subtitle = this.add.bitmapText(512, 150, 'text_white', "How to Play", 50).setOrigin(0.5).setCenterAlign();

        // Keys
        this.rKey = this.input.keyboard.addKey('R');
    }

    update() {
        // --------- Timer --------- //
        if (this.roundActive) {
            this.timeCounter--;
            if (this.timeCounter == 0) {
                this.currTime--;
                this.timeCounter = this.timeCount;
                this.timerText.setText(this.currTime);
                if (this.checkText.visible == true) { this.checkText.visible = false; }
            }
        }

        // --------- Suspect Updates --------- //
        for (let suspect of this.suspects) {
            suspect.update();
        }

        // --------- Debug --------- //
        if (Phaser.Input.Keyboard.JustDown(this.rKey)) {
            for (let suspect of this.suspects) {
                suspect.randomize();
            }
        }
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