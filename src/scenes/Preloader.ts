import Phaser from 'phaser'

import TextureKeys from "/consts/Texturekeys";
import SceneKeys from "/consts/SceneKeys";
import AnimationKeys from "/consts/AnimationKeys";

export default class Preloader extends Phaser.Scene
{
	constructor()
	{
		super(SceneKeys.Preloader);
	}

	preload()
	{
		//load background
		this.load.image(
		TextureKeys.Background, //enum 
		'house/bg_repeat_340x640.png');//navigation starts in public folder

		//load as an atlas
		this.load.atlas(
			TextureKeys.RocketMouse, //enum
			"characters/rocket-mouse.png",
			"characters/rocket-mouse.json",
		);

		//mouse hole
		this.load.image(
			TextureKeys.MouseHole,
			'house/object_mousehole.png',
		);

		//windows
		this.load.image(TextureKeys.Window1, "house/object_window1.png");
		this.load.image(TextureKeys.Window2, "house/object_window2.png");

		//bookcases
		this.load.image(TextureKeys.Bookcase1, "house/object_bookcase1.png");
		this.load.image(TextureKeys.Bookcase2, "house/object_bookcase2.png");

	}

	create()
	{
		//[]Animations
		//Run
		this.anims.create({
			key: AnimationKeys.RocketMouseRun,//name of animation
			//helper to generate frames
			frames: this.anims.generateFrameNames(TextureKeys.RocketMouse, {
				start: 1,
				end: 4,
				prefix: "rocketmouse_run", 
				zeroPad: 2,
				suffix:".png"
			}),
			frameRate: 10,
			repeat: -1, //repeat forever
		});
		//Fire
		this.anims.create({
			key: AnimationKeys.RocketFlamesOn,//name of animation
			//helper to generate frames
			frames: this.anims.generateFrameNames(TextureKeys.RocketMouse,
			{
				start: 1,
				end: 2,
				prefix: "flame", 
				suffix:".png"
			}),
			frameRate: 10,
			repeat: -1, //repeat forever
		});



		this.scene.start(SceneKeys.Game);
	}





}