import {AppModule} from "../../../App.module";
import {registerRoute} from "../../../core/helpers/RoutingHelper";

class ComicController
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
