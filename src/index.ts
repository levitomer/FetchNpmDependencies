import { Request, Response } from 'express';
import { fetchCache } from '../middleware/redis';
import server, { port, host } from '../middleware/express';
import validation from '../middleware/validation';
import { fetchDependencies } from '../routes/fetchDependencies';

server.get('/:package_name', validation, fetchCache, fetchDependencies);
server.get('/', (req: Request, res: Response) => {
    res.send(
        `Fetch registry dependencies by attaching it to the url (e.g ${host}:${port}/express)`
    );
});

server.listen(port, host, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
