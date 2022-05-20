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




        this.scene.anims.create({
            key: 'hand2',
            frames: this.scene.anims.generateFrameNames('hand-2', {
                start: 0,
                end: 13,
            }),
            frameRate: 9,
            repeat:-1,
        });


    }
}