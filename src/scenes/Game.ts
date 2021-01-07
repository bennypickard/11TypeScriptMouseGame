import Phaser from 'phaser'

import TextureKeys from "/consts/Texturekeys";
import SceneKeys from "/consts/SceneKeys";
import AnimationKeys from "/consts/AnimationKeys";

export default class Game extends Phaser.Scene
{
	constructor()
	{
		//[]INHERIT default characteristics from Phaser
		super(SceneKeys.Game);//Dub thee "game"as personal identifier
	}


	preload()
	{
		

	}
	
	create()
	{
		


		/*Create an Image
		this.add.image(0,0, 'background')
			.setOrigin(0,0); 
		*/
		//[]BACKGROUND
		const width = this.scale.width;
		const height = this.scale.height;
		this.add.tileSprite(0,0,width,height,TextureKeys.Background)
			.setOrigin(0)

		//[]SPRITE
		this.add.sprite(
			width * .5,
			height * .5,
			TextureKeys.RocketMouse,//atlas key given in preload
			"rocketmouse_fly01.png",//name of the frame in atlas
		)
		.play(AnimationKeys.RocketMouseRun);

	}

	
}