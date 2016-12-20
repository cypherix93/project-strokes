import {AppModule} from "../../App.module";

// Configure Angular App Routes
AppModule.config(function ($locationProvider, $urlRouterProvider)
{
    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix("");

    // Default when no state provided
    $urlRouterProvider.otherwise("/");
});