class Credits extends Phaser.GameObjects.GameObject {
    constructor(scene, type) {
        super(scene, type);

        this.bgPanel = scene.add.sprite(512, 300, 'panel_large').setScale(5.0);
        // Text
        this.title = scene.add.bitmapText(512, 100, 'text_white', "Creature Case", 70).setOrigin(0.5).setCenterAlign();
        this.subtitle = scene.add.bitmapText(512, 150, 'text_white', "Credits", 50).setOrigin(0.5).setCenterAlign();
        this.description1 = scene.add.bitmapText(512, 245, 'text_white', "Background ----- Vecteezy.com", 32).setMaxWidth(450).setOrigin(0.5).setCenterAlign();
        this.description2 = scene.add.bitmapText(512, 275, 'text_white', "Sprites ----- Kenney Assets", 32).setMaxWidth(450).setOrigin(0.5).setCenterAlign();
        this.description3 = scene.add.bitmapText(512, 305, 'text_white', "SFX ----- Kenney Assets", 32).setMaxWidth(450).setOrigin(0.5).setCenterAlign();
        this.description4 = scene.add.bitmapText(512, 350, 'text_white', "Music ----- \"Wah Game Loop\" Kevin MacLeod", 32).setMaxWidth(450).setOrigin(0.5).setCenterAlign();
        this.description5 = scene.add.bitmapText(512, 395, 'text_white', "Font ----- Kenney Assets", 32).setMaxWidth(450).setOrigin(0.5).setCenterAlign();
        this.description6 = scene.add.bitmapText(512, 425, 'text_white', "Code ----- Lyle Watkins", 32).setMaxWidth(450).setOrigin(0.5).setCenterAlign();
        this.description7 = scene.add.bitmapText(512, 500, 'text_white', "Built with Phaser 3.70.0", 40).setMaxWidth(450).setOrigin(0.5).setCenterAlign();
        // Buttons
        this.xButton = scene.add.sprite(750, 65, 'x_grey').setScale(2.0).setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                scene.sound.play('click_exit');
                // Hide credits
                this.hide_credits();
                this.show_button(); // Shows button
                // Show game elements
                scene.clues.show();
                scene.timer.show();
                scene.check.show();
                for (let panels of scene.suspectPanels) { panels.show_all(); }
                // Start game
                scene.roundActive = true;
            });
        this.openButton = scene.add.sprite(60, 20, 'panel_small').setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                scene.sound.play('click_exit');
                this.hide_button();
                this.show_credits();
                // Hide game elements and pause game
                scene.clues.hide();
                scene.timer.hide();
                scene.check.hide();
                for (let panels of scene.suspectPanels) { panels.hide_all(); }
                scene.roundActive = false;

            });
        this.openText = scene.add.bitmapText(80, 20, 'text_white', "Credits", 30).setOrigin(0.5).setCenterAlign();

        return this;
    }

    hide_button() {
        this.openButton.visible = false;
        this.openText.visible = false;
    }

    show_button() {
        this.openButton.visible = true;
        this.openText.visible = true;
    }

    hide_credits() {
        this.bgPanel.visible = false;
        this.title.visible = false;
        this.subtitle.visible = false;
        this.description1.visible = false;
        this.description2.visible = false;
        this.description3.visible = false;
        this.description4.visible = false;
        this.description5.visible = false;
        this.description6.visible = false;
        this.description7.visible = false;
        this.xButton.visible = false;
    }

    show_credits() {
        this.bgPanel.visible = true;
        this.title.visible = true;
        this.subtitle.visible = true;
        this.description1.visible = true;
        this.description2.visible = true;
        this.description3.visible = true;
        this.description4.visible = true;
        this.description5.visible = true;
        this.description6.visible = true;
        this.description7.visible = true;
        this.xButton.visible = true;
    }
}