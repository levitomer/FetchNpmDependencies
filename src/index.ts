import express, { Request, Response } from 'express';
import { fetchCache } from '../redis/cache';
import validation from '../utils/validation';
import compression from 'compression';
import helmet from 'helmet';
import { fetchDependencies } from '../endpoints/fetchDependencies';

// EXPRESS CONFIGURATION
const server = express();

export const host = process.env.HOST || 'localhost';
export const port = Number(process.env.PORT) || 8000;

server.use(compression()); // Compress all responses
server.use(helmet()); // HTTP headers

server.get('/:package_name', validation, fetchCache, fetchDependencies);
server.get('/', (_: Request, res: Response) => {
    res.send(
        `Fetch registry dependencies by attaching it to the url (e.g ${host}:${port}/express)`
    );
});

server.listen(port, host, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

export default server;
