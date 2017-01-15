import {AppModule} from "../../App.module";
import {AuthService} from "../services/auth/Auth.service";
import {IStateService} from "angular-ui-router";

// Configure Angular App Routes
AppModule.config(function ($locationProvider, $urlRouterProvider)
{
    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix("");

    // Default when no state provided
    $urlRouterProvider.otherwise("/");
});

// Configure router authentication
AppModule.run(function ($rootScope, $state: IStateService, AuthService: AuthService)
{
    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams)
    {
        if (toState.authenticate && !AuthService.isAuthenticated())
        {
            $state.transitionTo("login", {redirectToState: toState});
            event.preventDefault();
        }
    });
});