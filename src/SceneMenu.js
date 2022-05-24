class SceneMenu extends Phaser.Scene{

    constructor(){
        super("menuGame");
    }

    preload(){
        this.load.image('play', 'assets/menu/bouton-play.png');
        this.load.image('play2', 'assets/menu/bouton-play-2.png');
        this.load.image('titre', 'assets/menu/titre.png');
        this.load.image('menu', 'assets/menu/Menu3.png');
        this.load.image('etoiles', 'assets/menu/etoiles menu.png');
        this.load.image('lune', 'assets/menu/lune menu.png');
    }

    create() {


        const ui = this.add.image(0, 0, 'menu').setOrigin(0, 0).setPipeline('Light2D');
        this.add.image(0, 0, 'etoiles').setOrigin(0, 0);
        this.add.image(0, 0, 'lune').setOrigin(0, 0);


        let playbutton = this.add.image(1000, 650, 'play').setPipeline('Light2D');

        this.add.image(770, 250, 'titre').setOrigin(0, 0);

        this.lights.enable().setAmbientColor(0x555555);


        playbutton.setInteractive();



        playbutton.on("pointerup", () => {
            playbutton.setTexture('play')
            this.scene.start("playGame")
        })

        playbutton.on("pointerover",()=>{
            playbutton.setTexture('play2')
        })

        playbutton.on("pointerout",()=>{
            playbutton.setTexture('play')
        })


        this.clight=this.lights.addLight(100,100, 500).setColor(0xF0AF2F).setIntensity(3);

    }

    update(){

        this.clight.x = game.input.mousePointer.worldX;
        this.clight.y = game.input.mousePointer.worldY;

    }
}