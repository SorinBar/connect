import Cookies from 'js-cookie';
import { SessionData } from '../models/sessionModel';

const COOKIE_NAME = 'connectApp-session';

export function setSession(userId: string, token: string): void {
    Cookies.set(
        COOKIE_NAME,
        JSON.stringify({
            userId,
            token,
        }),
        {
            expires: 1 / 24,
            sameSite: 'strict',
        }
    );
}

export function getSession(): SessionData | undefined {
    const sessionText = Cookies.get(COOKIE_NAME);
    if (sessionText) {
        return JSON.parse(sessionText) as SessionData;
    }
    return undefined;
}

export function clearSession(): void {
    Cookies.remove(COOKIE_NAME);
}
