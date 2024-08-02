import express from 'express';
import authRoute from "./routes/auth.route";
import usersRoute from "./routes/users.route";
import eventsRoute from "./routes/events.route";
import daysRoute from "./routes/days.route";
import dotenv from "dotenv";
import cors from "cors";
import WebSocket from "ws";
import {NotificationsController} from "./controllers/notifications.controller";
import notificationsRoute from "./routes/notifications.route";


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const api = '/api';
const wss = new WebSocket.Server({ port: 8080 });

app.use(cors());
app.use(express.json());
app.use(`${api}/auth`, authRoute);
app.use(`${api}/users`, usersRoute);
app.use(`${api}/events`, eventsRoute);
app.use(`${api}/days`, daysRoute);
app.use(`${api}/notifications`, notificationsRoute);

app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express!');
});

const notificationsController = new NotificationsController(wss);
console.log(`WebSocket server is running on ws://localhost:8080`);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});