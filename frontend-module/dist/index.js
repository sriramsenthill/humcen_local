function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var jwt = _interopDefault(require('jsonwebtoken'));

var styles = {"test":"_styles-module__test__3ybTi"};

var AuthUtils = /*#__PURE__*/function () {
  function AuthUtils() {}
  AuthUtils.decodeJwt = function decodeJwt(token) {
    try {
      return jwt.decode(token);
    } catch (e) {
      console.error('decodeJwt', e);
      return '';
    }
  };
  return AuthUtils;
}();

var commonUtils = /*#__PURE__*/function () {
  function commonUtils() {}
  commonUtils.getUserName = function getUserName() {
    var token = localStorage.getItem("token");
    if (!token) return '';
    var user = AuthUtils.decodeJwt(token);
    if (user) return user.firstName + " " + user.lastName;
    return '';
  };
  return commonUtils;
}();

var ExampleComponent = function ExampleComponent(_ref) {
  var text = _ref.text;
  return React.createElement("div", {
    className: styles.test
  }, "Example Component: ", text);
};

exports.AuthUtils = AuthUtils;
exports.ExampleComponent = ExampleComponent;
exports.commonUtils = commonUtils;
//# sourceMappingURL=index.js.map
