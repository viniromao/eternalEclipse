import PositionComponent from "../components/PositionComponent.js"
import VelocityComponent from "../components/VelocityComponent.js"
import SpriteAnimationComponent from "../components/SpriteAnimationComponent.js"
import Soldier from "../components/Soldier.js"
import Entity from "../components/Entity.js"

export default class EntityDeployer {
    constructor(scene) {
        this.scene = scene;
    }

    deployMonster() {
        let randomCharacter = (Phaser.Math.Between(1, 9) * 4) - 4;

        const randomX = Phaser.Math.Between(0, this.scene.game.config.width);
        const sprite = this.scene.add.sprite(randomX, 0, 'monster_sprites');
        const position = new PositionComponent(randomX, 0);
        const velocity = new VelocityComponent(0, 0);
        const spriteAnimation = new SpriteAnimationComponent(`${randomCharacter}`, { start: randomCharacter, end: randomCharacter + 3 });
        const entity = new Entity(sprite, position, velocity, spriteAnimation, this.scene.player.position)

        this.scene.animationSystem.addMonsterAnimation(entity);

        this.scene.monstersList.push(entity)

        return entity;
    }

    deploySoldier(soldierManagementSystem) {
        let randomCharacter = (Phaser.Math.Between(1, 2) * 2) - 2;

        const sprite = this.scene.add.sprite(0, 0, 'skeleton');
        const position = new PositionComponent(this.scene.player.position.x, this.scene.player.position.y);
        const finalPosition = new PositionComponent(this.scene.player.position.x, this.scene.player.position.y);
        const velocity = new VelocityComponent(0, 0);
        const spriteAnimation = new SpriteAnimationComponent('skeleton', { start: 0, end: 2 });
        const entity = new Soldier(sprite, position, velocity, spriteAnimation, finalPosition, 0)

        this.scene.animationSystem.addSoldierAnimation(entity);

        // Add the new soldier to the list and then update all positions
        const positionToInsert = Math.floor(Math.random() * (this.scene.soldierList.length + 1));
        this.scene.soldierList.splice(positionToInsert, 0, entity);

        soldierManagementSystem.updateSemiCirclePositions(this.scene.line);

        return entity;
    }

}