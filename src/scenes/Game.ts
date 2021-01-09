import Phaser from 'phaser'

import TextureKeys from "/consts/Texturekeys";
import SceneKeys from "/consts/SceneKeys";
import AnimationKeys from "/consts/AnimationKeys";

export default class Game extends Phaser.Scene
{
	//[]Background class property
	//The ! is TypeScript’s non-null assertion operator. This lets us tell TypeScript 
	//that the backgroundproperty will never be undefined or null
	private background!: Phaser.GameObjects.tileSprite;

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
		this.background = this.add.tileSprite(
			0,0,
			width,height,
			TextureKeys.Background
			)
			.setOrigin(0)
			.setScrollFactor(0,0);//keep from scrolling, stationary to camera


		//[]SPRITE
		/*Basic Sprite
		this.add.sprite(
			width * .5,
			height * .5,
			TextureKeys.RocketMouse,//atlas key given in preload
			"rocketmouse_fly01.png",//name of the frame in atlas
		)
		*/
		//PhysicsSprite
		const mouse = this.physics.add.sprite(
			width * .5,
			height * .5,
			TextureKeys.RocketMouse,
			'rocketmouse_fly01.png'
		)
		.play(AnimationKeys.RocketMouseRun);
		//[]COLLISIONS
		const body = mouse.body as Phaser.Physics.Arcade.Body
		body.setCollideWorldBounds(true);
		//[]VELOCITY
		body.setVelocityX(200);
		//[]BOUNDS
		this.physics.world.setBounds(
			0, 0, //x, y
			Number.MAX_SAFE_INTEGER, height - 30 //width, height. Finitlyinfinit number
		)

		//[]CAMERA
		this.cameras.main.startFollow(mouse);
		this.cameras.main.setBounds(0,0,Number.MAX_SAFE_INTEGER, height);



	}

	update(t: number dt: number){
	/*INPUT:  t-> total time elapsed since game startet
			dt-> time elapsed since last frame
	*/
		//[]SCROLL BACKGROUND
		this.background.setTilePosition(this.cameras.main.scrollX);
	}

	
}