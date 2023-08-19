import SpriteAnimationComponent from "../components/SpriteAnimationComponent.js"

export default class CollisionSystem {
    constructor(scene, dodgeDistance, collisionDistance) {
        this.scene = scene;
        this.dodgeDistance = dodgeDistance; // Distance to dodge on collision
        this.collisionDistance = collisionDistance; // Collision radius
    }

    update() {

        this.scene.monstersList.forEach(monster => {


            if (monster.isPresent() && monster.dying == false) {
                this.detectArrowMonsterCollision(this.scene.arrows, monster)
                this.detectFireBallMonsterCollision(this.scene.fireBalls, monster)
                this.detectMonsterSoldierCollision(this.scene.soldierList, monster);
                this.detectMonsterSoldierCollision(this.scene.archersList, monster);
                this.detectMonsterSoldierCollision(this.scene.mages, monster);
            }

            if (monster.isPresent() && monster.dying == false) {
                if (Phaser.Geom.Intersects.CircleToCircle(
                    new Phaser.Geom.Circle(monster.position.x, monster.position.y, this.collisionDistance),
                    new Phaser.Geom.Circle(this.scene.player.position.x, this.scene.player.position.y, this.collisionDistance))) {
                    this.scene.player.health.dealDamage(monster.getDamage())
                    monster.markedForDestruction = true
                    this.scene.attackHumanSound.play();

                    if (this.scene.player.health.currentHealth <= 0 && !this.scene.gameIsOver) {
                        this.scene.gameIsOver = true
                        this.scene.togglePause()
                        this.scene.animationSystem.addKingDeathAnimation(this.scene.player, this.scene.player.deathAnimation, () => { this.scene.gameOver() }, 1);
                    }
                }
            }
        })
    }

    detectArrowMonsterCollision(arrowList, monster) {
        arrowList.forEach((arrow) => {

            if (Phaser.Geom.Intersects.CircleToCircle(
                new Phaser.Geom.Circle(monster.position.x, monster.position.y, this.collisionDistance),
                new Phaser.Geom.Circle(arrow.position.x, arrow.position.y, this.collisionDistance))) {
                arrow.dealDamage(monster)

                this.scene.attackHumanSound.play();
                if (monster.health.currentHealth <= 0) {
                    monster.markedForDestruction = true;
                }
            }

        })
    }

    detectFireBallMonsterCollision(fireBallList, monster) {
        fireBallList.forEach((fireBall) => {

            if (Phaser.Geom.Intersects.CircleToCircle(
                new Phaser.Geom.Circle(monster.position.x, monster.position.y, this.collisionDistance),
                new Phaser.Geom.Circle(fireBall.position.x, fireBall.position.y, this.collisionDistance))) {
                fireBall.dealDamage(monster)

                const angle = Phaser.Math.Angle.Between(
                    monster.position.x, monster.position.y,
                    fireBall.position.x, fireBall.position.y
                );

                monster.position.x += Math.cos(angle + Math.PI) * this.dodgeDistance;
                monster.position.y += Math.sin(angle + Math.PI) * this.dodgeDistance;
                monster.sprite.x = monster.position.x;
                monster.sprite.y = monster.position.y;
                this.scene.attackHumanSound.play();

                if (monster.health.currentHealth <= 0) {
                    monster.markedForDestruction = true;
                }
            }

        })
    }

    detectMonsterSoldierCollision(soldierList, monster) {
        soldierList.forEach((soldier) => {
            if (soldier.isPresent() && soldier.dying == false) {
                if (Phaser.Geom.Intersects.CircleToCircle(
                    new Phaser.Geom.Circle(monster.position.x, monster.position.y, this.collisionDistance),
                    new Phaser.Geom.Circle(soldier.position.x, soldier.position.y, this.collisionDistance))) {

                    const currentSprite = this.scene.add.sprite(monster.position.x - 5, monster.position.y, 'hit');
                    this.scene.animationSystem.addOneTimeAnimation(currentSprite, new SpriteAnimationComponent('hit', { start: 0, end: 3 }), 20)

                    if (soldier.attackAnimation) {
                        this.scene.animationSystem.addGoodGuyCustomAnimation(soldier, soldier.attackAnimation, null, 8)
                    }
                    // Calculate the angle between the monster and soldier
                    const angle = Phaser.Math.Angle.Between(
                        monster.position.x, monster.position.y,
                        soldier.position.x, soldier.position.y
                    );

                    // Move monster and soldier away from each other
                    monster.position.x += Math.cos(angle + Math.PI) * this.dodgeDistance;
                    monster.position.y += Math.sin(angle + Math.PI) * this.dodgeDistance;
                    soldier.position.x += Math.cos(angle) * this.dodgeDistance / 2;
                    soldier.position.y += Math.sin(angle) * this.dodgeDistance / 2;

                    // Update sprite positions
                    monster.sprite.x = monster.position.x;
                    monster.sprite.y = monster.position.y;
                    soldier.sprite.x = soldier.position.x;
                    soldier.sprite.y = soldier.position.y;

                    this.scene.attackHumanSound.play();



                    //deal damage
                    monster.health.dealDamage(soldier.damage)
                    soldier.health.dealDamage(monster.getDamage())

                    if (monster.health.currentHealth <= 0) {
                        monster.markedForDestruction = true;
                    }

                    if (soldier.health.currentHealth <= 0) {
                        soldier.markedForDestruction = true;
                    }
                }

            }
        })
    }
}