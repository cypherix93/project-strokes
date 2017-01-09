import {IPayload} from "./IPayload";
import {Model} from "../database/base/Model";

export interface IRestWorker<TModel extends Model>
{
    create(body, ...args): Promise<IPayload<TModel>>;

    read(id: string, ...args): Promise<IPayload<TModel>>;

    update(id: string, body, ...args): Promise<IPayload<TModel>>;

    remove(id: string, ...args): Promise<IPayload<TModel>>;
}
