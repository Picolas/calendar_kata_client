import { Server } from 'socket.io';
import * as http from 'node:http';

export class SocketController {
    private io: Server;

    constructor(server: http.Server, origins: string[]) {
        this.io = new Server(server, {
            cors: {
                origin: '*',
                methods: ["GET", "POST"]
            }
        });

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