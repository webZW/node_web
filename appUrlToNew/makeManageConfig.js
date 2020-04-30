const AppNewUrl = require('../exportFile/AppUrl/AppNewUrl_HasName-2020-3-26 15:16:24');
const fs = require('fs')

const presourcesIdConfig = {
   Public: '20000170',
   CommunicationAlarm: '20000087', // 告警追溯
   EquipmentMonitoring: '20000122', // 设备监测
   ProductionExecution: '20000094', // 生产执行
   MeterMonitoring: '20000123', // 表计监测
   AlarmOverview: '20000117', // 告警监测
   RegularCheck: '20000083', // 设备点检
   EnergyOverview: '20000081', // 能源概览
   ProductSchedule: '20000095', // 生产进度
   ProductionAnalysis: '20000164', // 生产综合分析
   RotaryKilnProductionAnalysis: '20000165', // 回转窑生产分析
   PutMateriel: '20000116', // 物料投放
   IncomingInspection: '20000093',  // 来料检验
   ProcessInspection: '20000099', // 过程检验
   IncomingQualityStatistics: '20000166',  // 来料检验统计
   ProcessQualityStatistics: '20000167', // 过程检验统计
   EquipmentLedger: '20000098', // 设备台账
   FaultRepair: '20000092', // 故障报修
   MaintenanceManagement: '20000097', // 维修管理
   EfficiencyAnalysis: '20000056', // 能效分析
   EquipMaintenance: '20000061', // 设备检修
   DowntimeRecord: '20000088', // 停机记录
   RunRecord: '20000100', // 运行记录
   EnergySavingBenefits: '20000082', // 节能效益
   PeakValleyAnalysis: '20000058', // 峰谷分析
   EnergyQuality: '20000057', // 能源质量
}

let menuCommitConfig = {};
for (const key in presourcesIdConfig) {
   menuCommitConfig[key] = {
      "app":"poit-management",
      "appKey":"",
      "version":"string01",
      "appType":3600,
      "presourcesId": presourcesIdConfig[key],
      "operateUserId":"3340",      
      "resourcesInfoList": []
   }
}

for (const key in menuCommitConfig) {
   const urlList =  AppNewUrl[key].url;
   urlList.map((item, index) => {
      menuCommitConfig[key].resourcesInfoList.push({
         "resourcesCode":"",
         "resourcesType":3,
         "pubType": key === 'Public' ? 1 : 2,
         "resourcesName": item.name,
         "resourcesUri": item.path,
         "resourcesRemark":"",
         "presourcesId": presourcesIdConfig[key],
         "sort": (index + 1) * 10
      })
   })
}

const exportConfig = (appMenuStr) => {
   fs.writeFileSync(`../exportFile/AppUrl/manageUrl-${new Date().toLocaleString()}.json`, appMenuStr)
}

exportConfig(JSON.stringify(menuCommitConfig))
// console.log(JSON.stringify(menuCommitConfig));