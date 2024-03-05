
// 1. 设置内容
let content = `分镜图7：窗外的遥望：
场景：阳光透过教室的窗户，照在"小橘猫"期待的脸上。
画面描述："小橘猫"仍穿着学校的制服，一只小爪子支撑在窗台上，另一只手抹去泪水，表情很难过。表情和动作："小橘猫"目光渴望地凝望着窗外，似乎在寻找爸爸的身影，教室里的快乐对他来说仿佛太远。
分镜图9：午睡的眼泪：
场景：安静的午休房，一排排干净的小床上孩子们正安安静静地躺下。
画面描述："小橘猫"躺在床上，身上盖着图案柔软的小被。表情和动作：眼泪在"小橘猫"的眼眶中打转，表情很难过，他紧紧抱着他最喜欢的玩具，显得格外需要安慰。
分镜图10：希望之光渐渐黯淡的放学时：
场景：幼儿园门口，树荫下散发出温暖的余晖。
画面描述："小橘猫"制服已有些歪斜。表情和动作："小橘猫"紧紧抓着他的书包和玩具，泪眼婆娑，表情很难过，眼睁睁看着别的小朋友被父母接走，孤单一人等待。
分镜图11：哀伤登上返家路：
场景：脚踏晚霞的幼儿园停车场，校车静候孩子们陆续登车。
画面描述："小橘猫"的制服略显凌乱，袖口出现翻卷。表情和动作：老师温柔地牵引着"小橘猫"的小手，引导他向校车移动，"小橘猫"低下头，脸上满是泪水，表情很难过，步伐沉重。
分镜图12：车窗外的静默泪水：
场景：校车内部，其他孩子嬉笑打闹。
画面描述："小橘猫"紧紧握着他的爱护玩具坐在座位上，制服稍显凌乱。表情和动作：他默默地看向车窗外的景色，脸上留着泪水，表情很难过，身旁小朋友的玩闹声与他形成了鲜明对照。
分镜图13：回家的慰藉：
场景：温馨的家庭站点，周围是绿意盎然的自然景观。
画面描述："小橘猫"跳下校车，目光立即被等在站点的"胖橘猫"所吸引，"胖橘猫"穿着休闲衣。表情和动作："小橘猫"奔向"胖橘猫"，眼中充满泪水和一天的委屈，爪小手心怀期待地伸向温暖的拥抱。
分镜图14：温暖的拥抱与倾听：
场景：夕阳下的家门前，门廊投射出幽默的光影。
画面描述："小橘猫"身体完全融入"胖橘猫"的怀抱中，彷佛寻觅到慰藉与安全感。表情和动作："胖橘猫"紧拥着"小橘猫"，耐心倾听他那一天的经历，眼里满溢着深刻的爱与同情，随着"小橘猫"的话语逐渐变得哽咽。
分镜图3：坚决抗拒的早晨：
场景：清晨的家门口，彩绘校车在橙色阳光照耀下静静等待，已经有一些小孩子在校车上坐着了。
画面描述："小橘猫"穿着带着幼儿园制服，双爪抱住"胖橘猫"的一条腿，大声的哭着，不想上校车。"胖橘猫"身着休闲服，安慰着小橘猫"。
分镜图4：不舍的告别：
场景：装扮有趣的幼儿园门口，彩带在微风中飘扬，显得生机勃勃。
画面描述："小橘猫"身穿幼儿园制服，脸颊上满是泪水，表情很难过，小手紧紧抱住"胖橘猫"的腿。"胖橘猫"身着简单的休闲装，蹲下身温柔地安抚"小橘猫"，双眼传递着安慰与爱意。
分镜图5：角落里的孤单：
场景：多彩而热闹的教室内角落，其他小朋友在欢快地玩耍。描述："小橘猫"独自一人身着整洁的制服，缩在角落里的小椅子上，小爪攥着书包不放，泪眼汪汪，表情很难过，显得孤独无助。
分镜图6：外界的热闹不与我：
场景：教室内充满笑声和活动的迹象。
画面描述："小橘猫"的校服衬托出他此刻的孤寂与忧郁。表情和动作：坐在一旁，手中无意识地摆弄着一个玩具，神情黯然淡然，眼中泪光闪烁，表情很难过，对同年龄的小伙伴们的享乐无动于衷。
分镜图8：眼泪中的午餐时光：
场景：洁净且明亮的食堂内，小朋友们围坐在装饰着卡通图案的桌子旁。
画面描述："小橘猫"坐在饭桌边，制服依然整洁。表情和动作：手中的勺子静静悬挂，他的眼神游离不定，泪水在脸颊上清晰可见，表情很难过，食物在眼前却无法引起他的食欲。
`

// 2. 根据 '分镜图图' 标识进行分割
let contentArr = content
  .split("分镜图")
  .map(
    (item) =>
      `请严格根据Prompt要求的内容分析绘制分镜图，分镜图描述中"xxx"描绘的信息为角色，小橘猫是一只上幼儿园的小猫咪，需要严格按照角色形象进行绘制，同时需要确保描绘的动物角色都需要拟人化绘制。画面描述：分镜图${item}`
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

