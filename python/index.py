# 打开网页
# 执行node
# 执行网页点击
# 循环执行
# 退出
#

import subprocess
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# 打开网页
def open_webpage(url):
    driver = webdriver.Chrome()  # 使用Chrome浏览器，请确保已安装Chrome和ChromeDriver
    driver.get(url)
    return driver

# 执行Node.js脚本
def execute_node_script(driver, node_script):
    result = driver.execute_script(node_script)
    return result

# 操作网页节点点击事件
def click_element_by_class_name(driver, class_name):
    elements = driver.find_elements(By.CLASS_NAME, class_name)
    for element in elements:
        element.click()

# 示例用法
if __name__ == '__main__':
    # 1. 打开网页
    driver = open_webpage('https://kns.cnki.net/kns8s/defaultresult/index?classid=LSTPFY1C&korder=SU&kw=%E9%80%A0%E7%BA%B8')

    # 2. 等待网页加载完成
    wait = WebDriverWait(driver, 10)
    wait.until(EC.presence_of_element_located((By.CLASS_NAME, 'downloadlink')))  # 等待具有类名 'downloadlink' 的元素出现

    # 3. 执行Node.js脚本
    node_script = """
        var downUrl = (list, index = 0) => {
            list[index].click();
            setTimeout(() => {
                if (index < list.length - 1) {
                    downUrl(list, ++index);
                } else {
                    window.downloadingFinished = true;
                }
            }, 1000);
        }

        var list = document.querySelectorAll('.downloadlink');
        console.log('list: ', list);
        window.downloadingFinished = false;
        downUrl(list);
    """

    execute_node_script(driver, node_script)

    while True:
        # 4. 等待Node.js脚本执行完成
        WebDriverWait(driver, 10).until(lambda d: d.execute_script("return window.downloadingFinished"))

        # 检查类名是否存在
        elements = driver.find_elements(By.CLASS_NAME, "pagesnums")
        if not elements:
            break

        # 5. 操作网页节点点击事件
        click_element_by_class_name(driver, "pagesnums")  # 使用具有特定类名 "pagesnums" 的元素

    driver.quit()

    