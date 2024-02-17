// 1. 设置内容
let content = `
分镜图3
场景：湖边的座椅，远处水面波光粼粼。  
视角：稍微提高，俯瞰，能够更加突出"胖橘猫"的表情。  
"胖橘猫"在远处眼睛凝视座椅上的"凯莉"，脸上是深深的着迷和幸福的微笑。
分镜图4:
场景：湖边的座椅。 
视角：侧面靠近拍摄，强调钱包在座位上的位置。  
"胖橘猫"表情惊诧，双眼瞪大，望着"凯莉"离去的方向。
分镜图5:
场景：座椅旁，远处水面波光粼粼。  
视角：中景,背景为湖面。 
"胖橘猫"伸手拿起钱包。
分镜图7:
场景：开阔的广场，远处有喷泉。  
视角：正面，稍微低于"胖橘猫"和"凯莉"，凸显"胖橘猫"递上钱包的动作。  
"胖橘猫"双手恭敬地将钱包奉上，表情带着点紧张和自豪。
分镜图8:
场景：咖啡馆的户外座位。  
视角：侧面，拍摄"凯莉"对"胖橘猫"微笑点头的画面。  
"胖橘猫"坐在"凯莉"对面，双眼带着感激和幸福的微笑。
分镜图11:
场景：家的客厅，有温馨的装饰。  
视角：从上而下，突出家庭三口之间的亲密和幸福。  
"胖橘猫"、"凯莉"和"橘球"坐在沙发上，"胖橘猫"拥抱着"凯莉"，"橘球"在玩耍。
分镜图12:
场景：湖边座椅，周围安静，阳光下的阴影。  
视角：高角度，捕捉"胖橘猫"拿着钱包的画面。  
"胖橘猫"拿着钱包，看到里面有很多钱，表情很贪婪。
分镜图13:
场景：湖边小路，背景是湖边的座椅。  
视角：远景背后拍摄，"胖橘猫"的身影在长长的阴影中缓缓离去。  
"胖橘猫"转身偷偷地溜走，身形渐渐消失在阳光和树影的交错中。
分镜图2:
场景：湖边的座椅，远处水面波光粼粼。  
视角：平视，背景为湖面，将座椅置于画面左侧。  
"胖橘猫"眼神呈现出惊讶，看到了远处坐在座椅上优雅的"凯莉"。`

// 2. 根据 '分镜图' 标识进行分割
let contentArr = content
  .split("分镜图")
  .map(
    (item) =>
      `请根据角色形象分析绘制分镜图，故事需要将角色的表情和动作拟人化。分镜图描述中"xxx"描绘的信息为角色，需要按照角色形象分析进行绘制，确保角色形象拟人化绘制。画面描述：分镜图${item}`
  );
// "胖橘猫"的外观描述为：形象应该是圆润、健壮，体现出一种成熟稳重的风范。他的毛色可能会很丰富，主要以温暖的橘色调为主。
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
    }, 1000 * 5);
  });
  console.timeEnd("timer1");
  // 递归调用：根据cycle数，选择是进入下一循环还是进入下个内容
  cycle < 1 ? await func(i, cycle + 1) : await func(i + 1);
};

func();

