//  https://www.sciencedirect.com/ 期刊自动下载


var downUrl = (fileName, url) => {
    console.log({fileName, url});
 var x = new window.XMLHttpRequest();
 x.open('GET', url, true);
 x.responseType = 'blob';
 x.onload = () => {
  var url = window.URL.createObjectURL(x.response);
  var a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
 };
 x.send();
}

var downHandler = (list, index = 0) => {
    if (!list[index]) {
        document.querySelector('#srp-pagination .next-link a.anchor').click();
            
        setTimeout(() => {
            // 获取下一页列表
            getAllList();
        }, 3000) // 翻页间隔时间
        return;
    }
    var a = list[index].querySelector('.DownloadPdf a');

    // 没有pdf，执行下一个
    if (!a) {
        downHandler(list, ++index);
        return
    }
    var name = `${list[index].querySelector('h2').textContent}.pdf`;
    var url = `https://www.sciencedirect.com${a.getAttribute('href')}`;

    downUrl(name, url);
    

    setTimeout(() => {
        downHandler(list, ++index);
    }, 1000) // 下载间隔时间
}

let index = 0;
var getAllList = () => {
    // if (index >= 2) return; // 中断处理
    var list = document.querySelectorAll('.result-item-content');

    downHandler(list);
    index++;
}
getAllList();