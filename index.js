var polyfill = require("@riim/object-entries-polyfill");

function flattenObjSass(obj, prefix = "$", transform = (key, val) => val) {
  return Object.entries(obj).reduce((go, el) => {
    let key = `${prefix}${el[0]}`;
    let val = el[1];
    if (typeof val === "object" && !Array.isArray(val) && val) {
      return go + `${flattenObjSass(val, `${key}-`, transform)}`;
    } else {
      return Array.isArray(val)
        ? `${key}: (${transform(key, val)}); `
        : go + `${key}: ${transform(key, val)}; `;
    }
  }, "");
}

module.exports = flattenObjSass;
