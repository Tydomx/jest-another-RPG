const Potion = require('../lib/Potion');
const Character = require('./Character');

class Player extends Character {
	constructor(name = '') {
		// passing in name given to 'new Player()'
		super(name);

		this.inventory = [new Potion('health'), new Potion()];
	}

	// returns an object with various player properties
	getStats() {
		return {
			potions: this.inventory.length,
			health: this.health,
			strength: this.strength,
			agility: this.agility
		}
	};

	// returns inventory array or false if empty
	getInventory() {
		if (this.inventory.length) {
			return this.inventory;
		}
		return false;
	};

	// addPotion
	addPotion(potion) {
		this.inventory.push(potion);
	};

	// usePotion
	// origin inventory array has single potion removed at specific index value and put into new "removed items" array,
	// then Potion at index [0] of "removed items" array is saved in a potion variable
	usePotion(index) {
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
	}
};

// inherit prototype methods from Character here:
// Player.prototype = Object.create(Character.prototype);


module.exports = Player;