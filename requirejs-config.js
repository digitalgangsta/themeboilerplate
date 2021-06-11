var config = {
    deps: [
        "jquery"
        //"js/js-custom"
    ],
    "map":{
        "*":{
            "blazy": "js/lib/blazy/blazy.min",
            "instafeed": "js/lib/instafeed/instafeed.min",
            "mixitup": "js/lib/mixitup/mixitup.min",
            "jscroll": "js/lib/jscroll/jquery.jscroll.min"
        }
    },
    "shim": {
        "blazy": ["jquery"],
        "instafeed": ["jquery"],
        "mixitup": ["jquery"],
        "jscroll": ["jquery"],

    }
};