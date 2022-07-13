// inquirer to get collect user input
// Enemy and Player objects for game, potion not needed
const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');


function Game() {
	this.roundNumber = 0;
	this.isPlayerturn = true;
	this.enemies = [];
	this.currentEnemy;
	this.player;
};

// setting up enemy and player objects in this function
Game.prototype.initializeGame = function () {
	this.enemies.push(new Enemy('goblin', 'sword'));
	this.enemies.push(new Enemy('orc', 'club'));
	this.enemies.push(new Enemy('skeleton', 'bow'));

	// keeping track of which enemy object is currently fighting Player
	this.currentEnemy = this.enemies[0];

	inquirer
		.prompt({
			type: 'text',
			name: 'name',
			message: 'What is your name?'
		})
		// destructure name from prompt object
		.then(({ name }) => {
			this.player = new Player(name);

			// test object creation
			// console.log(this.currentEnemy, this.player);
			this.startNewBattle();
		});
};

// startNewBattle method to start battle, and called again anytime new round starts
Game.prototype.startNewBattle = function () {
	if (this.player.agility > this.currentEnemy.agility) {
		this.isPlayerTurn = true;
	} else {
		this.isPlayerTurn = false;
	}

	console.log('Your stats as follows:');
	console.table(this.player.getStats());
	console.log(this.currentEnemy.getDescription());

	// calling, responsible for each individuals turn in a round
	this.battle();
};

// battle method attack/potion
Game.prototype.battle = function () {
	if (this.isPlayerTurn) {
		// player prompts
		inquirer
			.prompt({
				type: 'list',
				message: 'What would you like to do?',
				name: 'action',
				choices: ['Attack', 'Use potion']
			})
			.then(({ action }) => {
				if (action === 'Use potion') {
					// follow-up prompt 
					// checking for empty inventory first, if empty return to end player turn
					if (!this.player.getInventory()) {
						console.log("You don't have any potions!");
						return this.checkEndOfBattle();
					}
					// if inventory not empty 
					inquirer
						.prompt({
							type: 'list',
							message: 'Which potion would you like to use?',
							name: 'action',
							choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
						})
						.then(({ action }) => {
							// split to give us an array w number and potion name
							const potionDetails = action.split(': ');

							this.player.usePotion(potionDetails[0] - 1);
							console.log(`You used a ${potionDetails[1]} potion.`);

							// after player uses a potion
							this.checkEndOfBattle();
						})
				} else {
					const damage = this.player.getAttackValue();
					this.currentEnemy.reduceHealth(damage);

					console.log(`You attacked the ${this.currentEnemy.name}`);
					console.log(this.currentEnemy.getHealth());

					// after player attacks
					this.checkEndOfBattle();
				}
			});
	} else {
		const damage = this.currentEnemy.getAttackValue();
		this.player.reduceHealth(damage);

		console.log(`You were attacked by the ${this.currentEnemy.name}`);
		console.log(this.player.getHealth());

		// after enemy attacks
		this.checkEndOfBattle();
	}
};

// win/lose condition, checkEndOfBattle method
// runs immediately after Player/Enemy has taken their turn
// turns can end: Player uses potion, Player attempts to use potion w/ empty inv, Player attacks Enemy, Enemy attacks Player 
Game.prototype.checkEndOfBattle = function () {
	// verify if both char are alive and can keep fighting, if so, switch turn order and run battle() again
	if (this.player.isAlive() && this.currentEnemy.isAlive()) {
		this.isPlayerTurn = !this.isPlayerTurn;
		this.battle();
		// if player is alive, but enemy defeated. award potion and increase round Number
	} else if (this.player.isAlive() && !this.currentEnemy.isAlive()) {
		console.log(`You've defeated the ${this.currentEnemy.name}`);

		this.player.addPotion(this.currentEnemy.potion);
		console.log(`${this.player.name} found a ${this.currentEnemy.potion.name} potion`);

		this.roundNumber++;

		// if there are no more enemies to fight, player has won! Otherwise start a new battle
		if (this.roundNumber < this.enemies.length) {
			this.currentEnemy = this.enemies[this.roundNumber];
			this.startNewBattle();
		} else {
			console.log('You win!');
		}
	} else {
		console.log("You've been defeated!");
	}
};

module.exports = Game;