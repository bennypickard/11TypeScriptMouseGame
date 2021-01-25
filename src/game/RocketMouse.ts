import Phaser from "phaser"

import TextureKeys from "../consts/TextureKeys"
import AnimationKeys from "../consts/AnimationKeys"

export default class RocketMouse extends Phaser.GameObjects.Container
{
	constructor(scene: Phaser.Scene, x: number, y: number)
	{
		super(scene, x, y)
		//[]MOUSE
		//create the mouse sprite
		const mouse = scene.add.sprite(0,0, TextureKeys.RocketMouse)
			.setOrigin(0.5, 1)
			.play(AnimationKeys.RocketMouseRun);

		//add a physics body
		scene.physics.add.existing(this);
		const body = this.body as Phaser.Physics.Arcade.Body 
		body.setSize(mouse.width, mouse.height)
		body.setOffset(mouse.width * -0.5, -mouse.height)

		//[]FIRE
		const flames = scene.add.sprite(-63,-15,TextureKeys.RocketMouse)
			.play(AnimationKeys.RocketFlamesOn)

		//[]Add things to this container
		this.add(flames)
		this.add(mouse);

	}



}