const url = [
   {
       oldUrl: "/areaEnergy/listRangeEfcc",
       newUrl: "/energy/area/efcc/list"
   },
   {
       oldUrl: "/areaEnergy/describeAreaElecStatByApp",
       newUrl: "/energy/area/elec/stat/get"
   },
   {
       oldUrl: "/areaEnergy/describeAreaFgpDistByApp",
       newUrl: "/energy/area/fgp/dist/get"
   },
   {
       oldUrl: "/areaEnergy/describeAreaFgpListByApp",
       newUrl: "/energy/area/fgp/get"
   },
   {
       oldUrl: "/energySavingBenefit/getEnergySavingBenefitOrTce",
       newUrl: "/energy/saving/benefit/get"
   },
   {
       oldUrl:
           "/energySavingBenefit/getEnergySavingBenefitDetail",
       newUrl: "/energy/saving/benefit/detail/get"
   },
   {
       oldUrl:
           "/energySavingBenefit/getEnergyComprehensiveBoard",
       newUrl: "/energy/saving/benefit/comprehensive/board/get"
   },
   {
       oldUrl: "/energyIntegration/getEnergyAreaConsumption",
       newUrl: "/energy/integration/area/consumption/get"
   },
   {
       oldUrl: "/energyIntegration/getEnergyCostDistribution",
       newUrl: "/energy/integration/cost/distribution/get"
   },
   {
       oldUrl: "/energyIntegration/getEnergyCostTrend",
       newUrl: "/energy/integration/cost/trend/get"
   },
   {
       oldUrl: "/energyIntegration/getEnergyEfficiencyLevel",
       newUrl: "/energy/integration/efficiency/level/get"
   },
   {
       oldUrl: "/energyIntegration/getEnergyEfficiencyTrend",
       newUrl: "/energy/integration/efficiency/trend/get"
   },
   {
       oldUrl:
           "/energyIntegration/getEnergyOverallConsumption",
       newUrl: "/energy/integration/overall/consumption/get"
   },
   {
       oldUrl: "/cementFactoryBoard/getCementFactoryBoard",
       newUrl: "/cement/factory/board/get"
   },
   {
       oldUrl: "/meterOper/listEgQualitiesByApp",
       newUrl: "/meter/oper/energy/quality/list"
   },
   {
       oldUrl: "/meterOper/listMeters",
       newUrl: "/meter/oper/list"
   },
   {
       oldUrl: "/cementRotaryTarget/listArea",
       newUrl: "/cement/rotary/area/target/list"
   },
   {
       oldUrl: "/maintainTask/listMaintainTask",
       newUrl: "/task/maintain/list"
   },
   {
       oldUrl: "/maintainTask/listMaintainTaskItem",
       newUrl: "/task/maintain/item/list"
   },
   {
       oldUrl: "/maintainTask/listMaintainTaskRecord",
       newUrl: "/task/maintain/record/list"
   },
   {
       oldUrl: "/maintainTask/saveMaintainTaskItem",
       newUrl: "/task/maintain/item/update"
   },
   {
       oldUrl: "/equipmentSpare/listSpareConsume",
       newUrl: "/equip/spare/consume/list"
   },
   {
       oldUrl: "/repairTask/listFaultRepairByApp",
       newUrl: "/task/repair/fault/list"
   },
   {
       oldUrl: "/repairTask/getRepairTaskInfo",
       newUrl: "/task/repair/info/get"
   },
   {
       oldUrl: "/repairTask/addOrUpdateRepairTask",
       newUrl: "/task/repair/add"
   },
   {
       oldUrl: "/repairTask/hurryUp",
       newUrl: "/task/repair/hurry/up/get"
   },
   {
       oldUrl: "/repairTask/evaluateRepairTask",
       newUrl: "/task/repair/evaluate/get"
   },
   {
       oldUrl: "/repairTask/listRepairRecord",
       newUrl: "/task/repair/record/list"
   },
   {
       oldUrl: "/repairTask/dispatchRepairTask",
       newUrl: "/task/repair/dispatch/update"
   },
   {
       oldUrl: "/repairTask/listSelfRepairTask",
       newUrl: "/task/repair/self/list"
   },
   {
       oldUrl: "/repairTask/listRepairRecordByApp",
       newUrl: "/task/repair/record/app/list"
   },
   {
       oldUrl: "/repairTask/recallRepairTask",
       newUrl: "/task/repair/recall/update"
   },
   {
       oldUrl: "/repairTask/finishRepairTaskApp",
       newUrl: "/task/repair/finish/update"
   },
   {
       oldUrl: "/equipmentFile/listEquipmentFiles",
       newUrl: "/equip/list"
   },
   {
       oldUrl: "/equipmentFile/describeEquipmentFile",
       newUrl: "/equip/describe/get"
   },
   {
       oldUrl: "/equipmentFile/listEquipmentSpares",
       newUrl: "/equip/spare/list"
   },
   {
       oldUrl: "/equipmentFile/listEquipmentStatus",
       newUrl: "/equip/status/list"
   },
   {
       oldUrl: "/equipmentFile/listEquipmentStatusHistory",
       newUrl: "/equip/status/history/list"
   },
   {
       oldUrl: "/RegularCheck/listRegularCheckEquipment",
       newUrl: "/regular/check/equip/list"
   },
   {
       oldUrl: "/RegularCheck/listRegularCheckAppStatus",
       newUrl: "/regular/check/status/list"
   },
   {
       oldUrl: "/RegularCheck/getRegularCheckRecord",
       newUrl: "/regular/check/record/get"
   },
   {
       oldUrl: "/RegularCheck/statRegularCheckTask",
       newUrl: "/regular/check/stat/task/get"
   },
   {
       oldUrl: "/RegularCheck/listRegularCheckTaskInfo",
       newUrl: "/regular/check/task/info/list"
   },
   {
       oldUrl: "/RegularCheck/submitRegularCheckItemInfo",
       newUrl: "/regular/check/submit/item/info/update"
   },
   {
       oldUrl: "/RegularCheck/listRegularCheckItemInfo",
       newUrl: "/regular/check/item/info/list"
   },
   {
       oldUrl: "/monitor/listAppEquipmentMonitor",
       newUrl: "/monitor/equip/list"
   },
   {
       oldUrl: "/monitor/getMonitorStatus",
       newUrl: "/monitor/status/get"
   },
   {
       oldUrl: "/monitor/listEquipmentMonitorIndexApp",
       newUrl: "/monitor/equip/index/list"
   },
   {
       oldUrl: "/monitor/listMeterIndexApp",
       newUrl: "/monitor/meter/index/list"
   },
   {
       oldUrl: "/monitor/listMeterAllIndexApp",
       newUrl: "/monitor/meter/all/index/list"
   },
   {
       oldUrl: "/monitor/listEquipmentIndexApp",
       newUrl: "/monitor/equip/index/app/list"
   },
   {
       oldUrl: "/monitor/listEquipmentAllIndexApp",
       newUrl: "/monitor/equip/all/index/list"
   },
   {
       oldUrl: "/monitor/addMonitorApp",
       newUrl: "/monitor/add"
   },
   {
       oldUrl: "/monitor/addProductMonitorApp",
       newUrl: "/monitor/product/add"
   },
   {
       oldUrl: "/monitor/listAppMeterMonitor",
       newUrl: "/monitor/meter/list"
   },
   {
       oldUrl: "/monitor/deleteAppMonitorIndex",
       newUrl: "/monitor/index/delete"
   },
   {
       oldUrl: "/monitor/deleteAppMonitor",
       newUrl: "/monitor/delete/app"
   },
   {
       oldUrl: "/monitor/listMeterMonitorIndexApp",
       newUrl: "/monitor/meter/index/app/list"
   },
   {
       oldUrl:
           "/meterEquipment/getMeterEquipmentParameterDataHistory",
       newUrl: "/meter/equip/parameter/history/get"
   },
   {
       oldUrl: "/modelPartSpare/querySpareByEquipmentIdList",
       newUrl: "/model/part/spare/list"
   },
   {
       oldUrl: "/equip/queryEquipTypeByEid",
       newUrl: "/equip/type/get"
   },
   {
       oldUrl: "/equip/alarm/getMonthAlarmAccumulateInfo",
       newUrl: "/equip/alarm/month/accumulate/info/get"
   },
   {
       oldUrl: "/equip/alarm/listRealTimeAlarm",
       newUrl: "/equip/alarm/realtime/list"
   },
   {
       oldUrl: "/equip/alarm/listEntAlarmCategorys",
       newUrl: "/equip/alarm/category/list"
   },
   {
       oldUrl: "/equip/alarm/listAlarmHistory",
       newUrl: "/equip/alarm/history/list"
   },
   {
       oldUrl: "/equip/alarm/listRuleDatas",
       newUrl: "/equip/alarm/rule/list"
   },
   {
       oldUrl:
           "/eqpShutdownReasonRecord/saveShutdownReasonRecord",
       newUrl: "/equip/shutdown/reason/record/update"
   },
   {
       oldUrl:
           "/eqpShutdownReasonRecord/listEqpShutdownReasonRecord",
       newUrl: "/equip/shutdown/reason/record/list"
   },
   {
       oldUrl:
           "/eqpShutdownReasonTree/getEqpShutdownReasonTree",
       newUrl: "/equip/shutdown/reason/tree/get"
   },
   {
       oldUrl: "/alarm2/listRuleIndexData",
       newUrl: "/alarm2/rule/index/list"
   },
   {
       oldUrl: "/enterprise/getEnterpriseStructure",
       newUrl: "/enterprise/structure/get"
   },
   {
       oldUrl: "/area/getAreaEnergys",
       newUrl: "/area/energy/get"
   },
   {
       oldUrl: "/area/listAreaTree",
       newUrl: "/area/tree/list"
   },
   {
       oldUrl: "/area/treeArea",
       newUrl: "/area/tree/get"
   },
   {
       oldUrl: "/material/getMaterialListByPage",
       newUrl: "/material/list"
   },
   {
       oldUrl: "/material/getMaterialTypeList",
       newUrl: "/material/type/list"
   },
   {
       oldUrl: "/repairCourse/listRepairCourse",
       newUrl: "/repair/course/list"
   },
   {
       oldUrl: "/commonProp/listCommonProps",
       newUrl: "/common/prop/list"
   },
   {
       oldUrl: "/meter/listMeterType",
       newUrl: "/meter/type/list"
   },
   {
       oldUrl: "/file/upload",
       newUrl: "/file/add"
   },
   {
       oldUrl: "/materialCheckingConfig/listCheckingMaterial",
       newUrl: "/material/checking/config/list"
   },
   {
       oldUrl:
           "/incomingOrProcessResult/deleteIncomingOrProcessList",
       newUrl: "/incoming/process/delete"
   },
   {
       oldUrl: "/incomingOrProcessResult/listMaterialTree",
       newUrl: "/incoming/process/tree/list"
   },
   {
       oldUrl:
           "/incomingOrProcessResult/addOrUpdateIncomingCheck",
       newUrl: "/incoming/process/add"
   },
   {
       oldUrl: "/incomingOrProcessResult/getIncomingResult",
       newUrl: "/incoming/process/get"
   },
   {
       oldUrl:
           "/incomingOrProcessResult/IncomingCountsByMateriel",
       newUrl: "/incoming/process/inc/count/materiel/get"
   },
   {
       oldUrl:
           "/incomingOrProcessResult/IncomingCountsBySupplier",
       newUrl: "/incoming/process/inc/count/supplier/get"
   },
   {
       oldUrl:
           "/incomingOrProcessResult/IncomingOrProcessCounts",
       newUrl: "/incoming/process/inc/count/get"
   },
   {
       oldUrl: "/incomingOrProcessResult/processCountsByArea",
       newUrl: "/incoming/process/pro/count/area/get"
   },
   {
       oldUrl: "/incomingOrProcessResult/processCountsByCp",
       newUrl: "/incoming/process/pro/count/cp/get"
   },
   {
       oldUrl:
           "/incomingOrProcessResult/ProcessCountsByMateriel",
       newUrl: "/incoming/process/pro/count/materiel/get"
   },
   {
       oldUrl:
           "/incomingOrProcessResult/processCountsBySequence",
       newUrl: "/incoming/process/pro/count/sequence/get"
   },
   {
       oldUrl:
           "/incomingOrProcessResult/listMaterialTypeOnCheckingMaterialAndAllResp",
       newUrl: "/incoming/process/type/list"
   },
   {
       oldUrl: "/QualityManageApp/addOrUpdateAppProcessCheck",
       newUrl: "/quality/manage/process/check/add"
   },
   {
       oldUrl: "/QualityManageApp/getAppIncomingByMaterial",
       newUrl: "/quality/manage/incoming/material/get"
   },
   {
       oldUrl: "/QualityManageApp/getAppProcessByMaterial",
       newUrl: "/quality/manage/process/material/get"
   },
   {
       oldUrl: "/QualityManageApp/getAppProcessResult",
       newUrl: "/quality/manage/process/result/get"
   },
   {
       oldUrl: "/QualityManageApp/listAppIncomingOrProcess",
       newUrl: "/quality/manage/incoming/process/list"
   },
   {
       oldUrl: "/supplierConfig/listSupplier",
       newUrl: "/supplier/config/list"
   },
   {
       oldUrl: "/supplierConfig/listSupplierByType",
       newUrl: "/supplier/config/type/list"
   },
   {
       oldUrl: "/user/listEntUser",
       newUrl: "/user/list"
   },
   {
       oldUrl: "/user/getUser",
       newUrl: "/user/get"
   },
   {
       oldUrl: "/user/updatePassword",
       newUrl: "/user/password/update"
   },
   {
       oldUrl: "/message/listMessageCategory",
       newUrl: "/message/category/list"
   },
   {
       oldUrl: "/message/listMessage",
       newUrl: "/message/list"
   },
   {
       oldUrl: "/message/setMessageHasRead",
       newUrl: "/message/set/read/get"
   },
   {
       oldUrl: "/message/countUnreadMessage",
       newUrl: "/message/unread/count"
   },
   {
       oldUrl: "/materialDistribute/listMaterialDistributeRecord",
       newUrl: "/material/distribute/record/list"
   },
   {
       oldUrl: "/materialDistribute/returnQuantity",
       newUrl: "/material/distribute/return/quantity/get"
   },
   {
       oldUrl: "/materialDistribute/deleteMaterialDistribute",
       newUrl: "/material/distribute/delete"
   },
   {
       oldUrl: "/materialDistribute/saveMaterialDistribute",
       newUrl: "/material/distribute/update"
   },
   {
       oldUrl: "/ProductionExecution/listCourse",
       newUrl: "/production/execution/course/list"
   },
   {
       oldUrl: "/ProductionExecution/listShift",
       newUrl: "/production/execution/shift/list"
   },
   {
       oldUrl: "/ProductionExecution/listTask",
       newUrl: "/production/execution/task/list"
   },
   {
       oldUrl: "/ProductionExecution/getRecord",
       newUrl: "/production/execution/record/get"
   },
   {
       oldUrl: "/ProductionExecution/stopTask",
       newUrl: "/production/execution/task/stop/get"
   },
   {
       oldUrl: "/ProductionExecution/openTask",
       newUrl: "/production/execution/task/open/get"
   },
   {
       oldUrl: "/ProductionExecution/closeTask",
       newUrl: "/production/execution/task/close/get"
   },
   {
       oldUrl: "/ProductionExecution/getSheet",
       newUrl: "/production/execution/sheet/get"
   },
   {
       oldUrl: "/ProductionExecution/returnTask",
       newUrl: "/production/execution/task/return/update"
   },
   {
       oldUrl: "/ProductionExecution/listFinishTask",
       newUrl: "/production/execution/task/finish/list"
   },
   {
       oldUrl: "/ProductionExecution/listSheetItem",
       newUrl: "/production/execution/sheet/item/list"
   },
   {
       oldUrl: "/ProductionExecution/addSheet",
       newUrl: "/production/execution/sheet/add"
   },
   {
       oldUrl: "/productionAnalysis/listProductionAnalysis",
       newUrl: "/production/analysis/list"
   },
   {
       oldUrl: "/productionTask/listProductionTask",
       newUrl: "/production/task/list"
   },
   {
       oldUrl: "/login/password",
       newUrl: "/login/password"
   },
   {
       oldUrl: "/login/sendVerCode",
       newUrl: "/login/sendVerCode"
   },
   {
       oldUrl: "/login/verificationCode",
       newUrl: "/login/verificationCode"
   },
   {
       oldUrl: "/appVersion/getLatestVersion",
       newUrl: "/appVersion/getLatestVersion"
   },
   {
       oldUrl: "/appVersion/getLatestVersion",
       newUrl: "/appVersion/getLatestVersion"
   },
   {
       oldUrl: "/repairTask/queryRepairTaskAcceptedCount",
       newUrl: "/task/repair/accepted/count"
   }, {
       oldUrl: '/tradeIndexType/add',
       newUrl: '/tradeIndexType/add'
   },

   {
       oldUrl: '/tradeIndexType/delete',
       newUrl: '/tradeIndexType/delete'
   },

   {
       oldUrl: '/tradeIndexType/get',
       newUrl: '/tradeIndexType/get'
   },

   {
       oldUrl: '/tradeIndexType/list',
       newUrl: '/tradeIndexType/list'
   },

   {
       oldUrl: '/tradeIndexType/modify',
       newUrl: '/tradeIndexType/modify'
   },

   {
       oldUrl: '/tradeIndexType/page',
       newUrl: '/tradeIndexType/page'
   },

   {
       oldUrl: '/user/subscribe/add',
       newUrl: '/user/subscribe/add'
   },

   {
       oldUrl: '/user/subscribe/delete',
       newUrl: '/user/subscribe/delete'
   },

   {
       oldUrl: '/user/subscribe/get',
       newUrl: '/user/subscribe/get'
   },

   {
       oldUrl: '/user/subscribe/list',
       newUrl: '/user/subscribe/list'
   },

   {
       oldUrl: '/user/subscribe/modify',
       newUrl: '/user/subscribe/modify'
   },

   {
       oldUrl: '/user/subscribe/month/list',
       newUrl: '/user/subscribe/month/list'
   },

   {
       oldUrl: '/user/subscribe/months/list',
       newUrl: '/user/subscribe/months/list'
   },

   {
       oldUrl: '/user/subscribe/page',
       newUrl: '/user/subscribe/page'
   },

   {
       oldUrl: '/user/subscribe/year/list',
       newUrl: '/user/subscribe/year/list'
   },

   {
       oldUrl: '/energy/type/list',
       newUrl: '/energy/type/list'
   },

   {
       oldUrl: '/appVersion/deleteAppVersion',
       newUrl: '/appVersion/deleteAppVersion'
   },

   {
       oldUrl: '/appVersion/getLatestVersion',
       newUrl: '/appVersion/getLatestVersion'
   },

   {
       oldUrl: '/appVersion/listAllAppVersion',
       newUrl: '/appVersion/listAllAppVersion'
   },

   {
       oldUrl: '/appVersion/saveAppVersion',
       newUrl: '/appVersion/saveAppVersion'
   },
   // {
   //     oldUrl: '/resource/listUserMenusByAppV1',
   //     newUrl: '/login/userMenu/list/by/app'
   // },
   {
       oldUrl: '/resource/listUserMenusByAppV1',
       newUrl: '/open/resources/tree/user'
   },
   {
       oldUrl: '/RegularCheck/queryTaskCount',
       newUrl: '/regular/check/task/query/count'
   },
   {
       oldUrl: '/alarm2/queryAlarmCount',
       newUrl: '/alarm2/query/alarm/count'
   },
   {
       oldUrl: '/monitor/status/list',
       newUrl: '/monitor/status/list'
   },
   {
       oldUrl: "/cementRotaryTarget/listArea",
       newUrl: "/cement/rotary/area/target/list"
   },
   {
       oldUrl: "/cementRotaryTarget/list",
       newUrl: "/cement/rotary/target/list"
   },
   {
       oldUrl: "/equip/alarm/listAlarmHistoryByApp",
       newUrl: "/equip/alarm/history/list/app"
   },
   {
       oldUrl: "/meter/getMeterTypes",
       newUrl: "/meter/getMeterTypes"
   },
   /**
    * @describe 获取详情
    */
   {
       oldUrl: "/cooperate/event/show/list/detail",
       newUrl: "/matter/get/detail"
   },
   /**
    * @describe 是否收到新的评论 or 用户是否有收到新的回复,徽标红点显示接口
    */
   {
       oldUrl: "/cooperate/new/comment",
       newUrl: "/matter/get/badge"
   },
   /**
    * @describe 今日协作汇总or 协作统计--用户事项统计接口
    */
   {
       oldUrl: "/cooperate/stat/today",
       newUrl: "/matter/my/stat"
   },
   /**
    * @describe 事件发布 or 发布协作事项
    */
   {
       oldUrl: "/cooperate/event/publish",
       newUrl: "/matter/add"
   },
   /**
    * @describe 删除事项
    */
   {
       oldUrl: "/cooperate/event/delete",
       newUrl: "/matter/delete"
   },
   /**
    * @describe 删除事项动态 小红点
    */
   {
       oldUrl: "/cooperate/delete/badge",
       newUrl: "/matter/delete/badge"
   },
   /**
    * @describe 事项列表
    */
   {
       oldUrl: "/cooperate/event/show/list",
       newUrl: "/matter/user/list"
   },
   /**
    * @describe 修改事项状态 or  的事项列表事项处理 , 返回是否处理成功
    */
   {
       oldUrl: "/cooperate/event/approval",
       newUrl: "/matter/status/modify"
   },
   /**
    * @describe 查询当前页面的事项列表 or 发布页面截图的事项列表
    */
   {
       oldUrl: "/cooperate/list/pageId",
       newUrl: "/matter/list/pageId"
   },
   {
       oldUrl: "/matterReceiver/list/by/matterId",
       newUrl: "/matterReceiver/list/by/matterId"
   },
   {
       oldUrl: "/cooperate/matter/comment/add",
       newUrl: "/matterComment/add"
   },
   {
       oldUrl: "/cooperate/matter/comment/delete",
       newUrl: "/matterComment/delete"
   },
   {
       oldUrl: "/cooperate/matter/comment/get",
       newUrl: "/matterComment/get"
   },
   {
       oldUrl: "/cooperate/matter/comment/list",
       newUrl: "/matterComment/list"
   },
   {
       oldUrl: "/cooperate/matter/comment/list/ignore/logic",
       newUrl: "/matterComment/list/ignore/logic"
   },
   {
       oldUrl: "/cooperate/matter/comment/page",
       newUrl: "/matterComment/page"
   },
   {
       oldUrl: "/cooperate/organization/user/list",
       newUrl: "/organizationUser/user/list"
   },
   {
       oldUrl: "/cooperate/receiver/msg/user/list",
       newUrl: "/matterReceiverMsg/list/user/new"
   },
   {
       oldUrl: "/cooperate/matter/page/org",
       newUrl: "/matter/page/org"
   },
   {
       oldUrl: "/cooperate/matter/address",
       newUrl: "/matter/address"
   },
   {
       oldUrl: "/acctIUserApply/addApplyMenu",
       newUrl: "/userApplyResources/add/apply"
   },
   {
       oldUrl: "/acctIUserApply/getMenuByUser",
       newUrl: "/userApplyResources/list/user/apply"
   },
   {
       oldUrl: "/user/account/login",
       newUrl: "/oauth/account/login"
   }
   
];
module.exports = url;
