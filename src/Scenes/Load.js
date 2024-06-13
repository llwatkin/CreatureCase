class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // ------- Load All Assets ------- //
        // Images
        this.load.setPath('./assets/images/');
        this.load.image('background', 'background.jpg');
        this.load.image('clue', 'clue.png');
        this.load.image('check', 'check.png');
        this.load.image('panel', 'panel.png');
        this.load.image('item', 'item.png');
        this.load.image('suspect', 'suspect.png');
        this.load.image('timer', 'timer.png');
        this.load.image('x', 'x.png');
        // Spritesheets
        this.load.setPath('./assets/spritesheets');
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
        this.load.setPath('./assets/audio/');
        this.load.audio('main_track', 'main_track.mp3');
        this.load.audio('click_x', 'click_x.ogg');
        this.load.audio('click_assign', 'click_assign.ogg');
        this.load.audio('click_arrow', 'click_arrow.ogg');
        this.load.audio('click_soft', 'click_soft.ogg');
        this.load.audio('item', 'item.ogg');
        this.load.audio('mask', 'mask.ogg');
        this.load.audio('shirt', 'shirt.ogg');
        this.load.audio('not_quite', 'not_quite.ogg');
        this.load.audio('game_over', 'game_over.ogg');
        this.load.audio('case_solved', 'case_solved.ogg');

        // JSON
        this.load.setPath('./src/');
        this.load.json('game_text', 'game_text.json');
    }

    create() {
        // Play music
        this.sound.add('main_track', { loop: true, volume: 0.2 }).play();
        // Go to game scene!
        this.scene.start('gameScene');
    }
}