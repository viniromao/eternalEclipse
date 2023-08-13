export default class Target {
    constructor(scene, radius, targets) {
        this.scene = scene;
        this.radius = radius;
        this.graphics = this.scene.add.graphics();
        this.targets = targets
    }

    draw() {
        this.graphics.clear();
        this.graphics.lineStyle(1, 0xffffff);

        this.targets.forEach(target => {
            this.graphics.strokeCircle(target.x, target.y, this.radius);
        });
    }
}