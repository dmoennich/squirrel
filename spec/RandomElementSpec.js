var randomElement = require("../common/RandomElement")
	_ = require("lodash");


describe("RandomElement", function () {



	describe("get method", function () {

		it("takes array and returns random element", function () {

			var arr = [1,2,3,4,5],
				counter = 1000,
				element;

			while (counter--) {
				element = randomElement.get(arr);
				expect(arr.indexOf(element)).toBeGreaterThan(-1);
			}
		});


		it("covers all elements", function () {

			var arr = [1,2,3,4,5],
				counter = 1000,
				results = {};

			while (counter--) {
				results[randomElement.get(arr)] = 1;
			}

			arr.forEach(function (element) {
				expect(results[element]).toBeDefined();
			});

		});


		it("returns undefined for empty arrays", function () {
			expect(randomElement.get([])).toBeUndefined();
		});

	});



	describe("remove method", function () {

		it("removes random element from given array", function () {
			var arr = [1,2,3,4,5],
				element;
			element = randomElement.remove(arr);
			expect(arr.indexOf(element)).toBe(-1);
			expect(arr.length).toBe(4);
		});


		it("returns undefined for empty arrays", function () {
			expect(randomElement.get([])).toBeUndefined();
		});


		it("covers all elements", function () {

			var arr = [1,2,3,4,5],
				arrClone = _.clone(arr),
				resultArr = [];

			while (arr.length) {
				resultArr.push(randomElement.remove(arr));
			}

			expect(arr.length).toBe(0);
			expect(_.difference(arrClone, resultArr)).toEqual([]);

		});


	});





});