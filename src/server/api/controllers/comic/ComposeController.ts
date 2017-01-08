import url = require("url");
import {Request, Response} from "express-serve-static-core";
import {JsonController, Get, Post, Res, Patch, Req, UseBefore, Param} from "routing-controllers";
import {Page} from "../../../database/models/comic/Page";
import {authorize} from "../../middlewares/Authorize";
import {User} from "../../../database/models/auth/User";
import {SessionManager} from "../../../database/SessionManager";
import {ComposeWorker} from "../../workers/comic/ComposeWorker";

const EntityTypes = {
    Chapter: "chapter",
    Episode: "episode",
    Page: "page"
};

@JsonController("/compose")
@UseBefore(authorize())
export class ComposeController
{
    @Post("/create/:entity")
    public async create(@Req() request, @Res() response, @Param("entity") entity: string)
    {
        var data;

        if (entity === EntityTypes.Chapter)
        {
            data = ComposeWorker.createChapter(request.body);
        }
        else
        {
            return {
                success: false,
                message: `Cannot create object of type '${entity}'. Accepted values are ${Object.keys(EntityTypes).map(x => `'${EntityTypes[x]}'`)}.`
            }
        }

        return {
            success: true,
            data: data
        };
    }
}