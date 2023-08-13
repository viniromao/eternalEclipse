import Entity from "./Entity.js"

export default class Monster extends Entity {
    constructor(sprite, position, velocity, spriteAnimation, deathAnimation, attackAnimation, finalPosition, health, damage) {
        super(sprite, position, velocity, spriteAnimation, deathAnimation, attackAnimation, finalPosition, health, damage)
        this.hidden = true
    }

    getDamage() {
        if (this.hidden) {
            return this.damage * 3
        } else {
            return this.damage
        }
    }
}
