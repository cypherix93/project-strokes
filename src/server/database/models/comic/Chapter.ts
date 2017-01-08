import {Field, Entity, ElementType} from "hydrate-mongodb";
import {Model} from "../../base/Model";
import {Page} from "./Page";

@Entity()
export class Chapter extends Model
{
    @Field()
    public number: number;

    @Field()
    public title:string;

    @Field()
    @ElementType(Page)
    public pages:Page[];
}
