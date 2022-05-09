class Balle extends Phaser.GameObjects.Sprite{
    constructor(scene) {

        let x = scene.shooter1.x;
        let y = scene.shooter1.y;


        super(scene,x,y,"balle");

        scene.add.existing(this);

        scene.physics.world.enableBody(this)
        this.setDisplaySize(15,15);
        this.body.setAllowGravity(false);

        scene.projectiles.add(this);

        let me = this;
        this.scene.physics.moveToObject(this, this.scene.target, 400);






    }

    update(){

        if(this.y < 0 ){
            this.destroy();
        }
        if(this.y > 3000 ){
            this.destroy();
        }
        if(this.x < 0 ){
            this.destroy();
        }
        if(this.x > 3000 ){
            this.destroy();
        }

    }

}