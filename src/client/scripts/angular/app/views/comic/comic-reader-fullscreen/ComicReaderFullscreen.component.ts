import * as angular from "angular";
import IController = angular.IController;
import {AppModule} from "../../../../App.module";
import fullscreen = require("fullscreen");

class ComicReaderFullscreen implements IController
{
    private fullscreenReader;
    private readerElement: JQuery;

    constructor(private $scope, private $compile, private $timeout)
    {
    }

    public closeFullscreenReader()
    {
    }
}

AppModule.component("comicReaderFullscreenComponent", {
    controller: ComicReaderFullscreen,
    template: require("./ComicReaderFullscreen.template.html")
});
