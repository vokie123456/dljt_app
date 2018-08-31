import Images from '../../Resources/Images'
const MenuConfig = [
	{
		key:"InterestedBuyers",
		title:"意向客户",
		icon: Images.logoOne,
		// icon: "ios-stopwatch",
		size: 95,
		color: "#ff5d3e",
		hideNav: false,
		disabled: true,
	},{
		key:"IndividualClient",
		title:"个人客户",
		// icon: "ios-partly-sunny",
		icon: Images.logoTwo,
		size:95,
		color:"#00d2c4",
		hideNav: false,
        disabled: false,
	},{
		key:"EnterpriseCustomer",
		title:"企业客户",
		// icon: "logo-twitter",
		icon: Images.logoThree,
		size:95,
		color:"#ffbd00",
		hideNav: false,
        disabled: false,
	},{
		key:"ApplyLoan",
		title:"业务申请",
		// icon: "logo-twitter",
		icon: Images.logoFour,
		size:95,
		color:"#ff9900",
		hideNav: false,
        disabled: false,
	},{
		key:"ConvertOfficialAccountC",
		title:"业务往来",
		// icon: "md-pin",
		icon: Images.logoFive,
		size:95,
		color:"#6697ff",
		hideNav: false,
        disabled: false,
	},{
		key:"ProjectManagement",
		title:"项目查询",
		// icon: "ios-baseball",
		icon: Images.logoSix,
		size:95,
		color:"#7d72ff",
		hideNav: false,
        disabled: false,
	},];

	export default MenuConfig;