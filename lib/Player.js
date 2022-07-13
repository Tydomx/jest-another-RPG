const Potion = require('../lib/Potion');

function Player(name = '') {
	this.name = name;

	this.health = Math.floor(Math.random() * 10 + 95);
	this.strength = Math.floor(Math.random() * 5 + 7);
	this.agility = Math.floor(Math.random() * 5 + 7);

	// this uses mocked version of test, grabbing two potions w/ value of 20
	this.inventory = [new Potion('health'), new Potion()];
}

module.exports = Player;