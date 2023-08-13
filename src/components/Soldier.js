import Entity from "./Entity.js"

export default class Soldier extends Entity {
    constructor(sprite, position, velocity, spriteAnimation, finalPosition, formationAngle) {
        super(sprite, position, velocity, spriteAnimation, finalPosition)
        this.formationAngle = formationAngle
    }
}
