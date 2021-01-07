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

	}

	create()
	{
		//[]Animations
		this.anims.create({
			key: AnimationKeys.RocketMouseRun,//name of animation
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

		this.scene.start(SceneKeys.Game);
	}





}