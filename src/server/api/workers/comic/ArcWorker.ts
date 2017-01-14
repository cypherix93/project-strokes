import {IPayload} from "../../../interfaces/IPayload";
import {IRestWorker} from "../../../interfaces/IRestWorker";
import {SessionManager} from "../../../database/SessionManager";
import {Comic} from "../../../database/models/comic/Comic";
import {Season} from "../../../database/models/comic/Season";
import {Arc} from "../../../database/models/comic/Arc";

class Worker implements IRestWorker<Arc>
{
    public async create(body: Arc): Promise<IPayload<Arc>>
    {
        // Validate request
        if (!body.seasonId)
        {
            return {
                success: false,
                message: "Comic information given is invalid. Cannot create season."
            };
        }

        var session = SessionManager.createSession();

        // Get the proper comic
        var comic = await session.query(Comic).findOne({_id: body.seasonId}).asPromise();

        if (!comic)
        {
            return {
                success: false,
                message: "Requested comic does not exist. Cannot create season."
            };
        }

        // Get the number of seasons available for this comic to set the season number
        var count = await session.query(Arc).count({comicId: body.seasonId}).asPromise();

        // Create a new season
        var arc = new Arc();
        arc.seasonId = body.seasonId;
        arc.title = body.title;
        arc.number = count + 1;

        // Save the season
        await new Promise((resolve, reject) =>
        {
            session.save(arc, () => resolve());
            session.flush();
        });

        session.close();

        return {
            success: true,
            data: arc
        };
    }

    public async read(id: string): Promise<IPayload<Arc>>
    {
        var session = SessionManager.createSession();
        var arc = await session.query(Arc).findOne({_id: id}).asPromise();

        if (!arc)
        {
            return {
                success: false,
                message: `Arc with ID '${id}' does not exist.`
            }
        }

        session.close();

        return {
            success: true,
            data: arc
        }
    }

    public async update(id: string, body): Promise<IPayload<Arc>>
    {
        return undefined;
    }

    public async remove(id: string): Promise<IPayload<Arc>>
    {
        return undefined;
    }
}

export const ArcWorker = new Worker();