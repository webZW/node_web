/**
 * 地址管理类
 */
(function(){
    var UrlUtil = window.UrlUtil = function(){
        new UrlUtil.fn.init();
    }

    UrlUtil.fn = UrlUtil.prototype = {
        init: function(){
            return this;
        },

        urlType: '', //gateway：智能网关，bus:数据中台
        busUrl: 'https://ztn-data.gdgov.cn:8581/GatewayMsg/http/api/proxy/invoke', //域名对应IP：19.15.75.180

        getUrl: function(serviceUrl, params){
            var paasId = $('#paasId').val();
            var paasToken = $('#paasToken').val();
            var paasParams = "";
            if (paasId && paasToken) {
                paasParams = "paasId=" + paasId + "&paasToken=" + paasToken;
            }

            if(this.urlType === 'gateway'){
                if(paasParams.length){
                    paasParams += '&';
                }
                //设置代理
                var url = TDT.getAppPath("")+ "proxyHandler?" + paasParams + "url=" + serviceUrl;
                if(params){
                    url += (serviceUrl.indexOf('?') > 0 ? '&' : '?') + this.getParamStr(params);
                }
                return url;
            }else{
                if(paasParams.length){
                    paasParams = paasParams + '&';
                }
                //设置代理
                this.busUrl = $('#busUrl').val();

                var url = TDT.getAppPath("")+ "proxyHandler?serviceCode=" + serviceUrl + "&" + paasParams + "url=" + this.busUrl;
                if(params){
                    url += (this.busUrl.indexOf('?') > 0 ? '&' : '?') + this.getParamStr(params);
                }
                return url;
            }
        },
        getParamStr: function(params){
            var paramStr = '';
            for(var key in params){
                paramStr += (paramStr.length > 0 ? '&' : '') + key + '=' + params[key];
            }
            return paramStr;
        }
    }

    UrlUtil.fn.init.prototype = UrlUtil.fn;

    window.UrlUtil = new UrlUtil();
})();