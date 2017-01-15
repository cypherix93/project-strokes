import {AppModule} from "../../../App.module";
import {registerRoute} from "../../../core/helpers/RoutingHelper";

class HomeController implements angular.IController
{

}

AppModule.component("homeComponent", {
    controller: HomeController,
    template: require("./Home.template.html")
});

registerRoute("homeState", {
    url: "/",
    component: "homeComponent"
});

