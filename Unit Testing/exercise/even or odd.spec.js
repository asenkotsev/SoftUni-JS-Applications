const lib = require('./even or odd');
const expect = require('chai').expect;

describe('even or odd tests', function() {
    it('should return undefined when input is a number', function() {
        const input = 3;
        const result = lib.isOddOrEven(input);
        expect(result).to.eq(undefined);
    });
    it('should return undefined when input is an array', function() {
        const input = ['test', 'test', 'test'];
        const result = lib.isOddOrEven(input);
        expect(result).to.eq(undefined);
    });
    it('should return even if string length is even', function() {
        const input = 'test';
        const result = lib.isOddOrEven(input);
        expect(result).to.eq('even');
    });
    it('should return odd if string length is odd', function() {
        const input = 'tes';
        const result = lib.isOddOrEven(input);
        expect(result).to.eq('odd');
    });
    it('should return correct result with multiple checks', function() {
        expect(lib.isOddOrEven('cat')).to.eq('odd');
        expect(lib.isOddOrEven('pet')).to.eq('odd');
        expect(lib.isOddOrEven('bat')).to.eq('odd');
        expect(lib.isOddOrEven('test')).to.eq('even');
    });
})