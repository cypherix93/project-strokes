import url = require("url");
import {Request, Response} from "express-serve-static-core";
import {JsonController, Get, Res, Patch, Req, UseBefore, Param} from "routing-controllers";
import {authorize} from "../../middlewares/Authorize";
import {IComicPage} from "../../../client/scripts/angular/core/models/comic/IComicPage";

@JsonController("/comic")
export class ComicController
{
    @Get("/getPage/:chapter/:episode")
    public async getPage(@Req() req: Request, @Res() res: Response, @Param("chapter") chapter: number, @Param("episode") episode: number)
    {
        var comicPage: IComicPage = {
            chapter: chapter,
            episode: episode,
            imageUrl: url.format({
                protocol: req.protocol,
                hostname: req.hostname,
                pathname: req.originalUrl
            })
        };

        return {
            success: true,
            data: comicPage
        };
    }
}