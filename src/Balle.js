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
        this.parts = this.scene.add.particles('blue');

        this.particlesEmit= this.parts.createEmitter({
            speed: 50,
            scale: { start: 0.2, end: 0 },
            lifespan: { min: 300, max: 400 },
            blendMode: 'ADD'

        })

        this.parts.setDepth(1);
        this.particlesEmit.startFollow(this)
    }

    update(){

        if(this.y < -1798 ){
            this.destroy();
            this.parts.destroy();
        }
        if(this.y > -104 ){
            this.destroy();
            this.parts.destroy();
        }
        if(this.x < 760 ){
            this.destroy();
            this.parts.destroy();
        }
        if(this.x > 3354 ){
            this.destroy();
            this.parts.destroy();
        }

    }

}