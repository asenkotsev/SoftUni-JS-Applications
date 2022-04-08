const lib = require('./is symmetric');
const expect = require('chai').expect;

describe('is symmetric tests', function () {
    it('should return false if arg type is different than array', function () {
        const arg = 'test';
        const result = lib.isSymmetric(arg);
        expect(result).eq(false);
    });
    it('should return array is not symmetric', function () {
        const arg = [1, 2, 3];
        const result = lib.isSymmetric(arg);
        expect(result).to.be.false;
    });
    it('should return array is symmetric', function () {
        const arg = [3, 2, 3];
        const result = lib.isSymmetric(arg);
        expect(result).to.be.true;
    });
});