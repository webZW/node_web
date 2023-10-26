// https://www.cnki.net/ 知网自动下载

var downUrl = (list, index = 0) => {
    if (!list[index]) {
        document.querySelector('.pagesnums').click();
            
        setTimeout(() => {
            // 获取下一页列表
            getAllList();
        }, 3000) // 翻页间隔时间
        return;
    }
    list[index].click();

    setTimeout(() => {
        downUrl(list, ++index);
    }, 1000) // 下载间隔时间
}

let index = 0;
var getAllList = () => {
    // if (index >= 3) return; // 中断处理
    var list = document.querySelectorAll('.downloadlink');
    downUrl(list);
    index++;
}
getAllList();