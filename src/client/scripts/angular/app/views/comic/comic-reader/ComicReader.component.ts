import * as angular from "angular";
import IController = angular.IController;
import fullscreen = require("fullscreen");

import {AppModule} from "../../../../App.module";
import {ComicReaderFullscreenService} from "../../../../core/services/reader/ComicReaderFullscreen.service";

class ComicReaderController implements IController
{
    constructor(private ComicReaderFullscreenService: ComicReaderFullscreenService)
    {
    }
}

AppModule.component("comicReaderComponent", {
    controller: ComicReaderController,
    template: require("./ComicReader.template.html")
});

