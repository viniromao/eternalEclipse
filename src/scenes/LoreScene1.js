import TypeWriter from "../systems/TypeWriter.js"

export default class LoreScene1 extends Phaser.Scene {
    constructor() {
        super({ key: 'LoreScene1' });
    }

    create() {
        this.add.image(this.cameras.main.width /2, this.cameras.main.height /2, 'border');
        const centerX = this.cameras.main.centerX;

        this.add.text(centerX + 100 , 40, 'CLICK TO SKIP', { fontFamily: 'custom', fontSize: '30px', });

        let message = `In the shadows where monsters creep,
Humanity's hope begins to weep,
A darkness descends, all-consuming,
A threat to existence, ever-looming.

But from the ashes, a glimmer ignites,
A spark of defiance in the darkest of nights,
A last hope emerges, brave and true,
A force to combat the monstrous crew.

With courage and valor, they take their stand,
The last defenders of our threatened land,
Against claws and fangs, they'll firmly fight,
A beacon of hope in the endless night.`;
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
        this.scene.start('WarningScene');
    }
}
