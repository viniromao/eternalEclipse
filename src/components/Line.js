export default class Line {
    constructor(scene, x, y, length, angle) {
        this.scene = scene;
        this.x = x; // Starting X position
        this.y = y; // Starting Y position
        this.length = length; // Length of the line
        this.angle = angle
        // Create a Graphics object within the scene
        this.graphics = this.scene.add.graphics();
    }

    drawLine() {
        // Get current mouse position
        let pointer = this.scene.input.activePointer;
        let mouseX = pointer.x;
        let mouseY = pointer.y;

        // Calculate angle to the mouse position
        let angleInRadians = Phaser.Math.Angle.Between(this.x, this.y, mouseX, mouseY);
        this.angle = -angleInRadians * (180 / Math.PI);

        // Calculate end point based on length and angle
        let endX = this.x + this.length * Math.cos(angleInRadians);
        let endY = this.y + this.length * Math.sin(angleInRadians);

        // Clear previous drawings
        this.graphics.clear();

        // Set line style
        this.graphics.lineStyle(2, 0xffffff);

        // Draw the line
        this.graphics.moveTo(this.x, this.y);
        this.graphics.lineTo(endX, endY);
        this.graphics.strokePath();
    }
}