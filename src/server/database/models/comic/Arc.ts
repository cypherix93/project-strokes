import {Field, Entity, ElementType} from "hydrate-mongodb";
import {Model} from "../../base/Model";
import {Chapter} from "./Chapter";

@Entity()
export class Arc extends Model
{
    @Field()
    public number: number;

    @Field()
    public title: string;

    @Field()
    @ElementType(Chapter)
    public chapters: Chapter[];
}
