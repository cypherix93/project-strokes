import * as angular from "angular";
import {AppModule} from "../../../App.module";
import {registerRoute} from "../../../core/helpers/RoutingHelper";
import fullscreen = require("fullscreen");
import IController = angular.IController;

class ComicController implements IController
{
}

AppModule.component("comicComponent", {
    controller: ComicController,
    template: require("./Comic.template.html")
});

registerRoute("comicState", {
    url: "/comic",
    template: "<comic-component></comic-component>"
});

