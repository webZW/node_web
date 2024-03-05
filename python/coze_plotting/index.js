
// 1. 设置内容
let content = `分镜图13：回家的慰藉：
场景：温馨的家庭站点，周围是绿意盎然的自然景观。
画面描述：校车旁边，"小橘猫"奔向"胖橘猫"，眼中充满泪水和一天的委屈，小手展开想要拥抱"胖橘猫"。
分镜图14：温暖的拥抱与倾听：
场景：夕阳下的家门前，门廊投射出幽默的光影。
画面描述："小橘猫"身体完全融入"胖橘猫"的怀抱中，彷佛寻觅到慰藉与安全感。
表情和动作："胖橘猫"紧拥着"小橘猫"，耐心倾听他那一天的经历，眼里满溢着深刻的爱与同情，随着"小橘猫"的话语逐渐变得哽咽。
分镜图3：坚决抗拒的早晨：
场景：清晨的家门口，彩绘校车在橙色阳光照耀下静静等待，已经有一些小孩子在校车上坐着了。
画面描述："小橘猫"穿着带着幼儿园制服，双爪抱住"胖橘猫"的一条腿，大声的哭着，不想上校车。"胖橘猫"身着休闲服，安慰着小橘猫"。
分镜图4：不舍的告别：
场景：装扮有趣的幼儿园门口，彩带在微风中飘扬，显得生机勃勃。
画面描述："小橘猫"身穿幼儿园制服，脸颊上满是泪水，表情很难过，小手紧紧抱住"胖橘猫"的腿。"胖橘猫"身着简单的休闲装，蹲下身温柔地安抚"小橘猫"，双眼传递着安慰与爱意。
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

