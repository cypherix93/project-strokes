import {AppModule} from "../../App.module";

// Configure Angular App Routes
AppModule.config(function ($locationProvider)
{
    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix("");
});