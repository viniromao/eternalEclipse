export default class Entity {
    constructor(sprite, position, velocity, spriteAnimation, deathAnimation, attackAnimation, finalPosition, health, damage) {
        this.sprite = sprite; //of type this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height - 15, 'player');
        this.spriteAnimation = spriteAnimation;
        this.deathAnimation = deathAnimation;
        this.attackAnimation = attackAnimation;
        this.position = position;
        this.velocity = velocity;
        this.finalPosition = finalPosition == null ? position : finalPosition;
        this.radius = 32;
        this.health = health;
        this.markedForDestruction = false;
        this.dying = false;
        this.damage = damage;
    }

    destroy() {
        // Destroy the sprite (if it's a Phaser sprite object)
        if (this.sprite) {
            this.sprite.destroy();
        }

        // Nullify properties to help with garbage collection
        this.sprite = null;
        this.spriteAnimation = null;
        this.position = null;
        this.velocity = null;
        this.finalPosition = null;
        this.health.destroy();
    }

    isPresent() {
        return this.position != null
    }
}