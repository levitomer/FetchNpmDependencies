import express, { Request, Response } from 'express';
import compression from 'compression';
import helmet from 'helmet';

// EXPRESS CONFIGURATION
const server = express();

export const host = process.env.HOST || 'localhost';
export const port = Number(process.env.PORT) || 8000;

server.use(compression()); // Compress all responses
server.use(helmet()); // HTTP headers

export default server;
