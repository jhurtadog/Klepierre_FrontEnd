export const formatNumber = (
  number,
  sufixSymbol = "",
  decimals = 2,
  decimalSeparator = ",",
  thousandSeparator = "."
) => {
  let auxNumber = ("" + number).trim();

  if (auxNumber === "" || isNaN(number)) {
    return "";
  }

  let symbol = Number(auxNumber) < 0 ? "-" : "";
  auxNumber = ("" + auxNumber).replace(symbol, "");
  let integerPart = auxNumber.split(".")[0];
  let decimalPart = auxNumber.split(".")[1] || "";

  auxNumber = integerPart;
  for (let i = integerPart.length - 1, j = 1; i > 0; i--, j++) {
    if (j % 3 === 0) {
      auxNumber =
        auxNumber.slice(0, i) +
        thousandSeparator +
        auxNumber.slice(i, auxNumber.length);
    }
  }

  if (decimalPart.length < decimals) {
    decimalPart = decimalPart + "0".repeat(decimals - decimalPart.length);
  }

  return (
    symbol +
    auxNumber +
    (decimalPart && decimals > 0
      ? decimalSeparator + decimalPart.slice(0, decimals)
      : "") +
    sufixSymbol
  );
};

export const toNumber = (value) => {
  value = value + "";
  value = value.replace(/\./g, "");
  value = value.replace(/,/g, ".");
  return Number(value);
};

export const formatterNumber = (val) => {
  if (!val) return 0;
  return `${val}`
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    .replace(/\.(?=\d{0,2}$)/g, ",");
};

export const parserNumber = (val) => {
  if (!val) return 0;
  return Number.parseFloat(
    val.replace(/\$\s?|(\.*)/g, "").replace(/(\,{1})/g, ".")
  ).toFixed(2);
};

export const validateEmail = (emailField) => {
  var validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  if (validEmail.test(emailField)) {
    return true;
  } else {
    return false;
  }
};
