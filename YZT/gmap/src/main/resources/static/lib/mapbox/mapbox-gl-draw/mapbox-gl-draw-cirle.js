var CircleMode = {};
var origon;
var snapAngle;
var angle;
var sides;
var destination;
var id;
// When the mode starts this function will be called.
// The `opts` argument comes from `draw.changeMode('lotsofpoints', {count:7})`.
// The value returned should be an object and will be passed to all other lifecycle functions
CircleMode.onSetup = function (opts) {
    var state = {};
    destination = {};
    origon = null;

    sides = opts.sides || 40;
    if (sides < 40) {
        sides = 40;
    }
    var polygon = this.newFeature({
        'type': 'Feature',
        'geometry': {
            'type': 'Polygon',
            'coordinates': [[]]
        },
        "properties": {
            //sides: state.sides
        }
    });
    //sides = state.sides?state.sides:40;
    this.addFeature(polygon);

    this.clearSelectedFeatures();
    //doubleClickZoom.disable(this);
    this.updateUIClasses({ mouse: 'add' });
    this.activateUIButton('polygon');
    this.setActionableState({
        trash: true
    });
    return {
        polygon: polygon,
        id: polygon,
        currentVertexPosition: 0
    };

};
CircleMode.onClick = function (state, e) {
    origon = { x: e.lngLat.lng, y: e.lngLat.lat };
    if (state.currentVertexPosition > 0 && destination && destination.x == origon.x && destination.y == origon.y) {
        this.map.fire("draw.create", {
            features: [state.polygon.toGeoJSON()]
        });
        return this.changeMode('simple_select', { featureIds: [state.polygon.id] });
    }
    var radius = 0.0439453125;
    angle = Math.PI * (1 / sides - 1 / 2);
    if (snapAngle) {
        angle += snapAngle * (Math.PI / 180)
    }

    var feature = getcircle(origon, radius, sides, snapAngle);

    this.updateUIClasses({ mouse: 'add' });
    this.deleteFeature([state.id], { silent: true });
    state.currentVertexPosition++;
    state.polygon.coordinates = [feature];
    this.addFeature(state.polygon);
};
CircleMode.onMouseMove = function (state, e) {
    if (origon) {
        destination = { x: e.lngLat.lng, y: e.lngLat.lat };
        calculateAngle(destination);
        var radius = distanceTo(destination);
        //                var value = getGreatCircleDistance(origon[1], origon[0], destination[1], destination[0]);
        //                map.setPaintProperty('measure-points', 'circle-radius', parseFloat(value));
        var feature = getcircle(origon, radius, sides, snapAngle);
        this.deleteFeature([id], { silent: true });
        state.polygon.coordinates = [feature];
        this.addFeature(state.polygon);
    }
};
// Whenever a user clicks on a key while focused on the map, it will be sent here
CircleMode.onKeyUp = function (state, e) {
    if (e.keyCode === 27) return this.changeMode('simple_select');
};

// This is the only required function for a mode.
// It decides which features currently in Draw's data store will be rendered on the map.
// All features passed to `display` will be rendered, so you can pass multiple display features per internal feature.
// See `styling-draw` in `API.md` for advice on making display features
CircleMode.toDisplayFeatures = function (state, geojson, display) {
    display(geojson);
};
CircleMode.onTrash = function (state) {
    this.deleteFeature([state.polygon.id], { silent: true });
    this.changeMode('simple_select');
};

function calculateAngle(point, evt) {
    var alpha = Math.atan2(point.y - origon.y, point.x - origon.x);
    if (snapAngle && this.snapToggle && !evt[this.snapToggle]) {
        var snapAngleRad = Math.PI / 180 * snapAngle;
        angle = Math.round(alpha / snapAngleRad) * snapAngleRad
    } else {
        angle = alpha
    }
}
function distanceTo(destination, options) {
    var edge = !(options && options.edge === false);
    var details = edge && options && options.details;
    var distance, x0, y0, x1, y1, result;
    x0 = origon.x;
    y0 = origon.y;
    x1 = destination.x;
    y1 = destination.y;
    distance = Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
    result = !details ? distance : { x0: x0, y0: y0, x1: x1, y1: y1, distance: distance }
    return result
}
function getcircle(origin, radius, sides, rotation) {
    var angle = Math.PI * (1 / sides - 1 / 2);
    if (rotation) {
        angle += rotation / 180 * Math.PI
    }
    var rotatedAngle, x, y;
    var points = [];
    for (var i = 0; i < sides; ++i) {
        rotatedAngle = angle + i * 2 * Math.PI / sides;
        x = origin.x + radius * Math.cos(rotatedAngle);
        y = origin.y + radius * Math.sin(rotatedAngle);
        points.push([x, y])
    }
    return points;
}