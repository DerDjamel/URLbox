import { URL } from 'node:url';

export const validateURL = (url: string) => {
    try {
        new URL(url);
        return true;
    } catch (err) {
        return false;
    }
};
