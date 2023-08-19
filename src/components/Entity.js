export default class Entity {
    constructor(sprite, position, velocity, spriteAnimation, deathAnimation, attackAnimation, finalPosition, health, damage, drowned, drownedSprite, drownedAnimation) {
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
        this.drowned = drowned;
        this.drownedSprite = drownedSprite;
        this.drownedAnimation = drownedAnimation;
        if (this.drownedSprite)
            this.drownedSprite.setVisible(this.drowned);
    }

    destroy() {
        if (this.sprite) {
            this.sprite.destroy();
        }
        if (this.drownedSprite) {
            this.drownedSprite.destroy();
        }

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