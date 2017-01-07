import Q = require("q");
import {MongoClient} from "mongodb";
import {Configuration, AnnotationMappingProvider} from "hydrate-mongodb";

import {LOGGER} from "../../helpers/Logger";
import {CONFIG} from "../../config/Config";
import {initSessionManager} from "../../database/SessionManager";

import * as models from "../../database/models/Models";

export class DatabaseBootstrapper
{
    public static async init()
    {
        LOGGER.info("Initiating MongoDB...");

        // Initiate the configuration for Hydrate to understand our models
        var config = new Configuration();
        config.addMapping(new AnnotationMappingProvider(models));

        var def = Q.defer();

        // Connect to mongodb to set up the session factory
        MongoClient.connect(CONFIG.db.connectionString, (err, db) =>
        {
            if (err)
            {
                def.reject(err);
            }

            config.createSessionFactory(db, (err, sessionFactory) =>
            {
                if (err)
                {
                    def.reject(err);
                }

                initSessionManager(sessionFactory);

                def.resolve(true);
            });
        });

        return await def.promise;
    }
}