export const appConfig = {
    port: process.env.PORT || 3000,
    cors: {
        origin: process.env.CLIENTS_URL?.split(',') || '*',
        credentials: true
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'your-secret-key',
        expiresIn: '1d'
    },
    database: {
        url: process.env.DATABASE_URL
    }
};