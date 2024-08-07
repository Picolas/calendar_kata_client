import {Server} from "socket.io";

export interface ISocketService {
    getIO(): Server;
    emitToUser(userId: number, type: string, data: Object): void;
}