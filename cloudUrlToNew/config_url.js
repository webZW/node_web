module.exports = {
	oauth: { // 统一账号域
		listUserMenus: OAUTH + 'resource/listUserMenus',
	},
	enterprise: {  // 企业模型域
		getEnterpriseStructure: 'enterprise/getEnterpriseStructure',
		recursionAddAreaShift: 'productConfig/recursionAddAreaShift',
		deleteShiftInfo: 'productConfig/deleteShiftInfo',
		addShiftInfo: 'productConfig/addShiftInfo',
		updateShiftInfo: 'productConfig/updateShiftInfo',
		getShiftListByEid: 'productConfig/getShiftListByEid',
		listAreaTreeToShfit: 'productConfig/listAreaTreeToShfit',

		listCourseTree: 'course/listCourseTree',
		deleteCourseGroup: 'course/deleteCourseGroup',
		addOrUpdateCourseGroup: 'course/addOrUpdateCourseGroup',

		listEntUser: 'user/listEntUser',
		listRepairCourse: 'repairCourse/listRepairCourse',
		deleteRepairCourse: 'repairCourse/deleteRepairCourse',
		addOrUpdateRepairCourse: 'repairCourse/addOrUpdateRepairCourse',
		treeArea: 'area/treeArea',

		deleteUnitType: 'measureUnit/deleteUnitType', // 删除单位类别
		listUnitType: 'measureUnit/listUnitType', // 获取单位类别数据
		addOrUpdateUnitType: 'measureUnit/addOrUpdateUnitType', // 添加或者编辑单位类别

		deleteMeasureUnit: 'measureUnit/deleteMeasureUnit', // 删除测量单位
		listMeasureUnit: 'measureUnit/listMeasureUnit', // 获取测量单位数据
		addOrUpdateMeasureUnit: 'measureUnit/addOrUpdateMeasureUnit', // 添加或者编辑测量单位

		deleteCheckProjectType: 'checkProject/deleteCheckProjectType', // 删除检验项目类别
		addCheckProjectType: 'checkProject/addCheckProjectType', // 新增/修改检验项目类别
		listCheckProjectType: 'checkProject/listCheckProjectType', // 检验项目类别列表

		listCheckProject: 'checkProject/listCheckProject', // 检验项目列表
		deleteCheckProject: 'checkProject/deleteCheckProject', // 删除检验项目
		getProjectUnit: 'checkProject/getProjectUnit', // 获取单位树接口
		getProjectComponent: 'checkProject/getProjectComponent', // 获取组件接口
		addCheckProject: 'checkProject/addCheckProject', // 新增/修改检验项目

		getPreviewProcessTemplate: 'checkProject/getPreviewProcessTemplate', // 过程检验模板-预览
		saveProjectSortByCome: 'templateProject/saveProjectSortByCome',  // 保存【来料】模板项目的顺序
		saveProjectSortByProcess: 'templateProject/saveProjectSortByProcess',  // 保存【过程】模板项目的顺序
		listTemplate: 'checkTemplate/listTemplate', // 获取检验模板数据
		getIncomingTemplate: 'checkTemplate/getIncomingTemplate', // 获取模板数据
		getProcessTemplate: 'checkProject/getProcessTemplate', // 获取过程模板数据标准检验模板数据

		addOrUpdateTemplate: 'checkTemplate/addOrUpdateTemplate', // 添加或者修改检验模板
		deleteCheckoutTemplate: 'checkTemplate/deleteTemplate', // 删除检验模板

		deleteTemplateProcess: 'templateProject/deleteTemplateProcess',  // 删除【过程】 模板工序
		addOrUpdateProcessProject: 'templateProject/addOrUpdateProcessProject',  // 过程-添加、编辑工序项目 以及 工序
		addProjectByCome: 'templateProject/addProjectByCome',  // 来料-添加定量、定性项目
		addBaseProject: 'templateProject/addBaseProject',  // 保存基本信息项目 来料、过程

		getMaterialQRCode: 'material/getMaterialQRCode', // 获取物料二维码接口
		getMaterialTypeList: 'material/getMaterialTypeList', // 获取物料类别列表信息
		getMaterialListByPage: 'material/getMaterialListByPage', // 获取物料管理列表
		downMaterialTemple: 'material/downMaterialTemple', // 物料信息模板下载
		deleteMaterial: 'material/deleteMaterial', // 删除物料信息
		importMaterial: 'material/importMaterial', // 批量导入物料信息表
		saveOrUpdateMaterial: 'material/saveOrUpdateMaterial', // 更新或者新增物料
		saveOrUpdateFormula: 'materialFormula/saveOrUpdateFormula', // 更新或者新增物料配方
		deleteFormula: 'materialFormula/deleteFormula', // 删除单个物料配方的相关信息
		getFormulaProjectList: 'materialFormula/getFormulaProjectList', // 获取物料配方方案列表
		searchMaterialList: 'materialFormula/searchMaterialList', // 搜索物料管理列表
		descibeFormulaProject: 'materialFormula/descibeFormulaProject', // 获取单个物料配方方案的相关数据

		listCheckProjectTypeAndProject: 'checkProject/listCheckProjectTypeAndProject', // 编辑工序检验项目信息
		listStandardTemplate: 'checkTemplate/listStandardTemplate', // 获取标准检验模板数据
		listCheckingMaterial: 'materialCheckingConfig/listCheckingMaterial', // 物料列表查询
		getIncomingTemplateStandard: 'checkTemplate/getIncomingTemplateStandard', // 获取来料
		getProcessStandardTemplate: 'checkProject/getProcessStandardTemplate', // 过程标准检验模板
		saveIncomingStandardTemplate: 'checkTemplate/saveIncomingStandardTemplate', // 过程标准模板-数据的保存
		saveProcessTemplateData: 'checkProject/saveProcessTemplateData', // 过程标准模板-数据的保存
		deleteStandardTemplate: 'checkTemplate/deleteStandardTemplate', // 删除标准检验模板
		addOrUpdateStandardTemplate: 'checkTemplate/addOrUpdateStandardTemplate', // 添加或者修改标准检验模板

		listAreaTree: 'area/listAreaTree', // 查询区域结构树
		listSupplier: 'supplierConfig/listSupplier', // 供应商列表查询
		upload: 'file/upload', // 设备检修计划上传文件

		listCommonProps: 'commonProp/listCommonProps',
		deleteProduct: 'product/deleteProduct',
		getProductDetail: 'product/getProductDetail',
		listProduct: 'product/listProduct',
		saveProduct: 'product/saveProduct',

		importCloudAreaTemplate: 'area/importCloudAreaTemplate',
		getCloudAreaTemplateURL: 'area/getCloudAreaTemplateURL',
		deleteArea: 'area/deleteArea', // 删除区域
		updateCloudArea: 'area/updateCloudArea', // 编辑的区域or 设备 信息 【应用平台】
		saveCloudArea: 'area/saveCloudArea', // 保存的区域or 设备 信息 【应用平台】
		getSupplier: 'supplierConfig/getSupplier', // 供应商详情查询

		deleteSupplier: 'supplierConfig/deleteSupplier', // 供应商删除
		addOrUpdateSupplier: 'supplierConfig/addOrUpdateSupplier', // 供应商添加
		deleteSupplierType: 'supplierConfig/deleteSupplierType', // 供应商类别删除
		listSupplierType: 'supplierConfig/listSupplierType', // 供应商类别查询
		addOrUpdateSupplierType: 'supplierConfig/addOrUpdateSupplierType', // 供应商类别添加

		updateFormulaTask: 'areaFormulaScheme/updateFormulaTask', // 修改公式调整任务
		getFormulaTask: 'areaFormulaScheme/getFormulaTask', // 获取公式调整任务详情
		addFormulaTask: 'areaFormulaScheme/addFormulaTask', // 添加公式调整任务
		listFormulaGroup: 'areaFormulaScheme/listFormulaGroup', // 获取某方案公式组列表
		listAllScheme: 'areaFormulaScheme/listAllScheme', // 获取全部区域公式方案列表
		deleteFormulaTask: 'areaFormulaScheme/deleteFormulaTask', // 删除公式调整任务
		listFormulaTask: 'areaFormulaScheme/listFormulaTask', // 获取公式调整任务列表

		getScheme: 'areaFormulaScheme/getScheme', // 获取公式方案详情
		updateScheme_new: 'scheme/updateScheme', // 更新区域公式方案
		addSchemes: 'scheme/addScheme', // 添加区域公式方案
		deleteSchemes: 'scheme/deleteScheme', // 删除区域公式方案
		getDefaultFormula: 'areaFormulaScheme/getDefaultFormula', // 获取默认区域公式
		listScheme: 'areaFormulaScheme/listScheme', // 获取区域公式方案列表

		deleteCustomizedMenu: 'customizedEnterprise/deleteCustomizedMenu', // 删除自定义菜单
		listCustomizedMenu: 'customizedEnterprise/listCustomizedMenu', // 获取自定义菜单
		saveCustomizedMenu: 'customizedEnterprise/saveCustomizedMenu', // 保存自定义菜单
	},
	product: { // 生产过程域
		listSheetAdditionScheme: 'sheetAdditionScheme/listSheetAdditionScheme',
		addOrUpdateSheetAdditionScheme: 'sheetAdditionScheme/addOrUpdateSheetAdditionScheme',
		deleteSheetAdditionScheme: 'sheetAdditionScheme/deleteSheetAdditionScheme',
		listProductionTask: 'productionTask/listProductionTask', // 获取生产任务列表
		listShift: 'ProductionExecution/listShift',
		listSheetAddition: 'sheetAdditionScheme/listSheetAdditionScheme',
	},
	equipment: { // 设备域
		deleteEqpShutdownReason: 'eqpShutdownReason/deleteEqpShutdownReason',
		listEqpShutdownReason: 'eqpShutdownReason/listEqpShutdownReason',
		updateEqpShutdownReason: 'eqpShutdownReason/updateEqpShutdownReason',
		addEqpShutdownReason: 'eqpShutdownReason/addEqpShutdownReason',
		getImportEqpShutdownReasonTemplate: 'eqpShutdownReason/getImportEqpShutdownReasonTemplate',
		importEqpShutdownReason: 'eqpShutdownReason/importEqpShutdownReason',

		listEqpShutdownReasonTree: 'eqpShutdownReasonTree/listEqpShutdownReasonTree',
		deleteEqpShutdownReasonTree: 'eqpShutdownReasonTree/deleteEqpShutdownReasonTree',
		getEqpShutdownReasonTree: 'eqpShutdownReasonTree/getEqpShutdownReasonTree',

		addEqpShutdownReasonTree: 'eqpShutdownReasonTree/addEqpShutdownReasonTree',
		updateEqpShutdownReasonTree: 'eqpShutdownReasonTree/updateEqpShutdownReasonTree',

		saveEqpShutdownReasonTreeApply: 'eqpShutdownReasonTreeApply/saveEqpShutdownReasonTreeApply',
		listEqpShutdownReasonTreeApply: 'eqpShutdownReasonTreeApply/listEqpShutdownReasonTreeApply',

		addEquipmentModel: 'model/addEquipmentModel', // 新增设备模型
		deleteEquipmentModel: 'model/deleteEquipmentModel', // 删除设备模型
		queryEquipmentModel: 'model/queryEquipmentModel', // 设备模型列表
		updateEquipmentModel: 'model/updateEquipmentModel', // 更新设备模型

		deleteEquipmentModelPart: 'modelPart/deleteEquipmentModelPart', // 删除设备模型-部位
		queryEquipmentModelPart: 'modelPart/queryEquipmentModelPart', // 设备模型部位列表
		addEquipmentPartModel: 'modelPart/addEquipmentPartModel', // 新增设备模型-部位
		updateEquipmentPartModel: 'modelPart/updateEquipmentPartModel', // 更新设备模型-部位

		getMaterialTypes: 'modelPart/getMaterialTypes', // 返回备件下的物料类型
		listSpareStock: 'equipmentSpare/listSpareStock',
		queryEquipmentModelPartSpare: 'modelPartSpare/queryEquipmentModelPartSpare', // 设备模型-部位-备件列表
		deleteEquipmentModelPartSpare: 'modelPartSpare/deleteEquipmentModelPartSpare', // 删除设备模型-部位-备件
		addEquipmentModelPartSpare: 'modelPartSpare/addEquipmentModelPartSpare', // 新增设备模型-部位-备件

		listMetersByEnergy: 'meterInfo/listMetersByEnergy',

	},

	// 物料配置
	material: {
		getMaterialTypeList: 'material/getMaterialTypeList', // 获取物料类别列表信息
		materialToSheetSchemes: 'material/materialToSheetSchemes', // 这个原项目没有注释
		deleteMaterialType: 'material/deleteMaterialType', // 这个也没注释...
		saveOrUpdateMaterialType: 'material/saveOrUpdateMaterialType', // 获取物料类别列表信息
		gradeManage: 'material/gradeManage', // 没注释啊兄dei
	},

	efficiency: {
		saveEnergyShareInfo: 'energy/share/saveEnergyShareInfo', // 没注释啊兄dei
		getEnergyShare: 'energy/share/getEnergyShare', // 获取分摊详情
		deletEnergyShare: 'energy/share/deletEnergyShare', // 删除分摊信息
		listEnergyShare: 'energy/share/listEnergyShare', // 获取分摊类表
	},

}