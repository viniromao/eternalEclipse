import Monster from "../components/Monster.js";

export default class MovementSystem {
    constructor(speed) {
        this.speed = speed;
        this.arrowSpeed = speed * 10;
        this.stopThreshold = 3;
    }

    update(entity) {
        if (entity.position && entity.velocity && entity.finalPosition && entity.dying == false) {

            entity.sprite.x = entity.position.x;
            entity.sprite.y = entity.position.y;


            if ((Math.abs(entity.position.x - entity.finalPosition.x) < this.stopThreshold) && (Math.abs(entity.position.y - entity.finalPosition.y) < this.stopThreshold)) {
                if (entity instanceof Monster)
                    return

                entity.position.x = entity.finalPosition.x;
                entity.position.y = entity.finalPosition.y;
                this.updateHealthPosition(entity)
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

            //only to not overshoot
            if (Phaser.Math.Distance.Between(
                entity.position.x,
                entity.position.y,
                entity.finalPosition.x,
                entity.finalPosition.y) < this.speed) {

                entity.position.x = entity.finalPosition.x;
                entity.position.y = entity.finalPosition.y;
            }

            this.updateHealthPosition(entity)
        }
    }

    updateArrow(arrow) {
        arrow.velocity.dx = Math.cos(arrow.angle) * this.arrowSpeed;
        arrow.velocity.dy = Math.sin(arrow.angle) * this.arrowSpeed;

        arrow.sprite.x = arrow.position.x;
        arrow.sprite.y = arrow.position.y;
        arrow.position.x += arrow.velocity.dx;
        arrow.position.y += arrow.velocity.dy;
    }

    updateHealthPosition(entity) {
        if (entity.health && entity.dying == false) {
            entity.health.updatePosition(entity.position)
        }
    }
}