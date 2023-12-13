const appUtils = {};

appUtils.escapeRegExp = function (str) {
  // Escape special characters: \ ^ $ * + ? . ( ) [ ] { } |
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

appUtils.getStartsWithRegex = function (value) {
  return {
    $regex: new RegExp("^" + appUtils.escapeRegExp(value.toLowerCase()), "i"),
  };
};

appUtils.getInbetweenRegex = function (value) {
  return {
    $regex: new RegExp(appUtils.escapeRegExp(value.toLowerCase()), "i"),
  };
};

module.exports = appUtils;
