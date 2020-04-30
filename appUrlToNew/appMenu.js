module.exports = {
   "Public": {
      "name": "公共",
      "url": [
         {
            "method": "GET",
            "path": "/user/getUser"
         },
         {
            "method": "GET",
            "path": "/user/subscribe/list"
         },
         {
            "method": "GET",
            "path": "/alarm2/queryAlarmCount"
         },
         {
            "method": "GET",
            "path": "/repairTask/queryRepairTaskAcceptedCount"
         },
         {
            "method": "GET",
            "path": "/RegularCheck/queryTaskCount"
         },
         {
            "method": "GET",
            "path": "/tradeIndexType/list"
         },
         {
            "method": "GET",
            "path": "/acctIUserApply/getMenuByUser"
         },
         {
            "method": "GET",
            "path": "/user/subscribe/month/list"
         },
         {
            "method": "POST",
            "path": "/user/subscribe/delete"
         },
         {
            "method": "POST",
            "path": "/user/subscribe/add"
         },
         {
            "method": "GET",
            "path": "/area/listAreaTree"
         },
         {
            "method": "GET",
            "path": "/message/listMessageCategory"
         },
         {
            "method": "GET",
            "path": "/message/listMessage"
         },
         {
            "method": "GET",
            "path": "/resource/listUserMenusByAppV1"
         },
         {
            "method": "GET",
            "path": "/incomingOrProcessResult/listMaterialTree"
         },
         {
            "method": "GET",
            "path": "/energy/type/list"
         },
         {
            "method": "POST",
            "path": "/user/password/update"
         },
         {
            "method": "POST",
            "path": "/message/setMessageHasRead"
         },
         {
            "method": "GET",
            "path": "/ProductionExecution/getRecord"
         },
         {
            "method": "GET",
            "path": "/ProductionExecution/listSheetItem"
         },
         {
            "method": "GET",
            "path": "/materialDistribute/returnQuantity"
         },
         {
            "method": "POST",
            "path": "/cooperate/new/comment"
         },
         {
            "method": "POST",
            "path": "/cooperate/stat/today"
         },
         {
            "method": "POST",
            "path": "/cooperate/event/show/list"
         },
         {
            "method": "POST",
            "path": "/cooperate/event/delete"
         },
         {
            "method": "POST",
            "path": "/cooperate/event/show/list/detail"
         },
         {
            "method": "POST",
            "path": "/cooperate/matter/comment/add"
         },
         {
            "method": "POST",
            "path": "/cooperate/matter/comment/list"
         },
         {
            "method": "POST",
            "path": "/cooperate/event/approval"
         },
         {
            "method": "POST",
            "path": "/cooperate/receiver/msg/user/list"
         },
         {
            "method": "POST",
            "path": "/cooperate/delete/badge"
         },
         {
            "method": "GET",
            "path": "/area/treeArea"
         },
         {
            "method": "POST",
            "path": "/file/add"
         },
         {
            "method": "POST",
            "path": "/cooperate/organization/user/list"
         },
         {
            "method": "POST",
            "path": "/cooperate/event/publish"
         },
         {
            "method": "POST",
            "path": "/cooperate/matter/page/org"
         },
         {
            "method": "GET",
            "path": "/alarm2/queryAlarmCount"
         },
         {
            "method": "GET",
            "path": "/repairTask/queryRepairTaskAcceptedCount"
         },
         {
            "method": "GET",
            "path": "/RegularCheck/queryTaskCount"
         },
         {
            "method": "GET",
            "path": "/acctIUserApply/getMenuByUser"
         },
         {
            "method": "GET",
            "path": "/user/subscribe/month/list"
         },
         {
            "method": "POST",
            "path": "/cooperate/new/comment"
         },
         {
            "method": "GET",
            "path": "/resource/listUserMenusByAppV1"
         },
         {
            "method": "POST",
            "path": "/acctIUserApply/addApplyMenu"
         },
         {
            "method": "POST",
            "path": "/cooperate/list/pageId"
         },
         {
            "method": "GET",
            "path": "/user/subscribe/months/list"
         },
         {
            "method": "GET",
            "path": "/user/subscribe/year/list"
         },
         {
            "method": "GET",
            "path": "/oauth/account/login"
         },
         {
            "method": "GET",
            "path": "/organization/user/list"
         },
         {
            "method": "GET",
            "path": "/resources/tree/user"
         },
         {
            "method": "GET",
            "path": "/userApplyResources/list/user/apply"
         },
         {
            "method": "GET",
            "path": "/userApplyResources/add/apply"
         },
         {
            "method": "GET",
            "path": "/user/get/info"
         }
      ]
   },
   "CommunicationAlarm": {
      "name": "告警追溯",
      "url": [
         {
            "method": "GET",
            "path": "/equip/alarm/listEntAlarmCategorys"
         },
         {
            "method": "GET",
            "path": "/equip/alarm/listAlarmHistoryByApp"
         },
         {
            "method": "POST",
            "path": "/cooperate/list/pageId"
         },
         {
            "method": "GET",
            "path": "/alarm2/listRuleIndexData"
         }
      ]
   },
   "EquipmentMonitoring": {
      "name": "设备监测",
      "url": [
         {
            "method": "GET",
            "path": "/monitor/status/list"
         },
         {
            "method": "GET",
            "path": "/area/listAreaTree"
         },
         {
            "method": "GET",
            "path": "/monitor/listAppEquipmentMonitor"
         },
         {
            "method": "GET",
            "path": "/monitor/listEquipmentMonitorIndexApp"
         },
         {
            "method": "POST",
            "path": "/monitor/addProductMonitorApp"
         },
         {
            "method": "GET",
            "path": "/area/treeArea"
         },
         {
            "method": "GET",
            "path": "/monitor/listEquipmentAllIndexApp"
         }
      ]
   },
   "ProductionExecution": {
      "name": "生产执行",
      "url": [
         {
            "method": "GET",
            "path": "/enterprise/getEnterpriseStructure"
         },
         {
            "method": "GET",
            "path": "/ProductionExecution/listTask"
         },
         {
            "method": "GET",
            "path": "/ProductionExecution/listFinishTask"
         },
         {
            "method": "POST",
            "path": "/ProductionExecution/openTask"
         },
         {
            "method": "POST",
            "path": "/ProductionExecution/returnTask"
         },
         {
            "method": "POST",
            "path": "/ProductionExecution/stopTask"
         },
         {
            "method": "POST",
            "path": "/ProductionExecution/closeTask"
         },
         {
            "method": "GET",
            "path": "/ProductionExecution/getSheet"
         },
         {
            "method": "GET",
            "path": "/ProductionExecution/listShift"
         },
         {
            "method": "GET",
            "path": "/ProductionExecution/listCourse"
         },
         {
            "method": "POST",
            "path": "/ProductionExecution/addSheet"
         }
      ]
   },
   "MeterMonitoring": {
      "name": "表计监测",
      "url": [
         {
            "method": "GET",
            "path": "/monitor/status/list"
         },
         {
            "method": "GET",
            "path": "/alarm2/listRuleIndexData"
         },
         {
            "method": "GET",
            "path": "/monitor/listAppMeterMonitor"
         },
         {
            "method": "POST",
            "path": "/monitor/addProductMonitorApp"
         },
         {
            "method": "GET",
            "path": "/monitor/listMeterMonitorIndexApp"
         },
         {
            "method": "GET",
            "path": "/meter/getMeterTypes"
         },
         {
            "method": "GET",
            "path": "/meterOper/listMeters"
         },
         {
            "method": "GET",
            "path": "/meter/listMeterType"
         },
         {
            "method": "GET",
            "path": "/monitor/listEquipmentAllIndexApp"
         },
         {
            "method": "GET",
            "path": "/monitor/listMeterAllIndexApp"
         }
      ]
   },
   "AlarmOverview": {
      "name": "告警概览",
      "url": [
         {
            "method": "GET",
            "path": "/equip/alarm/listRealTimeAlarm"
         },
         {
            "method": "GET",
            "path": "/equip/alarm/getMonthAlarmAccumulateInfo"
         }
      ]
   },
   "RegularCheck": {
      "name": "设备点检",
      "url": [
         {
            "method": "GET",
            "path": "/RegularCheck/listRegularCheckTaskInfo"
         },
         {
            "method": "GET",
            "path": "/equip/queryEquipTypeByEid"
         },
         {
            "method": "GET",
            "path": "/RegularCheck/statRegularCheckTask"
         },
         {
            "method": "GET",
            "path": "/RegularCheck/listRegularCheckEquipment"
         }
      ]
   },
   "EnergyOverview": {
      "name": "能源概览",
      "url": [
         {
            "method": "GET",
            "path": "/energyIntegration/getEnergyAreaConsumption"
         },
         {
            "method": "GET",
            "path": "/energyIntegration/getEnergyOverallConsumption"
         },
         {
            "method": "GET",
            "path": "/energyIntegration/getEnergyEfficiencyLevel"
         },
         {
            "method": "GET",
            "path": "/energyIntegration/getEnergyEfficiencyTrend"
         }
      ]
   },
   "ProductSchedule": {
      "name": "生产进度",
      "url": [
         {
            "method": "GET",
            "path": "/productionAnalysis/listProductionAnalysis"
         }
      ]
   },
   "ProductionAnalysis": {
      "name": "生产综合分析",
      "url": [
         {
            "method": "GET",
            "path": "/cementFactoryBoard/getCementFactoryBoard"
         }
      ]
   },
   "RotaryKilnProductionAnalysis": {
      "name": "回转窑生产分析",
      "url": [
         {
            "method": "GET",
            "path": "/cementRotaryTarget/list"
         }
      ]
   },
   "PutMateriel": {
      "name": "物料投放",
      "url": [
         {
            "method": "GET",
            "path": "/materialDistribute/listMaterialDistributeRecord"
         },
         {
            "method": "POST",
            "path": "/materialDistribute/saveMaterialDistribute"
         },
         {
            "method": "GET",
            "path": "/area/listAreaTree"
         },
         {
            "method": "GET",
            "path": "/ProductionExecution/listShift"
         },
         {
            "method": "GET",
            "path": "/ProductionExecution/listCourse"
         },
         {
            "method": "GET",
            "path": "/ProductionExecution/listTask"
         },
         {
            "method": "GET",
            "path": "/material/getMaterialListByPage"
         },
         {
            "method": "GET",
            "path": "/material/getMaterialTypeList"
         },
         {
            "method": "GET",
            "path": "/materialDistribute/deleteMaterialDistribute"
         }
      ]
   },
   "IncomingInspection": {
      "name": "来料检验",
      "url": [
         {
            "method": "GET",
            "path": "/QualityManageApp/listAppIncomingOrProcess"
         },
         {
            "method": "GET",
            "path": "/QualityManageApp/getAppIncomingByMaterial"
         },
         {
            "method": "POST",
            "path": "/incomingOrProcessResult/addOrUpdateIncomingCheck"
         },
         {
            "method": "GET",
            "path": "/supplierConfig/listSupplier"
         },
         {
            "method": "POST",
            "path": "/file/add"
         },
         {
            "method": "GET",
            "path": "/area/listAreaTree"
         },
         {
            "method": "POST",
            "path": "/QualityManageApp/addOrUpdateAppProcessCheck"
         },
         {
            "method": "GET",
            "path": "/productionTask/listProductionTask"
         },
         {
            "method": "GET",
            "path": "/ProductionExecution/listShift"
         },
         {
            "method": "GET",
            "path": "/incomingOrProcessResult/listMaterialTree"
         },
         {
            "method": "GET",
            "path": "/incomingOrProcessResult/getIncomingResult"
         },
         {
            "method": "GET",
            "path": "/QualityManageApp/getAppProcessByMaterial"
         },
         {
            "method": "GET",
            "path": "/QualityManageApp/getAppProcessResult"
         }
      ]
   },
   "ProcessInspection": {
      "name": "过程检验",
      "url": [
         {
            "method": "GET",
            "path": "/QualityManageApp/listAppIncomingOrProcess"
         },
         {
            "method": "POST",
            "path": "/QualityManageApp/addOrUpdateAppProcessCheck"
         }
      ]
   },
   "IncomingQualityStatistics": {
      "name": "来料检验统计",
      "url": [
         {
            "method": "GET",
            "path": "/supplierConfig/listSupplierByType"
         },
         {
            "method": "GET",
            "path": "/incomingOrProcessResult/listMaterialTree"
         },
         {
            "method": "GET",
            "path": "/incomingOrProcessResult/IncomingOrProcessCounts"
         },
         {
            "method": "GET",
            "path": "/incomingOrProcessResult/IncomingCountsBySupplier"
         },
         {
            "method": "GET",
            "path": "/incomingOrProcessResult/listMaterialTypeOnCheckingMaterialAndAllResp"
         },
         {
            "method": "GET",
            "path": "/incomingOrProcessResult/IncomingCountsByMateriel"
         }
      ]
   },
   "ProcessQualityStatistics": {
      "name": "过程检验统计",
      "url": [
         {
            "method": "GET",
            "path": "/incomingOrProcessResult/ProcessCountsByMateriel"
         },
         {
            "method": "GET",
            "path": "/incomingOrProcessResult/listMaterialTree"
         },
         {
            "method": "GET",
            "path": "/area/listAreaTree"
         },
         {
            "method": "GET",
            "path": "/incomingOrProcessResult/processCountsByCp"
         },
         {
            "method": "GET",
            "path": "/incomingOrProcessResult/processCountsByArea"
         },
         {
            "method": "GET",
            "path": "/incomingOrProcessResult/processCountsBySequence"
         }
      ]
   },
   "EquipmentLedger": {
      "name": "设备台账",
      "url": [
         {
            "method": "GET",
            "path": "/equip/queryEquipTypeByEid"
         },
         {
            "method": "GET",
            "path": "/equipmentFile/listEquipmentFiles"
         },
         {
            "method": "GET",
            "path": "/equipmentFile/describeEquipmentFile"
         },
         {
            "method": "GET",
            "path": "/RegularCheck/listRegularCheckEquipment"
         },
         {
            "method": "GET",
            "path": "/repairTask/listRepairRecordByApp"
         },
         {
            "method": "GET",
            "path": "/maintainTask/listMaintainTaskRecord"
         },
         {
            "method": "GET",
            "path": "/RegularCheck/getRegularCheckRecord"
         },
         {
            "method": "GET",
            "path": "/maintainTask/listMaintainTaskItem"
         },
         {
            "method": "GET",
            "path": "/equipmentSpare/listSpareConsume"
         },
         {
            "method": "GET",
            "path": "/repairTask/getRepairTaskInfo"
         },
         {
            "method": "GET",
            "path": "/equipmentSpare/listSpareConsume"
         }
      ]
   },
   "FaultRepair": {
      "name": "故障报修",
      "url": [
         {
            "method": "GET",
            "path": "/repairTask/listFaultRepairByApp"
         },
         {
            "method": "GET",
            "path": "/repairTask/hurryUp"
         },
         {
            "method": "POST",
            "path": "/repairTask/recallRepairTask"
         },
         {
            "method": "POST",
            "path": "/repairTask/addOrUpdateRepairTask"
         },
         {
            "method": "POST",
            "path": "/file/add"
         },
         {
            "method": "GET",
            "path": "/repairTask/getRepairTaskInfo"
         },
         {
            "method": "POST",
            "path": "/repairTask/dispatchRepairTask"
         },
         {
            "method": "GET",
            "path": "/repairTask/evaluateRepairTask"
         },
         {
            "method": "GET",
            "path": "/repairCourse/listRepairCourse"
         }
      ]
   },
   "MaintenanceManagement": {
      "name": "维修管理",
      "url": [
         {
            "method": "GET",
            "path": "/repairTask/listSelfRepairTask"
         },
         {
            "method": "GET",
            "path": "/repairTask/listRepairRecordByApp"
         },
         {
            "method": "POST",
            "path": "/repairTask/finishRepairTaskApp"
         },
         {
            "method": "GET",
            "path": "/modelPartSpare/querySpareByEquipmentIdList"
         },
         {
            "method": "GET",
            "path": "/equipmentSpare/listSpareConsume"
         },
         {
            "method": "GET",
            "path": "/repairTask/getRepairTaskInfo"
         },
         {
            "method": "POST",
            "path": "/file/add"
         }
      ]
   },
   "EfficiencyAnalysis": {
      "name": "能效分析",
      "url": [
         {
            "method": "GET",
            "path": "/enterprise/getEnterpriseStructure"
         },
         {
            "method": "GET",
            "path": "/areaEnergy/listRangeEfcc"
         },
         {
            "method": "POST",
            "path": "/cooperate/list/pageId"
         },
         {
            "method": "POST",
            "path": "/cooperate/event/delete"
         },
         {
            "method": "POST",
            "path": "/cooperate/event/show/list/detail"
         }
      ]
   },
   "EquipMaintenance": {
      "name": "设备检修",
      "url": [
         {
            "method": "GET",
            "path": "/maintainTask/listMaintainTask"
         },
         {
            "method": "GET",
            "path": "/equip/queryEquipTypeByEid"
         },
         {
            "method": "GET",
            "path": "/maintainTask/listMaintainTaskRecord"
         }
      ]
   },
   "DowntimeRecord": {
      "name": "停机记录",
      "url": [
         {
            "method": "GET",
            "path": "/eqpShutdownReasonRecord/listEqpShutdownReasonRecord"
         },
         {
            "method": "GET",
            "path": "/enterprise/getEnterpriseStructure"
         }
      ]
   },
   "RunRecord": {
      "name": "运行记录",
      "url": [
         {
            "method": "GET",
            "path": "/equip/queryEquipTypeByEid"
         },
         {
            "method": "GET",
            "path": "/equipmentFile/listEquipmentStatus"
         },
         {
            "method": "GET",
            "path": "/equipmentFile/listEquipmentStatusHistory"
         }
      ]
   },
   "EnergySavingBenefits": {
      "name": "节能效益",
      "url": [
         {
            "method": "GET",
            "path": "/energySavingBenefit/getEnergySavingBenefitOrTce"
         },
         {
            "method": "GET",
            "path": "/energySavingBenefit/getEnergySavingBenefitDetail"
         }
      ]
   },
   "PeakValleyAnalysis": {
      "name": "峰谷分析",
      "url": [
         {
            "method": "POST",
            "path": "/cooperate/list/pageId"
         },
         {
            "method": "GET",
            "path": "/enterprise/getEnterpriseStructure"
         },
         {
            "method": "GET",
            "path": "/areaEnergy/describeAreaElecStatByApp"
         },
         {
            "method": "GET",
            "path": "/areaEnergy/describeAreaFgpListByApp"
         },
         {
            "method": "GET",
            "path": "/areaEnergy/describeAreaFgpDistByApp"
         }
      ]
   },
   "EnergyQuality": {
      "name": "能源质量",
      "url": [
         {
            "method": "POST",
            "path": "/cooperate/list/pageId"
         },
         {
            "method": "GET",
            "path": "/meterOper/listEgQualitiesByApp"
         }
      ]
   },
}