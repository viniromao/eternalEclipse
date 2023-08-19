import Entity from "./Entity.js"

export default class Monster extends Entity {
    constructor(sprite, position, velocity, spriteAnimation, deathAnimation, attackAnimation, finalPosition, health, damage, hidden, xp, drowned, drownedSprite, drownedAnimation) {
        super(sprite, position, velocity, spriteAnimation, deathAnimation, attackAnimation, finalPosition, health, damage, drowned, drownedSprite, drownedAnimation)
        this.hidden = hidden
        this.xp = xp

        if (this.hidden)
            this.drownedSprite.setVisible(false);

    }

    getDamage() {
        if (this.hidden) {
            return this.damage * 3
        } else {
            return this.damage
        }
    }

    setHidden(scene) {
        this.hidden = true
        if (this.drowned)
            this.drownedSprite.setVisible(false);
        scene.animationSystem.addHiddenMonsterAnimation(this)
    }

    setVisible(scene) {
        this.hidden = false
        if (this.drowned)
            this.drownedSprite.setVisible(true);
        scene.animationSystem.addMonsterAnimation(this)
    }
}
