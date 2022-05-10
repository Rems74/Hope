class scene extends Phaser.Scene {


    preload() {

        this.load.image('background', 'assets/images/tentative.jpg');
        this.load.image('spike', 'assets/images/spike.png');
        // At last image must be loaded with its JSON
        this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet.png');
        this.load.image('shooter', 'assets/images/Shooter.png');
        this.load.image('balle','assets/images/green.png');


        //load anims

        for (let m=1;m<=8;m++){
            this.load.image('marche-'+m,'assets/anim/marche/marche-'+m+'.png')
        }

        for (let s=1;s<=14;s++){
            this.load.image('saut-'+s,'assets/anim/saut/saut-'+s+'.png')
        }

        for (let i=1;i<=6;i++){
            this.load.image('idle-1-'+i,'assets/anim/idle/idle-1-'+i+'.png')
        }

        for (let i=1;i<=6;i++){
            this.load.image('idle-2-'+i,'assets/anim/idle/idle-2-'+i+'.png')
        }

        for (let n=1;n<=6;n++){
            this.load.image('mort-'+n,'assets/anim/mort/mort-'+n+'.png')
        }

        for (let a=1;a<=5;a++){
            this.load.image('allumage-'+a,'assets/anim/allumage/allumage-'+a+'.png')
        }

        for (let b=1;b<=9;b++){
            this.load.image('danse-'+b,'assets/anim/danse/danse-'+b+'.png')
        }

        for (let c=1;c<=14;c++){
            this.load.image('hand-1-'+c,'assets/anim/main-1/main-1-'+c+'.png')
        }

        for (let c=1;c<=14;c++){
            this.load.image('hand-2-'+c,'assets/anim/main-2/main-2-'+c+'.png')
        }


        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/Alpha1.json');

        this.load.image('save', 'assets/images/Save.png');


        //load audio
        this.load.audio('feu','assets/sons/feu.mp3');
        this.load.audio('cri','assets/sons/cri.mp3');


    }

    create() {
        this.currentSaveX = 0;
        this.currentSaveY = 0;
        this.recove = false;

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

        //this.shooter = this.physics.add.sprite(1000, 150, 'eye').setOrigin(0, 0);
        //this.shooter.body.setAllowGravity(false);
        //this.shooter.setVisible(true);


        //this.time.addEvent({ delay: 2000, callback: this.tir, callbackScope: this,loop : true });
        const objectsLayer = map.getObjectLayer('Shooter')
        objectsLayer.objects.forEach(objData=> {
            const {x = 0, y = 0, name} = objData

            switch (name) {
                case 'shooter1': {
                    this.shooter1 = this.physics.add.sprite(x, y, 'shooter').setOrigin(0, 0);
                    this.shooter1.body.setAllowGravity(false);
                    this.shooter1.setVisible(true);
                    break;
                }
                case 'shooter2': {
                    this.shooter2 = this.physics.add.sprite(x, y, 'shooter').setOrigin(0, 0);
                    this.shooter2.body.setAllowGravity(false);
                    this.shooter2.setVisible(true);
                    break;
                }
            }
        })

        // this.shooter = this.physics.add.group({
        //     allowGravity: false,
        //     immovable: true
        // });
        //
        // map.getObjectLayer('Shooter').objects.forEach((Shooter) => {
        //     const shooterSprite = this.shooter.create(Shooter.x, Shooter.y- Shooter.height, 'shooter').setOrigin(0);
        // });

        this.time.addEvent({ delay: 3000, callback: this.tir, callbackScope: this,loop : true });


//Balles

        this.projectiles = this.add.group();

        this.target = this.physics.add.sprite(this.player.player.x, this.player.player.y,'circleB').setOrigin(0, 0);
        this.target.setDisplaySize(10,10);
        this.target.setVisible(false);
        this.target.body.setAllowGravity(false);
        this.target.setImmovable(false);


        this.cameras.main.startFollow(this.player.player,false);


//Lumières

        this.lights.enable().setAmbientColor(0x555555);

        this.spotlight = this.lights.addLight(this.player.player.x, this.player.player.y, 150*this.life).setColor(0xF0AF2F).setIntensity(7);

        this.sl = this.lights.addLight(0, 100, 500).setColor(0xF0AF2F).setIntensity(3).setVisible(false);



//Sauvegardes

        this.saves = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

       map.getObjectLayer('Save').objects.forEach((save) => {
            const saveSprite = this.saves.create(save.x, save.y- save.height, 'save').setOrigin(0).setPipeline('Light2D');
       });

        this.physics.add.overlap(this.player.player, this.saves, this.sauvegarde, null, this)





//Animations

        this.anims.create({
            key: 'fire1',
            frames: [
                {key:'allumage-1'},
                {key:'allumage-2'},
                {key:'allumage-3'},
                {key:'allumage-4'},
                {key:'allumage-5'},
            ],
            frameRate: 9,
            repeat: 0});

        this.flameA = this.add.sprite(100, 0, 'fire1').setOrigin(0,0).setVisible(false);
        this.flameA.play('fire1');

        this.anims.create({
            key: 'fire2',
            frames: [
                {key:'danse-1'},
                {key:'danse-2'},
                {key:'danse-3'},
                {key:'danse-4'},
                {key:'danse-5'},
                {key:'danse-6'},
                {key:'danse-7'},
                {key:'danse-8'},
                {key:'danse-9'},
            ],
            frameRate: 9,
            repeat: -1});

        this.flameB = this.add.sprite(100, 0, 'fire2').setOrigin(0,0).setVisible(false);
        this.flameB.play('fire2');


//mains

        this.hand = new hand(this)

        this.Hands1 = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('Hand1').objects.forEach((Hand1) => {
            const hand = this.Hands1.create(Hand1.x, Hand1.y- Hand1.height, 'hand-1-1').setOrigin(0).setPipeline('Light2D');
            this.Hands1.add(hand);
        });


//Dégats

        this.life=3;

        this.physics.add.collider(this.player.player, this.Hands1, this.damage, null, this)
        this.physics.add.collider(this.player.player, this.hand.hand2, this.damage, null, this)
        this.recov=false
    }




    tir() {let me = this;
        this.balle = new Balle(this);
        //this.ballight = this.lights.addLight(this.balle.x, this.balle.y, 100).setColor(0xF0AF2F).setIntensity(3);
        this.physics.add.overlap(this.player.player, this.balle, this.damage2, null, this)

    }


    sauvegarde(player, saves) {
        console.log("current", this.currentSaveX, this.currentSaveY)
        this.flameB.setVisible(false);
        this.currentSaveX = saves.x
        this.currentSaveY = saves.y-50
        saves.body.enable = false;
        this.sound.play('feu');
        this.life=3;
        this.sl.setVisible(true);
        this.flameA = this.add.sprite(this.currentSaveX, this.currentSaveY-5, 'fire1').setOrigin(0,0).setVisible(true);
        this.flameA.play('fire1');
        this.switch=this.time.addEvent({
            delay: 600,
            callback: ()=>{
                this.flameB.setVisible(true);
                this.flameA.setVisible(false);
            },
            loop: false,
        })

    }



    damage(player){
        if(this.recov===false)
        {this.life-=1;
            this.sound.play('cri');
            this.recov=true;
        }


        if(this.recov===true){
            this.playerReset = this.time.addEvent({
                delay: 1050,
                callback: ()=>{
                    this.recov=false;
                },
                loop: false,
            })
        }

        console.log(this.life)
    }

    damage2(player, balle){
        balle.destroy(true);
        if(this.recov===false)
        {this.life-=1;
            this.sound.play('cri');
            this.recov=true;
            //this.spotlight.radius-=30;
        }


        if(this.recov===true){
            this.playerReset = this.time.addEvent({
                delay: 1050,
                callback: ()=>{
                    this.recov=false;
                },
                loop: false,
            })
        }


        console.log(this.life)
    }




    update() {

        this.sl.x = this.currentSaveX;
        this.sl.y = this.currentSaveY-20;

        this.flameB.x = this.currentSaveX;
        this.flameB.y = this.currentSaveY-5;




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
        this.spotlight.radius = 150*this.life;

        if(this.life===0){
            if(this.recove===false)
            {this.player.death();
                this.recove=true;
                //this.spotlight.radius-=30;
            }


            if(this.recove===true){
                this.playerReset = this.time.addEvent({
                    delay: 1050,
                    callback: ()=>{
                        this.recove=false;
                    },
                    loop: false,
                })
            }

        }else{switch (true) {
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

        }}

    }
}