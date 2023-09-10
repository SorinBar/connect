import * as crypto from 'crypto';

export function genHash(text: string): string {
    const hash = crypto.createHash('sha512');
    hash.update(text);
    return hash.digest('hex');
}
