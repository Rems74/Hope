class scene extends Phaser.Scene {


    preload() {

        this.load.image('background', 'assets/images/tentative.jpg');
        this.load.image('spike', 'assets/images/spike.png');
        // At last image must be loaded with its JSON
        this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet.png');
        this.load.image('tiles2', 'assets/tilesets/les-branches-la.png');
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

        // for (let c=1;c<=14;c++){
        //     this.load.image('hand-2-'+c,'assets/anim/main-2/main-2-'+c+'.png')
        // }

        this.load.spritesheet('hand-2','assets/anim/main-2/atlas-main-3.png',{frameWidth: 200, frameHeight: 200});



        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/Alpha1.json');

        this.load.image('save', 'assets/images/Save.png');
        this.load.image('holly', 'assets/images/Save2.png');


        //load audio
        this.load.audio('feu','assets/sons/feu.mp3');
        this.load.audio('cri','assets/sons/cri.mp3');
        this.load.audio('mood',['assets/sons/forest2.wav']);
        this.load.audio('cry','assets/sons/lamentation.wav');



    }

    create() {
        this.currentSaveX = 0;
        this.currentSaveY = 0;
        this.recove = false;

        const backgroundImage = this.add.image(0, -1000, 'background').setOrigin(0, 0);
        backgroundImage.setScale(2,2)

        const map = this.make.tilemap({key: 'map'});

        const tileset2 = map.addTilesetImage('branches', 'tiles2');

        this.platforms = map.createStaticLayer('Sol', tileset2);

        this.boss = map.createLayer(
            "Boss",
            tileset2
        );

        this.player = new Player(this)

        const tileset = map.addTilesetImage('Alpha_test1', 'tiles');


        this.platforms.setCollisionByExclusion(-1, true);
        this.cursors = this.input.keyboard.createCursorKeys();

        backgroundImage.setPipeline('Light2D');
        this.platforms.setPipeline('Light2D');
        this.boss.setPipeline('Light2D');


        this.collide = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Collider').objects.forEach((collide) => {
            this.collideSprite = this.physics.add.sprite(collide.x + (collide.width * 0.5), collide.y + (collide.height * 0.5)).setSize(collide.width, collide.height).setDepth(1);
            this.collide.add(this.collideSprite)
        });
        //
        this.bosslife=4





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
                    this.shooter1 = this.physics.add.sprite(x, y-50, 'shooter').setOrigin(0, 0);
                    this.shooter1.body.setAllowGravity(false);
                    this.shooter1.setVisible(true);
                    break;
                }
                case 'shooter2': {
                    this.shooter2 = this.physics.add.sprite(x, y-50, 'shooter').setOrigin(0, 0);
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




//Balles

        this.projectiles = this.add.group();

        this.target = this.physics.add.sprite(this.player.player.x, this.player.player.y,'circleB').setOrigin(0, 0);
        this.target.setDisplaySize(10,10);
        this.target.setVisible(false);
        this.target.body.setAllowGravity(false);
        this.target.setImmovable(false);

        this.eyesT = this.physics.add.sprite(this.shooter1.x+10, this.shooter1.y+10,'circleB').setOrigin(0, 0);
        this.eyesT.setDisplaySize(10,10);
        this.eyesT.setVisible(false);
        this.eyesT.body.setAllowGravity(false);
        this.eyesT.setImmovable(false);


        this.tir()

        this.cameras.main.startFollow(this.player.player,false);


//Lumières

        this.lights.enable().setAmbientColor(0x555555);

        this.spotlight = this.lights.addLight(this.player.player.x, this.player.player.y, 150*this.life).setColor(0xF0AF2F).setIntensity(7);

        this.sl = this.lights.addLight(0, 100, 500).setColor(0xF0AF2F).setIntensity(3).setVisible(false);

        this.shootl1 = this.lights.addLight(this.shooter1.x, this.shooter1.y, 150).setColor(0x3BFF9A).setIntensity(2)
        this.shootl2 = this.lights.addLight(this.shooter2.x, this.shooter2.y, 150).setColor(0x3BFF9A).setIntensity(2)



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

        this.flameC = this.add.sprite(100, 0, 'fire2').setOrigin(0,0).setVisible(false);
        this.flameC.play('fire2');


//mains

        this.hand = new hand(this)

        this.Hands1 = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('Hand1').objects.forEach((Hand1) => {
            const hand = this.Hands1.create(Hand1.x- Hand1.height, Hand1.y-160, 'hand-1-1').setOrigin(0).setPipeline('Light2D');
            hand.play('hand1')
            hand.body.setSize(50,50).setOffset(75,150)
            this.Hands1.add(hand);
        });

        this.hand = new hand(this)

        this.Hands2 = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('Hand2').objects.forEach((Hand2) => {
            const hand2 = this.Hands2.create(Hand2.x- 100, Hand2.y- 192, 'hand-2-1').setOrigin(0).setPipeline('Light2D');
            hand2.play('hand2')
            hand2.body.setSize(50,50).setOffset(50,30)
            this.tweens.add({targets: hand2.body,
                    duration:775,repeat:-1,
                    height: 150,
                    yoyo:true,
            })
            this.Hands2.add(hand2);
        });

//Braséros boss



        this.Holly = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('Holly').objects.forEach((b) => {
            const c = this.Holly.create(b.x, b.y-70, 'holly').setOrigin(0).setPipeline('Light2D');
            this.Holly.add(c);
        });



        this.physics.add.overlap(this.player.player, this.Holly, this.killboss, null, this)


//Dégats

        this.life=3;

        this.physics.add.collider(this.player.player, this.Hands1, this.damage, null, this)
        this.physics.add.collider(this.player.player, this.Hands2, this.damage, null, this)
        this.recov=false
        this.physics.add.collider(this.player.player, this.collide);

//Musique
        this.ambiance = this.sound.add('mood',{ loop: true, volume:1});
        if(this.temp === this.temp){
            this.ambiance.play()


        }
    }




    tir() {
        this.test = this.test !== true;
        if(this.test === true){
            this.eyesT.x = this.shooter1.x
            this.eyesT.y = this.shooter1.y
        }else{
            this.eyesT.x = this.shooter2.x
            this.eyesT.y = this.shooter2.y
        }
        if(this.bosslife === 0){

        }else{
            this.balle = new Balle(this);
            this.time.addEvent({ delay: 1500*this.bosslife, callback: this.tir, callbackScope: this,loop : true });
        }

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


    killboss(player,Holly){

        this.bosslife-=1
        Holly.body.enable = false;

        this.sound.play('feu');
        this.sound.play('cry');
        this.lights.addLight(Holly.x, Holly.y-50, 500).setColor(0xF0AF2F).setIntensity(3);
        this.flameA = this.add.sprite(Holly.x, Holly.y-50, 'fire1').setOrigin(0,0).setVisible(true);
        this.flameC = this.add.sprite(Holly.x, Holly.y-50, 'fire2').setOrigin(0,0).setVisible(false);
        this.flameA.play('fire1');
        this.flameC.play('fire2');
        this.switch=this.time.addEvent({
            delay: 600,
            callback: ()=>{

                this.flameA.setVisible(false);
                this.flameC.setVisible(true);
            },
            loop: false,
        })
        console.log(this.bosslife)
    }

    update() {

        this.sl.x = this.currentSaveX;
        this.sl.y = this.currentSaveY-20;

        this.flameB.x = this.currentSaveX;
        this.flameB.y = this.currentSaveY-5;

        this.shootl1.x = this.shooter1.x+20
        this.shootl1.y =this.shooter1.y+30

        this.shootl2.x = this.shooter2.x+20
        this.shootl2.y =this.shooter2.y+30



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