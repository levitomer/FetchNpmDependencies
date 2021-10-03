import { Request, Response } from 'express';
import isomerphicFetch from 'isomorphic-unfetch';
import { formatDependencies } from '../utils/formatDependencies';
import cache from '../middleware/redis';

// Handles fetching dependencies
export async function fetchDependencies(req: Request, res: Response) {
    try {
        const { package_name } = req.params;
        // validate package_name accroding to NPM naming policy
        const response = await isomerphicFetch(
            `https://registry.npmjs.org/${package_name}`
        );
        const registry = await response.json();

        if (registry.error) {
            throw new Error(registry.error);
        }

        // target the lastet version in the regisry
        const numOfVersions = Object.values(registry['versions']).length;
        const dist = registry['dist-tags'].latest;
        const version = registry['versions'][numOfVersions];

        const { dependencies } = registry.versions[dist || version];
        const format = await formatDependencies(dependencies);

        // transform Map structure to JSON
        const json = Object.fromEntries(format);
        // set the data on redis store (expired after 24 mins)
        cache.setex(package_name, 1440, JSON.stringify(json));
        res.header('Content-Type', 'application/json');
        res.send(JSON.stringify(json, null, 4));
    } catch (e) {
        res.status(404).send('Error fetching dependencies');
        console.log(e);
    }
}
