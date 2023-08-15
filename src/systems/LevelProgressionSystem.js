export default class LevelProgressionSystem {
    constructor(scene) {
        this.scene = scene
        this.clock()
    }

    clock() {
        this.elapsedTime = 0;

        this.scene.time.addEvent({
            delay: 1000, 
            callback: () => {
                this.elapsedTime += 1; 

                if (this.elapsedTime === 5) { 
                   
                    console.log('100 seconds have elapsed!');

                }

                if (this.elapsedTime === 10) { 
                   

                }
            },
            callbackScope: this,
            loop: true // Repeat indefinitely
        });
    }
}