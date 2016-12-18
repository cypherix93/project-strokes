import {AppModule} from "../../../App.module";
import {registerRoute} from "../../../core/helpers/RoutingHelper";

class HomeController
{

}

AppModule.component("homeComponent", {
    controller: HomeController,
    template: require("./Home.template.html")
});

registerRoute("homeState", {
    url: "/",
    template: "<home-component></home-component>"
});

