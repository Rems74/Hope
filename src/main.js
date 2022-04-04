const config = {
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
            gravity: { y: 500 },
            debug: true,
        },
    },
    scene: new scene(),
};

const game = new Phaser.Game(config);