import TimerManager from "../systems/TimeManager.js";

export default class TypeWriter {
    constructor(scene, x, y, text, sound) {
        this.scene = scene;
        this.textObject = this.scene.add.text(x, y, '', { fontFamily: 'custom', fontSize: '24px' });
        this.fullText = text;
        this.sound = sound;
        this.sound.setVolume(.1)
        this.currentChar = 0;
        this.isFinished = false;
        this.delay = 50;
    }

    start() {
        this.timerManager = new TimerManager(this.scene, this, this.delay, this.addChar);
        this.timerManager.start();
    }

    addChar() {
        const char = this.fullText[this.currentChar];
        this.textObject.text += char;
        this.sound.play();
        this.currentChar++;

        if (char === '\n') {
            this.timerManager.stop();
            this.timerManager = new TimerManager(this.scene, this, 1000, this.resumeTyping);
            this.timerManager.start();
        } else if (this.currentChar >= this.fullText.length) {
            this.timerManager.stop();
            this.isFinished = true;
        }
    }

    resumeTyping() {
        // Resume typing with the original delay
        this.timerManager.stop();
        this.timerManager = new TimerManager(this.scene, this, this.delay, this.addChar);
        this.timerManager.start();
    }

    skip() {
        this.timerManager.stop();

        this.textObject.text = this.fullText;

        if (this.sound.isPlaying) {
            this.sound.stop();
        }

        this.isFinished = true;
    }

}
