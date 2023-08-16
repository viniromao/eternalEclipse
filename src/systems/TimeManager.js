export default class TimerManager {
    constructor(scene, scope, delay, callback) {
        this.scene = scene;
        this.delay = delay;
        this.callback = callback;
        this.scope = scope

    }

    start() {
        this.timedEvent = this.scene.time.addEvent({
            delay: this.delay,
            callback: this.callback,
            callbackScope: this.scope,
            loop: true,
        });
    }

    stop() {
        this.timedEvent.remove();
    }
}