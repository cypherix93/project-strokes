import {IModel} from "../framework/base/IModel";

export interface IComicPage extends IModel
{
    chapter:number;
    episode:number;

    imageUrl:string;
}
