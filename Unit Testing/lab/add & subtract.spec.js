const lib = require('./add & subtract');
const expect = require('chai').expect;

describe('create calculator tests', function () {
    it('should create calculator successfully', function () {
        const result = lib.createCalculator();
        expect(result).to.exist;
    });
    it('should test calculator add', function () {
        const result = lib.createCalculator();
        result.add(5);
        expect(result.get()).to.eq(5);
    });
    it('should test calculator subtract', function () {
        const result = lib.createCalculator();
        result.add(6);
        result.subtract(5);
        expect(result.get()).to.eq(1);
    });
})
