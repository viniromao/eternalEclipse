import TypeWriter from "../systems/TypeWriter.js"

export default class WarningScene extends Phaser.Scene {
    constructor() {
        super({ key: 'WarningScene' });
    }

    create() {
        this.isPlaying = false

        this.add.image(this.cameras.main.width /2, this.cameras.main.height /2, 'border');
        this.add.image(this.cameras.main.width /2, (this.cameras.main.height /2 )+30, 'lore', 0);

        let message = "In the shadow of night, monsters' power takes flight\ntheir damage grows might\n\nMONSTERS DEAL MORE DAMAGE IN THE DARK";
        this.nextSceneScheduled = false;
        let typewriterSound = this.sound.add('typewriter');
        this.typewriter = new TypeWriter(this, 40, 40, message, typewriterSound);
        this.typewriter.start(80);
        


        // Add a listener for the pointer down event
        this.input.on('pointerdown', () => {
            if (!this.typewriter.isFinished) {
                this.typewriter.skip(); 
            }
        });
    }

    update() {
    
        if (this.typewriter.isFinished && !this.nextSceneScheduled) {
            this.nextSceneScheduled = true; // Set the flag to true
            this.time.delayedCall(3000, () => {
                this.nextScene();
            });
        }
    }

    nextScene() {
        this.scene.start('MainScene');
    }
}
