import {AppModule} from "../../../../App.module";
import {registerRoute} from "../../../../core/helpers/RoutingHelper";
import {AuthService} from "../../../../core/services/auth/Auth.service";
import {IStateService, IStateParamsService} from "@types/angular-ui-router";

class LoginController implements angular.IController
{
    public email: string;
    public password: string;

    constructor(private $state: IStateService, private $stateParams, private AuthService: AuthService, private toastr)
    {
    }

    public async login()
    {
        if (!this.email || !this.password)
        {
            this.toastr.error("Both email and password needs to be provided.");
            return;
        }

        var response = await this.AuthService.loginUser(this.email, this.password);

        if (!response.success)
        {
            this.toastr.error(response.message);
            return;
        }

        // Redirect to the proper page
        if (this.$stateParams.redirectTo)
        {
            this.$state.go(this.$stateParams.redirectTo);
        }
        else
        {
            this.$state.go("home");
        }

        // Display toast message
        this.toastr.success("Welcome back " + this.AuthService.currentUser.email);
    }
}

AppModule.component("loginComponent", {
    controller: LoginController,
    template: require("./Login.template.html")
});

registerRoute("login", {
    url: "/login",
    template: "<login-component></login-component>",
    data: {
        title: "Log In"
    },
    params: {
        redirectTo: null
    }
});
