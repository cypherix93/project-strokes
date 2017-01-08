import {Field, Entity, ElementType} from "hydrate-mongodb";
import {Model} from "../../base/Model";

@Entity()
export class Page extends Model
{
    @Field()
    public pageNumber:number;

    @Field()
    public imageId:string;
}
