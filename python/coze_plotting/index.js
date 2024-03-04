
// 1. 设置内容
let content = `分镜图3：在街道上，很多行人在赶着上班，"胖橘猫"穿着整洁的深灰色西装，配着领带，拎着一个褐色简约款式的小公文包，踏出门外，准备蹚过街道上积水前往公交站。雨水淋湿了他的黑色牛津鞋和裤腿。
分镜图4：在挤满了各种穿着上班服装的动物乘客的公交车上，"胖橘猫"靠在有些模糊的车窗边，眼皮沉重，他身上被雨淋湿的水渗透车内，乘客们似乎无暇顾及他的存在。
分镜图5：意外睡着的"胖橘猫"错过了停靠站，匆忙中下车时脸上写满了慌张。背景是外面忙碌的商业区，高楼林立，街边包括猫咪和狗狗在内的行人来来往往。
分镜图6："胖橘猫"站在候车亭下，四周是忙碌赶路的人群和蜿蜒的车流。他的身边是一张显得有些陈旧的公交车站牌，旁边的水坑中反射着周围灯光的倒影。他身着的深灰色西装已稍显不整，眉头微皱，显示出内心的不安。
分镜图7：在颠簸前行的公交车内，"胖橘猫"紧紧握住吊环，其他乘客包括一只忙于手机的兔子、一个带着耳机闭眼休息的猴子等等，各自忙于自己的世界。车窗外景色快速后退，模糊的雨滴不定时地从窗户划过。
分镜图8：公交车门开启，"胖橘猫"从车上小心翼翼地走下，避免踩到积水。他望向前方，是一栋层次分明的现代化办公大厦，大厦外墙上反光的玻璃镶嵌在银色的金属框架中，透出职场的冰冷。
分镜图9："胖橘猫"在一张充满文件和电脑屏幕的办公桌前坐下，他四周是同事们活跃的谈话声和键盘敲击声。橘猫的表情显得有些疲惫和压力重重，轻轻按摩着自己的太阳穴。
分镜图10：午餐时间，橘猫独自一人坐在楼顶的休息区，手中拿着简单的便当盒，在城市林立的高楼之间，吹着微风，眼神迷离地望向天际，似乎在思考人生的方向。
分镜图11：下午的办公室里，阳光透过窗户洒在"胖橘猫"的桌上，他正全神贯注地敲打着电脑的键盘。一封重要的电子邮件被完成，准备发送出去。他眼角的眼袋透露出长久的辛勤与疲累。
分镜图12：工作结束后，"胖橘猫"站在办公大楼前，整理了一下西装，拿出手机，发现没有未接来电，表情显得有些失望，孤单的影子拉长在黄昏的霓虹灯光下。
分镜图13：傍晚，"胖橘猫"一步步走进一个熙熙攘攘的市场，市场内琳琅满目的商品让人眼花缭乱，他停下脚步，凝视着一家店铺窗口的海鲜，腹中空空如也的感觉使他不由自主地吞了口口水。
分镜图14：夜晚回到家后，"胖橘猫"坐在宽大的窗台上，手里捧着一本书，轻轻翻动着。他面前是一杯淡淡的绿茶和一盘自己做的小点心。窗外是深邃的夜空和繁星点点，房间里弥漫着静谧与安宁。
`

// 2. 根据 '分镜图图' 标识进行分割
let contentArr = content
  .split("分镜图")
  .map(
    (item) =>
      `请严格根据Prompt要求的内容分析绘制分镜图，分镜图描述中"xxx"描绘的信息为角色，需要严格按照角色形象进行绘制，同时需要确保描绘的动物角色都需要拟人化绘制。画面描述：分镜图${item}`
  );
// """胖橘猫"""的外观描述为：形象应该是圆润、健壮，体现出一种成熟稳重的风范。他的毛色可能会很丰富，主要以温暖的橘色调为主。
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

