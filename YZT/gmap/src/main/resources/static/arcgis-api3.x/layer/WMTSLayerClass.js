define(["dojo/_base/declare", "esri/layers/TiledMapServiceLayer", "esri/geometry/Extent", "esri/SpatialReference", "esri/layers/TileInfo"],
    function (declare, TiledMapServiceLayer, Extent, SpatialReference, TileInfo) {
        return declare(TiledMapServiceLayer, {
            // 构造函数 
            constructor: function (serviceUrl) {
                // 图层提供的起始显示范围和整个图层的地理范围
                this.spatialReference = new SpatialReference({ wkid: 4490 });
                this.initialExtent = (this.fullExtent = new Extent(-180.0, -90.0, 180.0, 90.0, this.spatialReference));
                var xml = this.getCapabilities(serviceUrl);
                var json = $.xml2json(xml);
                var data = json.Contents.Layer;
                this.layerParam = {
                    layerName: data.Abstract,
                    styleName: data.Style.Identifier,
                    tilematrixset: Array.isArray(data.TileMatrixSetLink) ? data.TileMatrixSetLink[0].TileMatrixSet : data.TileMatrixSetLink.TileMatrixSet
                };
                this.initMapParams = {
                    origin: {
                        "x": -180,
                        "y": 90
                    },
                    spatialReference: {
                        wkid: 4490
                    },
                    lods: [
                        { "level": 0, "resolution": 1.40625, "scale": 591658710.909131 },
                        { "level": 1, "resolution": 0.703125, "scale": 295829355.454566 },
                        { "level": 2, "resolution": 0.3515625, "scale": 147914677.727283 },
                        { "level": 3, "resolution": 0.17578125, "scale": 73957338.8636414 },
                        { "level": 4, "resolution": 0.087890625, "scale": 36978669.4318207 },
                        { "level": 5, "resolution": 0.0439453125, "scale": 18489334.7159103 },
                        { "level": 6, "resolution": 0.02197265625, "scale": 9244667.35795517 },
                        { "level": 7, "resolution": 0.010986328125, "scale": 4622333.67897759 },
                        { "level": 8, "resolution": 0.0054931640625, "scale": 2311166.83948879 },
                        { "level": 9, "resolution": 0.00274658203125, "scale": 1155583.4197444 },
                        { "level": 10, "resolution": 0.001373291015625, "scale": 577791.709872198 },
                        { "level": 11, "resolution": 0.0006866455078125, "scale": 288895.854936099 },
                        { "level": 12, "resolution": 0.00034332275390625, "scale": 144447.92746805 },
                        { "level": 13, "resolution": 0.000171661376953125, "scale": 72223.9637340248 },
                        { "level": 14, "resolution": 8.58306884765625E-05, "scale": 36111.9818670124 },
                        { "level": 15, "resolution": 4.29153442382813E-05, "scale": 18055.9909335062 },
                        { "level": 16, "resolution": 2.14576721191406E-05, "scale": 9027.9954667531 },
                        { "level": 17, "resolution": 1.07288360595703E-05, "scale": 4513.99773337655 },
                        { "level": 18, "resolution": 5.36441802978515E-06, "scale": 2256.9988666882755 },
                        { "level": 19, "resolution": 2.68220901489257E-06, "scale": 1128.4994333441377 },
                        { "level": 20, "resolution": 1.34110450744629E-06, "scale": 564.2497166720689 }
                    ]
                };
                
                // 图层切片信息
                this.tileInfo = new TileInfo({
                    "rows": 256,
                    "cols": 256,
                    "compressionQuality": 0,
                    "origin": this.initMapParams.origin,
                    "spatialReference": this.initMapParams.spatialReference,
                    "lods": this.initMapParams.lods
                });
                // 设置图层的loaded属性，并触发onLoad事件 
                this.loaded = true;
                this.onLoad(this);
            },
            getCapabilities: function(serviceUrl){
                var xml;
                $.ajax({
                    type: "get",
                    url: serviceUrl + "?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetCapabilities",
                    async: false,
                    success: function(result){
                        xml = result;
                    }
                });
                return xml;
            },

            getTileUrl: function (level, row, col) {
                return this.url + "?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER="+ this.layerParam.layerName +"&STYLE="+ this.layerParam.styleName +"&TILEMATRIXSET="+ this.layerParam.tilematrixset +"&TILEMATRIX=" + level + "&TILEROW=" + row + "&TILECOL=" + col + "&FORMAT=image/tile";
            }
        });
    }); 