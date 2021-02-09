import Phaser from 'phaser'

import TextureKeys from "/consts/Texturekeys";
import SceneKeys from "/consts/SceneKeys";
import AnimationKeys from "/consts/AnimationKeys";
import RocketMouse from "../game/RocketMouse";
import LaserObstacle from "../game/LaserObstacle"

export default class Game extends Phaser.Scene
{
	//[]Background class property
	//The ! is TypeScript’s non-null assertion operator. This lets us tell TypeScript 
	//that the backgroundproperty will never be undefined or null
	//required in order to define a "this. " variable
	private background!: Phaser.GameObjects.tileSprite;
	//private classes
	private mouseHole!: Phaser.GameObjects.Image;
	private window1!: Phaser.GameObjects.Image;
	private window2!: Phaser.GameObjects.Image;
	private bookcase1!: Phaser.GameObjects.Image;
	private bookcase2!: Phaser.GameObjects.Image;

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
		
		//[]MOUSE HOLE
		this.mouseHole = this.add.image(
			Phaser.Math.Between(900, 1500),//x is random number
			501, //y
			TextureKeys.MouseHole,//key
		)

		//[]WINDOWS
		this.window1 = this.add.image(
			Phaser.Math.Between(900, 1300),//x
			200,//y
			TextureKeys.Window1//key
		)
		this.window2 = this.add.image(
			Phaser.Math.Between(1600, 2000),
			200,
			TextureKeys.Window2
		)
		
		//[]BOOKCASEES
		this.bookcase1 = this.add.image(
			Phaser.Math.Between(2200,2700),
			580,
			TextureKeys.Bookcase1
		)
		.setOrigin(0.5, 1);

		this.bookcase2 = this.add.image(
			Phaser.Math.Between(2900,3400),
			580,
			TextureKeys.Bookcase2
		)
		.setOrigin(.5, 1);

		//[]LASERS
		const laserObstacle = new LaserObstacle(this, 900,100)
		this.add.existing(laserObstacle);

		//[]SPRITE
		/*Basic Sprite
		this.add.sprite(
			width * .5,
			height * .5,
			TextureKeys.RocketMouse,//atlas key given in preload
			"rocketmouse_fly01.png",//name of the frame in atlas
		)
		*/
		/*PhysicsSprite
		const mouse = this.physics.add.sprite(
			width * .5,//midway
			height -30,//almost the bottom
			TextureKeys.RocketMouse,
			'rocketmouse_fly01.png'
		)
		.setOrigin(.5, 1)//set origin to feet
		.play(AnimationKeys.RocketMouseRun);
		*/
		const mouse = new RocketMouse(this, width * 0.5, height - 30)//generate a Rocketmouse Object
		this.add.existing(mouse);//Add the new object to the scene.


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
	/*INPUT:  t-> total time elapsed since game started
			dt-> time elapsed since last frame
	*/
		//[]MOVE DECORATIVE SPRITES
		this.wrapMouseHole();
		this.wrapWindows();
		this.wrapBookcases();
		//[]SCROLL BACKGROUND
		this.background.setTilePosition(this.cameras.main.scrollX);
	}
	private wrapMouseHole()
	{/*This function runs continuously and is called from Update
	It detects if mousehole sprite is out of bounds to the left, and 
	Replaces it far to the right
	*/
		//[]CONSTANTS
		const scrollX = this.cameras.main.scrollX;//How far camera has traveled
		const rightEdge = scrollX + this.scale.width//coordinates of rightmost screen boundary

		//if sprite position left of camera
		if(this.mouseHole.x + this.mouseHole.width < scrollX){
			//replace sprite
			this.mouseHole.x = Phaser.Math.Between(
				rightEdge + 100,//bounds min
				rightEdge + 1000,//max
			);
		}
	}
	private wrapWindows()
	{/*This function runs continuously. It is called from update
	It detects if either window is to the left of camera and then
	Replaces it far to the right again.
	*/
		//[][]CONSTANTS
		const scrollX = this.cameras.main.scrollX;//Camera left edge position
		const rightEdge = scrollX + this.scale.width;//rightmost camera edge
		//[][]VARIABLES
		//multiply by 2 to add some more padding
		let width = this.window1.width * 2;
		//if window 1 left of camera
		if(this.window1.x + width < scrollX)
		{
			//[]Reset X position
			this.window1.x = Phaser.Math.Between(
				rightEdge + width,
				rightEdge + width + 800,
			)
		}

		width = this.window2.width
		//if window 2 left of camera
		if(this.window2.x + width < scrollX)
		{
			//[]Reset x position
			//is based relative to window1 to prevent overlap
			this.window2.x = Phaser.Math.Between(
				this.window1.x + width,
				this.window1.x + width + 800
			)
		}
	}

	private wrapBookcases()
	{/*This function runs continuously. It is called from the update function
	This function detects if either bookcase is offscreen
	Too the left and then replaces it to the right if it is.
	*/
		const scrollX = this.cameras.main.scrollX;
		const rightEdge = scrollX + this.scale.width;

		let width = this.bookcase1.width * 2;
		if (this.bookcase1.x + width < scrollX)
		{//If bookcase left of camera, replace bookcase
			this.bookcase1.x = Phaser.Math.Between(
				rightEdge + width,
				rightEdge + width + 800
			)
		}

		width = this.bookcase2.width
		if (this.bookcase2.x + width < scrollX)
		{
			this.bookcase2.x = Phaser.Math.Between(
				this.bookcase1.x + width,
				this.bookcase1.x + width, + 800
			)
		}
	}
}