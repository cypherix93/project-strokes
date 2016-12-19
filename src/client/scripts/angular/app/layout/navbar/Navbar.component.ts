import {AppModule} from "../../../App.module";
import {APP_META} from "../../../core/helpers/MetaHelper";
import {AuthService} from "../../../core/services/auth/Auth.service";

class NavbarController
{
    public appMeta = APP_META;

    public parallaxEffect = this.parallaxHelper.createAnimator(-0.8);

    constructor(private $state, public AuthService: AuthService, private toastr, private parallaxHelper)
    {
    }

    public async logout()
    {
        var response = await this.AuthService.logoutUser();

        if (!response.success)
        {
            this.toastr.error("There was an error while logging out. Please try again.");
        }

        this.toastr.info("You have been logged out!");

        // Redirect to home page
        this.$state.go("homeState");
    }
}

AppModule.component("navbarComponent", {
    controller: NavbarController,
    template: require("./Navbar.template.html")
});

