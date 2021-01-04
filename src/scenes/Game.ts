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
		//load background
		this.load.image('background', 'house/bg_repeat_340x640.png');

		//load as an atlas
		this.load.atlas(
			"rocket-mouse",
			"characters/rocket-mouse.png",
			"characters/rocket-mouse.json",
		);
	}
	create()
	{
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

	}

	
}