class SceneVictoire extends Phaser.Scene {

    constructor() {
        super("victoire");
    }

    preload() {
        for (let v = 1; v <= 8; v++) {
            this.load.image('v' + v, 'assets/anim/victoire/v' + v + '.png')
        }
        this.load.image('merci', 'assets/images/merci.png');
    }

    create() {


        this.anims.create({
            key: 'plebe',
            frames: [
                {key: 'v1'},
                {key: 'v2'},
                {key: 'v3'},
                {key: 'v4'},
                {key: 'v5'},
                {key: 'v6'},
                {key: 'v7'},
                {key: 'v8'},
            ],
            frameRate: 4,
            repeat: 0
        });
        this.anims = this.add.sprite(0,0,'plebe').setOrigin(0,0);
        this.anims.play('plebe');

        this.merci=this.add.image(680, 330, 'merci').setOrigin(0, 0);

        this.tweens.add({
            targets: this.merci,
            alphaTopLeft: { value: 1, duration: 5000, ease: 'Power1' },
            alphaBottomRight: { value: 1, duration: 10000, ease: 'Power1' },
            alphaBottomLeft: { value: 1, duration: 5000, ease: 'Power1', delay: 5000 },
            yoyo: false,
            loop: 0

        });


    }
}