import url = require("url");
import HttpStatus = require("http-status-codes");
import {Request, Response} from "express-serve-static-core";
import {JsonController, Get, Post, Put, Patch, Delete, Req, Res, Param, UseBefore} from "routing-controllers";
import {authorize} from "../../middlewares/Authorize";
import {ComposeWorker} from "../../workers/comic/ComposeWorker";
import {Roles} from "../../../database/data/admin/Roles";
import {IRestController} from "../../../interfaces/IRestController";
import {SeasonWorker} from "../../workers/comic/SeasonWorker";

@JsonController("/season")
@UseBefore(authorize(Roles.Editor))
export class SeasonController implements IRestController
{
    @Get("/:id")
    public async read(@Req() req: Request, @Res() res: Response, @Param("id") id: string)
    {
        return await SeasonWorker.read(id);
    }

    @Put("/")
    public async create(@Req() req: Request, @Res() res: Response)
    {
        return await SeasonWorker.create(req.body);
    }

    @Patch("/:id")
    public async update(@Req() req: Request, @Res() res: Response, @Param("id") id: string)
    {
        return await SeasonWorker.update(id, req.body);
    }

    @Delete("/:id")
    public async remove(@Req() req: Request, @Res() res: Response, @Param("id") id: string)
    {
        return await SeasonWorker.remove(id);
    }
}