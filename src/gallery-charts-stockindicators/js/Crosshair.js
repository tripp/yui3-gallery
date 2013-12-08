/**
 * Allows for the creation of a visualization based on financial
 * indicators..
 *
 * @module charts-stockindicators
 */
Y.Crosshair = function() {
    this.initializer.apply(this, arguments);
};
Y.Crosshair.prototype = {
    /**
     * Builds the crosshair.
     *
     * @method initializer
     * @protected
     */
    initializer: function(cfg) {
        var graphic = new Y.Graphic({
                render: cfg.render,
                autoDraw: false,
                width: cfg.width,
                height: cfg.height,
                x: cfg.x,
                y: cfg.y
            }),
            width = cfg.width,
            height = cfg.height,
            series = cfg.series,
            graph,
            category = cfg.category,
            yline,
            i,
            len = series.length;
        yline = new Y.Path({
            x: cfg.x,
            y: cfg.y,
            graphic: cfg.render,
            shapeRendering: "crispEdges",
            type: "path",
            stroke: category.stroke
        }).moveTo(0, 0).lineTo(0, height).end();
        this._xcoords = category.coords;
        this._yline = yline;
        this.width = cfg.width;
        this.height = cfg.height;
        if(series) {
            for(i = 0; i < len; i = i + 1) {
                graph = series[i];
                if(graph.line) {
                    graph.xLine = new Y.Path({
                        x: cfg.x,
                        y: cfg.y,
                        graphic: cfg.render,
                        shapeRendering: "crispEdges",
                        type: "path",
                        stroke: graph.stroke,
                        fill: graph.fill
                    }).moveTo(0, 0).lineTo(width, 0).end();
                }
                if(graph.marker) {
                    graph.marker.y = cfg.y - graph.marker.height/2;
                    graph.marker.x = cfg.x - graph.marker.width/2;
                    graph.marker.type = graph.marker.type || graph.marker.shape;
                    graph.marker.graphic = cfg.render;
                    graph.marker.graphic.x = cfg.x - graph.marker.width/2,
                    graph.marker.graphic.y = cfg.y - graph.marker.height/2,
                    graph.marker = new Y.Circle(graph.marker);
                }
            }
            this._series = series;
        }
        this.graphic = graphic;
    },

    /**
     * Updates the position of the crosshair.
     *
     * @method setTarget
     * @param {Number} pageX The x-coordinate to map in which to map the crosshair.
     */
    setTarget: function(pageX) {
        var xy = this.graphic.getXY(),
            x = pageX - xy[0],
            y,
            series = this._series,
            graph,
            node,
            i,
            index = Math.floor((x / this.width) * this._xcoords.length),
            len = series.length;
        Y.DOM.setStyle(this._yline.get("graphic").get("node"), 'transform', 'translatex(' + x + 'px)');
        if(series) {
            for(i = 0; i < len; i = i + 1) {
                graph = series[i];
                y = graph.coords[index];
                if(graph.marker) {
                    node = graph.marker.get("graphic").get("node");
                    Y.DOM.setStyle(node, 'transform', 'translate(' + x + 'px, ' + y + 'px)');
                }
                if(graph.line) {
                    Y.DOM.setStyle(graph.line.get("graphic").get("node"), 'transform', 'translate(' + x + 'px, ' + y + 'px)');
                }
            }
        }
    },

    /**
     * Removes all elements of the crosshair.
     *
     * @method destroy
     */
    destroy: function() {
        var series = this._series,
            yline = this._yline,
            graph,
            i,
            len;
        if(series) {
            len = series.length;
            for(i = 0; i < len; i = i + 1) {
                graph = series[i];
                if(graph.marker) {
                    graph.marker.get("graphic").destroy();
                }
                if(graph.line) {
                    graph.line.get("graphic").destroy();
                }
                if(yline) {
                    yline.get("graphic").destroy();
                }
            }
        }
    }
};
