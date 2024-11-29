import crypto from "crypto"

const CIPHER_ALGORITH = 'aes256'

export function encrypt(data: string, encryptionKey: string) {
    const hashedEncryptionKey = crypto.createHash('sha256').update(encryptionKey).digest('hex').substring(0, 32);

    const initializationVector = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(CIPHER_ALGORITH, hashedEncryptionKey, initializationVector);

    let encryptedData = cipher.update(Buffer.from(data, 'utf-8'));
    encryptedData = Buffer.concat([encryptedData, cipher.final()]);

    return `${initializationVector.toString('hex')}:${encryptedData.toString('hex')}`;
}

export function decrypt(encryptedData: string, encryptionKey: string) {
    const hashedEncryptionKey = crypto.createHash('sha256').update(encryptionKey).digest('hex').substring(0, 32);

    const [initializationVectorAsHex, encryptedDataAsHex] = encryptedData?.split(':');
    const initializationVector = Buffer.from(initializationVectorAsHex, 'hex');

    const decipher = crypto.createDecipheriv(CIPHER_ALGORITH, hashedEncryptionKey, initializationVector);

    let decryptedText = decipher.update(Buffer.from(encryptedDataAsHex, 'hex'));
    decryptedText = Buffer.concat([decryptedText, decipher.final()]);

    return decryptedText.toString();
};