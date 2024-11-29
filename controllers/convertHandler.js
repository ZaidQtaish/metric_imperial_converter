function ConvertHandler() {
  this.getNum = function(input) {
    let result;
    let numStr = input.match(/^[0-9\/.]*/).toString();

    // Check for double fractions
    const chkSlash = numStr.match(/\//g);
    if (chkSlash != null && chkSlash.length > 1) {
      return "invalid number";
    }

    // Default to 1 if no number provided
    if (numStr === "") numStr = "1";

    try {
      result = eval(numStr);
    } catch (error) {
      return "invalid number";
    }

    return isNaN(result) ? "invalid number" : result;
  };

  this.getUnit = function(input) {
    const validUnits = ["gal", "l", "mi", "km", "lbs", "kg", "oz", "ml", "f", "c", "in", "ft", "m", "cm"];

    const unit = input.replace(/^[\d./]+/, "").toLowerCase();

    if (validUnits.includes(unit)) return unit === "l" ? "L" : unit;
    return "invalid unit";
  };

  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      gal: "L",
      L: "gal",
      mi: "km",
      km: "mi",
      lbs: "kg",
      kg: "lbs",
      oz: "ml",
      ml: "oz",
      f: "c",
      c: "f",
      in: "cm",
      cm: "in",
      ft: "m",
      m: "ft"
    };
    return unitMap[initUnit] || "invalid unit";
  };

  this.spellOutUnit = function(initUnit) {
    const unitNames = {
      gal: "gallons",
      L: "liters",
      mi: "miles",
      km: "kilometers",
      lbs: "pounds",
      kg: "kilograms",
      oz: "ounces",
      ml: "milliliters",
      f: "Fahrenheit",
      c: "Celsius",
      in: "inches",
      ft: "feet",
      m: "meters",
      cm: "centimeters"
    };
    return unitNames[initUnit] || "invalid unit";
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    const ozToMl = 29.5735;
    const fToC = 5 / 9;
    const cToF = 9 / 5;
    const inToCm = 2.54;
    const ftToM = 0.3048;
    const mToFt = 3.28084;
    const cmToIn = 0.393701;

    let result;
    switch (initUnit) {
      case "gal":
        result = initNum * galToL;
        break;
      case "L":
        result = initNum / galToL;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "oz":
        result = initNum * ozToMl;
        break;
      case "ml":
        result = initNum / ozToMl;
        break;
      case "f":
        result = (initNum - 32) * fToC;
        break;
      case "c":
        result = (initNum * cToF) + 32;
        break;
      case "in":
        result = initNum * inToCm;
        break;
      case "cm":
        result = initNum / inToCm;
        break;
      case "ft":
        result = initNum * ftToM;
        break;
      case "m":
        result = initNum / ftToM;
        break;
      default:
        return "invalid unit";
    }
    return result.toFixed(5);
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const spelledOutUnit = this.spellOutUnit(initUnit);
    const spelledOutReturnUnit = this.spellOutUnit(returnUnit);
    return `${initNum} ${spelledOutUnit} converts to ${returnNum} ${spelledOutReturnUnit}`;
  };
}

module.exports = ConvertHandler;
