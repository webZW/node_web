// 导入 date-holidays 模块
const Holidays = require('date-holidays');

// 创建一个 Holidays 实例，使用 "CN" 作为国家代码表示中国
const hd = new Holidays('CN');

// 获取当前年份
const currentYear = new Date().getFullYear();
console.log({currentYear});

// 获取当年的节假日列表
const holidays = hd.getHolidays(currentYear);

// 打印当年的节假日列表
console.log(`当年的节假日列表：`);
holidays.forEach(holiday => {
  console.log(`${holiday.date.toLocaleString().substring(0, 10)}: ${holiday.name}`);
});

// 判断特定日期是否是节假日
const dateToCheck = new Date('2023-01-01');
const isHoliday = hd.isHoliday(dateToCheck);

if (isHoliday) {
  console.log(`${dateToCheck.toLocaleString().substring(0, 10)} 是节假日`);
} else {
  console.log(`${dateToCheck.toLocaleString().substring(0, 10)} 不是节假日`);
}



// 打印当年的节假日列表
console.log(`当年的节假日列表：`);
holidays.forEach(holiday => {
  console.log(`${holiday.name}: ${holiday.start.toISOString().substring(0, 10)} - ${holiday.end.toISOString().substring(0, 10)}`);
});