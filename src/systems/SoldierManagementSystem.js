export default class SoldierManagementSystem {
    constructor(scene, radius) {
        this.scene = scene
        this.currentAngle = 90
        this.radius = radius
        this.sizeOfSoldiersNearTheLine = 1 * 2
        this.lastFirstPosition = 10
    }

    updateSemiCirclePositions() {
        const N = this.scene.soldierList.length;

        const angleIncrement = Phaser.Math.DegToRad(180 / Math.max((N - 1), 1));

        const startAngle = Phaser.Math.DegToRad(180);

        for (let i = 0; i < N; i++) {
            const angle = startAngle - angleIncrement * i;
            if (angle * 180/ Math.PI < 90) {
                this.scene.soldierList[i].sprite.flipX = true;
            } else {
                this.scene.soldierList[i].sprite.flipX = false;
            }

            this.scene.soldierList[i].formationAngle = angle

            const x = this.scene.player.position.x + this.radius * Math.cos(angle);
            const y = this.scene.player.position.y - this.radius * Math.sin(angle);

            this.scene.soldierList[i].finalPosition.x = x;
            this.scene.soldierList[i].finalPosition.y = y;
        }

        let biggerAngle = true
        for (let i = 0; i < N; i++) {
            const angle = startAngle - angleIncrement * i;

            if (biggerAngle && angle * (180 / Math.PI) < this.scene.line.angle) {
                biggerAngle = false
                if (this.scene.soldierList[i - 1] != null) {
                    const x = this.scene.player.position.x + this.radius * Math.cos(this.scene.soldierList[i - 1].formationAngle - angleIncrement / 2);
                    const y = this.scene.player.position.y - this.radius * Math.sin(this.scene.soldierList[i - 1].formationAngle - angleIncrement / 2);

                    this.scene.soldierList[i - 1].formationAngle -= angleIncrement / 2

                    this.scene.soldierList[i - 1].finalPosition.x = x;
                    this.scene.soldierList[i - 1].finalPosition.y = y;
                }

                if (this.scene.soldierList[i + 1] != null) {

                    const x = this.scene.player.position.x + this.radius * Math.cos(this.scene.soldierList[i + 1].formationAngle + angleIncrement / 2);
                    const y = this.scene.player.position.y - this.radius * Math.sin(this.scene.soldierList[i + 1].formationAngle + angleIncrement / 2);

                    this.scene.soldierList[i + 1].formationAngle += angleIncrement / 2


                    this.scene.soldierList[i + 1].finalPosition.x = x;
                    this.scene.soldierList[i + 1].finalPosition.y = y;
                }

                return
            }

        }
    }

    updateArchersSemiCirclePositions() {
        const N = this.scene.archersList.length;

        const angleIncrement = Phaser.Math.DegToRad(180 / Math.max((N - 1), 1));

        const startAngle = Phaser.Math.DegToRad(180);

        for (let i = 0; i < N; i++) {
            const angle = startAngle - angleIncrement * i;

            if (angle * 180/ Math.PI > 90) {
                this.scene.archersList[i].sprite.flipX = true;
            } else {
                this.scene.archersList[i].sprite.flipX = false;
            }

            this.scene.archersList[i].formationAngle = angle

            const x = this.scene.player.position.x + this.radius / 2 * Math.cos(angle);
            const y = this.scene.player.position.y - this.radius / 2 * Math.sin(angle);

            this.scene.archersList[i].finalPosition.x = x;
            this.scene.archersList[i].finalPosition.y = y;
        }
    }


    updateCirclePositions() {
        const N = this.scene.soldierList.length;

        const angleIncrement = Phaser.Math.DegToRad(360 / Math.max((N - 1) + 1, 1));

        const startAngle = Phaser.Math.DegToRad(180);

        for (let i = 0; i < N; i++) {
            const angle = startAngle - angleIncrement * i;
            if (angle * 180/ Math.PI < 90) {
                this.scene.soldierList[i].sprite.flipX = true;
            } else {
                this.scene.soldierList[i].sprite.flipX = false;
            }

            this.scene.soldierList[i].formationAngle = angle

            const x = this.scene.player.position.x + this.radius * Math.cos(angle);
            const y = this.scene.player.position.y - this.radius * Math.sin(angle);

            this.scene.soldierList[i].finalPosition.x = x;
            this.scene.soldierList[i].finalPosition.y = y;
        }

        let biggerAngle = true
        for (let i = 0; i < N; i++) {
            const angle = startAngle - angleIncrement * i;

            if (biggerAngle && angle * (180 / Math.PI) < this.scene.line.angle) {
                biggerAngle = false
                if (this.scene.soldierList[i - 1] != null) {
                    const x = this.scene.player.position.x + this.radius * Math.cos(this.scene.soldierList[i - 1].formationAngle - angleIncrement / 2);
                    const y = this.scene.player.position.y - this.radius * Math.sin(this.scene.soldierList[i - 1].formationAngle - angleIncrement / 2);

                    this.scene.soldierList[i - 1].formationAngle -= angleIncrement / 2

                    this.scene.soldierList[i - 1].finalPosition.x = x;
                    this.scene.soldierList[i - 1].finalPosition.y = y;
                }

                if (this.scene.soldierList[i + 1] != null) {

                    const x = this.scene.player.position.x + this.radius * Math.cos(this.scene.soldierList[i + 1].formationAngle + angleIncrement / 2);
                    const y = this.scene.player.position.y - this.radius * Math.sin(this.scene.soldierList[i + 1].formationAngle + angleIncrement / 2);

                    this.scene.soldierList[i + 1].formationAngle += angleIncrement / 2


                    this.scene.soldierList[i + 1].finalPosition.x = x;
                    this.scene.soldierList[i + 1].finalPosition.y = y;
                }

                return
            }

        }
    }

    updateArchersCirclePositions() {
        const N = this.scene.archersList.length;

        const angleIncrement = Phaser.Math.DegToRad(360 / Math.max((N - 1) + 1, 1));

        const startAngle = Phaser.Math.DegToRad(180);

        for (let i = 0; i < N; i++) {
            const angle = startAngle - angleIncrement * i;

            if (angle * 180/ Math.PI > 90) {
                this.scene.archersList[i].sprite.flipX = true;
            } else {
                this.scene.archersList[i].sprite.flipX = false;
            }

            this.scene.archersList[i].formationAngle = angle

            const x = this.scene.player.position.x + this.radius / 2 * Math.cos(angle);
            const y = this.scene.player.position.y - this.radius / 2 * Math.sin(angle);

            this.scene.archersList[i].finalPosition.x = x;
            this.scene.archersList[i].finalPosition.y = y;
        }
    }
}