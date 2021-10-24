import React from "react";
import { parseOrderHistory } from "../../services/helper";
const Chart = React.lazy(() => import("../patient/chart"));
const EditBilling = React.lazy(() => import("../patient/edit-billing"));
const MyPlan=React.lazy(() => import("../patient/my-plan"));
const Orders = React.lazy(() => import("../patient/orders"));
const MedicalInformation = React.lazy(
	() => import("../patient/medical-information")
);
const RequestCall = React.lazy(() => import("../patient/request-a-call"));
const UploadDocuments = React.lazy(() => import("../patient/upload-documents"));
const Evaluation = React.lazy(() => import("../nurse/evaluations"));
const SearchPatient = React.lazy(() => import("../nurse/search-patient"));
//const PatientChart = React.lazy(() => import("../nurse/patient-chart"));
const NewRequests = React.lazy(() => import("../nurse/new-requests"));
const AcceptedRequests = React.lazy(() => import("../nurse/accepted-requests"));
const FollowUp = React.lazy(() => import("../nurse/FollowUp"));
const PatientReports = React.lazy(
	() => import("../nurse/patient-reports/index")
);
const History = React.lazy(() => import("../nurse/history"));
const PharmacistNewOrders=React.lazy(()=> import("../pharmacist/orders/newOrders"));
const PharamacistOrders=React.lazy(()=>import ("../pharmacist/orders/oldOrders"));
const OrderHistory=React.lazy(()=>import("../pharmacist/orders/orderhistory"));

interface Child {
	to: string;
	title: string;
}
export interface Menu {
	title: string;
	icon_type?: string;
	to?: string;
	children?: Child[];
	component?: any;
}
export const nurseRoutes: Menu[] = [
	{
		title: "Evaluations",
		to: "/",
		icon_type: "ViewList",
		component: Evaluation,
	},
	// {
	// 	title: "Search Patient",
	// 	to: "/search-patient",
	// 	icon_type: "SearchIcon",
	// 	component: SearchPatient,
	// },
	// {
	// 	title: "Patient chart",
	// 	to: "/patient-chart",
	// 	icon_type: "BarChart",
	// 	component: PatientChart,
	// },
	{
		title: "New requests",
		to: "/new-requests",
		icon_type: "ViewList",
		component: NewRequests,
	},
	{
		title: "Accepted requests",
		to: "/accepted-requests",
		icon_type: "PersonAdd",
		component: AcceptedRequests,
	},
	{
		title: "Follow Up",
		to: "/follow-up",
		icon_type: "PersonAdd",
		component: FollowUp,
	},
	{
		title: "Patient reports",
		to: "/Patient-reports",
		icon_type: "Description",
		component: PatientReports,
	},
	{
		title: "History",
		to: "/history",
		icon_type: "History",
		component: History,
	},
];

export const physicianRoutes: Menu[] = [];

export const pharmacistRoutes: Menu[] = [
	{
		title: "New Orders",
		to: "/",
		icon_type: "ViewList",
		component: PharmacistNewOrders,
	},
	{
		title: "Past Orders",
		to: "/old-orders",
		icon_type: "ViewList",
		component: PharamacistOrders,
	},
	{
		title:"Order History",
		to:"/order-history",
		icon_type:"ViewList",
		component:OrderHistory,
	}

];

export const userRoutes: Menu[] = [
	{
		title: "My Chart",
		to: "/",
		icon_type: "BarChart",
		component: Chart,
	},
	{
		title: "Billing",
		to: "/edit-billing",
		icon_type: "CreditCard",
		component: EditBilling,
	},
	{
		title: "My Plan",
		to: "/my-plan",
		icon_type: "ViewList",
		component: MyPlan,
	},
	{
		title: "Orders",
		to: "/orders",
		icon_type: "ViewList",
		component: Orders,
	},
	// {
	// 	title: "Request a call",
	// 	to: "/request-a-call",
	// 	icon_type: "ContactPhone",
	// 	component: RequestCall,
	// },
	{
		title: "Update medical information",
		to: "/update-medical-information",
		icon_type: "LocalHospital",
		component: MedicalInformation,
	},
	{
		title: "Upload documents",
		to: "/upload-documents",
		icon_type: "Assignment",
		component: UploadDocuments,
	},
];

export function getRoleRoutes(role:  string="Pharmacist"): Menu[] {
	switch (role) {
		case "Nurse":
			return nurseRoutes;
		case "Physician":
			return physicianRoutes;
		case "Pharmacist":
			return pharmacistRoutes
		default:
			return userRoutes
	}
}
