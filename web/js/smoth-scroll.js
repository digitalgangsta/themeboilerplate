define(["jquery"],function(l){"use strict";return l.widget("brm.smothScroll",{options:{smothScrollClass:".smoth-scroll"},_create:function(){this._smothScroll(this.options.smothScrollClass)},_smothScroll:function(o){var t=null;l(o).on("click",function(o){""!==this.hash&&(o.preventDefault(),t=this.hash,l("html, body").animate({scrollTop:null.offset().top-jQuery(".header-container").height()},800,function(){window.location.hash=t}))})}}),l.brm.smothScroll});