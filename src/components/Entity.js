export default class Entity {
    constructor(sprite, position, velocity, spriteAnimation, finalPosition) {
        this.sprite = sprite; //of type this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height - 15, 'player');
        this.spriteAnimation = spriteAnimation;
        this.position = position;
        this.velocity = velocity;
        this.finalPosition = finalPosition == null ? position : finalPosition;
        this.radius = 32
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
    }
}