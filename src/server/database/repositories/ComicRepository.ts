import {Repository} from "../base/Repository";
import {Comic} from "../models/comic/Comic";

export class ComicRepository extends Repository<Comic>
{
    constructor()
    {
        super(Comic);
    }

    public func()
    {

    }
}
