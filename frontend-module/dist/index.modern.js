import { createElement } from 'react';
import jwt from 'jsonwebtoken';

var styles = {"test":"_styles-module__test__3ybTi"};

class AuthUtils {
  static decodeJwt(token) {
    try {
      return jwt.decode(token);
    } catch (e) {
      console.error('decodeJwt', e);
      return '';
    }
  }
}

class commonUtils {
  static getUserName() {
    const token = localStorage.getItem("token");
    if (!token) return '';
    const user = AuthUtils.decodeJwt(token);
    if (user) return `${user.firstName} ${user.lastName}`;
    return '';
  }
}

const ExampleComponent = ({
  text
}) => {
  return createElement("div", {
    className: styles.test
  }, "Example Component: ", text);
};

export { AuthUtils, ExampleComponent, commonUtils };
//# sourceMappingURL=index.modern.js.map
