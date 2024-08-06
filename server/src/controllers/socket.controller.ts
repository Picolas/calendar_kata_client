import { Server } from 'socket.io';
import * as http from 'node:http';
import { injectable, inject } from "inversify";
import { TYPES } from "../constants/types";

@injectable()
export class SocketController {
    private io: Server;

    constructor(
        @inject(TYPES.HttpServer) private server: http.Server,
        @inject(TYPES.CorsOrigins) private origins: string[]
    ) {
        this.io = new Server(this.server, {
            cors: {
                origin: this.origins,
                methods: ["GET", "POST"]
            }
        });

        this.initializeSocketEvents();
    }

    private initializeSocketEvents(): void {
        this.io.on('connection', (socket) => {
            console.log('a user connected');

            socket.on('subscribe', (userId: number) => {
                socket.join(`user_${userId}`);
                console.log(`User ${userId} subscribed to notifications`);
            });

            socket.on('disconnect', () => {
                console.log('user disconnected');
            });
        });
    }

    public getIO(): Server {
        return this.io;
    }
}