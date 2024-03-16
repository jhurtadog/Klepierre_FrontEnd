export const isValidIBANNumber = (input) => {
  var CODE_LENGTHS = {
    AD: 24,
    AE: 23,
    AT: 20,
    AZ: 28,
    BA: 20,
    BE: 16,
    BG: 22,
    BH: 22,
    BR: 29,
    CH: 21,
    CR: 21,
    CY: 28,
    CZ: 24,
    DE: 22,
    DK: 18,
    DO: 28,
    EE: 20,
    ES: 24,
    FI: 18,
    FO: 18,
    FR: 27,
    GB: 22,
    GI: 23,
    GL: 18,
    GR: 27,
    GT: 28,
    HR: 21,
    HU: 28,
    IE: 22,
    IL: 23,
    IS: 26,
    IT: 27,
    JO: 30,
    KW: 30,
    KZ: 20,
    LB: 28,
    LI: 21,
    LT: 20,
    LU: 20,
    LV: 21,
    MC: 27,
    MD: 24,
    ME: 22,
    MK: 19,
    MR: 27,
    MT: 31,
    MU: 30,
    NL: 18,
    NO: 15,
    PK: 24,
    PL: 28,
    PS: 29,
    PT: 25,
    QA: 29,
    RO: 24,
    RS: 22,
    SA: 24,
    SE: 24,
    SI: 19,
    SK: 24,
    SM: 27,
    TN: 24,
    TR: 26,
    AL: 28,
    BY: 28,
    CR: 22,
    EG: 29,
    GE: 22,
    IQ: 23,
    LC: 32,
    SC: 31,
    ST: 25,
    SV: 28,
    TL: 23,
    UA: 29,
    VA: 22,
    VG: 24,
    XK: 20,
  };
  var iban = String(input)
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, ""), // keep only alphanumeric characters
    code = iban.match(/^([A-Z]{2})(\d{2})([A-Z\d]+)$/), // match and capture (1) the country code, (2) the check digits, and (3) the rest
    digits;
  // check syntax and length
  if (!code || iban.length !== CODE_LENGTHS[code[1]]) {
    return false;
  }
  // rearrange country code and check digits, and convert chars to ints
  digits = (code[3] + code[1] + code[2]).replace(/[A-Z]/g, function (letter) {
    return letter.charCodeAt(0) - 55;
  });
  // final check
  return mod97(digits) === 1;
};

export const calculateIBANSpain = (accountBank) => {
  if (!accountBank) return "";

  var countryCode = "ES",
    countryNumber = "142800",
    iban = "",
    digitControl = "";

  var ccc = accountBank.toString() + countryNumber;

  var digitControlInt = 98 - modulo(ccc, 97);
  if (digitControlInt < 10) {
    digitControl = "0" + digitControlInt.toString();
  } else {
    digitControl = digitControlInt.toString();
  }

  iban = countryCode + digitControl + accountBank;

  let ibanExpReg = iban.match(/.{1,4}/g);
  let ibanSpaces = ibanExpReg.join(" ");

  return ibanSpaces;
};

export const getDCFromCCC = (entidad, oficina, cuenta) => {
  let pesos = new Array();
  pesos[0] = 6;
  pesos[1] = 3;
  pesos[2] = 7;
  pesos[3] = 9;
  pesos[4] = 10;
  pesos[5] = 5;
  pesos[6] = 8;
  pesos[7] = 4;
  pesos[8] = 2;
  pesos[9] = 1;

  let entidadInv = inv(entidad);
  let oficinaInv = inv(oficina);
  let cuentaInv = inv(cuenta);

  let ofient = "" + oficinaInv + entidadInv;
  let suma = 0;

  for (let a = 0; a < 8; a++) suma += parseInt(ofient.substr(a, 1)) * pesos[a];

  let sumaCCC = 0;

  for (let a = 0; a < 10; a++)
    sumaCCC += parseInt(cuentaInv.substr(a, 1)) * pesos[a];

  let dc = 11 - (suma % 11);
  let dcCcc = 11 - (sumaCCC % 11);

  if (dc == 10) dc = 1;
  if (dc == 11) dc = 0;
  if (dcCcc == 10) dcCcc = 1;
  if (dcCcc == 11) dcCcc = 0;

  return "" + dc + dcCcc;
};

function inv(item) {
  var ret = "";

  for (let a = 0; a <= item.length; a++)
    ret = ret + item.substr(item.length - a, 1);

  return ret;
}

function mod97(string) {
  var checksum = string.slice(0, 2),
    fragment;
  for (var offset = 2; offset < string.length; offset += 7) {
    fragment = String(checksum) + string.substring(offset, offset + 7);
    checksum = parseInt(fragment, 10) % 97;
  }
  return checksum;
}

function modulo(dividend, divisor) {
  var partLength = 10;

  while (dividend.length > partLength) {
    var part = dividend.substring(0, partLength);
    dividend = (part % divisor) + dividend.substring(partLength);
  }

  return dividend % divisor;
}
