class Player {


    constructor(scene) {
        this.scene=scene
        this.cameras=scene
        this.player = this.scene.physics.add.sprite(400, 600, 'idle-1-1');
        this.player.body.setSize(100,190).setOffset(40,5)
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(false);


        this.scene.anims.create({
            key: 'marche',
            frames: [
                {key:'marche-1'},
                {key:'marche-2'},
                {key:'marche-3'},
                {key:'marche-4'},
                {key:'marche-5'},
                {key:'marche-6'},
                {key:'marche-7'},
                {key:'marche-8'},
            ],
            frameRate: 6,
            repeat: -1});

        this.scene.anims.create({
            key: 'idle',
            frames: [
                {key:'idle-1-1'},
                {key:'idle-1-2'},
                {key:'idle-1-3'},
                {key:'idle-1-4'},
                {key:'idle-1-5'},
                {key:'idle-1-6'},
                {key:'idle-2-1'},
                {key:'idle-2-2'},
                {key:'idle-2-3'},
                {key:'idle-2-4'},
                {key:'idle-2-5'},
                {key:'idle-2-6'},
                {key:'idle-2-1'},
                {key:'idle-2-2'},
                {key:'idle-2-3'},
                {key:'idle-2-4'},
                {key:'idle-2-5'},
                {key:'idle-2-6'},
            ],
            frameRate: 5,
            repeat: -1});


        this.scene.anims.create({
            key: 'saut',
            frames: [
                {key:'saut-1'},
                {key:'saut-2'},
                {key:'saut-3'},
                {key:'saut-4'},
                {key:'saut-5'},
                {key:'saut-6'},
                {key:'saut-7'},
                {key:'saut-8'},
                {key:'saut-9'},
                {key:'saut-10'},
                {key:'saut-11'},
                {key:'saut-12'},
                {key:'saut-13'},
                {key:'saut-14'},
            ],
            frameRate: 7,
            repeat: -1});

        this.scene.anims.create({
            key: 'mort',
            frames: [
                {key:'mort-1'},
                {key:'mort-2'},
                {key:'mort-3'},
                {key:'mort-4'},
                {key:'mort-5'},
                {key:'mort-6'},

            ],
            frameRate: 7,
            repeat: 0});


    }

    jump(){
        this.player.setVelocityY(-500);
        this.player.play('saut', true);
    }

    moveRight(){
        this.player.setVelocityX(300);
        this.player.setFlipX(false);
        if (this.player.body.onFloor()) {
            this.player.play('marche', true)}
    }

    moveLeft(){
        this.player.setVelocityX(-300);
        if (this.player.body.onFloor()) {
            this.player.play('marche', true)}
        this.player.setFlipX(true);
    }

    stop(){
        this.player.setVelocityX(0);
        if (this.player.body.onFloor()) {
            this.player.play('idle',true)
        }
    }

    death(){
        this.player.play('mort',true)
        this.player.setVelocityX(0);

        console.log('pute')
        this.scene.time.addEvent({
            delay: 1000,
            callback: ()=>{
                this.revive();
            },
            loop: false,
        })

    }

    revive(){
        this.player.x = this.scene.currentSaveX
        this.player.y = this.scene.currentSaveY;
        console.log("kfrgjhdhgds")
        this.scene.life=3;
    }

    }



