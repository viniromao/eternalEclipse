export default class Arrow {
    constructor(scene, velocity, position, angle, damage) {
        this.position = position;
        this.velocity = velocity;
        this.scene = scene
        this.angle = angle
        this.sprite = scene.add.sprite(position.x, position.y, 'arrow', 0);
        this.sprite.setSize(10)
        this.sprite.setRotation(angle);
        this.damage = damage
        this.hasDealtDamage = false;
    }

    outOfBoundsOrDealtDamage() {
        if (this.hasDealtDamage || this.sprite.x < 0 || this.sprite.x > this.scene.sys.game.config.width ||
            this.sprite.y < 0 || this.sprite.y > this.scene.sys.game.config.height) {
            this.destroy();
        }
    }

    dealDamage(monster) {
        if (!this.hasDealtDamage) {
            monster.health.dealDamage(this.damage);

            this.hasDealtDamage = true;
        }
    }

    destroy() {
        this.sprite.destroy();

        const index = this.scene.arrows.indexOf(this);
        if (index > -1) {
            this.scene.arrows.splice(index, 1);
        }
    }
}