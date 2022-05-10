class hand  {

    constructor(scene) {

        this.scene=scene

        this.scene.anims.create({
            key: 'hand1',
            frames: [
                {key:'hand-1-1'},
                {key:'hand-1-2'},
                {key:'hand-1-3'},
                {key:'hand-1-4'},
                {key:'hand-1-5'},
                {key:'hand-1-6'},
                {key:'hand-1-7'},
                {key:'hand-1-8'},
                {key:'hand-1-9'},
                {key:'hand-1-10'},
                {key:'hand-1-11'},
                {key:'hand-1-12'},
                {key:'hand-1-13'},
                {key:'hand-1-14'},
            ],
            frameRate: 9,
            repeat: -1});


        // this.hand = this.scene.physics.add.sprite(500, 570, 'hand-1-1').setOrigin(0,0);
        // this.hand.play('hand1');
        // this.hand.body.setAllowGravity(false);
        // this.hand.body.setImmovable(true);
        // this.hand.body.setSize(50,50).setOffset(75,150)




        this.scene.anims.create({
            key: 'hand2',
            frames: [
                {key:'hand-2-1'},
                {key:'hand-2-2'},
                {key:'hand-2-3'},
                {key:'hand-2-4'},
                {key:'hand-2-5'},
                {key:'hand-2-6'},
                {key:'hand-2-7'},
                {key:'hand-2-8'},
                {key:'hand-2-9'},
                {key:'hand-2-10'},
                {key:'hand-2-11'},
                {key:'hand-2-12'},
                {key:'hand-2-13'},
                {key:'hand-2-14'},
            ],
            frameRate: 9,
            repeat: -1});



        // this.hand2 = this.scene.physics.add.sprite(1000, 570, 'hand-2-1').setOrigin(0,0);
        // this.hand2.play('hand2');
        // this.hand2.body.setAllowGravity(false);
        // this.hand2.body.setImmovable(true);
        //
        // this.scene.tweens.add({targets: this.hand2.body,
        //     duration:2000,repeat:-1,
        //     height: 100,
        //     width: 50,
        //     yoyo:true
        //
        // })
    }
}