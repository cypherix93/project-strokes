import {AppModule} from "../../../App.module";

function buildOptions(attrs: any)
{
    var options = {} as any;

    options.topSpacing = (attrs.top | 0) || 0;
    options.bottomSpacing = (attrs.bottom | 0) || 0;
    options.responsiveWidth = attrs.responsive !== "false";

    return options;
}

AppModule.directive("sticky", function ()
{
    return {
        restrict: "A",
        scope: false,
        link: function (scope, element, attrs)
        {
            var options = buildOptions(attrs);

            var el = $(element) as any;
            el.sticky(options);
        }
    };
});