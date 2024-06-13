class Game extends Phaser.Scene {
    constructor() {
        super('gameScene');
    }

    init() {
        // Game variables
        this.roundActive = false;

        // --------------- Generate Random Case --------------- //
        this.gameText = this.cache.json.get('game_text'); // Used to fill following categories for random case generation

        this.names = ["1", "2", "3", "4", "5"];
        this.shuffle(this.names); // Names in a random order
        this.colors = ["red", "blue", "green", "yellow", "grey"];
        this.shuffle(this.colors); // Shirt colors in random order

        // Copy the animal mask and item arrays from the JSON file
        let masksCopy = [...this.gameText.Masks];
        let itemsCopy = [...this.gameText.Items];
        // Fill the following arrays using these copied arrays
        this.masks = [];
        this.items = [];
        for (let i = 0; i < 5; i++) {
            // Pick a random animal
            let rand_animal = Math.floor(Math.random() * masksCopy.length);
            this.masks[i] = masksCopy[rand_animal];
            masksCopy.splice(rand_animal, 1); // Remove this from the possibilities (no duplicates allowed)
            // Pick a random item
            let rand_item = Math.floor(Math.random() * itemsCopy.length);
            this.items[i] = itemsCopy[rand_item];
            itemsCopy.splice(rand_item, 1); // Remove this from the possibilities (no duplicates allowed)
        }

        // This solutions will always be the same for their correspponding clue sets
        this.solutions = [
            [
            [this.colors[4], this.masks[3], this.items[4]], // Suspect at names index 0
            [this.colors[3], this.masks[2], this.items[0]], // Suspect at names index 1
            [this.colors[2], this.masks[4], this.items[3]], // ect.
            [this.colors[1], this.masks[1], this.items[2]],
            [this.colors[0], this.masks[0], this.items[1]]
            ],
            [
            [this.colors[3], this.masks[2], this.items[2]],
            [this.colors[2], this.masks[4], this.items[1]],
            [this.colors[0], this.masks[0], this.items[3]],
            [this.colors[4], this.masks[3], this.items[4]],
            [this.colors[1], this.masks[1], this.items[0]]
            ],
            [
            [this.colors[0], this.masks[0], this.items[2]],
            [this.colors[1], this.masks[4], this.items[0]],
            [this.colors[2], this.masks[1], this.items[3]],
            [this.colors[4], this.masks[2], this.items[4]],
            [this.colors[3], this.masks[3], this.items[1]]
            ]
        ];

        // Choose a random puzzle
        this.puzzle = Math.floor(Math.random() * this.solutions.length);
    }

    create() {
        this.background = this.add.image(512, 300, 'background');

        this.input.mouse.disableContextMenu(); // Disable right-click menu
        
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
        this.clues = new Clues(this, 'clues');
        this.shuffle(this.clues.get_clues()); // Shuffle clues
        this.clues.update_clue(); // Set first clue
        this.clues.hide();

        // Timer
        this.timer = new Timer(this, 'timer');
        this.timer.hide();
        
        // Check solution
        this.check = new Check(this, 'check');
        this.check.hide();

        // Copy and shuffle color, mask, and item arrays
        let colorsCopy = [...this.colors];
        let masksCopy = [...this.masks];
        let itemsCopy = [...this.items];
        this.shuffle(colorsCopy);
        this.shuffle(masksCopy);
        this.shuffle(itemsCopy);
        // Suspect panel objects
        this.suspect1Panels = new Panels(this, 'panels', this.suspect1, colorsCopy, masksCopy, itemsCopy, 112);
        this.suspect2Panels = new Panels(this, 'panels', this.suspect2, colorsCopy, masksCopy, itemsCopy, 312);
        this.suspect3Panels = new Panels(this, 'panels', this.suspect3, colorsCopy, masksCopy, itemsCopy, 512);
        this.suspect4Panels = new Panels(this, 'panels', this.suspect4, colorsCopy, masksCopy, itemsCopy, 712);
        this.suspect5Panels = new Panels(this, 'panels', this.suspect5, colorsCopy, masksCopy, itemsCopy, 912);
        // Array to hold panels
        this.suspectPanels = [
            this.suspect1Panels, this.suspect2Panels, this.suspect3Panels,
            this.suspect4Panels, this.suspect5Panels
        ];
        for (let panels of this.suspectPanels) { panels.hide_buttons(); }

        // Game over screen
        this.gameOver = new GameOver(this, 'gameOver');
        this.gameOver.hide();

        // Credits screen
        this.credits = new Credits(this, 'credits');
        this.credits.hide_credits();
        this.credits.hide_button();

        // Tutorial
        if (!tutorialComplete) {
            this.tutorial = new Tutorial(this, 'tutorial');
        } else { // If the tutorial has already been completed, show game elements and start game
            this.clues.show();
            this.timer.show();
            this.check.show();
            this.credits.show_button();
            for (let panels of this.suspectPanels) { panels.show_buttons(); }
            // Start game
            this.roundActive = true;
        }

        // Keys
        this.qKey = this.input.keyboard.addKey("Q");
    }

    update() {
        // --------- Run all object update functions --------- //
        this.timer.update();
        this.check.update();
        for (let suspect of this.suspects) { suspect.update(); }

        // O key press opens all suspect panels
        if (Phaser.Input.Keyboard.JustDown(this.qKey)) {
            for (let panels of this.suspectPanels) {
                panels.open_all();
            }
        }
    }

    // Randomly shuffles an input array
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