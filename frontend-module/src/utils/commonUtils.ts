import AuthUtils from "./authUtils";

export default class commonUtils {
  public static getUserName() {
    const token = localStorage.getItem("token");
    if (!token) return '';
    const user: any = AuthUtils.decodeJwt(token);
    if (user) return `${user.firstName} ${user.lastName}`;
    return '';
  }
}