import { Request, Response } from 'express';
import { database } from '../database';
import { nanoid } from 'nanoid';
import { validateURL } from '../valid-url';

export default {
    async getShortUrlByCode(req: Request, res: Response) {
        const { code } = req.params;
        // check if the url with this code exists
        const url = await database.url.findFirst({ where: { code } });
        // if URL does not exists, then return an error_message message
        if (!url) {
            return res.status(404).json({ error_message: 'No URL was found' });
        }
        const short = `${process.env.CLIENT_URL}/${url.code}`;
        return res.status(200).json({
            url: { ...url, short }
        });
    },
    async getShortUrlByOriginalUrl(req: Request, res: Response) {
        const { original } = req.body;
        //validate the url with the original
        if (!validateURL(original))
            return res.status(401).json({ error_message: 'Not a valid URL' });
        // check if the url with this code exists
        const url = await database.url.findFirst({ where: { original } });
        // if URL does not exists, then return an error message
        if (!url) {
            return res.status(404).json({ error_message: 'No URL was found' });
        }
        const short = `${process.env.CLIENT_URL}/${url.code}`;
        return res.status(200).json({
            url: { ...url, short }
        });
    },
    async add(req: Request, res: Response) {
        let { code } = req.body;
        const { original } = req.body;
        //validate the url with the original
        if (!validateURL(original))
            return res.status(401).json({ error_message: 'Not a valid URL' });
        // check if the url with this code exists
        const url = await database.url.findFirst({
            where: { OR: [{ code }, { original }] }
        });
        // if exists, then return an error message
        if (url) {
            const short = `${process.env.CLIENT_URL}/${url.code}`;
            return res.status(401).json({
                error_message: 'URL already exists',
                url: { ...url, short }
            });
        }

        if (!code) {
            code = nanoid();
        }

        try {
            const url = await database.url.create({ data: { code, original } });
            const short = `${process.env.CLIENT_URL}/${url.code}`;
            return res.status(201).json({ url: { ...url, short } });
        } catch (error_message) {
            return res.status(500).json({ error_message: 'Server error' });
        }
    }
};
