import TypeWriter from "../systems/TypeWriter.js"

export default class LoreScene2 extends Phaser.Scene {
    constructor() {
        super({ key: 'LoreScene2' });
    }

    create() {
        this.add.image(this.cameras.main.width /2, this.cameras.main.height /2, 'border');
        const centerX = this.cameras.main.centerX;

        this.add.text(centerX + 100 , 40, 'CLICK TO SKIP', { fontFamily: 'custom', fontSize: '30px', });

        let message = `At the twisted gates of Hell's dark brink,
Last heroes stand, no time to think,
A world in turmoil, teetering close,
Humanity's remnants, a suffering host.

With armor worn and swords ablaze,
They face the darkness, the inferno's haze,
The last defenders of all that's good,
A final battle in hell's harsh wood.

Evil's minions with eyes afire,
Marching forward, never to tire,
But these brave souls, they will not yield,
Standing firm on the damned battlefield.`;
        this.nextSceneScheduled = false;
        let typewriterSound = this.sound.add('typewriter');
        this.typewriter = new TypeWriter(this, 40, 40, message, typewriterSound);
        this.typewriter.start(1);

        // Add a listener for the pointer down event
        this.input.on('pointerdown', () => {
            if (!this.typewriter.isFinished) {
                this.typewriter.skip(); // You would have to implement this method in the TypeWriter class
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
        this.scene.start('WarningScene3');
    }
}
