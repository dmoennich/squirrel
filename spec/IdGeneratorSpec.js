var idGen = require("../common/IdGenerator");

describe("IdGenerator", function () {

	it("creates consecutive IDs, starting with 0", function () {
		var counter = 0;
		while (counter < 100) {
			expect(idGen()).toBe(counter++);
		}
	});

 });