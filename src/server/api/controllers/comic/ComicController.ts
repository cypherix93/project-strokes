import url = require("url");
import HttpStatus = require("http-status-codes");
import {Request, Response} from "express-serve-static-core";
import {JsonController, Get, Post, Put, Patch, Delete, Req, Res, Param, UseBefore} from "routing-controllers";
import {IRestController} from "../../../interfaces/IRestController";
import {Roles} from "../../../database/data/admin/Roles";
import {authorize} from "../../middlewares/Authorize";
import {ComicWorker} from "../../workers/comic/ComicWorker";


@JsonController("/comic")
@UseBefore(authorize(Roles.Editor))
export class ComicController implements IRestController
{
    @Get("/:id")
    public async read(@Req() req: Request, @Res() res: Response, @Param("id") id: string)
    {
        return await ComicWorker.read(id);
    }

    @Put("/")
    public async create(@Req() req: Request, @Res() res: Response)
    {
        return await ComicWorker.create(req.body);
    }

    @Patch("/:id")
    public async update(@Req() req: Request, @Res() res: Response, @Param("id") id: string)
    {
        return await ComicWorker.update(id, req.body);
    }

    @Delete("/:id")
    public async remove(@Req() req: Request, @Res() res: Response, @Param("id") id: string)
    {
        return await ComicWorker.remove(id);
    }
}