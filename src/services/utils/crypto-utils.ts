import CryptoJS from 'crypto-js';

// Load secret key from Vite's environment variables
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;
// const BASE_URL = import.meta.env.VITE_BASE_URL;


if (!SECRET_KEY) {
    throw new Error("Secret key is missing. Ensure VITE_SECRET_KEY is set in the .env file.");
}

export const encryptData = (data: string): string => {
    return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

export const decryptData = (cipherText: string): string => {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
};
