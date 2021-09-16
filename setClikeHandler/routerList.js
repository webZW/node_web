const public = [
  {
    path: 'companieslist',
    name: '切换企业'
  },
  {
    path: 'blank',
    name: '空白页'
  },
  {
    path: 'workBench',
    name: '工作台'
  },
  {
    path: 'workBench_test',
    name: '工作台'
  },
  {
    path: 'workBenchList',
    name: '工作台列表'
  },
  {
    path: '404',
    name: '404错误界面'
  },
  {
    path: 'customTemplate',
    name: '自定义看板'
  }
];

const config = [
  {
    name: '设备配置-维修班组',
    path: 'maintenanceClassManagement',
  },
  {
    name: '班次班组管理',
    path: 'classesManagement',
  },
  {
    name: '报工项目管理',
    path: 'workerprogram',
  },
  {
    name: '设备模型定义',
    path: 'equipmentModelSeting',
  },
  {
    name: '质量管理-测量单位',
    path: 'measurementUnit',
  },
  {
    name: '质量管理-来料检验配置',
    path: 'incomingInspectionConfig',
  },
  {
    name: '质量管理-产品检验配置',
    path: 'processInspectionConfig',
  },
  {
    name: '质量管理-来料检验标准',
    path: 'incomingStandard',
  },
  {
    name: '质量管理-产品检验标准',
    path: 'processStandard',
  },
  {
    name: '质量管理-过程检验',
    path: 'processInspection',
  },
  {
    name: '质量管理-来料检验',
    path: 'incomingInspection',
  },
  {
    name: '质量管理-仓库检验',
    path: 'warehouseInspection',
  },
  {
    name: '质量管理-完工检验',
    path: 'productInspection',
  }, {
    name: '质量管理-检验模板预览',
    path: 'templatePreview',
  }, {
    name: '质量管理-质检任务-检验回显',
    path: 'templateHasDataPreview',
  },
  {
    name: '区域配置',
    path: 'regionalConfiguration',
  },
  {
    name: '产品配置',
    path: 'productManagement',
  },
  {
    name: '统计调整',
    path: 'statistical',
  },
  {
    name: '物料管理',
    path: 'materialManage',
  },
  {
    name: '物料类别管理',
    path: 'materialCategoryMgr',
  },
  {
    name: '质量管理-供应商配置',
    path: 'SupplierManagement',
  },
  {
    name: '导航配置',
    path: 'configDH',
  },
  {
    name: '告警规则',
    path: 'alarmRule',
  },
  {
    name: '备件管理',
    path: 'reserveManagement'
  },
  {
    name: '工厂模型',
    path: 'factoryModel',
  },
  {
    name: '班次配置',
    path: 'scheduleAllocation',
  },
  {
    name: '班组配置',
    path: 'teamConfiguration',
  },
  {
    name: '物料类别配置',
    path: 'materialCategoryConfig',
  },
  {
    name: '物料信息配置',
    path: 'materialInfoConfig',
  },
  {
    name: '工艺配方配置',
    path: 'craftRecipe',
  },
  {
    name: '设备配置',
    path: 'equipmentConfiguration',
  },
  {
    name: '生产任务模板配置',
    path: 'proTaskTemplateConfig',
  },
  {
    name: '能耗对接',
    path: 'tableConfiguration',
  },
  {
    name: '能耗对接',
    path: 'tableConfiguration_new',
  },
  {
    name: '能源计量审查',
    path: 'energyMeasurementReview',
  },
  {
    name: '用户管理',
    path: 'userManagement',
  },
  {
    name: '角色管理',
    path: 'roleManagement',
  },
  {
    name: '仓库检验标准',
    path: 'warehouseStandard',
  },
  {
    name: '检验项目',
    path: 'inspectionItems',
  },
  {
    name: '质量管理-过程检验计划',
    path: 'processInspectionPlan',
  },
  {
    name: '生产管理-完工批次',
    path: 'completionBatch',
  },
  {
    name: '分级质检',
    path: 'gradingQualityInspection',
  },
  {
    name: '分级统计',
    path: 'gradingPlan',
  },
  {
    name: '质量管理-分级质检模板',
    path: 'hierarchicalQualityInspectionTemplate',
  }, {
    name: '质量分析-质量统计',
    path: 'qualityStatistical',
  },
  {
    name: '客户信息配置',
    path: 'customerInformationConfig',
  },
  {
    name: '工艺参数配置',
    path: 'processParameter',
  },
  {
    name: '工艺告警',
    path: 'processAlarm',
  },
  {
    name: '目标配置',
    path: 'targetConfiguration',
  },
  {
    name: '录入配置',
    path: 'enterConfig',
  },
  {
    name: '第三方数据同步',
    path: 'thirdPartyDataSynchronization',
  },
  {
    name: '检验数据审核',
    path: 'inspectionDataReview',
  },
  {
    name: '东鹏定制报表',
    path: 'dongPengSpecificReports',
  },
  {
    name: '安全设置',
    path: 'securitySetting',
  },
  {
    name: '生产录入明细',
    path: 'enterDetail',
  },
  {
    name: '东鹏定制报表',
    path: 'dongPengSpecificReports',
  },
  {
    name: '告警规则_新',
    path: 'alarmRule_new'
  },
  {
    name: '新增告警规则_新',
    path: 'addAlarmRule_new'
  },
  {
    name: '修改告警规则_新',
    path: 'editAlarmRule_new'
  },
  {
    name: '告警明细列表',
    path: 'alarmDetailsList',
  },
  {
    name: '告警明细详情',
    path: 'alarmDetailsView/:id',
  },
  {
    name: '路径配置',
    path: 'processPath',
  },
  {
    name: '追溯配置',
    path: 'traceConfig',
  }, {
    name: '质量追溯',
    path: 'qualityTrace',
  },
  {
    name: '能源报表',
    path: 'energyReportConfig',
  },
  {
    name: '能源报表配置',
    path: 'reportConfig',
  },
  {
    name: '组织架构',
    path: 'organizationalStructure',
  },
  {
    path: 'parsingTemplate',
    name: '解析模板',
  },
  {
    name: '模型配置',
    path: 'pulpingSchedulConfig',
  },
]

const operation = [
  {
    name: '在制品仓库',
    path: 'productionRepository',
  },
  {
    name: '生产执行',
    path: 'productionExecution',
  },
  {
    name: '设备台账',
    path: 'equipmentLedger',
  },
  {
    name: '工作台',
    path: 'taskAll',
  },
  {
    name: '完工维护',
    path: 'completionMaintenance',
  },
  {
    name: '排班管理',
    path: 'workforceManagement',
  },
  {
    name: '产能管理',
    path: 'capacityManagement',
  }, {
    name: '生产任务',
    path: 'productionTask',
  },
  {
    name: '设备点检',
    path: 'equipmentSpotInspection',
  },
  {
    name: '设备保养',
    path: 'equipmentMaintenance',
  },
  {
    name: '设备检修',
    path: 'equipmentOverhaul',
  },
  {
    name: '数据录入',
    path: 'dataEntry',
  }, {
    name: '配方优选',
    path: 'formulaSelect'
  },
  {
    name: '原料优选',
    path: 'materialSelect'
  }, {
    name: '原料批次管理',
    path: 'materialBatchManage'
  },
  {
    name: '库存盘点',
    path: 'Stocktaking',
  },
  {
    name: '库存初始化',
    path: 'StockReset',
  },
  {
    name: '完工入库',
    path: 'wipcompletion'
  },
  {
    name: '库存调拨',
    path: 'inventoryallocation'
  },
  {
    name: '库存一览',
    path: 'StockOverview',
  },
  {
    name: '库存明细',
    path: 'StockDetails',
  },
  {
    name: '知识库',
    path: 'knowledgeBase'
  },
  {
    name: '设备维修',
    path: 'task_all_repair_task',
  }, {
    name: '设备点检',
    path: 'task_all_tallying_task',
  }, {
    name: '设备保养',
    path: 'task_all_maintain_task',
  }, {
    name: '设备检修',
    path: 'task_all_overhaul_task',
  }, {
    name: '无效生产原因管理',
    path: 'invalidProductionCauseManage',
  }, {
    name: '设备配置-停机原因管理',
    path: 'shutdownReasonManagement',
  }, {
    name: '任务统计',
    path: 'taskStatistics',
  }, {
    name: '无效生产记录',
    path: 'invalidProductRecord',
  }, {
    name: '设备配置-停机原因管理',
    path: 'shutdownReasonManagement',
  }, {
    name: '维修统计',
    path: 'maintenanceStatistics',
  }, {
    name: '备件统计',
    path: 'sparePartsStatistics',
  }, {
    name: '月度计划表',
    path: 'monthlySchedule',
  },
  {
    name: '工艺备件分析',
    path: 'processAnalysis',
  },
  {
    name: '玻璃质量数据',
    path: 'qualityDataPage',
  },
  {
    name: '生产进度',
    path: 'productionSchedule',
  },
  {
    name: '停机记录',
    path: 'stopRecord',
  },
  {
    name: '粉料生产',
    path: 'powderProduction',
  },
  {
    name: '条码生成',
    path: 'qrcodeBuilder',
  },
  {
    name: '模板中心',
    path: 'qrcodeTemplate',
  },
  {
    name: '条码打印',
    path: 'qrcodePrinter',
  },
  {
    name: '损耗维护',
    path: 'lossMaintenance',
  },
  {
    name: '订单管理',
    path: 'orderManagement',
  },
  {
    name: '设备资源',
    path: 'equipmentResources',
  },
]

const pretreat = [
  {
    name: '连续球磨监测',
    path: 'continuousBallCrusherMonitor',
  },
  {
    name: '间歇球磨监测',
    path: 'IntermittentBallCrusherMonitor',
  },
  {
    name: '生产管理-生产进度',
    path: 'productSchedule',
  },
  {
    name: '生产管理-生产分析/生产统计',
    path: 'productionAnalysis',
  },
  {
    name: '生产分析',
    path: 'productionAnalyze',
  },
  {
    name: '辅料消耗',
    path: 'excipientConsumption',
  },
  {
    name: '能效分析',
    path: 'efficiencyAnalyze',
  },
  {
    name: '能源流向',
    path: 'energyFlowAnalyze',
  },
  {
    name: '峰谷分析',
    path: 'peakValleyAnalyze',
  },
  {
    name: '能源平衡',
    path: 'energyBalance',
  },
  {
    name: '能源质量',
    path: 'energyQuality',
  },
  {
    name: '用电分析',
    path: 'elecAnalysis',
  },
  {
    name: '容需分析',
    path: 'energyNeedAnalyze',
  },
  {
    name: '企业能耗概览',
    path: 'comEnergyOverview',
  },
  {
    name: '设备管理-故障维修',
    path: 'breakdownMaintenance',
  },
  {
    name: '设备管理-备件管理/备件库存',
    path: 'sparePartsManagement',
  },
  {
    name: '运行记录',
    path: 'runningRecord',
  },
  {
    name: '智能抄表',
    path: 'meterReading',
  },
  {
    name: '能源报表',
    path: 'energyReport',
  },
  {
    name: '特定报表',
    path: 'specificReports',
  },
  {
    name: '自定义报表',
    path: 'customReport',
  },
  {
    name: '报表预览',
    path: 'reportPreview',
  },
  {
    name: '生产订单',
    path: 'productOrder'
  }, {
    name: '生产批次',
    path: 'productBatch'
  }, {
    name: '目标配置',
    path: 'configTarget',
  },
  {
    name: '能源价格',
    path: 'energyPrice'
  },
  {
    name: '实时成本分析',
    path: 'constantlyConstAnalysis',
  },
  {
    name: '能源数据录入',
    path: 'manualReading',
  },
  {
    name: '数据查询',
    path: 'dataQuery',
  }, {
    name: '全厂计量',
    path: 'wholePlantMeasurement'
  },
  {
    name: '山鹰特定报表',
    path: 'shanYingspecificReports'
  }

]

const view = [
  {
    path: 'standardSnalysis',
    name: '对标分析',
  },
  {
    path: 'operationLog',
    name: '操作日志'
  },
  {
    path: 'communicationAlarm',
    name: '通讯告警'
  },
  {
    path: 'equipmentAlarm',
    name: '参数告警'
  },
  {
    path: 'processLimit',
    name: '指标告警'
  },
  {
    path: 'MessageCenter',
    name: '消息中心'
  },
  {
    path: 'energyConsumptionEstimation',
    name: '能源预测'
  },
  {
    path: 'statisticsofballmill',
    name: '球磨统计'
  },
  {
    path: 'downtimeAnalysis',
    name: '停机分析'
  },
  {
    path: 'spareAnalyze',
    name: '备件分析'
  },
  {
    path: 'spareConsumeStatistics',
    name: '备件消耗统计'
  },
  {
    path: 'associationAnalysis',
    name: '趋势分析'
  },
  {
    path: 'correlationanalysis',
    name: '相关分析'
  },
  {
    path: 'standIndex',
    name: '对标分析'
  }, {
    name: '相关分析',
    path: 'relatedAnalysis'
  },
  {
    path: 'frequencyDomainAnalysis',
    name: '频域分析'
  },
  {
    path: 'clusterAnalysis',
    name: '聚类分析'
  },
  {
    path: 'incomingQualityStatistics',
    name: '来料质量统计'
  },
  {
    path: 'processQualityStatistics',
    name: '过程质量统计'
  },
  {
    path: 'processQualityAnalyze',
    name: '过程质量分析'
  },
  {
    path: 'productionMonitoring',
    name: '生产监测'
  },
  {
    path: 'meterMonitoring',
    name: '计量监测'
  },
  {
    path: 'communicationMonitoring',
    name: '通讯监测'
  }, {
    name: '破碎机监测',
    path: 'crusherMonitor'
  }, {
    name: '能源统计',
    path: 'energyStatistics'
  }, {
    name: '质量统计',
    path: 'qualityStatistics'
  }, {
    name: '产量统计',
    path: 'outputStatistics'
  }, {
    name: '物料统计',
    path: 'materieStatistics'
  }, {
    name: '班组统计',
    path: 'classGroupStatistics'
  }, {
    name: '设备统计',
    path: 'equipmentStatistics'
  }, {
    name: '产品分析',
    path: 'productAnalysis'
  }, {
    name: '设备分析',
    path: 'equipmentAnalysis'
  }, {
    name: '质量分析',
    path: 'qualityAnalysis'
  },
  {
    name: '干燥部优化',//废弃
    path: 'dryerSection',
  }, {
    name: '无效生产分析',
    path: 'invalidProductAnalysis'
  },
  {
    name: '完工批次分析',
    path: 'finishedBatchAnalysis'
  }, {
    name: '工艺参数分析',
    path: 'craftParamsAnalysis'
  }, {
    name: '仓库出库',
    path: 'storeOutbound'
  }, {
    name: '副产品统计',
    path: 'byProductStatistics',
  }, {
    name: '干燥部优化2',
    path: 'dryerSectionNew',
  },
  {
    name: '热分散优化_静态',
    path: 'thermalDispersionOptimization',
  },
  {
    name: '热分散优化',
    path: 'thermalDispersionOptimization1',
  },
  {
    path: 'bestPractice',
    name: '最佳操作',
  },
  {
    path: 'energyReportNew',
    name: '能源报表-新',
  },
  {
    path: 'markDetail',
    name: '标识明细',
  },
  {
    path: 'pulpSchedule',
    name: '制浆调度',
  },

]

module.exports = {
  public,
  config,
  operation,
  pretreat,
  view,
}