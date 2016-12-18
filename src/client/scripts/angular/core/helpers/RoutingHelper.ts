import {IStateProvider, IState} from "angular-ui-router";

import {AppModule} from "../../App.module";

export function registerRoute(name: string, state: IState)
{
    AppModule.config(function ($stateProvider: IStateProvider)
    {
        $stateProvider.state(name, state);
    });
}