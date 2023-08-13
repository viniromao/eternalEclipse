export default class TimerManager {
    constructor(scene, delay, callback) {
        this.scene = scene;
        this.delay = delay;
        this.callback = callback;
    }

    start() {
        this.timedEvent = this.scene.time.addEvent({
            delay: this.delay,
            callback: this.callback,
            callbackScope: this.scene,
            loop: true,
        });
    }

    stop() {
        this.timedEvent.remove();
    }
}