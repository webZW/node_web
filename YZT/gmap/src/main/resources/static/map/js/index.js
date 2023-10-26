$(function(){
    $('#modeType').change(function(){
        var selectType = $(this).find(':selected').val();
        UrlUtil.urlType = selectType;
        mapView.serviceUrls = mapView.modeServiceUrls[selectType];

        if(selectType === 'gateway'){
            $('.serverTipName').text('地图产品服务地址：');
            $('#busUrlPanel').hide();
        }else{
            $('.serverTipName').text('地图产品ServerCode：');
            $('#busUrl').val(UrlUtil.busUrl);
            $('#busUrlPanel').show();
        }

        $('#typeSelect').trigger('change');
    }).trigger('change');

    $('#typeSelect').change(function(){
        var selectType = $(this).find(':selected').val();
        var typeUrls = mapView.serviceUrls[selectType];

        if(selectType === 'geocoding'){
            $('.geocodingPanel').show();
            $('.serverOpPanel').hide();
            $('#geoCodingType').trigger('change');
            return;
        }else{
            $('.geocodingPanel').hide();
            $('.serverOpPanel').show();
        }

        if(selectType === 'wfs'){
            $('.wfsResultTypePanel').show();
        }else{
            $('.wfsResultTypePanel').hide();
        }

        $('#serviceTable>thead>tr').hide();
        $('tr.' + selectType + 'Tr').show();

        var tbodyHtml = '';
        if(selectType === 'wfs'){
            for(var i=0; i<typeUrls.length; i++){
                var typeUrl = typeUrls[i];
                var markField = typeUrl.markField? typeUrl.markField : '无';
                tbodyHtml += '<tr><td>' + typeUrl.url + '</td><td>' + markField + '</td><td>' + typeUrl.resultType + '</td><td><a class="delService" href="#" onclick="return false">删除</a></td></tr>';
            }
        }else{
            for(var i=0; i<typeUrls.length; i++){
                tbodyHtml += '<tr><td>' + typeUrls[i].url + '</td><td><a class="delService" href="#" onclick="return false">删除</a></td></tr>';
            }
        }
        
        $('#serviceTable>tbody').html(tbodyHtml);

        $('.delService').click(function(){
            var typeUrls = mapView.serviceUrls[$('#typeSelect option:selected').val()];
            var tr = $(this).parents('tr');
            typeUrls.splice(tr.index(), 1);
            tr.remove();
        });
    }).trigger('change');

    $('#addService').click(function(){
        var service = $('#service').val().trim();
        if(!service){
            return;
        }
        var type = $('#typeSelect option:selected').val();
        var typeUrls = mapView.serviceUrls[type];
        var hasSame = false;
        for(var i=0;i<typeUrls.length; i++){
            if(service === typeUrls[i].url){
                hasSame = true;
                break;
            }
        }
        if(!hasSame){
            var typeUrl = {url: service};
            if(type === 'wfs'){
                service = UrlUtil.getUrl(service, {})+"1=1";
                $.ajax({
                    type: 'get',
                    url: service + "?VERSION=1.0.0&SERVICE=WFS&REQUEST=DescribeFeatureType",
                    async: false,
                    success: function(request){
                        var jsonOnj = $.xml2json(request);
                        var optionArr = jsonOnj.complexType.complexContent.extension.sequence.element;
                        if(optionArr.length){
                            var optionHtml = '<option value="0">无</option>';
                            for(var i=0; i<optionArr.length; i++){
                                optionHtml += '<option value="'+ optionArr[i]['@name'] +'">'+ optionArr[i]['@name'] +'</option>';
                            }
                            $("#selectMark").html(optionHtml);
                        }
                    }
                })
            }else{
                typeUrls.push(typeUrl);
                $('#typeSelect').trigger('change');
            }
            
        }
    });

    $(document).on('click', '#addToList', function(){
        var service = $('#service').val();
        var type = $('#typeSelect option:selected').val();
        var typeUrls = mapView.serviceUrls[type];
        var typeUrl = {url: service};
        var hasSame = false;
        for(var i=0;i<typeUrls.length; i++){
            if(service === typeUrls[i].url){
                hasSame = true;
                break;
            }
        }
        if(!hasSame){
            typeUrl['resultType'] = $('input:radio[name="resultType"]:checked').val();
            typeUrl['markField'] = $("#selectMark option:selected").text();
            typeUrls.push(typeUrl);
            $('#typeSelect').trigger('change');
        }
        
    })

    $('#loadServices').click(function(){
        mapView.loadLayers();
    });
});

function slideToggleDialog(dialog){
    //获取指定对象
    function getNode(parentDiv,nodeName){
        for(var i = 0,len = parentDiv.childNodes.length; i < len; i++){
            var node = parentDiv.childNodes[i];
            if(nodeName == "content"){
                if(node.className != "dtitle" && node.nodeName == "DIV"){
                    return node;
                }
            }
            else if(nodeName == "img"){
                if(node.className == "dtitle"){
                    var img = node.getElementsByTagName("img")[0];
                    return img;
                }
            }
            else if(nodeName == "iframe"){
                if(node.nodeName == "IFRAME" && node.className == "bgiframe bgiframe-bottom"){
                    return node;
                }
            }
        }
    }
    //获取弹出div对象
    var dialog = document.getElementById(dialog);
    //获取图片对象
    var img = getNode(dialog,"img");
    //处理
    if(dialog.style.height == "auto"){
        dialog.style.height = "18px";
        img.src = "./img/openD.png";
    }else{
        dialog.style.height = "auto";
        img.src = "./img/closeD.png";
    }
}