//noinspection Eslint
/**
 * Created by Rabbit 下午2:13
 */

const Config = {
    timerCount: 60,
    //false默认账号登录
    //true输入用户名登录
    isTest: false,
    baseApi: false ? 'http://172.16.10.201:8045/erp_zj_dljt' : 'http://139.224.199.31:8182/erp_test',//测试
    // baseApi: false ? 'http://172.16.10.56:8042/erp_zj_dljt' : 'http://139.224.199.31:8181/hurong_proj_zj_dljt',//正式
    loginApi: {
        loginUrl: '/api/ajaxValidation.do',//登录
    },
    taskApi: {//代办任务
        taskUrl: '/api/userActivityAllTask.do',//代办任务
        myProcessRunUrl: '/api/myProcessRun.do',//消息详情
        getTaskUrl: '/htmobile/getTask.do',//流程详情
        getInfoUrl: '/api/getInfo1SlSmallloanProject.do',//流程信息
        runList: '/api/runListCreditProjectApi.do',//意见说名记录
        outerTrans: '/api/outerTransProcessActivity.do?isParentFlow=false&taskId=',//流程节点分支
        projectList: '/api/projectListSlSmallloanProject.do?projectStatus=7',//项目查询
    },
    applyApi: {//申请
        businessType: '/api/getProductParameterJson1AppUser.do',//业务种类proType: 1036
        processCategory: '/api/getProDefinitionByFlowKeySlSmallloanProject.do',//流程类别
        networkName: '/api/getShopList1SlSmallloanProject.do',//网点名称
        dialogAppUser: '/api/dialogAppUser.do',//客户经理
        listByParentId: '/api/listByParentIdAppUser.do',//业务种类和业务品种
        queryPerson: '/api/getByListPerson.do?isAll=true&userIds=',//个人客户姓名查询
        saveProcess: '/api/saveProcessActivity.do',//启动项目
        seePerson: '/api/seePersonPersonManager.do?id=',//根据企业信息查询法人信息
        listSlPerson: '/api/listSlPersonMain.do',//客户基本信息（个人）
        listSlCompany: '/api/listSlCompanyMain.do',//客户基本信息（企业）
        getShopList1: '/api/getShopList1Organization.do?start=0&limit=30',//客户基本信息（企业）
    },
    publicApi: {//公共方法
        dictionaryUrl: '/api/loadItemAppUser.do?itemName=',//数据字典
        dictionaryNodeKeyUrl: '/api/loadItemByNodeKeyDictionary.do?nodeKey=',//数据字典
        ByParentIdCsBank: '/api/listByParentIdCsBank.do?parentId=',//省市
        getIntentDate: '/common/loanTrial/getIntentDateLoanTrial.do',//获取到期日
        dictionaryKeyUrl: '/api/loadItemByNodeKeyAppUser.do?nodeKey=',
        jbPmImage: '/jbpmImage?runId=',//流程图
        nextProcess: '/api/nextProcessActivity.do',//提交下个节点
        uploadWay: '/api/uploadWayFile.do?',//上传贷款材料
        uploadReportJSFile: '/api/uploadReportJSFile.do?businessType=SmallLoan&typeisfile=typeisfile&setname=调查分析报告&mark=cs_document_templet.168&projId=',
        transProcess: '/api/transProcessActivity.do',//流程显示节点
        interestedBuyers: '/api/listBpCustProsperctive.do?otherType=0&prosperctiveType=2&personType=0&isAll=true&isShop=true&',//意向客户
        seeInterestedBuyers: '/api/getBpCustProsperctive.do?perId=',//查询意向客户
        saveInterestedBuyers: '/api/saveBpCustProsperctive.do',//保存意向客户接口
        listByPerId: '/api/listByPerIdBpCustProspectiveFollowup.do?',//客户跟进查询
        getInfoSpouse: '/api/getInfoSpouse.do',//查看配偶信息
        addSpouse: '/api/addSpouse.do',//添加,编辑配偶信息
        listByPerIdBpCust: '/api/listByPerIdBpCustProspectiveFollowup.do',//跟进查询
        getBpCuSt: '/api/getBpCustProspectiveFollowup.do',//跟进查询查看跟进
        updateBpCuSt: '/api/updateBpCustProspectiveFollowup.do',//跟进查询查看跟进
        saveBpCuSt: '/api/saveBpCustProspectiveFollowup.do',//跟进查询查看跟进
        ajaxQueryPersonRelation:'/api/ajaxQueryPersonRelation.do',//查看联系人信息
        seePersonRelation:'/api/seePersonRelation.do', //查看联系人详情
        addPersonRelation:'/api/addPersonRelation.do', //添加新的联系人
        updatePersonRelation:'/api/updatePersonRelation.do',//修改联系人详情
        deleteRsPersonRelation:'/api/deleteRsPersonRelation.do', //删除联系人
        deleteSpouse:'/api/deletePerson.do?listId=',//删除个人信息列表
        addInfoPerson:'/api/addInfoPerson.do',//添加个人客户信息,单位信息
        myProcessRun:'/api/myProcessRun.do?processName=ALL',//项目查询
        queryList:'/api/queryListEnterpriseBank.do',//查询银行列表
        findEnterpriseBank:'/api/findEnterpriseBank.do',//查看银行信息
        updateEnterpriseBank:'/api/updateEnterpriseBank.do', //编辑银行信息
        deleteEnterpriseBank:'/api/deleteEnterpriseBank.do', // 删除银行信息
        loadItem1CsBank:'/api/loadItem1CsBank.do', //银行类型
        savePartInfoPerson:'/api/savePartInfoPerson.do', //修改家庭信息
    },
    processApi: {
        //流程
        saveEnterpriseOrLegalInfo:'/api/updateInfoEnterprise.do',//保存企业基本信息
        queryEnterpriseInfoList: '/api/ajaxQueryEnterprise.do',//企业客户信息列表查询
        queryEnterpriseInfoById: '/api/loadInfo1Enterprise.do?id=',//根据Id查询企业客户信息
        insertEnterpriseInfo: '/api/ajaxAddEnterprise.do',//添加企业客户信息
        getPersonId: '/api/getPersonIdSlSmallloanProject.do',//获取
        saveProjectInfo: '/api/saveProjectInfoSlSmallloanProject.do',//保存项目基本信息
        getByIdPerson: '/api/getByIdPerson.do',//个人客户信息查询
        updateInfo: '/api/updateInfoPerson.do',//保存个人信息
        queryListEnterpriseBank: '/api/queryListEnterpriseBank.do?isInvest=0',//查询收款账户列表
        saveBaseMsg: '/api/saveSlSmallloanProject.do',//保存借款基本信息
        seeSlRepaymentSource: '/api/listSlRepaymentSource.do?projectId=',//查询第一还款来源
        saveSlRepaymentSource: '/api/saveSlRepaymentSource.do',//查询第一还款来源
        delSlRepaymentSource: '/api/deleteSlRepaymentSource.do?sourceId=',//删除第一还款来源
        saveBorrowerInfo: '/api/saveBorrowerInfo.do',//保存共同借款人信息
        listBorrowerInfo: '/api/listBorrowerInfo.do?projectId=',//查询共同借款人列表
        deleteBorrowerInfo: '/api/deleteBorrowerInfo.do?borrowerInfoId=',//删除共同借款人
        getBorrowerInfo: '/api/getBorrowerInfo.do?borrowerInfoId=',//查询共同借款人详情
        listByProject: '/api/listbyprojectSlActualToCharge.do?businessType=SmallLoan&isUnLoadData=false&projectId=',//查询手续费用清单
        geTall: '/api/getallSlPlansToCharge.do?businessType=SmallLoan&projId=',//查询费用类型
        saveSlActualToCharge: '/api/saveSlActualToCharge.do',//保存费用收取清单
        deleteSlActualToCharge: '/api/deleteSlActualToCharge.do?actualChargeId=',//保存费用收取清单
        getContract: '/api/getcontractCategoryTree.do?businessType=SmallLoan&htType=loanContract&projId=',//保存费用收取清单businessType	SmallLoan
        getContractCategoryTree: '/api/getcontractCategoryTreeContractDraft.do?businessType=SmallLoan&htType=loanContract&projId=',//保存费用收取清单businessType	SmallLoan
        listsAppFile: '/api/listsAppFile.do?businessType=SmallLoan&mark=ReportTemplate&templettype=5&typeisfile=typeisfile&projId=',
        listEnterprise: '/api/listEnterpriseSlProcreditMaterials.do?businessType=SmallLoan&show=true&projId=',//贷款材料
        deleteMaterials: '/api/deleteMaterialsSlProcreditMaterials.do?proMaterialsId=',//删除贷款材料
        delFile: '/api/DeleFile1SlProcreditMaterials.do?fileid=',//删除贷款材料内单张图
        getUploadedFileList: '/api/getUploadedFileListSlProcreditMaterials.do?mark=sl_procredit_materials.',//获取材料清单（张数）
        updateDataNum: '/api/updateDataNumSlProcreditMaterials.do',//更改上传份数slProcreditMaterials.datumNums: 9 ,slProcreditMaterials.proMaterialsId: 15795
        getFileListExt: '/api/getFileListExtSlPlansToCharge.do?mark=sl_procredit_materials.',//获取贷款材料详情
        findDYList: '/api/findDYListMortgage.do?businessType=SmallLoan&isReadOnly=true&projectId=',//抵质押担保列表
        findBZList: '/api/findBZListMortgage.do?businessType=SmallLoan&isReadOnly=true&projectId=',//保证担保列表
        addMortgageBZ: '/api/addOfBZMortgage.do',//添加、修改保证担保
        getInfoMortgage: '/api/getInfoMortgage.do?mortgageid=',//抵质押物详情
        seeVehicle: '/api/seeVehicleForUpdate1Mortgage.do?businessType=SmallLoan&id=',//获取抵押详情
        addMortgageDY: '/api//addOfDYMortgage.do',//添加、修改抵押详情
        seeDutyPerson: '/api/seeDutypersonForUpdateMortgage.do?businessType=SmallLoan&id=',//获取抵押详情
        getAllFlowByUserId: '/api/getAllFlowByUserIdProcessRun.do?businessType=SmallLoan&projectId=',//获取抵押详情
        getAllFlowById: '/api/getAllFlowByIdProcessRun.do?id=',//审核内容接口
        getListLoanTrial: '/api/getListLoanTrialSlFundIntent.do',//放款收息表
        resetPasswordAppUser: '/api/resetPasswordAppUser.do',//修改密码
        profileAppUser:'/api/profileAppUser.do',//保存我的信息
        getAppUser:'/api/getAppUser.do',//查询我的信息
        seeCompany: '/api/seeCompanyForUpdateCompanyM.do?businessType=SmallLoan&id=',//查看企业担保详情
        findListByRunId: '/api/findListByRunIdTaskSign.do?countersignedTaskKey=80_deywspxz&runId=',//评审会意见
    },
    twoApi:{//一般担保业务
        getUserInfo:'/api/getInfoGuaranteeBusinessGLGuaranteeloanProject.do',//流程信息
        updateGLGuarantee:'/api/updateGLGuaranteeloanProject.do',//保存一般担保业务
        queryBankRelationPerson:'/api/queryBankRelation.do?isAll=true',//银行联系人
        findDYList: '/api/findDYListMortgage.do?isReadOnly=true&projectId=',//抵质押担保列表
        seeVehicle: '/api/seeVehicleForUpdate1Mortgage.do?id=',//获取抵押详情businessType=Guarantee&
        removeMortgage :'/api/removeMortgage.do?mortgageIds=',
        listEnterprise: '/api/listEnterpriseSlProcreditMaterials.do?show=true&projId=',//担保材料清单businessType=Guarantee
        updateGLGuarantee:'/api/updateGLGuaranteeloanProject.do',//保存一般担保业务项目基本信息
        uploadReportJSFile: '/api/uploadReportJSFile.do?businessType=Guarantee&typeisfile=typeisfile&setname=调查分析报告&projId=',//尽职调查报告
        listsAppFile: '/api/listsAppFile.do?businessType=Guarantee&mark=GuaranteeReport&templettype=11&typeisfile=typeisfile&projId=',//查看担保流程中尽职调查上传的图片
        findBZList: '/api/findBZListMortgage.do?businessType=Guarantee&isReadOnly=true&projectId=',//保证担保列表
        deleteMortgage:'/api/removeMortgage.do?mortgageIds=',//删除保证担保
        getMortgageByType:'/api/updateByTypeMortgage.do?mortgageid=',//编辑保证担保或查看
    }
};

export default Config;