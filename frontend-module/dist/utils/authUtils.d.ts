import jwt from 'jsonwebtoken';
export default class AuthUtils {
    static decodeJwt(token: string): string | jwt.JwtPayload | null;
}
