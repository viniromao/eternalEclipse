import Entity from "./Entity.js"

export default class Mage extends Entity {
    constructor(sprite, position, velocity, spriteAnimation, deathAnimation, attackAnimation, finalPosition, formationAngle, health, damage) {
        super(sprite, position, velocity, spriteAnimation, deathAnimation, attackAnimation, finalPosition, health, damage)
        this.formationAngle = formationAngle
    }
}
