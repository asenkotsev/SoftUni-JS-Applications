const PaymentPackage = require('./payment package');
const expect = require('chai').expect;

describe('PaymentPackage', () => {
    const validName = 'package';
    const validValue = 300;
    describe('Instantiation', () => {
        it('should work with valid params', () => {
            expect(() => new PaymentPackage(validName, validValue)).to.not.throw;
        });
        it('should not work with invalid name', () => {
            expect(() => new PaymentPackage([], validValue)).to.throw;
            expect(() => new PaymentPackage({}, validValue)).to.throw;
            expect(() => new PaymentPackage(undefined, validValue)).to.throw;
            expect(() => new PaymentPackage('', validValue)).to.throw;
        });
        it('should not work with invalid value', () => {
            expect(() => new PaymentPackage(validName, '')).to.throw;
            expect(() => new PaymentPackage(validName, -1)).to.throw;
            expect(() => new PaymentPackage(validName, [])).to.throw;
        });
        it('has all properties', () => {
            const instance = new PaymentPackage(validName, validValue);
            expect(instance).to.have.own.property('name');
            expect(instance).to.have.own.property('value');
            expect(instance).to.have.own.property('VAT');
            expect(instance).to.have.own.property('active');
        });
    });
    describe('Accessors', () => {
        let instance = null;
        beforeEach(() => {
            instance = new PaymentPackage(validName, validValue);
        })
        it('validates name', () => {
            instance.name = 'New Package';
            expect(instnce.name).to.equal('New Package');
        });
        it('rejects invalid name', () => {
            expect(() => instance.name = '').to.throw;
            expect(() => instance.name = {}).to.throw;
            expect(() => instance.name = undefined).to.throw;
        });
        it('accepts and sets valid value', () => {
            instance.value = 90;
            expect(instance.value).to.equal(90);
        });
        it('accepts and sets valid active', () => {
            instance.active = true;
            expect(instace.active).to.be.true;
            instance.active = false;
            expect(instace.active).to.be.false;
        });
        it('rejects invalid active', () => {
            expect(() => instance.active = '').to.throw;
            expect(() => instance.active = 5).to.throw;
            expect(() => instance.active = {}).to.throw;
        });
    });
    describe('string info', () => {
        let instance = null;
        beforeEach(() => {
            instance = new PaymentPackage(validName, validValue);
        });
        it('contains the name', () => {
            expect(instance.toString()).to.contain(validName);
        });
        it('contains the value', () => {
            expect(instance.toString()).to.contain(validValue);
        });
        it('contains the VAT', () => {
            expect(instance.toString()).to.contain(instance.VAT + '%');
        });
        it('displays inactive label', () => {
            instance.active = false;
            expect(instance.toString()).to.contain('(inactive)');
        });
        it('updates info through setters', () => {
            instance.name = 'New Package';
            instance.value = 90;
            instance.VAT = 9;
            const output = instance.toString();
            expect(output).to.contain('New Package');
            expect(output).to.contain('90');
            expect(output).to.contain('9%')
        });
    });
});