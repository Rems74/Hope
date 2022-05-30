var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1920,
    heigth: 1080,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 550 },
            debug: true,
        },
    },
    scene: [SceneMenu,Intro,scene,SceneVictoire]
};

var game = new Phaser.Game(config);