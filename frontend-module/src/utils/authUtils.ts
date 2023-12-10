import jwt from 'jsonwebtoken';

export default class AuthUtils {
  public static decodeJwt(token: string) {
    try {
      return jwt.decode(token);
    } catch (e) {
      console.error('decodeJwt', e);
      return '';
    }
  }
}