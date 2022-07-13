const Player = require('../lib/Player');
const Potion = require('../lib/Potion');

jest.mock('../lib/Potion');

// console.log(new Potion());

test('creates a player object', () => {
	const player = new Player('Dave');

	expect(player.name).toBe('Dave');
	expect(player.health).toEqual(expect.any(Number));
	expect(player.strength).toEqual(expect.any(Number));
	expect(player.agility).toEqual(expect.any(Number));

	expect(player.inventory).toEqual(
		expect.arrayContaining([expect.any(Object)])
	);
});

test("gets player's stats as an object", () => {
	const player = new Player('Dave');

	expect(player.getStats()).toHaveProperty('potions');
	expect(player.getStats()).toHaveProperty('health');
	expect(player.getStats()).toHaveProperty('strength');
	expect(player.getStats()).toHaveProperty('agility');
});

test('gets inventory from player or returns false', () => {
	const player = new Player('Dave');
	// this returns an array bc there's something in it
	expect(player.getInventory()).toEqual(expect.any(Array));
	// in the case of an empty array
	player.inventory = [];

	expect(player.getInventory()).toEqual(false);
});