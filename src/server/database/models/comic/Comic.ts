import {Field, Entity, ElementType} from "hydrate-mongodb";
import {Model} from "../../base/Model";
import {Chapter} from "./Chapter";

@Entity()
export class Comic extends Model
{
    @Field()
    public title:string;

    @Field()
    public author:string;

    @Field()
    @ElementType(Chapter)
    public chapters:Chapter[];
}
