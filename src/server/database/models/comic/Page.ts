import {Field, Entity, ElementType} from "hydrate-mongodb";
import {Model} from "../../framework/base/Model";

@Entity()
export class Page extends Model
{
    @Field()
    public pageNumber:number;

    @Field()
    public imageUrl:string;
}
