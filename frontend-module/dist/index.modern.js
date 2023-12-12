import { createElement } from 'react';
import jwt from 'jsonwebtoken';

var styles = {"test":"_3ybTi"};

var loginPageFooter = "loginPageFooter~bjwskFxn.png";

var loginPageImage = "loginPageImage~VyEIhjMZ.png";

var LoginPageFooter = function LoginPageFooter() {
  return createElement("img", {
    src: loginPageFooter,
    alt: "Login Page Footer"
  });
};
var LoginPageImage = function LoginPageImage() {
  return createElement("img", {
    src: loginPageImage,
    alt: "Login Page Image"
  });
};

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
  return createElement("div", {
    className: styles.test
  }, "Example Component: ", text);
};

export { AuthUtils, ExampleComponent, LoginPageFooter, LoginPageImage, commonUtils };
//# sourceMappingURL=index.modern.js.map
