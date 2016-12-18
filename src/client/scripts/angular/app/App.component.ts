import {AppModule} from "../App.module";

class AppController
{

}

AppModule.component("appComponent", {
    controller: AppController,
    template: require("./App.template.html")
});

