import {Field, Entity, ElementType} from "hydrate-mongodb";
import {Model} from "../../framework/base/Model";
import {Episode} from "./Episode";

@Entity()
export class Chapter extends Model
{
    @Field()
    public title:string;

    @Field()
    @ElementType(Episode)
    public episodes:Episode[];
}
