import {Model} from "./Model";
import {SessionManager} from "../SessionManager";

export class Repository<TModel extends Model>
{
    constructor(protected model: new() => TModel)
    {
    }

    public async findById(id: string): Promise<TModel>
    {
        var session = SessionManager.createSession();

        var data = await session.find(this.model, id).asPromise();

        session.close();

        return data;
    }

    public async findOne(query): Promise<TModel>
    {
        var session = SessionManager.createSession();

        var data = await session.query(this.model).findOne(query).asPromise();

        session.close();

        return data;
    }

    public async findAll(query): Promise<TModel[]>
    {
        var session = SessionManager.createSession();

        var data = await session.query(this.model).findAll(query).asPromise();

        session.close();

        return data;
    }

    public async save(doc: TModel): Promise<void>
    {
        var session = SessionManager.createSession();

        session.save(doc);

        session.close();
    }

    public async update(updateDoc): Promise<void>
    {
        var session = SessionManager.createSession();

        session.query(this.model).updateOne(updateDoc);

        session.close();
    }

    public async remove(updateDoc): Promise<void>
    {
        var session = SessionManager.createSession();

        session.query(this.model).removeOne(updateDoc);

        session.close();
    }
}
