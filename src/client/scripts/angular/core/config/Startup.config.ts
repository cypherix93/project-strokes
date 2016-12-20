import {AppModule} from "../../App.module";

// Configure Angular App Initialization
AppModule.run(function ($rootScope)
{
    $rootScope.pageTitle = "Home";
});