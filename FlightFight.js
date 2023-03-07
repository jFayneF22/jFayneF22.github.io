//creates gameState Variable
const gameState = {};

//what load in the game at start
function preload() {
	//loads the image the player will be using
	this.load.image('avenger', 'assets/images/avenger.png');
	//loads image of clouds that will fly past the player
	this.load.image('clouds', 'assets/images/cloud.png');
	//loads image of the projectiles that will be shot from the player
	this.load.image('blast', 'assets/images/plasmaBlast.png');
	//temporary enemies
	this.load.image('sheild', 'assets/images/AvengerSheild.png');
	//loads image of projectiles shot from enemies
	this.load.image('fire', 'assets/images/fire.png');
	//gets number of enemies
}
//what shows up at start 
function create() {
	//game over restart
	gameState.active = true;
	this.input.on('pointerup', () => {
		if (gameState.active = false) {
			this.scene.restart();
		}
	});
	//adds clouds to a group
	gameState.cloud = this.physics.add.group();
	//player loads in
	gameState.player = this.physics.add.sprite(675, 250, 'avenger').setScale(.25);
	//player cant move past world bounds
	gameState.player.setCollideWorldBounds(true);
	//will help with controls later
	gameState.cursors = this.input.keyboard.createCursorKeys();
	//adds projectiles to a group
	gameState.Blast = this.physics.add.group();
	//creates 4 clouds in random places and m
	Cloud1 = this.physics.add.image(Math.floor(Math.random() * 1351), Math.floor(Math.random() * 501), 'clouds').setScale(3);
	Cloud2 = this.physics.add.image(Math.floor(Math.random() * 1351), Math.floor(Math.random() * 501), 'clouds').setScale(3);
	Cloud3 = this.physics.add.image(Math.floor(Math.random() * 1351), Math.floor(Math.random() * 501), 'clouds').setScale(3);
	Cloud4 = this.physics.add.image(Math.floor(Math.random() * 1351), Math.floor(Math.random() * 501), 'clouds').setScale(3);
	//makes clouds move backward
	Cloud1.setVelocity(-150, 0);
	Cloud2.setVelocity(-150, 0);
	Cloud3.setVelocity(-150, 0);
	Cloud4.setVelocity(-150, 0);
	//enemy class
	gameState.enemy = this.physics.add.group();
	//spawns  in enemies
	for (let x = 0; x < 5; x++) {
		gameState.enemy.create(1300, -100 * x + 450, 'sheild').setScale(1);
	}
	//destroy enemy and blast when colliding
	this.physics.add.collider(gameState.enemy, gameState.Blast, (sheild, blast) => {
		sheild.destroy();
		blast.destroy();
	});
	//ends game when enemy and player collide
	this.physics.add.collider(gameState.enemy, gameState.player, () => {
		gameState.active = false;
		this.physics.pause();
		this.add.text(650, 250, 'GAME OVER \n Click to restart', { fontSize: '15px', fill: '#000' });
	});
	//game restarts when clicked
	this.input.on('pointerup', () => {
		if (gameState.active === false) {
			this.scene.restart();

		}
	})
	//number of waves we start with
	gameState.wave = 5
	//sets up WASD keys
	gameState.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
	gameState.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
	gameState.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
	gameState.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
	//enemy shoot back
	const enemyfire = this.physics.add.group();
	//makes enemies shoot back at you
	const genBlast = () => {
		let randomenemy = Phaser.Utils.Array.GetRandom(gameState.enemy.getChildren());

		enemyfire.create(randomenemy.x, randomenemy.y, 'fire');
		enemyfire.setVelocityX(-300);
	};
	gameState.blastLoop = this.time.addEvent({
		delay: 300,
		callback: genBlast,
		callbackScope: this,
		loop: true
	});
	this.physics.add.collider(enemyfire, gameState.player, () => {
		gameState.active = false;
		this.physics.pause();
		this.add.text(650, 250, 'GAME OVER \n Click to restart', { fontSize: '15px', fill: '#000' });
	});
}
function update() {
	//controls to make player move up
	if (gameState.cursors.up.isDown || gameState.keyW.isDown) {
		gameState.player.setVelocityY(-200);
		//controls to make player move down
	} else if (gameState.cursors.down.isDown || gameState.keyS.isDown) {
		gameState.player.setVelocityY(200);
		//controls player to move left
	} else if (gameState.cursors.left.isDown || gameState.keyA.isDown) {
		gameState.player.setVelocityX(-300);
		//controls to move player right
	} else if (gameState.cursors.right.isDown || gameState.keyD.isDown) {
		gameState.player.setVelocityX(200);
		//if no buttons pressed than player moves backwards to world bounds
	} else {
		//player moves backwards to world bounds if no input
		gameState.player.setVelocityX(-200);
		gameState.player.setVelocityY(0);
	}
	//input to use space bar to send out projectiles
	if (Phaser.Input.Keyboard.JustDown(gameState.cursors.space)) {
		gameState.Blast.create(gameState.player.x + 75, gameState.player.y, 'blast').setScale(1).setVelocityX(230);
	}
	//makes clouds wrap around screen
	this.physics.world.wrap(Cloud1, 50);
	this.physics.world.wrap(Cloud2, 50);
	this.physics.world.wrap(Cloud3, 50);
	this.physics.world.wrap(Cloud4, 50);
	//enemy respawn
	if (gameState.enemy.getChildren().length === 0) {
		//enemies get smaller by 75% and adds extra enemy
		gameState.wave = gameState.wave + 1
		if (gameState.wave === 2) {
			for (let x = 0; x < 6; x++) {
				gameState.enemy.create(975, -75 * x + 450, 'sheild').setScale(.75);
			}
			//enemys get smaller by 50% from the first wave and adds 2 more enemies
		} else if (gameState.wave === 3) {
			for (let x = 0; x < 7; x++) {
				gameState.enemy.create(650, -70 * x + 450, 'sheild').setScale(.65);
			}
			//enemys get smaller by 25% from the first wave
		} else if (gameState.wave === 4) {
			for (let x = 0; x < 8; x++) {
				gameState.enemy.create(325, -50 * x + 450, 'sheild').setScale(.5);
			}
			//after 4th wave the game ends
		} else if (gameState.wave === 5) {
			gameState.active = false;
			this.physics.pause();
			this.add.text(650, 250, 'YOU WON \n Click to restart', { fontSize: '15px', fill: '#000' });
		}
	}
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