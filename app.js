const gameState = {};

//what load in the game at start
function preload() {
	this.load.image('avenger', 'assets/images/avenger.png');
	this.load.image('clouds', 'assets/images/cloud.png')
	this.load.image('blast', 'assets/images/plasmaBlast.png')
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
	gameState.cloud = this.physics.add.group();
	//player loads in
	gameState.player = this.physics.add.sprite(675, 250, 'avenger').setScale(.1);
	gameState.player.setCollideWorldBounds(true);
	//will help with controls later
	gameState.cursors = this.input.keyboard.createCursorKeys();
	gameState.Blast = this.physics.add.group();
	Cloud1 = this.physics.add.image(Math.floor(Math.random()* 1351),Math.floor(Math.random()* 501), 'clouds').setScale(3);
	Cloud1.setVelocity(-150, 0 );
	Cloud2 = this.physics.add.image(Math.floor(Math.random()* 1351),Math.floor(Math.random()* 501), 'clouds').setScale(3);
	Cloud2.setVelocity(-150, 0 );
	Cloud3 = this.physics.add.image(Math.floor(Math.random()* 1351),Math.floor(Math.random()* 501), 'clouds').setScale(3);
	Cloud3.setVelocity(-150, 0 );
	Cloud4 = this.physics.add.image(Math.floor(Math.random()* 1351),Math.floor(Math.random()* 501), 'clouds').setScale(3);
	Cloud4.setVelocity(-150, 0 );
}
function update() {
	//controls
	if (gameState.cursors.up.isDown) {
		gameState.player.setVelocityY(-200);
	} else if (gameState.cursors.down.isDown) {
		gameState.player.setVelocityY(200);
	} else if (gameState.cursors.left.isDown) {
		gameState.player.setVelocityX(-300);
	} else if (gameState.cursors.right.isDown) {
		gameState.player.setVelocityX(200);
	} else {
		gameState.player.setVelocityX(-200);
		gameState.player.setVelocityY(0);
	}
	if (Phaser.Input.Keyboard.JustDown(gameState.cursors.space)) {
		gameState.Blast.create(gameState.player.x + 75, gameState.player.y, 'blast').setScale(1).setVelocityX(230);
		console.log("i pressed space");
	}
	/*gameState.Blast.getChildren().forEach(blast =>{
		if
	})*/
	this.physics.world.wrap(Cloud1, 48);
	this.physics.world.wrap(Cloud2, 48);
	this.physics.world.wrap(Cloud3, 48);
	this.physics.world.wrap(Cloud4, 48);
}
const config = {
	type: Phaser.AUTO,
	width: 1350,
	height: 500,
	backgroundColor: "#87CEEB",
	physics: {
		default: 'arcade',
		arcade: {
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