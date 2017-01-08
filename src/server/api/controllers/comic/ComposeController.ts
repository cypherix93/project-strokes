import url = require("url");
import {JsonController, Get, Post, Res, Patch, Req, UseBefore, Param} from "routing-controllers";
import {authorize} from "../../middlewares/Authorize";
import {ComposeWorker} from "../../workers/comic/ComposeWorker";
import {Roles} from "../../../database/data/admin/Roles";

@JsonController("/compose")
@UseBefore(authorize(Roles.Editor))
export class ComposeController
{
    @Post("/createComic")
    public async createComic(@Req() request, @Res() response)
    {
        return await ComposeWorker.createComic(request.body);
    }

    @Post("/createSeason")
    public async createSeason(@Req() request, @Res() response)
    {
        return await ComposeWorker.createSeason(request.body);
    }
}