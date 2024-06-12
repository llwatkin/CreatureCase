class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // ------- Load All Assets ------- //
        this.load.setPath('./assets/');
        this.load.image('background', 'background.jpg');
        this.load.setPath('./assets/spritesheets');
        // Spritesheets
        this.load.atlasXML('skin', 'skin.png', 'skin.xml');
        this.load.atlasXML('faces', 'faces.png', 'faces.xml');
        this.load.atlasXML('hair', 'hair.png', 'hair.xml');
        this.load.atlasXML('shirts', 'shirts.png', 'shirts.xml');
        this.load.atlasXML('animal_masks', 'animal_masks.png', 'animal_masks.xml');
        this.load.atlasXML('items', 'items.png', 'items.xml');
        // UI
        this.load.setPath('./assets/ui/');
        this.load.image('arrowLeft_white', 'arrowLeft_white.png');
        this.load.image('arrowLeft_grey', 'arrowLeft_grey.png');
        this.load.image('arrowLeft_darkGrey', 'arrowLeft_darkGrey.png');
        this.load.image('arrowRight_white', 'arrowRight_white.png');
        this.load.image('arrowRight_grey', 'arrowRight_grey.png');
        this.load.image('arrowRight_darkGrey', 'arrowRight_darkGrey.png');
        this.load.image('panel_large', 'panel_large.png');
        this.load.image('panel_small', 'panel_small.png');
        this.load.image('circle', 'circle.png');
        this.load.image('x_grey', 'x_grey.png');
        this.load.image('x_black', 'x_black.png');
        this.load.image('check_darkGrey', 'check_darkGrey.png');
        this.load.image('check_grey', 'check_grey.png');
        this.load.image('check_white', 'check_white.png');
        // Fonts
        this.load.setPath('./assets/fonts/');
        this.load.bitmapFont('text_white', 'Kenney_Blocks.png', 'Kenney_Blocks.fnt');
        // Audio
        
        // JSON
        this.load.setPath('./src/');
        this.load.json('game_text', 'game_text.json');
    }

    create() {
        // Go to game scene!
        this.scene.start('gameScene');
    }
}