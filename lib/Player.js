const Potion = require('../lib/Potion');

function Player(name = '') {
	this.name = name;

	this.health = Math.floor(Math.random() * 10 + 95);
	this.strength = Math.floor(Math.random() * 5 + 7);
	this.agility = Math.floor(Math.random() * 5 + 7);

	// this uses mocked version of test, grabbing two potions w/ value of 20
	this.inventory = [new Potion('health'), new Potion()];

	// returns an object with various player properties
	Player.prototype.getStats = function () {
		return {
			potions: this.inventory.length,
			health: this.health,
			strength: this.strength,
			agility: this.agility
		}
	};

	// returns inventory array or false if empty
	Player.prototype.getInventory = function () {
		if (this.inventory.length) {
			return this.inventory;
		}
		return false;
	};

	// getHealth
	Player.prototype.getHealth = function () {
		return `${this.name}'s health is now ${this.health}`;
	};

	// isAlive
	Player.prototype.isAlive = function () {
		if (this.health === 0) {
			return false;
		}
		return true;
	};

	// reduceHealth
	Player.prototype.reduceHealth = function (health) {
		this.health -= health;

		if (this.health < 0) {
			this.health = 0;
		}
	};

	// getAttackValue
	Player.prototype.getAttackValue = function () {
		const min = this.strength - 5;
		const max = this.strength + 5;

		return Math.floor(Math.random() * (max - min) + min);
	};

	// addPotion
	Player.prototype.addPotion = function (potion) {
		// adding potion item to the end of an array
		this.inventory.push(potion);
	};

	// usePotion
	Player.prototype.usePotion = function (index) {
		// origin inventory array has single potion removed at specific index value and put into new "removed items" array,
		// then Potion at index [0] of "removed items" array is saved in a potion variable
		const potion = this.getInventory().splice(index, 1)[0];

		switch (potion.name) {
			case 'agility':
				this.agility += potion.value;
				break;
			case 'health':
				this.health += potion.value;
				break;
			case 'strength':
				this.strength += potion.value;
				break;
		}
	};
}



module.exports = Player;