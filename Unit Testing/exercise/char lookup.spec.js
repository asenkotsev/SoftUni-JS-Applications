const lib = require('./char lookup');
const expect = require('chai').expect;

describe('main', () => {
    const testString = 'test';
    describe('invalid params', () => {
        it('should return undefined if first param is not-string', () => {
            expect(lib.lookupChar(null, 0)).to.eq(undefined);
        });
        it('should return undefined if second param is not a number', () => {
            expect(lib.lookupChar(testString, null)).to.eq(undefined);
        });
    });
    describe('out of range', () => {
        it('should return undefined when second param is below 0', () => {
            expect(lib.lookupChar(testString, -1)).to.eq('Incorrect index');
        });
        it('should return undefined when second param is bigger than last index', () => {
            expect(lib.lookupChar(testString, 4)).to.eq('Incorrect index');
        });
    });
    describe('happy path', () => {
        it('should return t', () => {
            expect(lib.lookupChar(testString, 0)).to.eq('t');
        });
        it('should return e', () => {
            expect(lib.lookupChar(testString, 1)).to.eq('e');
        });
        it('should return s', () => {
            expect(lib.lookupChar(testString, 2)).to.eq('s');
        });
        it('should return t', () => {
            expect(lib.lookupChar(testString, 3)).to.eq('t');
        });
    });
});