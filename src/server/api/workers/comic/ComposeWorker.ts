import {SessionManager} from "../../../database/SessionManager";
import {Comic, Chapter, Season} from "../../../database/models/Models";
import {IPayload} from "../../../interfaces/IPayload";
import {GetRepository} from "../../../database/RepositoryFactory";
import {ComicRepository} from "../../../database/repositories/ComicRepository";

export class ComposeWorker
{
    public static async createComic(comicDetails): Promise<IPayload<Comic>>
    {
        // Validate comic
        if (!comicDetails.title)
        {
            return {
                success: false,
                message: "Information provided about the comic is invalid."
            };
        }

        var comic = new Comic();
        comic.title = comicDetails.title;
        comic.seasons = [];

        var comicRepo = new ComicRepository();
        comicRepo.save(comic);
        comic = await comicRepo.findOne({title: comic.title});

        return {
            success: true,
            data: comic
        };
    }

    public static async createSeason(seasonDetails): Promise<IPayload<Season>>
    {
        // Validate season
        if (!seasonDetails.comicId)
        {
            return {
                success: false,
                message: "Comic information given is invalid. Cannot create season."
            };
        }

        var season = new Season();
        season.title = seasonDetails.title;
        season.arcs = [];

        var session = SessionManager.createSession();

        session.save(season);
        season = await session.query(Season).findOne({title: season.title}).asPromise();

        session.close();

        return {
            success: true,
            data: season
        };
    }

    public static createArc(arcDetails): Chapter
    {
        // Validate chapter
        if (!arcDetails.title)
            return null;

        var newChapter = new Chapter();
        newChapter.title = arcDetails.title;
        newChapter.pages = [];

        var session = SessionManager.createSession();
        session.save(newChapter);
        session.close();

        return newChapter;
    }

    public static createChapter(chapterDetails): Chapter
    {
        // Validate chapter
        if (!chapterDetails.title)
            return null;

        var newChapter = new Chapter();
        newChapter.title = chapterDetails.title;
        newChapter.pages = [];

        var session = SessionManager.createSession();
        session.save(newChapter);
        session.close();

        return newChapter;
    }
}
