import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.query.token !== process.env.ISR_REVALIDATE_SECRET_TOKEN) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    let paths: string[] = [];
    if (req.query.path)
        paths.push(req.query.path as string);

    if (req.method === 'POST') {
        paths = req.body as Array<string>;
    }
    if (paths.length > 0) {
        try {
            for (let index = 0; index < paths.length; index++) {
                const path = paths[index];
                console.log('revalidating', path);
                await res.revalidate(path);
            }
            return res.json({ revalidated: true })
        } catch (err) {
            console.log(err);
            // If there was an error, Next.js will continue
            // to show the last successfully generated page
            return res.status(500).send('Error revalidating')
        }
    }
    return res.status(400).send('No paths found');
}
