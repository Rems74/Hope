class Balle extends Phaser.GameObjects.Sprite{
    constructor(scene) {

        let x = scene.eyesT.x;
        let y = scene.eyesT.y;

        super(scene,x,y,"blue");


        scene.add.existing(this);

        scene.physics.world.enableBody(this)
        this.setDisplaySize(15,15);
        this.body.setAllowGravity(false);

        scene.projectiles.add(this);

        let me = this;
        this.scene.physics.moveToObject(this, this.scene.target, 400);
        this.particles();

    }

    particles(){
        let particles = this.scene.add.particles('blue');

        this.particlesEmit= particles.createEmitter({
            speed: 50,
            scale: { start: 0.3, end: 0 },
            blendMode: 'ADD'

        })

        particles.setDepth(1);
        this.particlesEmit.startFollow(this)
    }

    update(){

        if(this.y < -9999 ){
            this.destroy();
        }
        if(this.y > 9999 ){
            this.destroy();
        }
        if(this.x < -9999 ){
            this.destroy();
        }
        if(this.x > 9999 ){
            this.destroy();
        }

    }

}