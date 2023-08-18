export default class FireBall {
    constructor(scene, velocity, position, angle, damage) {
        this.position = position;
        this.velocity = velocity;
        this.scene = scene
        this.angle = angle
        this.sprite = scene.add.sprite(position.x, position.y, 'arrow');
        this.sprite.setFrame(1);
        this.sprite.setRotation(angle);
        this.damage = damage

        const graphics = scene.make.graphics();
        graphics.fillStyle(0xFFFFFF);
        graphics.fillRect(0, 0, 5, 5);
        graphics.generateTexture('whiteSquare', 5, 5);
        graphics.destroy();

        // Use the new texture for the particle system
        this.particles = scene.add.particles('whiteSquare');

        this.emitter = this.particles.createEmitter({
            x: position.x,
            y: position.y,
            lifespan: 1000,
            speed: { min: 100, max: 200 },
            angle: { min: 0, max: 360 },
            quantity: 1,
            frequency: 100,
            scale: { start: 1, end: 0 },
            alpha: { start: 1, end: 0 }
        });

        // Make sure the particles follow the fireball
        this.emitter.startFollow(this.sprite);
    }

    outOfBounds() {
        if (this.sprite.x < 0 || this.sprite.x > this.scene.sys.game.config.width ||
            this.sprite.y < 0 || this.sprite.y > this.scene.sys.game.config.height) {
            this.destroy();
        }
    }

    dealDamage(monster) {
        if (!this.hasDealtDamage) {
            monster.health.dealDamage(this.damage);
        }
    }

    destroy() {
        this.emitter.stop();
        this.sprite.destroy();

        const index = this.scene.fireBalls.indexOf(this);
        if (index > -1) {
            this.scene.fireBalls.splice(index, 1);
        }
    }
}