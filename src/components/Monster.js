import Entity from "./Entity.js"

export default class Monster extends Entity {
    constructor(sprite, position, velocity, spriteAnimation, deathAnimation, attackAnimation, finalPosition, health, damage, hidden) {
        super(sprite, position, velocity, spriteAnimation, deathAnimation, attackAnimation, finalPosition, health, damage)
        this.hidden = hidden
    }

    getDamage() {
        if (this.hidden) {
            return this.damage * 3
        } else {
            return this.damage
        }
    }
}
