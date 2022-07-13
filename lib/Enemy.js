const Potion = require('./Potion');
const Character = require('./Character');

class Enemy extends Character {
	constructor(name, weapon) {
		super(name);

		this.weapon = weapon;
		this.potion = new Potion();

	}

	// getDescription
	getDescription() {
		return `A ${this.name} holding ${this.weapon} has appeared!`;
	}
};

// inherit from Character constructor
// Enemy.prototype = Object.create(Character.prototype);

module.exports = Enemy;