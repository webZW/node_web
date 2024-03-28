# 创建虚拟空间    python3 -m venv myenv
# 激活虚拟环境： 在你安装软件包之前，你需要激活 source myenv/bin/activate
# 安装包   pip install apscheduler ...
# 完成后停用虚拟环境  deactivate

from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
import pyscreenshot as ImageGrab
import pytesseract
import time
import os
import subprocess
from sys import platform

# 安装 tesseract 的路径 (Windows)
if platform == "win32":
    pytesseract.pytesseract.tesseract_cmd = r'D:\tesseract.exe'

def take_screenshot():
    # 获取当前时间作为文件名
    filename = datetime.now().strftime('screenshot_%Y%m%d%H%M%S.png')
    text_filename = datetime.now().strftime('recognized_text_%Y%m%d%H%M%S.txt')
    # 设置截图保存的路径
    save_path = 'save'
    if not os.path.exists(save_path):
        os.makedirs(save_path)
    filepath = os.path.join(save_path, filename)
    text_filepath = os.path.join(save_path, text_filename)
    # 获取屏幕快照
    screenshot = ImageGrab.grab()
    # 保存截图
    screenshot.save(filepath)
    print(f'Screenshot taken and saved as {filepath}')
    
    # config 参数可以根据实际情况选择合适的 psm 模式
    config = '--psm 6'
    # 识别截图中的文字信息
    text = pytesseract.image_to_string(screenshot, config=config)
    # 打印并保存识别出的文本
    print(text)
    with open(text_filepath, 'w') as text_file:
        text_file.write(text)
    print(f'Recognized text saved as {text_filepath}')

# 创建后台调度器
scheduler = BackgroundScheduler()

# 添加定时任务，例如每隔5分钟执行一次
scheduler.add_job(take_screenshot, 'interval', minutes=1)

# 启动调度器
scheduler.start()

print('Scheduler started. Press Ctrl+C to exit.')
try:
    # 无限循环以保持主线程活跃
    while True:
        time.sleep(10)
except (KeyboardInterrupt, SystemExit):
    # 关闭调度器
    scheduler.shutdown()

