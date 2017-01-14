import * as angular from "angular";
import IController = angular.IController;
import {AppModule} from "../../../../App.module";

class ComicPlayerController implements IController
{
}

AppModule.component("comicPlayerComponent", {
    controller: ComicPlayerController,
    template: require("./ComicPlayer.template.html")
});

