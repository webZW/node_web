(function(){
	
	var vtsUtil = window.vtsUtil = function(){
		return new vtsUtil.fn.init();
	};
	
	vtsUtil.fn = vtsUtil.prototype = {
		
		init: function(){
			return this;
		},
        
        getMatchServiceOption: function(serviceUrl){
			var that = this;
			var layerArry;
			var url;
			url = UrlUtil.getUrl(serviceUrl, {service: 'wmts', REQUEST: 'GetCapabilities'});
			var format = new GeoGlobe.Format.WMTSCapabilities();
		  	GeoGlobe.Request.GET({ 
	            url: url,
	            async:false,
	            success: function(request){
            		var json = format.read(request.responseText);  
					layerArry = that.VTSAnalyzer(serviceUrl,json);
	            }
	        });
		  	return layerArry;
		},
		//VTS类型的服务数据 解析.
		VTSAnalyzer : function(url,json){
			// 临时图层数组
			url = UrlUtil.getUrl(url, {})+"1=1";
		    var _templayerList = [];
			var layers = json.contents.layers;
		    for(var i = 0;i<layers.length;i++){
		    	var layerObj = {};
		    	layerObj["id"]=TDT.guid();
				layerObj["name"] = layers[i].identifier;
				layerObj["layername"]= layers[i].identifier;
				layerObj["url"]=url;
				layerObj["type"]="VTS";
				layerObj["options"]={};
				layerObj["removeBackBufferDelay"]=500;
				layerObj["zoomOffset"]="0";
		      
		        var _tileMatrixSetLinks = layers[i].tileMatrixSetLinks[0].tileMatrixSet;
		        var _tileMatrixSet = json.contents.tileMatrixSets[_tileMatrixSetLinks];
		        layerObj.options.matrixSet = _tileMatrixSet.identifier;
		        layerObj.options.matrixIds = [];
		       for(var j=0;j<_tileMatrixSet.matrixIds.length;j++){
		          var matrixid = {};
		          matrixid.identifier =_tileMatrixSet.matrixIds[j].identifier;
		          matrixid.scaleDenominator =_tileMatrixSet.matrixIds[j].scaleDenominator;
		          matrixid.tileHeight =_tileMatrixSet.matrixIds[j].tileHeight;
		          matrixid.tileWidth =_tileMatrixSet.matrixIds[j].tileWidth;
		          layerObj.options.matrixIds.push(matrixid);
		       }
		       
		       	if($.inArray("protobuf", layers[i].formats) > -1){
		       		layerObj.options.format = "protobuf";
		       	}else{
		       		layerObj.options.format = layers[i].formats[0];
		       	}
		       	layerObj.options.name = layerObj.name;
		       	layerObj.options.opacity = 1;
		       	layerObj.options.url = url;
		       	layerObj.options.formats = layers[i].formats;
		        if(layers[i].BoundingBox != null){
		        	layerObj.options.tileFullExtent = layers[i].BoundingBox[0].bounds; 
		        	layerObj.options.maxExtent = layers[i].BoundingBox[0].bounds;
		        }else{
		        	layerObj.options.tileFullExtent = ''; 
		        	layerObj.options.maxExtent = '';
		        }
		        layerObj.options.mapstyleArr = json.mapstyleArr;
		        if(json.mapstyleArr){
			        layerObj.options.mapstyle = json.mapstyleArr[0];
		        }
		        if(layers[i].styles[0].identifier){
		        	layerObj.options.mapstyle = layers[i].styles[0].identifier;
		        }
		        _templayerList.push(layerObj);
		    }
		    return _templayerList;
	    },


		//创建VTS图层
		createLayer: function(url,options){
			var layerInf = {};
			url = UrlUtil.getUrl(url, {})+"1=1";
			var random = TDT.random(4);
			var styleName = options.mapstyle;
			var serviceVTS = new GeoGlobe.Service.VTS("VTS服务", url, {async:false});
			serviceVTS.GetStyle(styleName,function(result){
				//判断获取的style中是否有标注属性
				var sprites,glyphs;
				if(result.sprite){
					//处理样式地址	            
					//sprites = result.sprite;
					sprites = url.substring(0,url.indexOf('/wmts'))+result.sprite.substring(result.sprite.indexOf('/wmts'));
				}else{
					sprites = "";
				}
				if(result.glyphs){
					glyphs = "../../font/pdf/{fontsatck}/{range}.pbf";//运用本地的字体库
				}else{
					glyphs = ""
				}
				var option_param = {
					layer: options.name,
					TILEMATRIX: '{z}',
					TILEROW: '{y}',
					TILECOL: '{x}',
					tileMatrixSet: options.matrixSet,
					width: 256,
					height: 256,
					format: options.format
				};
				var minZoom = options.matrixIds[0].identifier;
				var maxZoom = options.matrixIds[options.matrixIds.length-1].identifier;
				//组成请求串
				var url_vts = serviceVTS.GetTile(option_param);
				url_vts = window.location.origin + url_vts;
				var sourceId = "sourceId_"+options.name+"_"+random;
				var vecSource = {
					"id":sourceId,
					"type": "vector",
					"minzoom": parseInt(minZoom),
					"maxzoom": parseInt(maxZoom)+1,
					"tiles": [url_vts],
					"options": {
						'layerName': options.name,
						'matrix': options.matrixSet,
						'url': url
					}
				}
				
				var Layer_data = [];
				for(var i=0;i<result.layers.length;i++){
					result.layers[i].source = sourceId;
					result.layers[i].name = result.layers[i]["source-layer"];
					result.layers[i].minzoom = parseInt(minZoom);
					result.layers[i].maxzoom = parseInt(maxZoom)+1;
					if(!result.layers[i].paint){
						result.layers[i].paint = {};
					}
					if(result.layers[i].metadata){
						//result.layers[i].metadata.type = "VTS";
						result.layers[i].metadata.tileFullExtent = options.tileFullExtent;
					}else{
						result.layers[i].metadata = {
							//'type': "VTS",
							'tileFullExtent': options.tileFullExtent 
						}
					}
					Layer_data[i] =  result.layers[i];
				}
				var vecLayer = {
					type: "VTS",
					name: options.name,
					layerData: Layer_data,
					sprites: sprites,
					glyphs: glyphs,
					metadata: options,
					source:vecSource.id
				}
				layerInf["layer"] = vecLayer;
				layerInf["source"] = vecSource;
			}, function(){
				TDT.alert("矢量切片服务失败！");
			});
			return layerInf;
		},
		
	};
	
	vtsUtil.fn.init.prototype = vtsUtil.fn;
})();
