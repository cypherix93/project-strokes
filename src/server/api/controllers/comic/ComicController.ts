import url = require("url");
import {Request, Response} from "express-serve-static-core";
import {JsonController, Get, Res, Patch, Req, UseBefore, Param} from "routing-controllers";
import {IComicPage} from "../../../database/models/IComicPage";

@JsonController("/comic")
export class ComicController
{
    @Get("/getPage/:chapter/:episode")
    public async getPage(@Req() req: Request, @Res() res: Response, @Param("chapter") chapter: number, @Param("episode") episode: number)
    {
        var comicPage: IComicPage = {
            chapter: chapter,
            episode: episode,
            imageUrl: `https://unsplash.it/1200/1600/?random=${chapter}+${episode}`
        };

        return {
            success: true,
            data: comicPage
        };
    }
}