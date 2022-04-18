class scene extends Phaser.Scene {


    preload() {
        this.load.image('background', 'assets/images/tentative.jpg');
        this.load.image('spike', 'assets/images/spike.png');
        // At last image must be loaded with its JSON
        this.load.atlas('player', 'assets/images/kenney_player.png', 'assets/images/kenney_player_atlas.json');
        this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet.png');

        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/Alpha1.json');
        this.load.image('balle','assets/square.png');
        this.load.image('circleB','assets/circleB.png');
        this.load.image('save', 'assets/images/Save.png');
        this.load.audio('feu','assets/sons/feu.mp3');
        this.load.audio('cri','assets/sons/cri.mp3');

    }


    create() {
        this.currentSaveX = 0;
        this.currentSaveY = 0;

        const backgroundImage = this.add.image(0, -1000, 'background').setOrigin(0, 0);
        backgroundImage.setScale(2,2)



        const map = this.make.tilemap({key: 'map'});
        const tileset = map.addTilesetImage('Alpha_test1', 'tiles');
        const platforms0 = map.createLayer('Devant', tileset, 0, 200);
        this.platforms = map.createStaticLayer('Sol', tileset);
        platforms0.setCollisionByExclusion(-1, false);
        platforms0.scrollFactorX=1.03;//Bushes
        this.platforms.setCollisionByExclusion(-1, true);
        this.cursors = this.input.keyboard.createCursorKeys();
        backgroundImage.setPipeline('Light2D');
        this.platforms.setPipeline('Light2D');



        this.player = new Player(this)

//Shooter

        this.shooter = this.physics.add.sprite(1000, 150, 'circleB').setOrigin(0, 0);
        this.shooter.setDisplaySize(50,50);
        this.shooter.body.setAllowGravity(false);
        this.shooter.setVisible(true);

        const tx = this.player.player.x
        const ty = this.player.player.y

        const iax = this.shooter.x;
        const iay = this.shooter.y;

        this.time.addEvent({ delay: 2000, callback: this.tir, callbackScope: this,loop : true });



//Balles

        this.projectiles = this.add.group();

        this.target = this.physics.add.sprite(this.player.player.x, this.player.player.y,'circleB').setOrigin(0, 0);
        this.target.setDisplaySize(10,10);
        this.target.setVisible(false);
        this.target.body.setAllowGravity(false);
        this.target.setImmovable(false);


        this.cameras.main.startFollow(this.player.player,false);

//Dégats

        this.life=3;
        this.hand=this.physics.add.sprite(300,500,'spike').setOrigin(0,0);
        this.hand.body.setAllowGravity(false);
        this.hand.body.setImmovable(true);

        this.physics.add.collider(this.player.player, this.hand, this.damage, null, this)
        this.recov=false


//Lumières

        this.lights.enable().setAmbientColor(0x555555);

        this.spotlight = this.lights.addLight(this.player.player.x, this.player.player.y, 100*this.life).setColor(0xF0AF2F).setIntensity(5);

        this.sl = this.lights.addLight(0, 100, 500).setColor(0xF0AF2F).setIntensity(5).setVisible(false);



//Sauvegardes

        this.saves = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

       map.getObjectLayer('Save').objects.forEach((save) => {
            const saveSprite = this.saves.create(save.x, save.y- save.height, 'save').setOrigin(0);
       });

        this.physics.add.overlap(this.player.player, this.saves, this.sauvegarde, null, this)



    }


    tir() {let me = this;
        this.balle = new Balle(this);
        //this.ballight = this.lights.addLight(this.balle.x, this.balle.y, 100).setColor(0xF0AF2F).setIntensity(3);
        this.physics.add.overlap(this.player.player, this.balle, this.damage2, null, this)

    }

    sauvegarde(player, saves) {
        console.log("current", this.currentSaveX, this.currentSaveY)
        this.currentSaveX = saves.x
        this.currentSaveY = saves.y
        saves.body.enable = false;
        this.sound.play('feu');
        this.life=3;
        this.sl.setVisible(true);
    }

    damage(player){
        console.log("pute")
        if(this.recov===false)
        {this.life-=1;
            this.recov=true;
        }
        this.sound.play('cri');

        if(this.recov===true){
            this.playerReset = this.time.addEvent({
                delay: 1050,
                callback: ()=>{
                    this.recov=false;
                },
                loop: false,
            })
        }
        if(this.life===0){
            player.setVelocity(0, 0);
            player.x = this.currentSaveX
            player.y = this.currentSaveY;
            this.life=3;
        }

        console.log(this.life)
    }

    damage2(player, balle){
        balle.destroy(true);
        if(this.recov===false)
        {this.life-=1;
            this.recov=true;
            //this.spotlight.radius-=30;
        }
        this.sound.play('cri');

        if(this.recov===true){
            this.playerReset = this.time.addEvent({
                delay: 1050,
                callback: ()=>{
                    this.recov=false;
                },
                loop: false,
            })
        }
        if(this.life===0){
            player.setVelocity(0, 0);
            player.x = this.currentSaveX
            player.y = this.currentSaveY;
            this.life=3;
        }

        console.log(this.life)
    }




    update() {

        this.sl.x = this.currentSaveX+20;
        this.sl.y = this.currentSaveY;


        switch (true) {
            case (this.cursors.space.isDown || this.cursors.up.isDown) && this.player.player.body.onFloor():
                this.player.jump()
                break;
            case this.cursors.left.isDown:
                this.player.moveLeft()
                break;
            case this.cursors.right.isDown:
                this.player.moveRight();
                break;
            default:
                this.player.stop();

        }

        for(var i = 0; i < this.projectiles.getChildren().length; i++){
            var tir = this.projectiles.getChildren()[i];
            tir.update();
        }

        this.target.x = this.cameras.main.x
        this.target.y = this.cameras.main.y /*+ game.input.mousePointer.y */;
        this.target.x = this.player.player.x
        this.target.y = this.player.player.y


        this.spotlight.x = this.player.player.x;
        this.spotlight.y = this.player.player.y;
        this.spotlight.radius = 100*this.life;


    }
}