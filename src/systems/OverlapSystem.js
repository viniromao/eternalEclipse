export default class OverlapSystem {

    drawWater(entity) {
       entity.drownedSprite.x = entity.position.x
       entity.drownedSprite.y = entity.position.y
    }
}