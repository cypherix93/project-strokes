import {AppModule} from "../../App.module";

// Configure Angular App Initialization
AppModule.run(function ($rootScope, $state)
{
    $rootScope.pageTitle = "Home";

    $state.go("homeState");
});