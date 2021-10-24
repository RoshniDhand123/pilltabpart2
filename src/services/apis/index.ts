import { Response, login_type, reset_pswd_type } from "./types";
import { notifError } from "../../routes/util";
import Request from "./request";

const Apis = {
	GET_TREATMENT: "api/v1/treatments",
	GET_PLANS: "api/v1/plans/",
	GET_QUETIONNAIRE: "api/v1/questionnaire/",
	CHECK_EMAIL: "api/v1/checkemail/",
	CREATE_PROFILE: "api/v1/signup",
	LOGIN: "api/v1/login",
	FORGOT_PASSWORD: "api/v1/forgot/",
	RESET_PASSWORD: "api/v1/resetpassword",
	GET_PROFILE: "api/v1/profile",
	GET_BILLING: "api/v1/billing",
	UPDATE_PROFILE: "api/v1/profile",
	UPDATE_BILLING: "api/v1/billing",
	UPDATE_PAYMENT: "api/v1/",
	UPDATE_QUESTIONNAIRE: "api/patient/v1/questionnaire",
	UPLOAD_FILE: "api/patient/v1/document",
	SET_APPOINTMENT: "api/v1/appointment/set", //"appointment/booking/",
	USER_REQUEST: "api/v1/appointment/nurse/orders", //updated now PENDING_PATIENT_REQUEST is used
	PATIENT_REQUEST: "api/nurse/v1/patient/",
	PATIENT_LIST: "api/v1/appointment/booking",
	SET_ROOM_TOKEN: "api/v1/appointment/call/video",
	DELETE_PATIENTCALL: "api/v1/appointment/call/video",
	ALLPATIENT_LIST: "api/v1/appointment/patient/search?q=",
	ALL_PATIENT_LIST: "api/v1/appointment/patient/all",
	USER_REPORT: "api/v1/appointment/report/",
	PATIENT_MEDICATION_ORDERS: "api/v1/appointment/medicine/",
	RESCHEDULE_APPOINTMENT: "api/v1/appointment/reschedule",
	SEARCH_PATIENTLIST: "api/nurse/v1/SearchPatientApi?search_by=",
	PATIENT_DETAILS: "api/v1/appointment/nurse/patient/detail/",
	SEARCH_PATIENT_VALUE: "api/nurse/v1/search/patient/value?search=",
	NURSE_SET_REPORT: "api/v1/appointment/report",
	PATIENT_REPORTS: "api/v1/appointment/patient/report/",
	NURSE_ACCEPT_REQUEST: "api/v1/appointment/accept",
	SCHEDULE_LIST: "api/nurse/v1/patient/appo",
	MEDICALINFO: "api/patient/v1/medical/info/",
	FOLLOW_UP: "api/v1/appointment/followUp",
	NURSE_NOTIFICATION: "api/nurse/v1/nurse/notify",
	PLAN_DETAIL: "api/patient/v1/user/plan",
	ORDERS_HISTORY: "api/patient/v1/order/history",
	UPCOMING_ORDER: "api/patient/v1/order/status/pending",
	CANCEL_PLAN: "api/patient/v1/planstatus/cancel",
	SET_VACATION: "api/patient/v1/planstatus/set_vacation",
	PATIENT_NOTIFICATION:"api/patient/v1/userNotify",
	PLAN_STATUS:"api/patient/v1/planstatus/",
	CHANGE_PASSWORD:"api/v1/changepassword"
};

const verifyResponse = (resp: Response) => {
	try {
		if (resp.data && !resp.data.status) {
			let message;
			if (resp.data?.msg.msg) message = resp.data.msg.msg[0];
			else message = resp.data.msg;
			console.log(message, typeof message);
			if (message && typeof message === "string")
				notifError("", message || "Something went wrong");
			else notifError("", "Something went wrong");
		}
	} catch (err) {
		console.log("ERROR: ", err);
	}

	return resp;
};

export const getTreatments = async () => {
	let treatments: any = await Request.get(Apis.GET_TREATMENT);
	return verifyResponse(treatments);
};

export const getPlans = async (id: string) => {
	let plans: any = await Request.get(Apis.GET_PLANS + id);
	return verifyResponse(plans);
};

export const getQuestionnaire = async (id: string) => {
	let questionnaire: any = await Request.get(Apis.GET_QUETIONNAIRE + id);
	return verifyResponse(questionnaire);
};

export const verifyEmail = async (email: string) => {
	let resp: any = await Request.get(Apis.CHECK_EMAIL + email);
	return verifyResponse(resp);
};

export const createProfile = async (payload: any) => {
	let resp: any = await Request.post(
		Apis.CREATE_PROFILE,
		JSON.stringify(payload)
	);
	return verifyResponse(resp);
};

export const login = async (payload: login_type) => {
	let resp: any = await Request.post(Apis.LOGIN, JSON.stringify(payload));
	return verifyResponse(resp);
};

export const forgotPassword = async (email: string) => {
	let resp: any = await Request.get(Apis.FORGOT_PASSWORD + email);
	return verifyResponse(resp);
};

export const resetPassword = async (payload: reset_pswd_type) => {
	let resp: any = await Request.post(
		Apis.RESET_PASSWORD,
		JSON.stringify(payload)
	);
	return verifyResponse(resp);
};

export const getProfile = async () => {
	let resp: any = await Request.get(Apis.GET_PROFILE);
	return verifyResponse(resp);
};

export const getBillingDetails = async () => {
	let resp: any = await Request.get(Apis.GET_BILLING);
	return verifyResponse(resp);
};

export const editProfile = async (payload: any) => {
	let resp: any = await Request.put(
		Apis.UPDATE_PROFILE,
		JSON.stringify(payload)
	);
	return verifyResponse(resp);
};

export const editBilling = async (payload: any) => {
	let resp: any = await Request.put(
		Apis.UPDATE_BILLING,
		JSON.stringify(payload)
	);
	return verifyResponse(resp);
};

export const changePassword = async(payload:any)=>{
	let resp: any = await Request.put(
		Apis.CHANGE_PASSWORD,
		JSON.stringify(payload)
	);
	return verifyResponse(resp);
}

export const submitBillingWithPayment = async (payload: any, token: any) => {
	const { access_token } = token;
	let resp: any = await Request.post(
		Apis.UPDATE_PROFILE,
		JSON.stringify(payload),
		access_token
	);
	return verifyResponse(resp);
};

export const editPaymentInfo = async (payload: any) => {
	// let resp: any = await Request.put(Apis.UPDATE_PAYMENT,JSON.stringify(payload));
	// return verifyResponse(resp);
};

export const getQuestionnaireForUpdate = async () => {
	let resp: any = await Request.get(Apis.UPDATE_QUESTIONNAIRE);
	return verifyResponse(resp);
};

//check........need to setApiUrl
export const editQuestionnaire = async (payload: any) => {
	let resp: any = await Request.put(
		Apis.UPDATE_BILLING,
		JSON.stringify(payload)
	);
	return verifyResponse(resp);
};

export const uploadFileDetail = async (payload: any) => {
	let resp: any = await Request.postFile(Apis.UPLOAD_FILE, payload);
	return verifyResponse(resp);
};

export const getFileDetails = async (page: string) => {
	let resp: any = await Request.get(Apis.UPLOAD_FILE + page);
	return verifyResponse(resp);
};

export const getUserRequestList = async (status: string, page = "") => {
	//let resp: any = await Request.get(Apis.USER_REQUEST + "/" + status + page);
	let resp: any = await Request.get(Apis.PATIENT_REQUEST + status);
	return verifyResponse(resp);
};

// export const getParticularUserRecord = async (requestId: string) => {
// 	let resp: any = await Request.get(Apis.USER_REPORT + requestId);
// 	return verifyResponse(resp);
// };

export const getPatientList = async (page = "") => {
	let resp: any = await Request.get(Apis.PATIENT_LIST + page);
	return verifyResponse(resp);
};
///api/v1/appointment/patient/search?q=rk&field=name,email  ALLPATIENT_LIST: "/appointment/patient/search?q=",
export const getAllPatientList = async (payload: any, page = "") => {
	let resp: any = await Request.get(Apis.ALLPATIENT_LIST + payload + page);
	return verifyResponse(resp);
};
export const getPatientAllList = async () => {
	let resp: any = await Request.get(Apis.ALL_PATIENT_LIST);
	return verifyResponse(resp);
};

// export const getSearchList = async (payload: any) => {
// 	let resp: any = await Request.get(
// 		Apis.ALLPATIENT_LIST +
// 			payload.search_value +
// 			"&field=" +
// 			payload.search_by
// 	);
// 	return verifyResponse(resp);
// };

export const getSearchPatientList = async (payload: any) => {
	let resp: any = await Request.get(
		Apis.SEARCH_PATIENTLIST +
			payload.search_by +
			"&search=" +
			payload.search_value
	);
	return verifyResponse(resp);
};
export const getSearchPatientByValue = async (searchValue: any) => {
	let resp: any = await Request.get(Apis.SEARCH_PATIENT_VALUE + searchValue);
	return verifyResponse(resp);
};

export const patientMedicationOrder = async (requestId: any) => {
	let resp: any = await Request.get(
		Apis.PATIENT_MEDICATION_ORDERS + requestId
	);
	return verifyResponse(resp);
};

export const acceptRejectRequestList = async (payload: any) => {
	let resp: any = await Request.put(
		Apis.PATIENT_LIST,
		JSON.stringify(payload)
	);
	return verifyResponse(resp);
};

export const appointmentDetail = async (payload: any) => {
	let resp: any = await Request.post(
		Apis.SET_APPOINTMENT,
		JSON.stringify(payload)
	);
	return verifyResponse(resp);
};

export const getVideoToken_RoomName = async (payload: any) => {
	let resp: any = await Request.post(
		Apis.SET_ROOM_TOKEN,
		JSON.stringify(payload)
	);
	return verifyResponse(resp);
};

export const updatePatientCallDetail = async (payload: any) => {
	let resp: any = await Request.put(
		Apis.SET_ROOM_TOKEN,
		JSON.stringify(payload)
	);
	return verifyResponse(resp);
};

export const passUpdatedQuestionnaire = async (payload: any) => {
	let resp: any = await Request.put(
		Apis.UPDATE_QUESTIONNAIRE,
		JSON.stringify(payload)
	);
	return verifyResponse(resp);
};

export const deletePatientCall = async (payload: any) => {
	let resp: any = await Request.delete(
		Apis.DELETE_PATIENTCALL,
		JSON.stringify(payload)
	);
	return verifyResponse(resp);
};
export const setAppointmentByNurse = async (payload: any, status?: string) => {
	let resp: any = await Request.put(
		Apis.SET_APPOINTMENT,
		JSON.stringify(payload)
	);
	return verifyResponse(resp);
};

export const rescheduleAppointment = async (requestId: any) => {
	let payload: any = { patient_id: requestId };
	let resp: any = await Request.put(
		Apis.RESCHEDULE_APPOINTMENT,
		JSON.stringify(payload)
	);
	return verifyResponse(resp);
};

export const getPatientDetails = async (patient_id: string) => {
	let patientDetails: any = await Request.get(
		Apis.PATIENT_DETAILS + patient_id
	);
	return verifyResponse(patientDetails);
};

export const nurseSetPatientReport = async (payload: any) => {
	let resp: any = await Request.put(
		Apis.NURSE_SET_REPORT,
		JSON.stringify(payload)
	);
	return verifyResponse(resp);
};

export const getPatientReport = async (
	patient_id: number,
	appointment_id: number
) => {
	let patientReportDetails: any = await Request.get(
		Apis.PATIENT_REPORTS + patient_id + "/" + appointment_id
	);
	return verifyResponse(patientReportDetails);
};
export const acceptAppointment = async (payload: any) => {
	let resp: any = await Request.put(
		Apis.NURSE_ACCEPT_REQUEST,
		JSON.stringify(payload)
	);
	return verifyResponse(resp);
};

export const getScheduleAppointmentList = async () => {
	let scheduleList: any = await Request.get(Apis.SCHEDULE_LIST);
	return verifyResponse(scheduleList);
};

export const getPatientMedicalInfo = async (patient_id: number) => {
	let medicalQuestions: any = await Request.get(
		Apis.MEDICALINFO + patient_id
	);
	return verifyResponse(medicalQuestions);
};
export const setFollowUp = async (payload: any) => {
	let resp: any = await Request.put(Apis.FOLLOW_UP, JSON.stringify(payload));
	return verifyResponse(resp);
};

export const patientCurrentPlanDetail = async () => {
	let planDetail: any = await Request.get(Apis.PLAN_DETAIL);
	return verifyResponse(planDetail);
};

export const getNurseNotificationData = async () => {
	let notificationList: any = await Request.get(Apis.NURSE_NOTIFICATION);
	return verifyResponse(notificationList);
};
export const getPatientOrderHistory = async () => {
	let orderHistory: any = await Request.get(Apis.ORDERS_HISTORY);
	return verifyResponse(orderHistory);
};

export const getUpcomingOrders = async () => {
	let upcomingOrder: any = await Request.get(Apis.UPCOMING_ORDER);
	return verifyResponse(upcomingOrder);
};

export const cancelActivePlan = async () => {
	let response: any = await Request.put(Apis.CANCEL_PLAN, JSON.stringify(""));
	return verifyResponse(response);
};

export const setPatientVacation = async (payload: any) => {
	let resp: any = await Request.put(
		Apis.SET_VACATION,
		JSON.stringify(payload)
	);
	return verifyResponse(resp);
};

export const getPatientNotification=async()=>{
	let notificationList: any = await Request.get(Apis.PATIENT_NOTIFICATION);
	return verifyResponse(notificationList);
}

export const upgradePatientPlan=async(payload:any)=>{
	let resp: any = await Request.put(Apis.PLAN_STATUS+"upgrade",JSON.stringify(payload));				
	return verifyResponse(resp);
}

export const UpgradePlanPayment=async(payload:any)=>{

}