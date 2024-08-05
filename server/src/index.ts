import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import { Server } from 'socket.io';
import * as http from "node:http";
import configureRoutes from "./routes/configure.routes";
import {SocketController} from "./controllers/socket.controller";


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const api = '/api';
const origins = process.env.CLIENTS_URL!.split(',');
console.log(origins)

app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express!');
});

const server = http.createServer(app);
const socketController = new SocketController(server, origins);
const io = socketController.getIO();

configureRoutes(app, io);

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});