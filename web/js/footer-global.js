define(["jquery"],function(o){"use strict";return o.widget("brm.toggleFooterLinks",{options:{footerToggleClass:".toggle-title"},_create:function(){this._toggleFooterLinks(this.options.footerToggleClass)},_toggleFooterLinks:function(t){window.matchMedia("(max-width: 960px)").matches&&o(t).click(function(){o(this).toggleClass("active"),o(this).next(".toggle-content").toggleClass("expand")})},_toggle:function(){var t=this;o(window).on("load resize",function(){t._toggleFooterLinks()})}}),o.brm.toggleFooterLinks});