import Phaser from "phaser"

import TextureKeys from "../consts/TextureKeys"
import AnimationKeys from "../consts/AnimationKeys"

export default class RocketMouse extends Phaser.GameObjects.Container
{
	//Class properties (variables)
	private flames: Phaser.GameObjects.sprite//required to use this.variable convention
	private cursors: Phaser.Types.Input.Keyboard.CursorKeys
	private mouse: Phaser.GameObjects.Sprite

	constructor(scene: Phaser.Scene, x: number, y: number)
	{
		super(scene, x, y)
		//[]MOUSE
		//create the mouse sprite
		this.mouse = scene.add.sprite(0,0, TextureKeys.RocketMouse)
			.setOrigin(0.5, 1)
			.play(AnimationKeys.RocketMouseRun);

		//add a physics body
		scene.physics.add.existing(this);
		const body = this.body as Phaser.Physics.Arcade.Body 
		body.setSize(this.mouse.width, this.mouse.height)
		body.setOffset(this.mouse.width * -0.5, -this.mouse.height)

		//[]FIRE
		this.flames = scene.add.sprite(-63,-15,TextureKeys.RocketMouse)
			.play(AnimationKeys.RocketFlamesOn)
		//start flames off
		this.enableJetpack(false);

		//[]Add things to this container
		this.add(this.flames)
		this.add(this.mouse); 

		//[]CURSOR KEYS

		this.cursors = scene.input.keyboard.createCursorKeys();

	}

	enableJetpack(enabled: boolean)
	{/*INPUT: enabled, determins if flames show or not
	This function turns the flames on and off in the 
	jetpack. It's called from the rocketmouse contructor and also
	Potentially from an update function.'
	*/
		this.flames.setVisible(enabled);
	}

	preUpdate()//could use Update instead
	{
		const body = this.body as Phaser.Physics.Arcade.Body;

		//check if Space is down
		if(this.cursors.space?.isDown)
		{
			//set y acceleration to -600
			body.setAccelerationY(-600);
			this.enableJetpack(true);
		}
		else
		{
			//turn off acceleration otherwise
			body.setAccelerationY(0);
			this.enableJetpack(false);
		}





	}


}