import Q = require("q");
import {MongoClient} from "mongodb";
import {Configuration, AnnotationMappingProvider} from "hydrate-mongodb";

import {LOGGER} from "../../helpers/Logger";
import {CONFIG} from "../../config/Config";
import {initSessionFactory} from "../../database/SessionFactory";

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
                initSessionFactory(sessionFactory);

                def.resolve(true);
            });
        });

        return await def.promise;
    }
}