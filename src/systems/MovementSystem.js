export default class MovementSystem {
    constructor(speed) {
        this.speed = speed;
        this.stopThreshold = 3;
    }

    update(entity, scene) {
        if (entity.position && entity.velocity && entity.finalPosition) {

            entity.sprite.x = entity.position.x;
            entity.sprite.y = entity.position.y;

            if ((Math.abs(entity.position.x - entity.finalPosition.x) < this.stopThreshold) && (Math.abs(entity.position.y == entity.finalPosition.y) < this.stopThreshold)) {
                entity.position.x = entity.finalPosition.x;
                entity.position.y = entity.finalPosition.y;
                return
            }

            const angle = Phaser.Math.Angle.Between(
                entity.position.x,
                entity.position.y,
                entity.finalPosition.x,
                entity.finalPosition.y
            );

            entity.velocity.dx = Math.cos(angle) * this.speed;
            entity.velocity.dy = Math.sin(angle) * this.speed;

            entity.position.x += entity.velocity.dx;
            entity.position.y += entity.velocity.dy;

            if (Phaser.Math.Distance.Between(
                entity.position.x,
                entity.position.y,
                entity.finalPosition.x,
                entity.finalPosition.y) < this.speed) {

                entity.position.x = entity.finalPosition.x;
                entity.position.y = entity.finalPosition.y;
            }
        }
    }
}