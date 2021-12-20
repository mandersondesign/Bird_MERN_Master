
import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';
import env from '../env';

const ENCRYPTION_KEY = env.ENCRYPTION_KEY; // Must be 256 bits (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16

export function encrypt (str) {
	const iv = randomBytes(IV_LENGTH);
	const cipher = createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
	let encrypted = cipher.update(str);

	encrypted = Buffer.concat([encrypted, cipher.final()]);

	return iv.toString('hex') + ':' + encrypted.toString('hex');
}

export function decrypt (str) {
	const textParts = str.split(':');
	const iv = Buffer.from(textParts.shift(), 'hex');
	const encryptedText = Buffer.from(textParts.join(':'), 'hex');
	const decipher = createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
	let decrypted = decipher.update(encryptedText);

	decrypted = Buffer.concat([decrypted, decipher.final()]);

	return decrypted.toString();
}

// https://gist.github.com/vlucas/2bd40f62d20c1d49237a109d491974eb
