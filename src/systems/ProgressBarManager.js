export default class ProgressBarManager {
    constructor(scene, x, y, width, height, maxXP) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.currentXP = 0;
        this.maxXP = maxXP;

        this.xpBarBg = this.scene.add.graphics();
        this.xpBarBg.fillStyle(0x000000);
        this.xpBarBg.fillRect(this.x, this.y, this.width, this.height);

        this.xpBarFill = this.scene.add.graphics();
    }

    gainXP(amount) {
        this.currentXP += amount;
        if (this.currentXP > this.maxXP) {
            this.currentXP = this.maxXP;
        }
        if (this.currentXP == this.maxXP){
            this.scene.upgrade();
            this.currentXP = 0
        }
    
        const fillWidth = (this.currentXP / this.maxXP) * this.width;
        this.xpBarFill.clear(); 
        this.xpBarFill.fillStyle(0xFFFFFF); 
        this.xpBarFill.fillRect(this.x, this.y, fillWidth, this.height);
    }    
}