import redis from 'redis';
import { Request, Response, NextFunction } from 'express';

// REDIS CONFIGURATION
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const cache = redis.createClient({ host: REDIS_HOST, port: 6379 });
cache.on('error', (error: any) => console.error(error));

// CACHE MIDDLEWARE
export function fetchCache(req: Request, res: Response, next: NextFunction) {
    const { package_name } = req.params;
    //check the data on redis store.
    cache.get(package_name, async (err: any, dependencies: any) => {
        if (err) throw err;
        if (dependencies !== null) {
            res.header('Content-Type', 'application/json');
            res.send(JSON.stringify(JSON.parse(dependencies), null, 4));
        } else {
            next();
        }
    });
}

export default cache;
