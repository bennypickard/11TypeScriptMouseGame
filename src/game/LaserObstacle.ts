import Phaser from "phaser"
import TextureKeys from "../consts/TextureKeys"

export default class LaserObstacle extends Phaser.GameObjects.Container
{
	constructor(scene: Phaser.Scene, x: number, y: number)
	{
		super(scene,x,y)//run container contructor with these values
		
		const top = scene.add.image(0,0,TextureKeys.LaserEnd)
		.setOrigin(0.5, 0)

		const middle = scene.add.image(
			0,
			top.y + top.displayHeight,
			TextureKeys.LaserMiddle
		)
		.setOrigin(0.5, 0)

		//set height of middle laser to 200px
		middle.setDisplaySize(middle.width, 200)

		//create a bottom that is flipped and below the middle
		const bottom = scene.add.image(0, middle.y + middle.displayHeight, TextureKeys.LaserEnd)
			.setOrigin(.5, 0)
			.setFlipY(true)

		//Add all three to the container.
		this.add(top)
		this.add(middle)
		this.add(bottom)



		//[]PHYSICS SETUP
		//add static physics body to container
		//second value (true) denotates static.
		scene.physics.add.existing(this, true);

		//set body parameters
		const body = this.body as Phaser.Physics.Arcade.StaticBody
		const width = top.displayWidth
		const height = top.displayHeight + middle.displayHeight + bottom.displayHeight
		//size body
		body.setSize(width, height);
		body.setOffset(-width * 0.5, 0);
		//reposition body
		body.position.x = this.x + body.offset.x
		body.position.y = this.y

		




	}

	







}