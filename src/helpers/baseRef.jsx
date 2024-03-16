import { padLeft } from "./stringUtils";
export const calculateBaseRef = (building, gallery) => {
  const baseRef = (
    gallery +
    building +
    "-" +
    new Date().getFullYear().toString() +
    "-"
  ).replace(/\s/g, "");

  return baseRef;
};

export const generateNewRef = (base, equals = []) => {
  let id;
  let referenceIds = [];
  equals.forEach((r) => {
    referenceIds.push(r.reference ? parseInt(r.reference.split("-")[2]) : 0);
  });

  if (referenceIds && referenceIds.length === 0) {
    id = padLeft("1", "0", 5);
  } else {
    var maxId = (Math.max(...referenceIds) + 1).toString();
    id = padLeft(maxId, "0", 5);
  }

  return base + id;
};
