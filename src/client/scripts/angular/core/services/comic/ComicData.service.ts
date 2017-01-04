import {AppModule} from "../../../App.module";
import {ApiService} from "../data/Api.service";
import {IPayload} from "../../models/IPayload";

export class ComicDataService
{
    constructor(private ApiService: ApiService)
    {
    }


}

AppModule.service("AuthService", ComicDataService);
