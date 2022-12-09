const gameState = {};

//what load in the game at start
function preload() {
	//loads the image the player will be using
	this.load.image('avenger', 'assets/images/avenger.png');
	//loads image of clouds that will fly past the player
	this.load.image('clouds', 'assets/images/cloud.png');
	//loads image of the projectiles that will be shot from the player
	this.load.image('blast', 'assets/images/plasmaBlast.png');
}
//what shows up at start 
function create() {
	//game over restart
	gameState.active = true;
	this.input.on('pointerup', () => {
		if (gameState.active === false) {
			this.scene.restart();
		}
	});
	//adds clouds to a group
	gameState.cloud = this.physics.add.group();
	//player loads in
	gameState.player = this.physics.add.sprite(675, 250, 'avenger').setScale(.1);
	//player cant move past world bounds
	gameState.player.setCollideWorldBounds(true);
	//will help with controls later
	gameState.cursors = this.input.keyboard.createCursorKeys();
	//adds projectiles to a group
	gameState.Blast = this.physics.add.group();
	//creates 4 clouds in random places and m
	Cloud1 = this.physics.add.image(Math.floor(Math.random()* 1351),Math.floor(Math.random()* 501), 'clouds').setScale(3);
	Cloud2 = this.physics.add.image(Math.floor(Math.random()* 1351),Math.floor(Math.random()* 501), 'clouds').setScale(3);
	Cloud3 = this.physics.add.image(Math.floor(Math.random()* 1351),Math.floor(Math.random()* 501), 'clouds').setScale(3);
	Cloud4 = this.physics.add.image(Math.floor(Math.random()* 1351),Math.floor(Math.random()* 501), 'clouds').setScale(3);
	//makes clouds move backward
	Cloud1.setVelocity(-150, 0 );
	Cloud2.setVelocity(-150, 0 );
	Cloud3.setVelocity(-150, 0 );
	Cloud4.setVelocity(-150, 0 );
}
function update() {
	//controls to make player move up
	if (gameState.cursors.up.isDown) {
		gameState.player.setVelocityY(-200);
	//controls to make player move down
	} else if (gameState.cursors.down.isDown) {
		gameState.player.setVelocityY(200);
	//controls player to move left
	} else if (gameState.cursors.left.isDown) {
		gameState.player.setVelocityX(-300);
	//controls to move player right
	} else if (gameState.cursors.right.isDown) {
		gameState.player.setVelocityX(200);
	//if no buttons pressed than player moves backwards to world bounds
	} else {
		gameState.player.setVelocityX(-200);
		gameState.player.setVelocityY(0);
	}
	//input to use space bar to send out projectiles
	if (Phaser.Input.Keyboard.JustDown(gameState.cursors.space)) {
		gameState.Blast.create(gameState.player.x + 75, gameState.player.y, 'blast').setScale(1).setVelocityX(230);
		console.log("i pressed space");
	}
	/*gameState.Blast.getChildren().forEach(blast =>{
		if
	})*/
	//makes clouds wrap around screen
	this.physics.world.wrap(Cloud1, 48);
	this.physics.world.wrap(Cloud2, 48);
	this.physics.world.wrap(Cloud3, 48);
	this.physics.world.wrap(Cloud4, 48);
}
const config = {
	//whats game physics the game is using
	type: Phaser.AUTO,
	//width of the game
	width: 1350,
	//height of the game
	height: 500,
	//background color of the game
	backgroundColor: "#87CEEB",
	//what kind of phaser physics the game uses
	physics: {
		default: 'arcade',
		arcade: {
			//how much effect gravity has to game objects
			gravity: { y: 0 }
		}
	},
	scene: {
		preload,
		create,
		update
	}
};
const game = new Phaser.Game(config);