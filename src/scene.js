class scene extends Phaser.Scene {


    preload() {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('spike', 'assets/images/spike.png');
        // At last image must be loaded with its JSON
        this.load.atlas('player', 'assets/images/kenney_player.png', 'assets/images/kenney_player_atlas.json');
        this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet.png');

        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/Alpha1.json');
        this.load.image('balle','assets/square.png');
        this.load.image('circleB','assets/circleB.png');
        this.load.image('mask','assets/mask.png')
        this.load.image('save', 'assets/images/Save.png');
    }


    create() {

        this.currentSaveX = 0;
        this.currentSaveY = 0;

        this.chargeur = 5;
        this.Pballe = true ;


        const backgroundImage = this.add.image(0, 0, 'background').setAlpha(0.2).setOrigin(0, 0);
        backgroundImage.setScale(2, 0.8)

        backgroundImage.setPipeline('Light2D');
        const map = this.make.tilemap({key: 'map'});
        const tileset = map.addTilesetImage('Alpha_test1', 'tiles');
        this.platforms = map.createStaticLayer('Sol', tileset);
        this.platforms.setCollisionByExclusion(-1, true);
        this.cursors = this.input.keyboard.createCursorKeys();


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

//Lumières

        //this.mask=this.add.sprite(this.player.player.x,this.player.player.y,'mask')

        this.lights.enable().setAmbientColor(0x555555);

        var spotlight = this.lights.addLight(this.player.player.x, this.player.player.y, 230).setIntensity(0.5);
        //var spotlight = this.lights.addLight(this.target.x, this.target.y, 230).setIntensity(0.5);


        /*const spotlight = this.make.sprite({
            x:this.player.player.x,
            y:this.player.player.y,
            key: 'mask',
            add: false
        });

        backgroundImage.mask = new Phaser.Display.Masks.BitmapMask(this, spotlight);

        this.input.on('light' ),{

            spotlight.x : this.player.player.x;
            spotlight.y : this.player.player.y;

        };*/

//Sauvegardes

        this.saves = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('Save').objects.forEach((save) => {
            const saveSprite = this.saves.create(save.x, save.y + 200 - save.height, 'save').setOrigin(0);
        });
        this.physics.add.overlap(this.player.player, this.saves, this.sauvegarde, null, this)


    }



    tir() {let me = this;
        this.chargeur -= 1;
        this.balle = new Balle(this);

    }

    sauvegarde(player, saves) {
        console.log("current", this.currentSaveX, this.currentSaveY)
        this.currentSaveX = player.x
        this.currentSaveY = player.y
        saves.body.enable = false;

    }


    update() {

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

        console.log("souri")
        console.log(game.input.mousePointer.y)
        console.log(game.input.mousePointer.x)
        console.log("target")
        console.log(this.target.y)
        console.log(this.target.x)

        //this.mask.x = this.player.player.x
        //this.mask.y = this.player.player.y

        this.lights.addLight(this.player.player.x, this.player.player.y, 230).setIntensity(0.5);
        //this.lights.addLight(this.target.x, this.target.y, 100).setIntensity(0.5);

    }
}