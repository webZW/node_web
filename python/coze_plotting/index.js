// 1. 设置内容
let content = `分镜图1：
视角：全景视角，呈现运动场整体场景。
内容："胖橘猫"站在起跑线上，身后是其他各种类型的动物参赛者。运动场上布满了彩旗，远处观众席上人群熙熙攘攘。"胖橘猫"穿着橙色体恤和舒适短裤，慷慨挺胸，满脸自信和期待。
请注意动物都需要拟人化绘制。
分镜图2：
视角：侧面中景，侧重于"胖橘猫"。
内容："胖橘猫"在运动场的起跑线上，他蜷着身体准备冲刺。表情严肃，眼睛紧盯着前方的赛道，彰显决心和动力。
分镜图3：
视角：高角视角，呈现"胖橘猫"和部分赛道。
内容：比赛开始，"胖橘猫"努力向前冲，周围的动物也在加速。他的表情专注而坚毅，动作显示出全速奔跑，尽管速度不是最快。
请注意动物都需要拟人化绘制。
分镜图4：
视角：中景。
内容："胖橘猫"跳过障碍物，稍显笨重但成功地越过。面部表情露出轻微的吃力，但眼神坚定。
分镜图5：
视角：近高角视角。
内容："胖橘猫"在障碍赛的跑道上跌倒。身体周围有动感线条表现动作的剧烈。面部表情是震惊和一丝困惑，预示着挣扎起身的下一步。
分镜图6：
视角：低角视角。
内容："胖橘猫"坚定地从地上爬起，决心满满。背景模糊，聚焦于"胖橘猫"的身姿和表情，突显其毅力。
分镜图7：
视角：侧面远景。
内容："胖橘猫"继续参与赛跑，周围的动物开始一个个退出。场景描绘出"胖橘猫"的稳健步伐和其他动物的疲惫样子。
请注意动物都需要拟人化绘制。
分镜图8：
视角：正面中景。
内容：比赛进入尾声，"胖橘猫"踏上最后一个障碍物前的赛道。他的表情既疲倦又兴奋，表现了比赛接近尾声的激动心情。
分镜图9：
视角：鸟瞰视角。
内容："胖橘猫"作为唯一完赛参赛者，孤独地站在终点线上。赛道两旁是已经放弃的其他参赛参数动物，而"胖橘猫"的面带笑容，成为了焦点。
请注意动物都需要拟人化绘制。
分镜图10（转场至现实）：
视角：室内中景。
内容："胖橘猫"正在床上醒来，四周是宁静舒适的卧室。脸上有一丝迷惑和失落，表情透露出他刚从梦中醒来。
分镜图11：
视角：特写。
内容："胖橘猫"的脸部特写，展示他那温暖慈祥的眼睛，反映梦与现实之间的矛盾感。
分镜图12：
视角：室内全景。
内容："胖橘猫"起床，慵懒地走向电视，其周围是典型的家庭客厅环境，温馨而放松。
分镜图13：
视角：近景。
内容："胖橘猫"坐在沙发上，一边看电视一边吃着薯条。他穿着宽松的家居服，脸上露出满足和懒散的笑意。
分镜图14：
视角：背后中景。
内容：电视画面在前，"胖橘猫"的背影在观看，表现出他沉浸于电视节目，忘却了刚刚的奋斗和幻想。
分镜图15（结束场景）：
视角：正面近景。
内容：最后一个画面展示"胖橘猫"安静地坐在沙发上，闭上眼睛，似乎在沉思。空气中带有休闲和平和的气氛，彰显出享受生活的感觉。`

// 2. 根据 '分镜图' 标识进行分割
let contentArr = content
  .split("分镜图")
  .map(
    (item) =>
      `请根据角色形象分析绘制分镜图，故事需要将角色的表情和动作拟人化。分镜图描述中"xxx"描绘的信息为角色，需要按照角色形象分析进行绘制，确保角色形象拟人化绘制。画面描述：分镜图${item}`
  );
// ""胖橘猫""的外观描述为：形象应该是圆润、健壮，体现出一种成熟稳重的风范。他的毛色可能会很丰富，主要以温暖的橘色调为主。
contentArr.shift();
console.log(contentArr);

// 根据类名找到元素
let input_dom = document.querySelector(
  ".cBxR8CJK57sitcvBLt_u .semi-input-textarea.semi-input-textarea-autosize"
);

let intervalId = null;
var isStop = false;

const func = async (i = 0, cycle = 0) => {
  // 如果index已经超过数组长度，那么终止递归
  if (i >= contentArr.length) return;
  if (isStop) return;

  // 4.1. 填入内容
  let setValue = Object.getOwnPropertyDescriptor(
    window.HTMLTextAreaElement.prototype,
    "value"
  ).set;

const content = cycle === 0 ? contentArr[i] : contentArr[i].replace('分析绘制分镜图', '重新绘制分镜图')

  setValue.call(input_dom, content);

  let event = new Event("input", { bubbles: true });

  input_dom.dispatchEvent(event);

  console.time("timer");
  // 4.2. 等待2s
  await new Promise((resolve) => setTimeout(resolve, 5000));
  console.timeEnd("timer");

  // 4.3. 点击元素
  document.querySelector(".lgvvFMU_ZtEgFG2Q14nX").click();

  console.time("timer1");

  // 4.4. 等待10s，检查元素是否存在
  await new Promise(async (resolve) => {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
      let isLoading =
        document.querySelector(".HtE_QDTDO5s6h3FZ5MPz").offsetHeight === 0;
    if (isStop) return;

      console.log("是否加载中: ", isLoading);
      if (isLoading) {
        clearInterval(intervalId);
        resolve();
      }
    }, 1000 * 10);
  });
  console.timeEnd("timer1");
  // 递归调用：根据cycle数，选择是进入下一循环还是进入下个内容
  cycle < 1 ? await func(i, cycle + 1) : await func(i + 1);
};

func();

