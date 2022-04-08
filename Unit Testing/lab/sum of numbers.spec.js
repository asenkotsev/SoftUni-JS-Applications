const lib = require('./sum of numbers');
const expect = require('chai').expect;

describe('sum tests', function () {
    it('should return the sum of all numbers of a valid number string array', function () {
        const arg = ['1', '2', '3'];
        const result = lib.sum(arg);
        expect(result).eq(6);
    });
    it('should return the sum of all numbers of a valid number array', function () {
        const arg = [1, 2, 3];
        const result = lib.sum(arg);
        expect(result).eq(6);
    });
    it('should return NaN when if arg is string', function () {
        const arg = 'string';
        const result = lib.sum(arg);
        expect(result).to.be.NaN;
    });
    it('should return NaN if arg is invalid number string array', function () {
        const arg = ['1', '2', 'a'];
        const result = lib.sum(arg);
        expect(result).to.be.NaN;
    });
});