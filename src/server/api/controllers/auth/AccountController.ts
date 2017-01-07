import {JsonController, Get, Res, Patch, Req, UseBefore, Param} from "routing-controllers";
import {authorize} from "../../middlewares/Authorize";
import {SessionManager} from "../../../database/SessionFactory";
import {User} from "../../../database/models/auth/User";

@JsonController("/account")
@UseBefore(authorize())
export class AccountController
{
    @Get("/:userId")
    public async getUserById(@Res() response, @Param("userId") userId: string)
    {
        // Get the requested user from the db
        var session = SessionManager.createSession();

        var user = await session.find(User, userId).asPromise();

        session.close();

        // Check if user exists
        if (!user)
            return response.sendStatus(404);

        return {
            success: true,
            data: user
        };
    }

    @Patch("/:userId")
    public async updateUser(@Req() request, @Res() response, @Param("userId") userId: string)
    {
        // If the user requested is not the current user, send 401
        if (userId !== request.user.id)
            return response.sendStatus(401);

        // User checked out, let's update the user's data
        var session = SessionManager.createSession();

        var user = await session.find(User, userId).asPromise();

        // Update the user
        Object.assign(user, request.body);

        session.close();

        return {
            success: true,
            data: user
        };
    }
}