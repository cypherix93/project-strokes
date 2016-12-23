import {AppModule} from "../App.module";
import IController = angular.IController;

class AppController implements IController
{

}

AppModule.component("appComponent", {
    controller: AppController,
    template: require("./App.template.html")
});

