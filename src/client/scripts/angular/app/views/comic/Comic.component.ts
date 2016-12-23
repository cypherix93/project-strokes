import * as angular from "angular";
import {AppModule} from "../../../App.module";
import {registerRoute} from "../../../core/helpers/RoutingHelper";
import fullscreen = require("fullscreen");
import IController = angular.IController;

class ComicController implements IController
{
    public state = false;

    private readerElement: JQuery;
    public isFullscreen: boolean;

    constructor(private $scope, private $compile)
    {
    }

    public openFullscreenReader()
    {
        if (this.isFullscreen)
            return;

        this.isFullscreen = true;

        var el = angular.element("#main-reader");
        var elScope = el.scope();
        var parent = el.parent();

        // Temporarily duplicate the leader to detach from the document
        el = el.clone();
        el.addClass("is-fullscreen");

        // Remove sticky stuff for fullscreen
        el.find("[sticky]").removeAttr("sticky").removeAttr("style");
        el.find(".is-sticky").removeClass("is-sticky");
        el.find(".sticky-wrapper").removeAttr("style");

        this.readerElement = el.appendTo(parent);

        // Initiate the fullscreen request
        var fullscreenReader = fullscreen(this.readerElement.get(0));
        fullscreenReader.request();

        // Compile the fullscreen window with our scope
        this.$compile(this.readerElement)(elScope);

        // Set up the event handler to call after close
        fullscreenReader.on("release", () =>
        {
            this.$scope.$apply(() =>
            {
                this.isFullscreen = false;
            });

            fullscreenReader.dispose();
            this.readerElement.remove();
        });
    }
}

AppModule.component("comicComponent", {
    controller: ComicController,
    template: require("./Comic.template.html")
});

registerRoute("comicState", {
    url: "/comic",
    template: "<comic-component></comic-component>"
});

