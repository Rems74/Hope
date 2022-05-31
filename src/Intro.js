class Intro extends Phaser.Scene {

    constructor() {
        super("intro");
    }

    preload(){
        for (let x=1;x<=8;x++){
            this.load.image('intro-'+x,'assets/anim/intro/story '+x+'.png')
        }

        for (let k=1;k<=4;k++){
            this.load.image('intro-'+k,'assets/anim/intro/txt'+k+'.png')
        }

        this.load.audio('introd',['assets/sons/Cinématique intro.wav']);
    }

    create(){
console.log('truite')
        this.anims.create({
            key: 'intro',
            frames: [
                {key:'intro-1'},
                {key:'intro-1'},
                {key:'intro-1'},
                {key:'intro-1'},
                {key:'intro-1'},
                {key:'intro-1'},
                {key:'intro-1'},
                {key:'intro-2'},
                {key:'intro-2'},
                {key:'intro-2'},
                {key:'intro-2'},
                {key:'intro-2'},
                {key:'intro-2'},
                {key:'intro-2'},
                {key:'intro-3'},
                {key:'intro-4'},
                {key:'intro-5'},
                {key:'intro-6'},
                {key:'intro-7'},
                {key:'intro-8'},
            ],
            frameRate: 1,
            repeat: 0});
        this.anims = this.add.sprite(0,0,'intro-1').setOrigin(0,0);
        this.anims.play('intro');

        this.story = this.sound.add('introd',{ loop: false, volume:3});
        if(this.temp === this.temp){
            this.story.play()
        }

        console.log('saumon')

        this.letsgo = this.time.addEvent({
            delay: 24000,
            callback: ()=>{
                this.scene.start("playGame")
                this.story.stop()
            },

            loop: false,
        })
    }
}