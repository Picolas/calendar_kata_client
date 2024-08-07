import { Server } from 'socket.io';
import * as http from 'node:http';
import { injectable, inject } from "inversify";
import { TYPES } from "../constants/types";
import {ISocketService} from "../interfaces/Service/ISocketService";

@injectable()
export class SocketService implements ISocketService{
    private io: Server;

    constructor(
        @inject(TYPES.HttpServer) private server: http.Server,
        @inject(TYPES.CorsOrigins) private origins: string[]
    ) {
        this.io = new Server(this.server, {
            cors: {
                origin: this.origins,
                methods: ["GET", "POST"],
                credentials: true,
                allowedHeaders: ["Content-Type", "Authorization"]
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

    public emitToUser(userId: number, type: string, data: Object): void {
        const jsonData = JSON.stringify(data);
        this.io.to(`user_${userId}`).emit(type, jsonData);
    }
}