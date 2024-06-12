class Timer extends Phaser.GameObjects.GameObject {
    constructor(scene, type) {
        super(scene, type);

        this.scene = scene;
        this.second = 60; // Used to count time
        this.timeCounter = this.second;
        this.currTime = roundTime;

        this.timerBackground = scene.add.image(510, -12, 'panel_large').setScale(1.3);
        this.timerText = scene.add.bitmapText(512, 20, 'text_white', this.format_time(), 60).setOrigin(0.5).setCenterAlign();

        return this;
    }

    format_time() {
        let mins = Math.floor(this.currTime / 60);
        let secs = this.currTime % 60;
        return mins+':'+secs+(secs < 10 ? '0' : '');
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
                    this.timerText.setText(this.format_time());
                }
            } else { // When current time reaches 0
                // TODO: Game over
                this.scene.roundActive = false;
            }
        }
    }
}