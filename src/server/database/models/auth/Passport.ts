import {Field, Entity, Embeddable} from "hydrate-mongodb";
import {Model} from "../../framework/base/Model";

@Embeddable()
export class Passport extends Model
{
    @Field()
    public protocol:string;

    @Field()
    public password:string;

    @Field()
    public accessToken:string;

    @Field()
    public provider:string;

    @Field()
    public identifier:string;

    @Field()
    public tokens:any;
}