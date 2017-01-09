import {Comic} from "../../../database/models/comic/Comic";
import {IPayload} from "../../../interfaces/IPayload";
import {IRestWorker} from "../../../interfaces/IRestWorker";
import {SessionManager} from "../../../database/SessionManager";

export class ComicWorker implements IRestWorker<Comic>
{
    public async create(body): Promise<IPayload<Comic>>
    {
        // Validate request
        if (!body.title)
        {
            return {
                success: false,
                message: "Comic title is required to create a new comic."
            };
        }

        // Create the new comic
        var comic = new Comic();
        comic.title = body.title;

        var session = SessionManager.createSession();

        // Save the comic
        session.save(comic);
        session.flush();

        // Get the created comic from the database
        comic = await new Promise<Comic>((resolve, reject) =>
        {
            session.fetch(comic, (err, data) =>
            {
                if (err)
                    reject(err);

                resolve(data);
            });
        });

        session.close();

        return {
            success: true,
            data: comic
        };
    }

    public async read(id: string): Promise<IPayload<Comic>>
    {
        var session = SessionManager.createSession();
        var comic = await session.query(Comic).findOne({_id: id}).asPromise();

        if (!comic)
        {
            return {
                success: false,
                message: `Comic with ID '${id}' does not exist.`
            }
        }

        session.close();

        return {
            success: true,
            data: comic
        }
    }

    public async update(id: string, body): Promise<IPayload<Comic>>
    {
        return undefined;
    }

    public async remove(id: string): Promise<IPayload<Comic>>
    {
        return undefined;
    }
}
