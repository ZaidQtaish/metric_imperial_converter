const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', () => {
    test('ConvertHandler should correctly read a whole number input.', () => {
        const num = convertHandler.getNum('5km');
        assert.equal(num, 5);
    });

    test('ConvertHandler should correctly read a decimal number input.', () => {
        const num = convertHandler.getNum('3.5km');
        assert.equal(num, 3.5);
    });

    test('ConvertHandler should correctly read a fractional input.', () => {
        const num = convertHandler.getNum('6/2km');
        assert.equal(num, 3);
    });

    test('ConvertHandler should correctly read a fractional input with a decimal.', () => {
        const num = convertHandler.getNum('3/0.5km');
        assert.equal(num, 6);
    });

    test('ConvertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', () => {
        const num = convertHandler.getNum('6/7/3km');
        assert.equal(num, "invalid number");
    });

    test('ConvertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', () => {
        const num = convertHandler.getNum('km');
        assert.equal(num, 1);
    });

    test('ConvertHandler should correctly read each valid input unit.', () => {
        assert.equal(convertHandler.getUnit('5gal'), 'gal');
        assert.equal(convertHandler.getUnit('5km'), 'km');
        assert.equal(convertHandler.getUnit('5L'), 'L');
        assert.equal(convertHandler.getUnit('5mi'), 'mi');
        assert.equal(convertHandler.getUnit('5lbs'), 'lbs');
        assert.equal(convertHandler.getUnit('5kg'), 'kg');
        assert.equal(convertHandler.getUnit('5oz'), 'oz');
        assert.equal(convertHandler.getUnit('5ml'), 'ml');
        assert.equal(convertHandler.getUnit('5in'), 'in');
        assert.equal(convertHandler.getUnit('5ft'), 'ft');
        assert.equal(convertHandler.getUnit('5m'), 'm');
        assert.equal(convertHandler.getUnit('5cm'), 'cm');
    });

    test('ConvertHandler should correctly return an error for an invalid input unit.', () => {
        assert.equal(convertHandler.getUnit('5kl'), 'invalid unit');
    });

    test('ConvertHandler should return the correct return unit for each valid input unit.', () => {
        assert.equal(convertHandler.getReturnUnit('gal'), 'L');
        assert.equal(convertHandler.getReturnUnit('L'), 'gal');
        assert.equal(convertHandler.getReturnUnit('km'), 'mi');
        assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
        assert.equal(convertHandler.getReturnUnit('mi'), 'km');
        assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
        assert.equal(convertHandler.getReturnUnit('oz'), 'ml');
        assert.equal(convertHandler.getReturnUnit('ml'), 'oz');
        assert.equal(convertHandler.getReturnUnit('in'), 'cm');
        assert.equal(convertHandler.getReturnUnit('cm'), 'in');
        assert.equal(convertHandler.getReturnUnit('ft'), 'm');
        assert.equal(convertHandler.getReturnUnit('m'), 'ft');
    });

    test('ConvertHandler should correctly return the spelled-out string unit for each valid input unit.', () => {
        assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
        assert.equal(convertHandler.spellOutUnit('L'), 'liters');
        assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
        assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
        assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
        assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
        assert.equal(convertHandler.spellOutUnit('oz'), 'ounces');
        assert.equal(convertHandler.spellOutUnit('ml'), 'milliliters');
        assert.equal(convertHandler.spellOutUnit('in'), 'inches');
        assert.equal(convertHandler.spellOutUnit('ft'), 'feet');
        assert.equal(convertHandler.spellOutUnit('m'), 'meters');
        assert.equal(convertHandler.spellOutUnit('cm'), 'centimeters');
    });

    test('ConvertHandler should correctly convert gal to L.', () => {
        const result = convertHandler.convert(5, 'gal');
        assert.equal(result, 18.92705);
    });

    test('ConvertHandler should correctly convert L to gal.', () => {
        const result = convertHandler.convert(5, 'L');
        assert.equal(result, 1.32086);
    });

    test('ConvertHandler should correctly convert mi to km.', () => {
        const result = convertHandler.convert(5, 'mi');
        assert.equal(result, 8.04670);
    });

    test('ConvertHandler should correctly convert km to mi.', () => {
        const result = convertHandler.convert(5, 'km');
        assert.equal(result, 3.10686);
    });

    test('ConvertHandler should correctly convert lbs to kg.', () => {
        const result = convertHandler.convert(5, 'lbs');
        assert.equal(result, 2.26796);
    });

    test('ConvertHandler should correctly convert kg to lbs.', () => {
        const result = convertHandler.convert(5, 'kg');
        assert.equal(result, 11.02312);
    });

    // New tests for additional units:
    test('ConvertHandler should correctly convert oz to ml.', () => {
        const result = convertHandler.convert(5, 'oz');
        assert.equal(result, 147.8675);
    });

    test('ConvertHandler should correctly convert ml to oz.', () => {
        const result = convertHandler.convert(5, 'ml');
        assert.equal(result, 0.16907);
    });

    test('ConvertHandler should correctly convert in to cm.', () => {
        const result = convertHandler.convert(5, 'in');
        assert.equal(result, 12.70000);
    });

    test('ConvertHandler should correctly convert cm to in.', () => {
        const result = convertHandler.convert(5, 'cm');
        assert.equal(result, 1.96850);
    });

    test('ConvertHandler should correctly convert ft to m.', () => {
        const result = convertHandler.convert(5, 'ft');
        assert.equal(result, 1.52400);
    });

    test('ConvertHandler should correctly convert m to ft.', () => {
        const result = convertHandler.convert(5, 'm');
        assert.equal(result, 16.40420);
    });
});
