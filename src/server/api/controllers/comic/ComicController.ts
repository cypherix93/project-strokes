import url = require("url");
import {Request, Response} from "express-serve-static-core";
import {JsonController, Get, Post, Res, Patch, Req, UseBefore, Param} from "routing-controllers";
import {Page} from "../../../database/models/comic/Page";

@JsonController("/comic")
export class ComicController
{
    @Get("/getPage/:chapter/:episode")
    public async getPage(@Req() req: Request, @Res() res: Response, @Param("chapter") chapter: number, @Param("episode") episode: number)
    {


        return {
            success: true,
            data: null
        };
    }

    @Post("/getNextPage")
    public async getNextPage(@Req() req: Request, @Res() res: Response)
    {

    }
}