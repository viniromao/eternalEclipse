import TypeWriter from "../systems/TypeWriter.js"

export default class LoreScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LoreScene' });
    }

    init(data) {
        this.next = data.nextScene;
    }

    create() {

        let message = "There seems to be a permeating Mist of Misery\nthat flows through the Swamp of Sorrows as disease\nand decay flood the land.\nNo one truly knows the origin of this wretched curse,\nfor those who attempt to enter... \nhave never been seen again by their loved ones: dead or alive.\n Will your fate end up the same...?"
        this.nextSceneScheduled = false;
        let typewriterSound = this.sound.add('typewriter');
        this.typewriter = new TypeWriter(this, 12, 12, message, typewriterSound);
        this.typewriter.start(50); // 50ms per character
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
        this.scene.start(this.next);
    }
}