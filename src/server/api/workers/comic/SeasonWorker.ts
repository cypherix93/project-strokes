import {IPayload} from "../../../interfaces/IPayload";
import {IRestWorker} from "../../../interfaces/IRestWorker";
import {SessionManager} from "../../../database/SessionManager";
import {Comic} from "../../../database/models/comic/Comic";
import {Season} from "../../../database/models/comic/Season";

export const SeasonWorker = new Worker();

class Worker implements IRestWorker<Season>
{
    public async create(body): Promise<IPayload<Season>>
    {
        // Validate request
        if (!body.comicId)
        {
            return {
                success: false,
                message: "Comic information given is invalid. Cannot create season."
            };
        }

        var session = SessionManager.createSession();

        // Get the proper comic
        var comic = await session.query(Comic).findOne({_id: body.comicId}).asPromise();

        if (!comic)
        {
            return {
                success: false,
                message: "Requested comic does not exist. Cannot create season."
            };
        }

        // Get the number of seasons available for this comic to set the season number
        var seasonsCount = await session.query(Season).count({comicId: body.comicId}).asPromise();

        // Create a new season
        var season = new Season();
        season.comicId = body.comicId;
        season.title = body.title;
        season.number = seasonsCount + 1;

        // Save the season
        session.save(season);
        session.flush();

        // Get the created season from the database
        season = await new Promise<Season>((resolve, reject) =>
        {
            session.fetch(season, (err, data) =>
            {
                if (err)
                    reject(err);

                resolve(data);
            });
        });

        return {
            success: true,
            data: season
        };
    }

    public async read(id: string): Promise<IPayload<Season>>
    {
        var session = SessionManager.createSession();
        var season = await session.query(Season).findOne({_id: id}).asPromise();

        if (!season)
        {
            return {
                success: false,
                message: `Season with ID '${id}' does not exist.`
            }
        }

        session.close();

        return {
            success: true,
            data: season
        }
    }

    public async update(id: string, body): Promise<IPayload<Season>>
    {
        return undefined;
    }

    public async remove(id: string): Promise<IPayload<Season>>
    {
        return undefined;
    }
}