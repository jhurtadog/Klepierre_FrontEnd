export const padLeft = (str, ch, n) => {
  return str.length >= n ? str : padLeft(ch + str, ch, n);
};

export const padRight = (str, ch, n) => {
  return str.length >= n ? str : padRight(str + ch, ch, n);
};

export const fixedSpacesAfterText = (text, maxLength) => {
  if (!text || text.length === 0) return "";

  let spaces = "";
  let textLengthDiff = maxLength - 17;

  if (textLengthDiff > 0) {
    for (var i = 0; i < textLengthDiff; i++) spaces += " ";
  }
  let fin = text + spaces;
  return fin;
};

export const findUnique = (arr, predicate) => {
  var found = {};
  arr.forEach((d) => {
    found[predicate(d)] = d;
  });
  return Object.keys(found).map((key) => found[key]);
};

export const getItem = (label, key, icon, children, type) => {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
};

export const titleCase = (str) => {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
};

export const isObjectEmpty = (objectName) => {
  return Object.keys(objectName).length === 0;
};
