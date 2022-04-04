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
    }


    create() {


        this.chargeur = 5;
        this.Pballe = true ;


        const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
        backgroundImage.setScale(1, 0.8);
        const map = this.make.tilemap({key: 'map'});

        const tileset = map.addTilesetImage('Alpha_test1', 'tiles');
        this.platforms = map.createStaticLayer('Sol', tileset);

        this.platforms.setCollisionByExclusion(-1, true);
        this.cursors = this.input.keyboard.createCursorKeys();


        this.player = new Player(this)



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
    }


    tir() {let me = this;
        this.chargeur -= 1;
        this.balle = new Balle(this);

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

    }
}