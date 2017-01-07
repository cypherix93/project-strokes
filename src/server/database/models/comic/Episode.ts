import {Field, Entity, ElementType} from "hydrate-mongodb";
import {Model} from "../../base/Model";
import {Page} from "./Page";

@Entity()
export class Episode extends Model
{
    @Field()
    public title:string;

    @Field()
    @ElementType(Page)
    public pages:Page[];
}
