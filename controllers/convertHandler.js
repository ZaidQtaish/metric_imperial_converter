function ConvertHandler() {

  this.getNum = function(input) {
    let result;
    let numStr = input.match(/^[0-9\/.]*/).toString();
    
    // Check dounble fraction
    chkSlash = numStr.match(/\//g);
    if (chkSlash != null) { 
      if (chkSlash.length > 1) return "invalid number" ;
    }
    // default 1 if no number preceding
    if (numStr=="") numStr = '1';

    // eval the result to numeric
    result = eval(numStr);
    if (result == NaN) return "invalid number";

    //console.log('getNum: '+ result);
    return result;
  };


  this.getUnit = function (input) {
    const validUnits = ["gal", "l", "mi", "km", "lbs", "kg"];

    const unit = input.replace(/^[\d./]+/, '').toLowerCase();

    if (validUnits.includes(unit))
      return unit == "l" ? "L" : unit;
    else
      return "invalid unit";
  };

  this.getReturnUnit = function (initUnit) {
    const unitMap = {
      gal: "L",
      L: "gal",
      mi: "km",
      km: "mi",
      lbs: "kg",
      kg: "lbs",
    };
    return unitMap[initUnit] || "invalid unit";
  };

  this.spellOutUnit = function (initUnit) {
    const unitNames = {
      gal: "gallons",
      L: "liters",
      mi: "miles",
      km: "kilometers",
      lbs: "pounds",
      kg: "kilograms"
    };
    return unitNames[initUnit] || "invalid unit";
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let result;
    switch (initUnit) {
      case "gal":
        result = initNum * galToL; break;
      case "L":
        result = initNum / galToL; break;
      case "lbs":
        result = initNum * lbsToKg; break;
      case "kg":
        result = initNum / lbsToKg; break;
      case "mi":
        result = initNum * miToKm; break;
      case "km":
        result = initNum / miToKm; break;
      default:
        return "invalid unit";
    }
    return result.toFixed(5);
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    const spelledOutUnit = this.spellOutUnit(initUnit);
    const spelledOutReturnUnit = this.spellOutUnit(returnUnit);
    return `${initNum} ${spelledOutUnit} converts to ${returnNum} ${spelledOutReturnUnit}`
  };

}

module.exports = ConvertHandler;
