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


{

// https://www.cnki.net/ 知网自动下载

var downUrlLoop = async (list, index = 0) => {
    // if (index >= 3) return; // 中断处理
    if (!list[index]) {
        console.log(index, list[index]);
        document.querySelector('a.pagesnums').click();
            
        setTimeout(() => {
            // 获取下一页列表
            getAllList();
        }, 3000) // 翻页间隔时间
        return;
    }

    console.log(index, list[index].getAttribute('href'));
    const newWindow = window.open(list[index].getAttribute('href'), '_blank');
    
    await new Promise((resolve) => {
        // 检查新窗口是否已成功打开
        if (newWindow) {
            // 在新窗口加载完成后执行代码
            newWindow.addEventListener('load', () => {
                setTimeout(() => {
                    newWindow.document.querySelector('#pdfDown').click();
                    newWindow.close();
                    resolve();
                }, 2000);
            })
        } else {
            // 处理无法打开新窗口的情况
            console.error('无法打开新窗口');
            resolve();
        }
    })


    setTimeout(() => {
        downUrlLoop(list, ++index);
    }, 1000) // 下载间隔时间
}

let index = 0;
var getAllList = () => {
    // if (index >= 3) return; // 中断处理
    var list = document.querySelectorAll('td.name a');
    downUrlLoop(list);
    index++;
}
getAllList();
}