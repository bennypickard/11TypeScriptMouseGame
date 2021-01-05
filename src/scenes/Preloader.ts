import Phaser from 'phaser'

export default class Preloader extends Phaser.Scene
{
	constructor()
	{
		super('preloader');
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

		this.scene.start('game');
	}





}