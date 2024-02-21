# 获取本地网络 IP 地址
import requests
import netifaces
from apscheduler.schedulers.blocking import BlockingScheduler

# 后台执行逻辑：
# 执行 nohup 后台运行：nohup python3 getLocalIP.py &
# 查看 getLocalIP.py 是否运行：ps aux | grep getLocalIP.py
# 根据 PID 删除 getLocalIP.py 执行任务：kill -9 46730

# 飞书链接
FEISHU_WEBHOOK = 'https://open.feishu.cn/open-apis/bot/v2/hook/3c6be61f-55d9-44ab-a11a-7150429918f2'
last_ip = ""

def get_private_ip():
    global last_ip
    try:
        for interface in netifaces.interfaces():
            addresses = netifaces.ifaddresses(interface)
            if netifaces.AF_INET in addresses:
                new_ip = addresses[netifaces.AF_INET][0]['addr']
                if new_ip != "127.0.0.1":
                    print(f"当前 IP 地址: {new_ip}")
                    
                    if new_ip != last_ip:
                        send_to_feishu(f"当前 IP 地址: {new_ip}")
                        print("新的 IP 地址已发送到飞书.")
                        last_ip = new_ip
                    else:
                        print("IP 地址未发生改变.")
    except Exception as e:
        # 打印出错误详细信息
        print(f"在获取 IP 地址时出现错误: {str(e)}")

def send_to_feishu(message):
    headers = {'Content-Type': 'application/json'}
    data = {"msg_type": "text", "content": {"text": message}}
    response = requests.post(FEISHU_WEBHOOK, headers=headers, json=data)
    print(f"飞书响应: {response.text}")

# 创建定时任务
scheduler = BlockingScheduler()
scheduler.add_job(get_private_ip, 'interval', minutes=20)
print("定时任务已启动，每20分钟获取一次 IP 地址")
scheduler.start()