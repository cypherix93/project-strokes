import {AppModule} from "../../../App.module";
import {registerRoute} from "../../../core/helpers/RoutingHelper";
import IController = angular.IController;

class HomeController implements IController
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

