(function () {

    /**
     * @name kendo.dataviz.ui.RadialGauge.Description
     *
     * @section
     * <p>
     * The Radial Gauge widget is used to let users quickly understand where a value lies in a certain range.
     * All graphics are rendered on the client using SVG with a fallback to VML for legacy browsers.
     * </p>
     *
     * <h3>
     * Getting Started
     * </h3>
     * @exampleTitle
     * 1. Create a simple HTML div (optionally set a height and width with CSS)
     * @example
     * <div id="radial-gauge"></div>
     *
     * @exampleTitle
     * 2. Initialize the Kendo UI RadialGauge with default configuration
     * @example
     *    $(document).ready(function() {
     *        $("#radial-gauge").kendoRadialGauge();
     *    });
     * </p>
     *
     * @section
     * <h3>Creating half- and quarter-circle gauges</h3>
     *
     * <p>The <code>startAngle</code> and <code>endAngle</code> configuration options enable you to create
     * gauges that align with your design goals.</p>
     *
     * @exampleTitle
     * Create a quarter-gauge, oriented to the top-right
     * @example
     *     $("#radial-gauge").kendoRadialGauge({
     *         startAngle: 90,
     *         endAngle: 180
     *     });
     *
     * @section
     * <p>For a real-world example for this functionality, see the car dashboard demo.</p>
     */
     var RadialGaugeDocs = /** @lends kendo.dataviz.ui.RadialGauge.prototype */ {
        /**
         * @constructs
         * @extends kendo.ui.Widget
         * @param {DomElement} element DOM element
         * @param {Object} options Configuration options.
         * @option {Boolean} [transitions] <true>
         * A value indicating if transition animations should be played.
         * @option {Object} [scale] Configures the scale.
         * @option {Object} [scale.labels] Configures the scale labels.
         * @option {String} [scale.labels.color] The text color of the labels.
         * Any valid CSS color string will work here, including hex and rgb.
         * @option {String} [scale.labels.background] The background color of the labels.
         * Any valid CSS color string will work here, including hex and rgb
         * @option {String} [scale.labels.font] <"12px Arial,Helvetica,sans-serif">
         * The font style of the labels.
         * @option {Boolean} [scale.labels.visible] <true> The visibility of the labels.
         * @option {Number|Object} [scale.labels.margin] <0> The margin of the labels.
         * @option {Number | Object} [scale.labels.padding] <0> The padding of the labels.
         * @option {Object} [scale.labels.border] The border of the labels.
         * @option {Number} [scale.labels.border.width] <0> The width of the border.
         * @option {String} [scale.labels.border.color] <"black">
         * The color of the border. Any valid CSS color string will work here, including hex and rgb.
         * @option {String} [scale.labels.border.dashType] <"solid">
         * The dash type of the border.
         * <div class="details-list">
         *     <dl>
         *         <dt>
         *              <code>"solid"</code>
         *         </dt>
         *         <dd>
         *              Specifies a solid line.
         *         </dd>
         *         <dt>
         *              <code>"dot"</code>
         *         </dt>
         *         <dd>
         *              Specifies a line consisting of dots.
         *         </dd>
         *         <dt>
         *              <code>"dash"</code>
         *         </dt>
         *         <dd>
         *              Specifies a line consisting of dashes.
         *         </dd>
         *         <dt>
         *              <code>"longDash"</code>
         *         </dt>
         *         <dd>
         *              Specifies a line consisting of a repeating pattern of long-dash.
         *         </dd>
         *         <dt>
         *              <code>"dashDot"</code>
         *         </dt>
         *         <dd>
         *              Specifies a line consisting of a repeating pattern of dash-dot.
         *         </dd>
         *         <dt>
         *              <code>"longDashDot"</code>
         *         </dt>
         *         <dd>
         *              Specifies a line consisting of a repeating pattern of long-dash-dot.
         *         </dd>
         *         <dt>
         *              <code>"longDashDotDot"</code>
         *         </dt>
         *         <dd>
         *              Specifies a line consisting of a repeating pattern of long-dash-dot-dot.
         *         </dd>
         *    </dl>
         * </div>
         * @option {String/Function} [scale.labels.template] The label template.
         * Template variables:
         * <ul>
         *     <li><strong>value</strong> - the value</li>
         * </ul>
         * _example
         * // chart intialization
         * $("#radial-gauge").kendoRadialGauge({
         *      scale: {
         *          labels: {
         *              // labels template
         *              template: "#= value #%"
         *          }
         *      }
         * });
         * @option {String} [scale.labels.format] The format of the labels.
         * _example
         * $("#radial-gauge").kendoRadialGauge({
         *     scale: {
         *        labels: {
         *            // set the format to currency
         *            format: "{0:C}"
         *        }
         *     }
         * });
         * @option {Object} [scale.majorTicks] Configures the scale major ticks.
         * @option {Number} [scale.majorTicks.size] The major tick size.
         * This is the length of the line in pixels that is drawn to indicate the tick on the scale.
         * @option {Number} [scale.majorTicks.width] <0.5> The width of the major ticks.
         * @option {String} [scale.majorTicks.color] The color of the major ticks.
         * Any valid CSS color string will work here, including hex and rgb.
         * @option {Object} [scale.minorTicks] Configures the scale minor ticks.
         * @option {Number} [scale.minorTicks.size] The minor tick size.
         * This is the length of the line in pixels that is drawn to indicate the tick on the scale.
         * @option {Number} [scale.minorTicks.width] <0.5> The width of the minor ticks.
         * @option {String} [scale.minorTicks.color] The color of the minor ticks.
         * Any valid CSS color string will work here, including hex and rgb.
         * @option {Number} [scale.majorUnit] The interval between major divisions.
         * @option {Number} [scale.minorUnit] The interval between minor divisions.
         * @option {number} [scale.startAngle] <-30> The start angle of the gauge.
         * @option {number} [scale.endAngle] <210> The end angle of the gauge.
         * @option {Number} [scale.min] <0> The minimum value of the axis.
         * @option {Number} [scale.max] <100> The maximum value of the axis.
         * @option {Object} [gaugeArea] The gauge area configuration options.
         * This is the entire visible area of the gauge.
         * @option {Object} [gaugeArea.border] The border of the gauge area.
         * @option {Number} [gaugeArea.border.width] <0> The width of the border.
         * @option {String} [gaugeArea.border.color] <"black">
         * @option {Object} [pointer] The pointer configuration options.
         * @option {String} [pointer.color] The color of the pointer.
         * Any valid CSS color string will work here, including hex and rgb.
         * @option {String} [pointer.shape] The shape of the pointer.
         * @option {String} [pointer.value] The value of the gauge.
         *
         */
        init: function() { },

        /**
         * Redraws the gauge.
         * @example
         * var gauge = $("#radial-gauge").data("kendoRadialGauge");
         * gauge.redraw();
         */
        redraw: function() { },

        /**
         * <p>Returns the SVG representation of the current gauge.
         * The returned string is a self-contained SVG document
         * that can be used as is or converted to other formats
         * using tools like <a href="http://inkscape.org/">Inkscape</a> and
         * <a href="http://www.imagemagick.org/">ImageMagick</a>.
         * Both programs provide command-line interface
         * suitable for backend processing.</p>
         * @example
         * var gauge = $("#radial-gauge").data("kendoRadialGauge");
         * var svgText = gauge.svg();
         */
        svg: function() { }
    };


    /**
     * @name kendo.dataviz.ui.LinearGauge.Description
     *
     * @section
     * <p>
     * The Radial Gauge widget is used to let users quickly understand where a value lies in a certain range.
     * All graphics are rendered on the client using SVG with a fallback to VML for legacy browsers.
     * </p>
     *
     * <h3>
     * Getting Started
     * </h3>
     * @exampleTitle
     * 1. Create a simple HTML div (optionally set a height and width with CSS)
     * @example
     * <div id="radial-gauge"></div>
     *
     * @exampleTitle
     * 2. Initialize the Kendo UI RadialGauge with default configuration
     * @example
     *    $(document).ready(function() {
     *        $("#radial-gauge").kendoRadialGauge();
     *    });
     * </p>
     *
     * @section
     * <h3>Creating half- and quarter-circle gauges</h3>
     *
     * <p>The <code>startAngle</code> and <code>endAngle</code> configuration options enable you to create
     * gauges that align with your design goals.</p>
     *
     * @exampleTitle
     * Create a quarter-gauge, oriented to the top-right
     * @example
     *     $("#radial-gauge").kendoRadialGauge({
     *         startAngle: 90,
     *         endAngle: 180
     *     });
     *
     * @section
     * <p>For a real-world example for this functionality, see the car dashboard demo.</p>
     */
     var RadialGaugeDocs = /** @lends kendo.dataviz.ui.LinearGauge.prototype */ {
        /**
         * @constructs
         * @extends kendo.ui.Widget
         * @param {DomElement} element DOM element
         * @param {Object} options Configuration options.
         * @option {Boolean} [transitions] <true>
         * A value indicating if transition animations should be played.
         * @option {Object} [scale] Configures the scale.
         * @option {Object} [scale.labels] Configures the scale labels.
         * @option {String} [scale.labels.color] The text color of the labels.
         * Any valid CSS color string will work here, including hex and rgb.
         * @option {String} [scale.labels.background] The background color of the labels.
         * Any valid CSS color string will work here, including hex and rgb
         * @option {String} [scale.labels.font] <"12px Arial,Helvetica,sans-serif">
         * The font style of the labels.
         * @option {Boolean} [scale.labels.visible] <true> The visibility of the labels.
         * @option {Number|Object} [scale.labels.margin] <0> The margin of the labels.
         * @option {Number | Object} [scale.labels.padding] <0> The padding of the labels.
         * @option {Object} [scale.labels.border] The border of the labels.
         * @option {Number} [scale.labels.border.width] <0> The width of the border.
         * @option {String} [scale.labels.border.color] <"black">
         * The color of the border. Any valid CSS color string will work here, including hex and rgb.
         * @option {String} [scale.labels.border.dashType] <"solid">
         * The dash type of the border.
         * <div class="details-list">
         *     <dl>
         *         <dt>
         *              <code>"solid"</code>
         *         </dt>
         *         <dd>
         *              Specifies a solid line.
         *         </dd>
         *         <dt>
         *              <code>"dot"</code>
         *         </dt>
         *         <dd>
         *              Specifies a line consisting of dots.
         *         </dd>
         *         <dt>
         *              <code>"dash"</code>
         *         </dt>
         *         <dd>
         *              Specifies a line consisting of dashes.
         *         </dd>
         *         <dt>
         *              <code>"longDash"</code>
         *         </dt>
         *         <dd>
         *              Specifies a line consisting of a repeating pattern of long-dash.
         *         </dd>
         *         <dt>
         *              <code>"dashDot"</code>
         *         </dt>
         *         <dd>
         *              Specifies a line consisting of a repeating pattern of dash-dot.
         *         </dd>
         *         <dt>
         *              <code>"longDashDot"</code>
         *         </dt>
         *         <dd>
         *              Specifies a line consisting of a repeating pattern of long-dash-dot.
         *         </dd>
         *         <dt>
         *              <code>"longDashDotDot"</code>
         *         </dt>
         *         <dd>
         *              Specifies a line consisting of a repeating pattern of long-dash-dot-dot.
         *         </dd>
         *    </dl>
         * </div>
         * @option {String/Function} [scale.labels.template] The label template.
         * Template variables:
         * <ul>
         *     <li><strong>value</strong> - the value</li>
         * </ul>
         * _example
         * // chart intialization
         * $("#radial-gauge").kendoLinearGauge({
         *      scale: {
         *          labels: {
         *              // labels template
         *              template: "#= value #%"
         *          }
         *      }
         * });
         * @option {String} [scale.labels.format] The format of the labels.
         * _example
         * $("#radial-gauge").kendoLinearGauge({
         *     scale: {
         *        labels: {
         *            // set the format to currency
         *            format: "{0:C}"
         *        }
         *     }
         * });
         * @option {Object} [scale.majorTicks] Configures the scale major ticks.
         * @option {Number} [scale.majorTicks.size] The major tick size.
         * This is the length of the line in pixels that is drawn to indicate the tick on the scale.
         * @option {Number} [scale.majorTicks.width] <0.5> The width of the major ticks.
         * @option {String} [scale.majorTicks.color] The color of the major ticks.
         * Any valid CSS color string will work here, including hex and rgb.
         * @option {Object} [scale.minorTicks] Configures the scale minor ticks.
         * @option {Number} [scale.minorTicks.size] The minor tick size.
         * This is the length of the line in pixels that is drawn to indicate the tick on the scale.
         * @option {Number} [scale.minorTicks.width] <0.5> The width of the minor ticks.
         * @option {String} [scale.minorTicks.color] The color of the minor ticks.
         * Any valid CSS color string will work here, including hex and rgb.
         * @option {Number} [scale.majorUnit] The interval between major divisions.
         * @option {Number} [scale.minorUnit] The interval between minor divisions.
         * @option {Number} [scale.min] <0> The minimum value of the axis.
         * @option {Number} [scale.max] <100> The maximum value of the axis.
         * @option {Object} [gaugeArea] The gauge area configuration options.
         * This is the entire visible area of the gauge.
         * @option {Number|Object} [gaugeArea.margin] <5> The margin of the gauge area.
         * _example
         * // sets the top, right, bottom and left margin to 3px.
         * margin: 3
         *
         * // sets the top and left margin to 1px
         * // margin right and bottom are with 5px (by default)
         * margin: { top: 1, left: 1 }
         * @option {Object} [gaugeArea.background] The background of the gauge area.
         * @option {Number} [gaugeArea.width] <vertical gauge: 60; horizontal gauge: 200>
         * The width of the gauge area.
         * @option {Number} [gaugeArea.height] <vertical gauge: 200; horizontal gauge: 60>
         * The height of the gauge area.
         * @option {Object} [gaugeArea.border] The border of the gauge area.
         * @option {Number} [gaugeArea.border.width] <0> The width of the border.
         * @option {String} [gaugeArea.border.color] <"black">
         * @option {String} [gaugeArea.border.dashType] <"solid">
         * The dash type of the border.
         * <div class="details-list">
         *     <dl>
         *         <dt>
         *              <code>"solid"</code>
         *         </dt>
         *         <dd>
         *              Specifies a solid line.
         *         </dd>
         *         <dt>
         *              <code>"dot"</code>
         *         </dt>
         *         <dd>
         *              Specifies a line consisting of dots.
         *         </dd>
         *         <dt>
         *              <code>"dash"</code>
         *         </dt>
         *         <dd>
         *              Specifies a line consisting of dashes.
         *         </dd>
         *         <dt>
         *              <code>"longDash"</code>
         *         </dt>
         *         <dd>
         *              Specifies a line consisting of a repeating pattern of long-dash.
         *         </dd>
         *         <dt>
         *              <code>"dashDot"</code>
         *         </dt>
         *         <dd>
         *              Specifies a line consisting of a repeating pattern of dash-dot.
         *         </dd>
         *         <dt>
         *              <code>"longDashDot"</code>
         *         </dt>
         *         <dd>
         *              Specifies a line consisting of a repeating pattern of long-dash-dot.
         *         </dd>
         *         <dt>
         *              <code>"longDashDotDot"</code>
         *         </dt>
         *         <dd>
         *              Specifies a line consisting of a repeating pattern of long-dash-dot-dot.
         *         </dd>
         *    </dl>
         * </div>
         * @option {Object} [plotArea] The plot area configuration options.
         * @option {Object} [plotArea.background] The background of the gauge area.
         * @option {Object} [plotArea.border] The border of the gauge area.
         * @option {Number} [plotArea.border.width] <0> The width of the border.
         * @option {String} [plotArea.border.color] <"black">
         * @option {String} [plotArea.border.dashType] <"solid">
         * The dash type of the border.
         * <div class="details-list">
         *     <dl>
         *         <dt>
         *              <code>"solid"</code>
         *         </dt>
         *         <dd>
         *              Specifies a solid line.
         *         </dd>
         *         <dt>
         *              <code>"dot"</code>
         *         </dt>
         *         <dd>
         *              Specifies a line consisting of dots.
         *         </dd>
         *         <dt>
         *              <code>"dash"</code>
         *         </dt>
         *         <dd>
         *              Specifies a line consisting of dashes.
         *         </dd>
         *         <dt>
         *              <code>"longDash"</code>
         *         </dt>
         *         <dd>
         *              Specifies a line consisting of a repeating pattern of long-dash.
         *         </dd>
         *         <dt>
         *              <code>"dashDot"</code>
         *         </dt>
         *         <dd>
         *              Specifies a line consisting of a repeating pattern of dash-dot.
         *         </dd>
         *         <dt>
         *              <code>"longDashDot"</code>
         *         </dt>
         *         <dd>
         *              Specifies a line consisting of a repeating pattern of long-dash-dot.
         *         </dd>
         *         <dt>
         *              <code>"longDashDotDot"</code>
         *         </dt>
         *         <dd>
         *              Specifies a line consisting of a repeating pattern of long-dash-dot-dot.
         *         </dd>
         *    </dl>
         * </div>
         * @option {Object} [pointer] The pointer configuration options.
         * @option {String} [pointer.color] The color of the pointer.
         * Any valid CSS color string will work here, including hex and rgb.
         * @option {String} [pointer.shape] The shape of the pointer.
         * @option {String} [pointer.value] The value of the gauge.
         *
         */
        init: function() { },

        /**
         * Redraws the gauge.
         * @example
         * var gauge = $("#radial-gauge").data("kendoRadialGauge");
         * gauge.redraw();
         */
        redraw: function() { },

        /**
         * <p>Returns the SVG representation of the current gauge.
         * The returned string is a self-contained SVG document
         * that can be used as is or converted to other formats
         * using tools like <a href="http://inkscape.org/">Inkscape</a> and
         * <a href="http://www.imagemagick.org/">ImageMagick</a>.
         * Both programs provide command-line interface
         * suitable for backend processing.</p>
         * @example
         * var gauge = $("#radial-gauge").data("kendoRadialGauge");
         * var svgText = gauge.svg();
         */
        svg: function() { }
    };

})(jQuery);
