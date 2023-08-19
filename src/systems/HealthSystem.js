export default class HealthSystem {
    constructor(scene, position, currentHealth) {
        this.scene = scene;
        this.currentHealth = currentHealth;
        this.position = position;
        this.maxHealth = currentHealth;
        this.maxWidth = 15;
        this.healthSquares = [];
        this.yOffset = 18;
        this.xOffset = this.maxWidth / 2

        const squareWidth = this.maxWidth / this.maxHealth;
        const squareHeight = 5;

        for (let i = 0; i < this.maxHealth; i++) {
            const rect = this.scene.add.rectangle(position.x - this.xOffset + i * squareWidth, position.y - this.yOffset, squareWidth, squareHeight, 0x000000);
            this.healthSquares.push(rect);
        }
    }

    setCurrentHealthToMax(){
        this.currentHealth = this.maxHealth;
        for (let i = 0; i < this.maxHealth; i++) {
            this.healthSquares[i].fillColor = i < this.currentHealth ? 0x000000 : 0xffffff;
        }
    }

    updateHealth(newHealth) {
        this.currentHealth = newHealth;

        for (let i = 0; i < this.maxHealth; i++) {
            this.healthSquares[i].fillColor = i < newHealth ? 0x000000 : 0xffffff;
        }
    }

    dealDamage(damage) {
        this.currentHealth -= damage;

        for (let i = 0; i < this.maxHealth; i++) {
            this.healthSquares[i].fillColor = i < this.currentHealth ? 0x000000 : 0xffffff;
        }
    }

    updatePosition(newPosition) {
        this.position = newPosition;
        const squareWidth = this.maxWidth / this.maxHealth;

        for (let i = 0; i < this.maxHealth; i++) {
            this.healthSquares[i].x = newPosition.x - this.xOffset + i * squareWidth;
            this.healthSquares[i].y = newPosition.y - this.yOffset;
        }
    }

    destroy() {
        for (let i = 0; i < this.healthSquares.length; i++) {
            this.healthSquares[i].destroy();
        }
        this.healthSquares = [];
    }

}
