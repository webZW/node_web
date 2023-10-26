var mapView = Window.mapView = {

	map: null,

	modeServiceUrls: {
		gateway: {
			wmts: [{
				url: 'https://dc-gateway.gdgov.cn/ebus/zwdsj-dlk/geostar/GD_2018DLG/wmts', //广东2018年7_17级矢量图
			}, {
				url: 'https://dc-gateway.gdgov.cn/ebus/zwdsj-dlk/geostar/GD_2018DLGZJ/wmts' //广东2018年7_17级矢量注记
			}], //示例使用，可替换为需要查看的地图服务地址，或者在页面上进行添加与删除
			vts: [{
				url: 'https://dc-gateway.gdgov.cn/ebus/zwdsj-dlk/geostar/GDS_SWZSL/wmts' //广东7_17级小山塘面分布
			}],
			wfs: [{
				url: 'https://dc-gateway.gdgov.cn/ebus/zwdsj-dlk/geostar/WHHLYT_LYJQ/wfs', //广东A级旅游景区，点
				resultType: 'XML',
				markField: '示范区名称'
			},
			{
				url: 'https://dc-gateway.gdgov.cn/ebus/zwdsj-dlk/geostar/JTYST_GD2019/wfs', //广东2019年末全省普通国道分布，线
				resultType: 'GEOJSON',
				markField: 'ROADNAME'
			},
			{
				url: 'https://dc-gateway.gdgov.cn/ebus/zwdsj-dlk/geostar/GZSXJXZQHM_wfs/wfs', //广州市县级工作底图界线，面
				resultType: 'XML',
				markField: 'XZQMC'
			}
			], //示例使用，可替换为需要查看的要素服务地址，或者在页面上进行添加与删除
			geocoding: {
				addrToLoc: 'https://dc-gateway.gdgov.cn/ebus/zwdsj-dlk/geostar/GDS_DMDZ/geocoding', //广东地名地址查询服务，正向匹配使用
				locToaddr: 'https://dc-gateway.gdgov.cn/ebus/zwdsj-dlk/geostar/GDS_DMDZ_esindex/geocoding' //广东坐标匹配查询服务，反向匹配使用
			}
		},
		bus: {
			wmts: [{url: 'YZT1597746954560'},  //广东2018年7_17级矢量图
				{url: 'YZT1597746953278'} //广东2018年7_17级矢量注记
			], //示例使用，可替换为需要查看的地图服务地址，或者在页面上进行添加与删除
			vts: [{url: 'YZT1597746954560'},  //广东7_17级小山塘面分布
			],
			wfs: [{
				url: 'YZT1597746956640', //广东A级旅游景区,点
				resultType: 'XML',
				markField: '示范区名称'
			},{
				url: 'YZT1597746959853', //广东2019年末全省普通国道分布，线
				resultType: 'GEOJSON',
				markField: 'ROADNAME'
			},{
				url: 'YZT1597746923010', //广州市县级工作底图界线，面
				resultType: 'XML'
			}], //示例使用，可替换为需要查看的要素服务地址，或者在页面上进行添加与删除
			geocoding: {
				addrToLoc: 'YZT1597746931737',
				locToaddr: 'YZT1597746927061'
			}
		}
	},

	serviceUrls: {},

	mapLayerIds: [],

	markList: [],

	symbolLayerId: [],

	wmtsUtil: wmtsUtil(),
	wfsUtil: wfsUtil(),
	vtsUtil: vtsUtil(),
	geocodingUtil: null,


	init: function () {
		this.initMap();   //初始化地图

		//初始化地名地址查询
		this.geocodingUtil = geocodingUtil(this.map);
		this.initGeoCoding();
		this.createWmtsLayerGroups();
		this.createVtsLayerGroups();
	},

	initMap: function () {
		var that = this
		that.createMap('gmap');
	},

	loadLayers: function () {
		this.clearLayers();
		this.addWmtsLayers();
		this.addVtsLayers();
		this.addWfsLayers();
	},

	clearLayers: function () {
		for (var i = 0; i < this.mapLayerIds.length; i++) {
			var layer = this.map.getLayer(this.mapLayerIds[i]);
			if (layer) {
				this.map.removeLayer(layer.id);
				if (this.map.getSource(layer.source)) {
					this.map.removeSource(layer.source);
				}
			}
		}
		if(this.vtsLayerId.length){
			for (var j = 0; j < this.vtsLayerId.length; j++) {
				var layer = this.map.getLayer(this.vtsLayerId[j]);
				if (layer) {
					this.map.removeLayer(layer.id);
					this.map.removeImage(layer.id);
					if (this.map.getSource(layer.id)) {
						this.map.removeSource(layer.id);
					}
				}
			}
		}
		this.removeMarks();
		this.removeSymbolLayers();
	},

	removeMarks: function(){
		if(this.markList.length){
			for(var i=0; i<this.markList.length; i++){
				if(this.markList[i].length){
					for(var j=0; j<this.markList[i].length; j++){
						this.markList[i][j].remove();
					}
				}
			}
			this.markList = [];
		}
	},

	removeSymbolLayers: function(){
		if(this.symbolLayerId.length){
			for(var i=0; i<this.symbolLayerId.length; i++){
				if(this.symbolLayerId[i].length){
					for(var j=0; j<this.symbolLayerId[i].length; j++){
						var layer = this.map.getLayer(this.symbolLayerId[i][j]);
						if(layer){
							this.map.removeLayer(layer.id);
						}
					}
				}
			}
			this.markList = [];
		}
	},
	
	//初始化矢量切片图层组
	vtslayergroup: null,
	vtsgroupid: 'vtsgroup',
	base_vts_source: {type: "geojson",data: {"type": "FeatureCollection","features": []}},
	createVtsLayerGroups: function(){
		var that = this;
		var layer=[{
			"id": "vtslayer","type": "circle","source": that.base_vts_source
		}];
		if (!that.vtslayergroup) {
			that.map.on("style.load",function(){
				// 新建图层组
				that.vtslayergroup = new GeoGlobe.LayerGroup(that.map);
				// 添加指定图层到图层组中
				that.vtslayergroup.addGroup(that.map, that.vtsgroupid, layer);
			})
			
		} else {
			TDT.alert('已经存在图层组!');
		}
	},

	//初始化地图服务图层组
	wmtslayergroup: null,
	wmtsgroupid: 'wmtsgroup',
	base_wmts_source: {type: "geojson",data: {"type": "FeatureCollection","features": []}},
	createWmtsLayerGroups: function(){
		var that = this;
		var layer=[{
			"id": "wmtslayer","type": "circle","source": that.base_wmts_source
		}];
		if (!that.vtslayergroup) {
			that.map.on("style.load",function(){
				// 新建图层组
				that.wmtslayergroup = new GeoGlobe.LayerGroup(that.map);
				// 添加指定图层到图层组中
				that.wmtslayergroup.addGroup(that.map, that.wmtsgroupid, layer);
			})
			
		} else {
			TDT.alert('已经存在图层组!');
		}
	},

	createMap: function (div) {
		var that = this;
		var simple = {
			"version": 8,
			"sources": {},
			"layers": []
		};
		var wgs84_wgs84_mapcrs = {
			topTileExtent: [-180, -270, 180, 90],
			coordtransform: "none",
			tileSize: 256
		};
		var map = new GeoGlobe.Map({
			mapCRS: wgs84_wgs84_mapcrs,
			style: simple,
			container: div,
			zoom: 4,
			center: [112.939, 31.377],
			isIntScrollZoom: true, //缩放级别是否为整数处理模式
			renderWorldCopies: false,
			isAttributionControl: false,
			is3Dpitching: false, //是否到指定层级自动倾斜
			pitch3Dzoom: 16 //自动倾斜的层级，默认16
		});
		this.map = map;
		map.on("style.load", function () {
			that.initControls(map);//初始化控件
			map.setZoom(7);
			map.setCenter([113.272753, 23.139257]);
		});

		map.on("zoomend", function(){
			$('#zoom').html(that.map.getZoom());
		});
	},

	initControls: function (map) {
		//比例尺控件
		var Sca_control = new GeoGlobe.Control.Scale({
			position: 'bottom-right',
			maxWidth: 80,
			unit: 'm'
		});
		map.addControl(Sca_control, Sca_control.options.position);
		//导航控件
		var Na_control = new GeoGlobe.Control.Navigation();
		map.addControl(Na_control, "bottom-right");
	},

	//初始化图层组
	addWmtsLayers: function () {
		var that = this;
		var wmtsConfigs = that.serviceUrls['wmts'];
		for (var i = 0; i < wmtsConfigs.length; i++) {
			var wmtsConfig = wmtsConfigs[i];
			var layerOptions = that.wmtsUtil.getMatchServiceOption(wmtsConfig.url);
			var layerInf = that.wmtsUtil.createLayer(wmtsConfig.url, layerOptions[0]);
			that.map.addSource(layerInf.source.id, layerInf.source);
			that.wmtslayergroup.addLayerToGroup(that.map, that.wmtsgroupid, layerInf.layer, 'wmtslayer')
			//that.map.addLayer(layerInf.layer);
			that.mapLayerIds.push(layerInf.layer.id);
		}
	},

	//初始化地名地址查询
	initGeoCoding: function () {
		var that = this;
		$('#geoCodingType').change(function () {
			var value = $(this).find('option:selected').val();
			$('.geocodingDiv').hide();
			$('#geoCodingUrl').val(that.serviceUrls.geocoding[value]);
			$('#' + value + 'Div').show();
		});

		$('#locToAddr').click(function () {
			var url = $('#geoCodingUrl').val();
			that.serviceUrls.geocoding.locToaddr = url;
			that.geocodingUtil.locationToAddressesQuery(url, 1);
		});

		$('#addrToLoc').click(function () {
			var url = $('#geoCodingUrl').val();
			that.serviceUrls.geocoding.addrToLoc = url;
			that.geocodingUtil.addressesToLocationsQuery(url, 1);
		});
	},

	//叠加wfs图层
	addWfsLayers: function () {
		var that = this;
		var wfsConfigs = that.serviceUrls['wfs'];
		var loadWay = $('input:radio[name="loadType"]:checked').val();
		for (var i = 0; i < wfsConfigs.length; i++) {
			var wfsConfig = wfsConfigs[i];
			that.wfsUtil.getLayer(wfsConfig.url, function (url, layerWfsOpt) {
				var featureType = layerWfsOpt[0].realName ? layerWfsOpt[0].realName : layerWfsOpt[0].name;
				var queryObj = that.wfsUtil.initwfsQueryObj(url, featureType, wfsConfig.resultType);
				that.wfsUtil.queryWFS(queryObj, function (result) {
					var layerId = that.wfsUtil.draWfsFeature(that.map, result.geojson);
					if(loadWay == "Marker"){
						var markList = that.wfsUtil.addMarkField(wfsConfigs, that.map, result);
						that.markList.push(markList);
					}else{
						var symbolLayerId = that.wfsUtil.addSymbolField(wfsConfigs, that.map, result);
						that.symbolLayerId.push(symbolLayerId);
					}
					that.mapLayerIds.push(layerId);
				});
			});
		}
	},


	vtsLayerId:[],
	//叠加VTS图层
	addVtsLayers: function(){
		var that = this;
		var wfsConfigs = that.serviceUrls['vts'];
		for (var i = 0; i < wfsConfigs.length; i++) {
			var vtsLayers = that.vtsUtil.getMatchServiceOption(wfsConfigs[i].url);
			var layerInf = that.vtsUtil.createLayer(wfsConfigs[i].url, vtsLayers[0].options);
			var layer = layerInf.layer;
			var source = layerInf.source;
			that.map.style.glyphManager.setURL(layer.glyphs);
			if(typeof(layer.source) == "string"){
				if(!that.map.getSource(layer.source)){
					that.map.addSource(layer.source, source);
				}
			}
			if(layer.sprites != null && layer.sprites != ''){
				var sprites = window.location.origin + layer.sprites;
                that.map.loadSprite(sprites);
			}
            for(var key in layer.layerData){
				that.vtsLayerId.push(layer.layerData[key].id);
				that.vtslayergroup.addLayerToGroup(that.map, that.vtsgroupid, layer.layerData[key], 'vtslayer');
			}
			that.mapLayerIds.push(layerInf.layer.id);
		}    
	}

};
mapView.init();


