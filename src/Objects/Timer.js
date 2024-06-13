class Timer extends Phaser.GameObjects.GameObject {
    constructor(scene, type) {
        super(scene, type);

        this.scene = scene;
        this.second = 60; // Used to count time
        this.timeCounter = this.second;
        this.currTime = roundTime;

        this.timerBackground = scene.add.image(510, -12, 'panel_large').setScale(1.3);
        this.timerText = scene.add.bitmapText(512, 20, 'text_white', this.format_time(this.currTime), 60).setOrigin(0.5).setCenterAlign();

        return this;
    }

    format_time(time) {
        let mins = Math.floor(time / 60);
        let secs = time % 60;
        return mins+':'+(secs < 10 ? '0' : '')+secs;
    }

    show() {
        this.timerBackground.visible = true;
        this.timerText.visible = true;
    }

    hide() {
        this.timerBackground.visible = false;
        this.timerText.visible = false;
    }

    update() {
        if (this.scene.roundActive) {
            if (this.currTime > 0) {
                this.timeCounter--;
                if (this.timeCounter == 0) {
                    this.timeCounter = this.second;
                    this.currTime--; // Subtract 1 second from current time
                    this.timerText.setText(this.format_time(this.currTime));
                }
            } else { // When current time reaches 0
                // Game over
                this.scene.sound.play('game_over');
                this.scene.gameOver.show();
                // Hide game elements
                this.scene.timer.hide();
                this.scene.clues.hide();
                this.scene.check.hide();
                this.scene.credits.hide_button();
                for (let panels of this.scene.suspectPanels) { panels.close_all(); }
                this.scene.roundActive = false;
            }
        }
    }
}