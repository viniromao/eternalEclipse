export default class Circumference {
    constructor(scene, radius) {
        this.scene = scene;
        this.radius = radius;
        this.graphics = this.scene.add.graphics();
        this.x = 0
        this.y = 0
    }

    draw(x, y) {
        this.graphics.clear();
        this.x = x
        this.y = y
        // Set the line style with a 1-pixel width for a pixelated look
        this.graphics.lineStyle(1, 0xffffff);

        // Draw a pixelated circle
        for (let i = 0; i < 360; i++) {
            let angle = i * Math.PI / 180;
            let xPos = x + this.radius * Math.cos(angle);
            let yPos = y + this.radius * Math.sin(angle);

            this.graphics.fillRect(Math.round(xPos), Math.round(yPos), 1, 1);
        }
    }

    getRandomTargetsInRange(amount) {
        const centerX = this.x;
        const centerY = this.y;
        const R = this.radius;

        let targets = []

        for (let i = 0; i < amount; i++) {
            const angle = Math.random() * 2 * Math.PI;

            // Generate a random radius between 0 and R
            const radius = Math.sqrt(Math.random()) * R;

            // Convert polar coordinates to Cartesian coordinates
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);

            targets.push({ x, y })
        }

        return targets;
    }
}