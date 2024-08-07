export const appConfig = {
    port: process.env.PORT || 3000,
    cors: {
        origin: process.env.CORS_ORIGIN || 'http://localhost:4200',
        credentials: true
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'ceciEstUnSecret',
        expiresIn: '1d'
    },
    database: {
        url: process.env.DATABASE_URL
    }
};