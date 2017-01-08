import {Model} from "./base/Model";
import {Repository} from "./base/Repository";

export function GetRepository<TModel extends Model>(model: new() => (TModel)): Repository<TModel>
{
    return new Repository<TModel>(model);
}