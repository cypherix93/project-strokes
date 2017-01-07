export interface IAppConfig
{
    rootPath: string;
    port: number;
    cors: {
        origin: string | string[],
        credentials: boolean
    };
    winston: {
        level: string
    };
    jwt: {
        secret: string,
        expiryInMinutes: number,
        cookie: {
            name: string,
            options: {
                httpOnly: boolean,
                secure: boolean,
                expires: Date
            }
        }
    };
    arango: {
        host: string,
        port: number,
        database: string,
        username: string,
        password: string
    },
    settings?: any
}