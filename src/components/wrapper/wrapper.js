import React from 'react'
import UploadBox from '../UploadBox'

function RenderUploadBox(selector) {
    React.render(<UploadBox />, document.querySelectorAll(selector)[0]);
}

if (typeof jQuery !== 'undefined') {
    (function ($) {
        var pluginName = "uploadBox",
            defaults = {
                value: 0
            };

        function Plugin(element, options) {
            this.element = element;
            this.settings = $.extend({}, defaults, options);
            this._defaults = defaults;
            this._name = pluginName;
            this.init();
        }

        $.extend(Plugin.prototype, {
            init: function () {
                this.component = React.render(
                    <UploadBox dataFilesAndDirs={this.settings.value} />,
                    this.element
                );
                return this;
            },

            val: function (val) {
                if (!arguments.length) {
                    return this.component.state.items;
                }else{
                    this.settings.value = val;
                    this.init();
                }
            }
        });

        $.fn[pluginName] = function (options) {
            return this.map(function () {
                if (!$.data(this, 'plugin_'+pluginName)) {
                    $.data(this, 'plugin_'+pluginName, new Plugin(this, options));
                }
                return $.data(this, 'plugin_'+pluginName);
            });
        };
    })(jQuery);
}

module.exports = RenderUploadBox;
window.RenderUploadBox = RenderUploadBox;
