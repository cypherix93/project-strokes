import * as angular from "angular";
import {AppModule} from "../../../App.module";
import {registerRoute} from "../../../core/helpers/RoutingHelper";
import fullscreen = require("fullscreen");
import IController = angular.IController;

var componentTemplate = require("./Comic.template.html");

class ComicController implements IController
{
    public state = false;
    public isFullscreen: boolean;

    private fullscreenReader;
    private readerElement: JQuery;

    constructor(private $scope, private $compile)
    {
    }

    public openFullscreenReader()
    {
        if (this.isFullscreen)
            return;

        this.isFullscreen = true;

        // Save the parent to later append on to
        var parent = angular.element("#main-reader").parent();

        // Get the template for this view and take the critical part
        var template = angular.element(componentTemplate);
        var temporary = template.find("#main-reader");

        // Mark it as fullscreen element
        temporary.addClass("is-fullscreen");

        // Remove sticky stuff for fullscreen
        temporary.find("[sticky]").removeAttr("sticky").removeAttr("style");
        temporary.find(".is-sticky").removeClass("is-sticky");
        temporary.find(".sticky-wrapper").removeAttr("style");

        this.readerElement = temporary.appendTo(parent);

        // Initiate the fullscreen request
        this.fullscreenReader = fullscreen(this.readerElement.get(0));
        this.fullscreenReader.request();

        // Compile the fullscreen window with our scope
        this.$compile(this.readerElement)(this.$scope);

        // Set up the event handler to call after close
        this.fullscreenReader.on("release", () =>
        {
            this.$scope.$apply(() =>
            {
                this.isFullscreen = false;
            });

            this.fullscreenReader.dispose();
            this.readerElement.remove();
        });
    }

    public closeFullscreenReader()
    {
        if (!this.isFullscreen || !this.fullscreenReader)
            return;

        this.fullscreenReader.release();
    }
}

AppModule.component("comicComponent", {
    controller: ComicController,
    template: componentTemplate
});

registerRoute("comicState", {
    url: "/comic",
    template: "<comic-component></comic-component>"
});

