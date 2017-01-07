import path = require("path");
import {IAppConfig} from "../interfaces/IAppConfig";

const env = process.env.NODE_ENV || "development";
const isDevEnv = (env === "development");

const rootPath = path.join(__dirname, "..");

export const CONFIG: IAppConfig = {
    rootPath: rootPath,
    port: isDevEnv ? 7950 : 80,
    cors: {
        origin: process.env.CLIENT_URL || true,
        credentials: true
    },
    winston: {
        level: isDevEnv ? "debug" : "info"
    },
    jwt: {
        secret: process.env.JWT_SECRET || "asdfghjkl",
        expiryInMinutes: 30,
        cookie: {
            name: process.env.JWT_COOKIE || "project.strokes.presence",
            options: {
                httpOnly: true,
                secure: !isDevEnv,
                expires: new Date(2099, 1, 1)
            }
        }
    },
    arango: {
        host: process.env.ARANGO_HOST || "localhost",
        port: process.env.ARANGO_PORT || 8529,
        database: process.env.ARANGO_DBNAME || "Project.Strokes",
        username: process.env.ARANGO_USER || "admin",
        password: process.env.ARANGO_PASS || "admin123"
    },
    settings: {
        images: {
            uploadPath: process.env.SETTINGS_IMAGES_UPLOADPATH || path.resolve("/data/project-strokes/images/")
        }
    }
};