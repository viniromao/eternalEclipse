import TypeWriter from "../systems/TypeWriter.js"

export default class LoreScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LoreScene' });
    }

    create() {
        this.add.image(this.cameras.main.width /2, this.cameras.main.height /2, 'border');
        const centerX = this.cameras.main.centerX;

        this.add.text(centerX + 100 , 40, 'CLICK TO SKIP', { fontFamily: 'custom', fontSize: '30px', });

        let message = `In the swamps where shadows dance,
And monsters lurk with wicked glance,
A fog descends, thick and deep,
A place where nightmares wake from sleep.

Here humanity's hope seems thin and frail,
A desperate tale in a haunting trail,
But from the mire, a beacon glows,
The last defense 'gainst lurking foes.

With feet sunk deep in murky fen,
A band of heroes stands again,
They face the beasts, both dark and dread,
In swampy realms where angels fear to tread.`;
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
        this.scene.start('WarningScene2');
    }
}
