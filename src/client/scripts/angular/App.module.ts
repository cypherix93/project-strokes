import * as angular from "angular";

// Init the angular module
angular.module("AppModule", [
    "ngSanitize",
    "ngAnimate",
    "ngMessages",
    "ui.router",
    // "ui.bootstrap",
    "toastr"
]);

// Global Angular App Declaration
export const AppModule = angular.module("AppModule");

console.log("LOOK MA! I WORK FROM ANGULAR!");

