export const TYPES = {
    // Event
    EventsService: Symbol.for('EventsService'),
    EventsController: Symbol.for('EventsController'),
    EventsRepository: Symbol.for('EventsRepository'),

    // User
    UsersController: Symbol.for('UsersController'),
    UsersService: Symbol.for('UsersService'),
    UsersRepository: Symbol.for('UsersRepository'),

    // Auth
    AuthController: Symbol.for('AuthController'),
    AuthService: Symbol.for('AuthService'),
    AuthRepository: Symbol.for('AuthRepository'),

    //Notification
    NotificationsService: Symbol.for('NotificationsService'),
    NotificationsController: Symbol.for('NotificationsController'),
    NotificationsRepository: Symbol.for('NotificationsRepository'),

    // Prisma
    PrismaClient: Symbol.for('PrismaClient'),

    // Day
    DaysController: Symbol.for('DaysController'),
    DaysService: Symbol.for('DaysService'),

    // Socket
    HttpServer: Symbol.for('HttpServer'),
    CorsOrigins: Symbol.for('CorsOrigins'),
    SocketService: Symbol.for("SocketService"),

};