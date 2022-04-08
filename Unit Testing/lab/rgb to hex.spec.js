const lib = require('./rgb to hex');
const expect = require('chai').expect;

describe('rgb to hex tests', function () {
    it('should return undefined when first arg is different than int', function () {
        const input = ['red', 255, 255];
        const result = lib.rgbToHexColor(...input);
        expect(result).to.eq(undefined);
    });
    it('should return undefined when second arg is different than int', function () {
        const input = [255, 'red', 255];
        const result = lib.rgbToHexColor(...input);
        expect(result).to.eq(undefined);
    });
    it('should return undefined when third arg is different than int', function () {
        const input = [255, 255, 'red'];
        const result = lib.rgbToHexColor(...input);
        expect(result).to.eq(undefined);
    });
    it('should convert rgb to hex', function () {
        const input = [50, 168, 82];
        const result = lib.rgbToHexColor(...input);
        expect(result).to.eq('#32A852');
    });
})
