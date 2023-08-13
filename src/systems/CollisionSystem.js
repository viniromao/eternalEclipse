export default class CollisionSystem {
    constructor(scene, dodgeDistance, collisionDistance) {
        this.scene = scene;
        this.dodgeDistance = dodgeDistance; // Distance to dodge on collision
        this.collisionDistance = collisionDistance; // Collision radius
    }

    update() {

        this.scene.monstersList.forEach((monster, index) => {
            this.scene.soldierList.forEach((soldier) => {
                // Check for collision between monster and soldier using the specified collision distance
                if (Phaser.Geom.Intersects.CircleToCircle(
                    new Phaser.Geom.Circle(monster.position.x, monster.position.y, this.collisionDistance),
                    new Phaser.Geom.Circle(soldier.position.x, soldier.position.y, this.collisionDistance))) {

                    // Calculate the angle between the monster and soldier
                    const angle = Phaser.Math.Angle.Between(
                        monster.position.x, monster.position.y,
                        soldier.position.x, soldier.position.y
                    );

                    // Move monster and soldier away from each other
                    monster.position.x += Math.cos(angle + Math.PI) * this.dodgeDistance;
                    monster.position.y += Math.sin(angle + Math.PI) * this.dodgeDistance;
                    soldier.position.x += Math.cos(angle) * this.dodgeDistance;
                    soldier.position.y += Math.sin(angle) * this.dodgeDistance;

                    // Update sprite positions
                    monster.sprite.x = monster.position.x;
                    monster.sprite.y = monster.position.y;
                    soldier.sprite.x = soldier.position.x;
                    soldier.sprite.y = soldier.position.y;
                }

            });
        });

        this.scene.monstersList.forEach(monster => {
            if (Phaser.Geom.Intersects.CircleToCircle(
                new Phaser.Geom.Circle(monster.position.x, monster.position.y, this.collisionDistance),
                new Phaser.Geom.Circle(this.scene.player.position.x, this.scene.player.position.y, this.collisionDistance))) {

                monster.destroy()
            }
        });

        this.scene.monstersList = this.scene.monstersList.filter(item => item.position != null);
    }
}