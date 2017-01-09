import url = require("url");
import {JsonController, Get, Post, Res, Patch, Req, UseBefore, Param} from "routing-controllers";
import {authorize} from "../../middlewares/Authorize";
import {ComposeWorker} from "../../workers/comic/ComposeWorker";
import {Roles} from "../../../database/data/admin/Roles";

@JsonController("/season")
@UseBefore(authorize(Roles.Editor))
export class SeasonController
{
    @Post("/createSeason")
    public async createSeason(@Req() request, @Res() response)
    {
        return await ComposeWorker.createSeason(request.body);
    }
}