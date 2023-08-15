export default class FogOfWar {
    constructor(scene, mapWidth, mapHeight, sightRadius) {
        this.scene = scene;
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        this.sightRadius = sightRadius;
        this.graphics = this.scene.add.graphics();
    }

    isHidden(lightSourcePosition, entity, radius) {
        const dx = entity.position.x - lightSourcePosition.position.x;
        const dy = entity.position.y - lightSourcePosition.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > radius) {
            if (entity.hidden == false)
                entity.setHidden(this.scene)
        } else {
            if (entity.hidden == true) {
                entity.setVisible(this.scene)
            }

        }
    }

    drawFog(entities) {
        // Clear previous fog
        this.graphics.clear();

        for (let entity of entities) {
            if (entity != null) {
                const x = entity.position.x;
                const y = entity.position.y;
                this.graphics.fillStyle(0xffffff);
                this.graphics.fillCircle(x, y, this.sightRadius);
            }
        }
    }
}
