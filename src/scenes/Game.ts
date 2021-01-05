import Phaser from 'phaser'

export default class Game extends Phaser.Scene
{
	constructor()
	{
		//[]INHERIT default characteristics from Phaser
		super('game');//Dub thee "game"as personal identifier
	}


	preload()
	{
		

	}
	
	create()
	{
		//[]Animations
		this.anims.create({
			key: "rocket-mouse-run",//name of animation
			//helper to generate frames
			frames: this.anims.generateFrameNames("rocket-mouse", {
				start: 1,
				end: 4,
				prefix: "rocketmouse_run", 
				zeroPad: 2,
				suffix:".png"
			}),
			frameRate: 10,
			repeat: -1, //repeat forever
		});


		/*Create an Image
		this.add.image(0,0, 'background')
			.setOrigin(0,0); 
		*/
		const width = this.scale.width;
		const height = this.scale.height;
		this.add.tileSprite(0,0,width,height,"background")
			.setOrigin(0)


		this.add.sprite(
			width * .5,
			height * .5,
			"rocket-mouse",//atlas key given in preload
			"rocketmouse_fly01.png",//name of the frame in atlas
		)
		.play('rocket-mouse-run');

	}

	
}