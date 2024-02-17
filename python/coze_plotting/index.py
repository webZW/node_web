from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# 1
with open('./story.txt', 'r', encoding='utf-8') as f:
    contents = f.read().split('分镜图')
print(contents)

# 2
# from selenium import webdriver

# 显式指定 ChromeDriver 的路径
# driver = webdriver.Chrome(executable_path='/opt/homebrew/bin/chromedriver')
driver = webdriver.Chrome()  # 这里请替换为你的Chrome驱动的实际路径
driver.get("https://www.coze.com/")
time.sleep(120)
driver.get("https://www.coze.com/space/7313852922385776658/bot/7335112197976096776")  # 这里请替换为你想要打开的网页链接
time.sleep(10)

# 3
input_selector = '.cBxR8CJK57sitcvBLt_u .semi-input-textarea.semi-input-textarea-autosize'
input_dom = WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.CSS_SELECTOR, input_selector)))

# 4
button_selector = '.lgvvFMU_ZtEgFG2Q14nX'
check_selector = '.JvrU1W8upboul6XApv9G'
for content in contents:
    # 4.1
    input_dom.clear()
    input_dom.send_keys(content)

    # 4.2
    time.sleep(2)

    # # 4.3
    # button_dom = WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.CSS_SELECTOR, button_selector)))
    # button_dom.click()

    # # 4.4
    # while True:
    #     try:
    #         check_dom = driver.find_element(By.CSS_SELECTOR, check_selector)
    #         time.sleep(10)
    #     except:
    #         break

# 关闭网页
# driver.quit()