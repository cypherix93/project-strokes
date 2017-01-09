import Q = require("q");
import {SessionManager} from "../../../database/SessionManager";
import {Comic, Chapter, Season} from "../../../database/models/Models";
import {IPayload} from "../../../interfaces/IPayload";
import {Arc} from "../../../database/models/comic/Arc";

export class ComposeWorker
{
    public static async createComic(reqBody): Promise<IPayload<Comic>>
    {
        // Validate request
        if (!reqBody.title)
        {
            return {
                success: false,
                message: "Information provided about the comic is invalid."
            };
        }

        // Create the new comic
        var comic = new Comic();
        comic.title = reqBody.title;

        var session = SessionManager.createSession();

        // Save the comic
        session.save(comic);
        session.flush();

        // Get the created comic from the database
        var def = Q.defer<Comic>();

        session.fetch(comic, (err, data) =>
        {
            if (err)
                def.reject(err);

            def.resolve(data);
        });

        var dbComic = await def.promise;

        session.close();

        return {
            success: true,
            data: dbComic
        };
    }

    public static async createSeason(reqBody): Promise<IPayload<Season>>
    {
        // Validate request
        if (!reqBody.comicId)
        {
            return {
                success: false,
                message: "Comic information given is invalid. Cannot create season."
            };
        }

        var session = SessionManager.createSession();

        // Get the proper comic
        var dbComic = await session.query(Comic).findOne({_id: reqBody.comicId}).asPromise();

        if (!dbComic)
        {
            return {
                success: false,
                message: "Requested comic does not exist. Cannot create season."
            };
        }

        // Get the number of seasons available for this comic to set the season number
        var seasonsCount = await session.query(Season).count({comicId: reqBody.comicId}).asPromise();

        // Create a new season
        var season = new Season();
        season.comicId = reqBody.comicId;
        season.title = reqBody.title;
        season.number = seasonsCount + 1;

        // Save the season
        session.save(season);
        session.flush();

        // Get the created season from the database
        var def = Q.defer<Season>();

        session.fetch(season, (err, data) =>
        {
            if (err)
                def.reject(err);

            def.resolve(data);
        });

        var dbSeason = await def.promise;

        return {
            success: true,
            data: dbSeason
        };
    }

    public static async createArc(reqBody: Arc): Promise<IPayload<Arc>>
    {
        // Validate request
        if (!reqBody.seasonId || !reqBody.title)
            return null;

        var session = SessionManager.createSession();

        // Get the proper comic
        var dbSeason = await session.query(Season).findOne({_id: reqBody.seasonId}).asPromise();

        if (!dbSeason)
        {
            return {
                success: false,
                message: "Requested season does not exist. Cannot create arc."
            };
        }

        // Get the number of seasons available for this comic to set the season number
        var arcCount = await session.query(Arc).count({seasonId: reqBody.seasonId}).asPromise();

        // Create a new season
        var arc = new Arc();
        arc.seasonId = reqBody.seasonId;
        arc.title = reqBody.title;
        arc.number = arcCount + 1;

        // Save the season
        session.save(arc);
        session.flush();

        // Get the created season from the database
        var def = Q.defer<Arc>();

        session.fetch(arc, (err, data) =>
        {
            if (err)
                def.reject(err);

            def.resolve(data);
        });

        var dbArc = await def.promise;

        return {
            success: true,
            data: dbArc
        };
    }

    public static createChapter(chapterDetails): Chapter
    {
        // Validate request
        if (!chapterDetails.title)
            return null;

        var newChapter = new Chapter();
        newChapter.title = chapterDetails.title;

        var session = SessionManager.createSession();
        session.save(newChapter);
        session.close();

        return newChapter;
    }
}
