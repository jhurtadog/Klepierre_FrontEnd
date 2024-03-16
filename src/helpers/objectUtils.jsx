export const DeepValueAssign = (obj, prop, value, tree) => {
  let p = tree.shift();
  if (tree.length > 0) {
    DeepValueAssign(obj[p], prop, value, tree);
  } else {
    obj[p] = {
      ...obj[p],
      [prop]: value,
    };
  }
  return obj;
};
