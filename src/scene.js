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

    }


    create() {
        this.currentSaveX = 0;
        this.currentSaveY = 0;

        this.chargeur = 5;
        this.Pballe = true ;

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

//Balles

        if(this.Pballe===true){
            this.input.on('pointerdown', function (pointer) {
                this.tir();
                console.log(this.chargeur);
            }, this);
        }else {
            console.log("Plus de balle")

        }

        this.projectiles = this.add.group();

        this.target = this.physics.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'circleB').setOrigin(0, 0);
        this.target.setDisplaySize(10,10);
        this.target.body.setAllowGravity(false);
        this.target.setImmovable(false);
        this.target.setVisible(true);


        this.cameras.main.startFollow(this.player.player,false);

//Dégats

        this.life=3;
        this.hand=this.physics.add.sprite(300,500,'spike').setOrigin(0,0);
        this.hand.body.setAllowGravity(false);

        this.physics.add.overlap(this.player.player, this.hand, this.damage, null, this)

        this.recov=false




//Lumières

        this.lights.enable().setAmbientColor(0x555555);

        // var neuneu = this.lights.addLight(this.currentSaveX, this.currentSaveY, 230).setColor(0xF0AF2F).setIntensity(0.5);

        this.spotlight = this.lights.addLight(this.player.player.x, this.player.player.y, 100*this.life).setColor(0xF0AF2F).setIntensity(5);

        this.sl = this.lights.addLight(0, 100, 500).setColor(0xF0AF2F).setIntensity(5).setVisible(false);


        // var spotlight = this.lights.addLight(this.balle.balle.x, this.balle.balle.y, 230).setIntensity(0.5);


//Sauvegardes

        this.saves = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

       map.getObjectLayer('Save').objects.forEach((save) => {
            const saveSprite = this.saves.create(save.x, save.y- save.height, 'save').setOrigin(0);
       });

        // this.ui = this.lights.addLight(this.currentSaveX, this.currentSaveY, 230).setColor(0xF0AF2F).setIntensity(0.5).setVisible(true);

        this.physics.add.overlap(this.player.player, this.saves, this.sauvegarde, null, this)



    }


    tir() {let me = this;
        this.chargeur -= 1;
        this.balle = new Balle(this);
        //this.ballight = this.lights.addLight(this.balle.x, this.balle.y, 100).setColor(0xF0AF2F).setIntensity(3);

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

    damage(player, hand){
        if(this.recov===false)
        {this.life-=1;
            this.recov=true;
            //this.spotlight.radius-=30;
        }

        if(this.recov===true){
            this.playerReset = this.time.addEvent({
                delay: 2600,
                callback: ()=>{
                    this.recov=false;
                },
                loop: false,
            })
        }
        if(this.life===0){
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

        this.Pballe = this.chargeur > 0;

        this.target.x = this.cameras.main.x

        this.target.y = this.cameras.main.y /*+ game.input.mousePointer.y */;

        this.target.x = this.player.player.x + game.input.mousePointer.x - (1920/2)
        this.target.y = this.player.player.y + game.input.mousePointer.y - (1080/2)

        //this.target.x =  game.input.mousePointer.worldX
        //this.target.y =  game.input.mousePointer.worldY

        /*console.log("souri")
        console.log(game.input.mousePointer.y)
        console.log(game.input.mousePointer.x)
        console.log("target")
        console.log(this.target.y)
        console.log(this.target.x)*/


        this.spotlight.x = this.player.player.x;
        this.spotlight.y = this.player.player.y;
        this.spotlight.radius = 100*this.life;



    }
}