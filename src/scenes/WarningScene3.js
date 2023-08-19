import TypeWriter from "../systems/TypeWriter.js"

export default class WarningScene3 extends Phaser.Scene {
    constructor() {
        super({ key: 'WarningScene3' });
    }

    create() {
        this.isPlaying = false
        const centerX = this.cameras.main.centerX;


        this.add.image(this.cameras.main.width /2, this.cameras.main.height /2, 'border');
        this.add.image(this.cameras.main.width /2, (this.cameras.main.height /2 )+30, 'lore', 2);

        let message = "BEHOLD THE HORDES";
        this.nextSceneScheduled = false;
        let typewriterSound = this.sound.add('typewriter');
        this.typewriter = new TypeWriter(this, centerX -95, 40, message, typewriterSound);
        this.typewriter.start(150);
        


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
        this.scene.start('Level3Scene');
    }
}
