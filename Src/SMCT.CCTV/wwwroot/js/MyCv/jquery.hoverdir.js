﻿; (function ($, window, undefined) {
    'use strict'; $.HoverDir = function (options, element) { this.$el = $(element); this._init(options); }; $.HoverDir.defaults = { speed: 300, easing: 'ease', hoverDelay: 0, inverse: false }; $.HoverDir.prototype = {
        _init: function (options) { this.options = $.extend(true, {}, $.HoverDir.defaults, options); this.transitionProp = 'all ' + this.options.speed + 'ms ' + this.options.easing; this.support = Modernizr.csstransitions; this._loadEvents(); }, _loadEvents: function () {
            var self = this; this.$el.on('mouseenter.hoverdir, mouseleave.hoverdir', function (event) {
                var $el = $(this), $hoverElem = $el.find('div'), direction = self._getDir($el, { x: event.pageX, y: event.pageY }), styleCSS = self._getStyle(direction); if (event.type === 'mouseenter') {
                    $hoverElem.hide().css(styleCSS.from); clearTimeout(self.tmhover); self.tmhover = setTimeout(function () {
                        $hoverElem.show(0, function () {
                            var $el = $(this); if (self.support) { $el.css('transition', self.transitionProp); }
                            self._applyAnimation($el, styleCSS.to, self.options.speed);
                        });
                    }, self.options.hoverDelay);
                }
                else {
                    if (self.support) { $hoverElem.css('transition', self.transitionProp); }
                    clearTimeout(self.tmhover); self._applyAnimation($hoverElem, styleCSS.from, self.options.speed);
                }
            });
        }, _getDir: function ($el, coordinates) { var w = $el.width(), h = $el.height(), x = (coordinates.x - $el.offset().left - (w / 2)) * (w > h ? (h / w) : 1), y = (coordinates.y - $el.offset().top - (h / 2)) * (h > w ? (w / h) : 1), direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4; return direction; }, _getStyle: function (direction) { var fromStyle, toStyle, slideFromTop = { left: '0px', top: '-100%' }, slideFromBottom = { left: '0px', top: '100%' }, slideFromLeft = { left: '-100%', top: '0px' }, slideFromRight = { left: '100%', top: '0px' }, slideTop = { top: '0px' }, slideLeft = { left: '0px' }; switch (direction) { case 0: fromStyle = !this.options.inverse ? slideFromTop : slideFromBottom; toStyle = slideTop; break; case 1: fromStyle = !this.options.inverse ? slideFromRight : slideFromLeft; toStyle = slideLeft; break; case 2: fromStyle = !this.options.inverse ? slideFromBottom : slideFromTop; toStyle = slideTop; break; case 3: fromStyle = !this.options.inverse ? slideFromLeft : slideFromRight; toStyle = slideLeft; break; }; return { from: fromStyle, to: toStyle }; }, _applyAnimation: function (el, styleCSS, speed) { $.fn.applyStyle = this.support ? $.fn.css : $.fn.animate; el.stop().applyStyle(styleCSS, $.extend(true, [], { duration: speed + 'ms' })); },
    }; var logError = function (message) { if (window.console) { window.console.error(message); } }; $.fn.hoverdir = function (options) {
        var instance = $.data(this, 'hoverdir'); if (typeof options === 'string') {
            var args = Array.prototype.slice.call(arguments, 1); this.each(function () {
                if (!instance) {
                    logError("cannot call methods on hoverdir prior to initialization; " +
                        "attempted to call method '" + options + "'"); return;
                }
                if (!$.isFunction(instance[options]) || options.charAt(0) === "_") { logError("no such method '" + options + "' for hoverdir instance"); return; }
                instance[options].apply(instance, args);
            });
        }
        else {
            this.each(function () {
                if (instance) { instance._init(); }
                else { instance = $.data(this, 'hoverdir', new $.HoverDir(options, this)); }
            });
        }
        return instance;
    };
})(jQuery, window);