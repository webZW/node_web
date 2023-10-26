(function(){
	
	var wfsUtil = window.wfsUtil = function(){
		return new wfsUtil.fn.init();
	};
	
	wfsUtil.fn = wfsUtil.prototype = {
		
		geometryName: 'GEOMETRY',
		wfsVersion: "1.0.0",
		wfsQueryObj: null,  //wfs服务查询操作对象
		
		init: function(){
			return this;
		},
		
		getLayer : function(serviceUrl, callback){
 			var that=this;
 			var url = UrlUtil.getUrl(serviceUrl, {
				service: 'wfs',
				request: 'GetCapabilities',
				version: '1.1.0'
			});
	        GeoGlobe.Request.GET({
	            url: url,
	            async:true,
	            success: function(request){
	            	if(!request.responseText || request.responseText.indexOf("Exception") != -1 ){
	            		that.failFn();
	            		return;
	            	}
	                var doc = request.responseText;
	                var jsonOnj = new GeoGlobe.Format.WFSCapabilities.v1().read(doc);
	                try {
	                    var array = jsonOnj.featureTypeList.featureTypes;
	                    callback && callback(serviceUrl, array);
	                } 
	                catch (e) {
	                	that.failFn();
	                }
	            },
	            failure: this.failFn
	        });
		},
		
		failFn:function(){
			TDT.alert("获取服务信息失败!");
			return ;
		},
		
		initwfsQueryObj:function(wfsUrl,featureType, resultType){
			var that = this;
			var requestUrl = UrlUtil.getUrl(wfsUrl);
			var queryOption = {
	        	geometryName: that.geometryName,  //几何字段名称
				version: that.wfsVersion, //要素服务版本
				maxFeatures: 99999 //返回要素数据最大个数
			}
			if(resultType === 'GEOJSON'){
				queryOption['format'] = new GeoGlobe.Format.GeoJSON();
			}

	    	var queryObj = new GeoGlobe.Query.WFSQuery(requestUrl, featureType, queryOption);
			return queryObj;
		},

		queryWFS: function (queryObj, callback) {

			//范围查询示例
			// var queryBBOX = new GeoGlobe.LngLatBounds([112.75526445988339, 22.278476570313103], [114.30433672550924, 24.003330085938245]);
			// debugger
			// queryObj.bboxQuery(queryBBOX, function (result) {
			// 	callback && callback(result);
			// }, function () {
			// 	console.log("查询失败");
			// });

			//属性查询示例，property的值可根据DescribeFeatureType操作获取当前查询要素服务的字段名称，调用方式可查看《粤政图外部接入指引手册》中的“第三章 地图产品服务接口说明”的“3.3 要素服务接口”的“3.3.3 DescribeFeatureType操作”一节
			// var property = 'ZLDWDM';
			// var value = '440981124*';
			// queryObj.attributeQuery(GeoGlobe.Filter.Comparison.LIKE, property, value, {
			// 	matchCase: true
			// }, function (result) {
			// 	callback && callback(result);
			// }, function (e) {
			// 	console.log("查询失败");
			// });

			//查询获取全部数据，数据返回最大个数由initwfsQueryObj方法中的queryOption的maxFeatures定义
			queryObj.query(null, function (result) {
				callback && callback(result);
			}, function () {
				console.log("查询失败");
			});
		},
		
		draWfsFeature:function(map,geojson) {
			if(!geojson.features.length){
				return;
			}

			var dataSource = {
	            'type': 'geojson',
	            'data': geojson
			};
			var layerId = "layerId_wfs_" + TDT.random(4);

			var geoType = geojson.features[0].geometry.type.toLowerCase();
			var layer = {
				"id": layerId,
				"source": dataSource
			};
			if(geoType.indexOf('point') >= 0){
				layer["type"] = "circle";
				layer["paint"] = {
					"circle-radius": 5,
					"circle-color": "red",
					"circle-opacity": 0.8
				};
			}else if(geoType.indexOf('linestring') >= 0){
				layer["type"] = "line";
				layer["layout"] = {
					"line-join": "round",
					"line-cap": "round",
					"visibility": "visible"
				};
				layer["paint"] = {
					"line-color": "#3988fb",
					"line-width": 2
				};
			}else if(geoType.indexOf('polygon') >= 0){
				layer["type"] = "fill";
				layer["layout"] = { "visibility": "visible"};
				layer["paint"] = {
					"fill-color": "#bedbf9",
					"fill-opacity": 0.5,
					"fill-outline-color":"#000"
				};
			}

	        map.addLayer(layer);
			return layerId;
		},

		addMarkField: function(wfsConfigs, map, result){
			var markList = [];
			for(var i=0; i<result.geojson.features.length; i++){
				var data = result.geojson.features[i];
				var markfield;
				for(var j=0; j<wfsConfigs.length; j++){
					if(data.properties[wfsConfigs[j].markField]){
						markfield = wfsConfigs[j].markField;
						break;
					}
				}
				var centerPoint;
				if(result.geojson.features[0].geometry.type == "Point"){
					centerPoint = [data.geometry.coordinates[0], data.geometry.coordinates[1]];
				}else{
					var point = result.features[i].geometry.getBounds().getCenter();
					centerPoint = [point.lng, point.lat];
				}
				var dom = document.createElement('div');
				dom.className = result.geojson.features[0].geometry.type + 'marker';
				var textnode = document.createTextNode(data.properties[markfield]);
				dom.appendChild(textnode);
				var marker= new GeoGlobe.Marker(dom, {
					draggable: false
				}).setLngLat(centerPoint).addTo(map);
				markList.push(marker); 
			}
			return markList;
		},

		addSymbolField: function(wfsConfigs, map, result){
			var symbolLayerId = [];
			var textColor = '';
			if(result.geojson.features[0].geometry.type == "Point"){
				textColor= '#181818';
			}else if(result.geojson.features[0].geometry.type == "Polygon"){
				textColor= '#0000FF';
			}else{
				textColor= '#00FF00';
			}
			for(var i=0; i<result.geojson.features.length; i++){
				var data = result.geojson.features[i];
				var markfield;
				for(var j=0; j<wfsConfigs.length; j++){
					if(data.properties[wfsConfigs[j].markField]){
						markfield = wfsConfigs[j].markField;
						break;
					}
				}
				var geojson = {
					type: 'geojson',
					data: data.geometry
				};
				var symbol = new GeoGlobe.Layer.SymbolLayer({
					id: 'font' + this.getGuid(),
					type: 'symbol',
					source: geojson,
					paint: {
						'text-color': textColor,
					},
					layout: {
						'text-font': [
							'Open Sans Regular',
							'Arial Unicode MS Regular'
						],
						'text-size': 14,
						'text-field': data.properties[markfield]
					}
				});
				map.addLayer(symbol);
				symbolLayerId.push(symbol.id); 
			}
			return symbolLayerId;
		},

		getGuid: function(){
			function S4() {
				return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
			}
			return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
		}
	};
	
	wfsUtil.fn.init.prototype = wfsUtil.fn;
})();