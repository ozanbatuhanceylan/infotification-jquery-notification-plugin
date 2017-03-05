/**
 * Created by OBC on 01.03.2017.
 */
(function ($) {
    $.fn.infotification = function (options) {
        var settings = $.extend({
            // These are the defaults.
            position: "top-right",
            style:"info",
            message: "This is a test notification!",
            type: 'slide',
            duration: 5000
        }, options );

        var construct = function (elem) {
            var wrapper = $("#infotification_wrapper");
            if(wrapper.length == 0){
                elem.append("<div id='infotification_wrapper' class='" + settings.position + "'></div>");
            }else{
                if(!wrapper.hasClass(settings.position)){
                    wrapper.remove();
                    elem.append("<div id='infotification_wrapper' class='" + settings.position + "'></div>");
                }
            }
        };

        construct(this);

        var checkInfotification = function () {
            if($("#infotification_wrapper").length > 0 && $("#infotification_wrapper div").length > 0){
                var className = $("#infotification_wrapper div:last-child").attr("id");
                var i = className.split('-');
                return parseInt(i[1]) + 1;
            }else{
                return 0;
            }
        };

        var appendNotification = function (elem) {
            var i = checkInfotification();
            elem.append("<div id='infotification-" + i + "' style='display: none;'></div>");
            var createdElem = $("#infotification-" + i);

            createdElem.addClass('infotification-' + settings.style);
            createdElem.html(settings.message);

            if(settings.type == "fade"){
                createdElem.fadeIn();
                setTimeout(function () {
                    createdElem.fadeOut(function () {
                        this.remove();
                    });
                }, settings.duration);
            }else if(settings.type == "slide"){
                createdElem.slideToggle("slow");
                setTimeout(function () {
                    createdElem.slideToggle('slow', function () {
                        this.remove();
                    });
                }, settings.duration);
            }



        };

        // Greenify the collection based on the settings variable.
        return appendNotification($("#infotification_wrapper"));
    }
 }(jQuery));