//import { request } from "node:http";
import { TRUE } from "node-sass";
import Field from "../../components/Field";
import { clearStorage, getItem, getToken } from "../storage";

var day = [
	"sunday",
	"monday",
	"tuesday",
	"wednesday",
	"thrusday",
	"friday",
	"saturday",
];
const monthNames = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export const parsePlans = (plans: any) => {
	let p = [];
	for (let i = 0; i < plans.length; i++) {
		p.push({
			plan: plans[i].name,
			drugName: plans[i].drug,
			dosage: plans[i].dosage,
			frequency: plans[i].frequency,
			amount: plans[i].amount,
			id: plans[i].id,
			detail: plans[i].detail,
		});
	}
	return p;
};

export const parseFileDetails = (documentDetail: any) => {
	let data: any = [];
	for (let i = 0; i < documentDetail.length; i++) {
		let obj: any = {};
		obj["File Name"] = documentDetail[i].detail;
		obj["File Content"] = documentDetail[i].document;
		obj["Date Uploaded"] = formatDate(documentDetail[i].created);
		data.push(obj);
	}
	return data;
};

export const parseUpdateQuestionnaire = (questionnaire: any) => {
	let data: any = {};
	let fields = [];
	let initialValue: any = {};
	let inputFieldIds = [];
	for (let i = 0; i < questionnaire.length; i++) {
		let obj: any = {};
		obj["label"] = questionnaire[i].question;
		obj["type"] = questionnaire[i].types;
		obj["required"] = true;
		obj["name"] = questionnaire[i].id.toString();
		obj["component"] = Field;
		switch (questionnaire[i].types) {
			case "radio":
				if (questionnaire[i].answer.length > 0) {
					initialValue[
						questionnaire[i].id.toString()
					] = questionnaire[i].answer[0].id.toString();
				}
				if (questionnaire[i].value) {
					initialValue[questionnaire[i].id.toString() + "-input"] =
						questionnaire[i].value;
					obj["radioInput"] = true;
				}
				if (questionnaire[i].input) {
					obj["radioInput"] = true;
				}
				// else {
				// 	obj["radioInput"] = true;
				// }
				let op = [];
				for (let j = 0; j < questionnaire[i].options.length; j++) {
					op.push({
						value: questionnaire[i].options[j].id.toString(),
						label: questionnaire[i].options[j].option,
					});
				}
				obj["options"] = op;
				break;
			case "checkbox":
				let arr = [];
				for (let j = 0; j < questionnaire[i].answer.length; j++) {
					arr.push(questionnaire[i].answer[j].id.toString());
				}
				initialValue[questionnaire[i].id.toString()] = arr;
				let op1 = [];
				for (let j = 0; j < questionnaire[i].options.length; j++) {
					op1.push({
						value: questionnaire[i].options[j].id.toString(),
						label: questionnaire[i].options[j].option,
					});
				}
				obj["options"] = op1;
				break;
			default:
				if (questionnaire[i].types == "input")
					inputFieldIds.push(questionnaire[i].id.toString());
				initialValue[questionnaire[i].id.toString()] =
					questionnaire[i].answer;
		}
		fields.push(obj);
	}
	data["field"] = fields;
	data["initialValue"] = initialValue;
	data["inputFieldIds"] = inputFieldIds;
	return data;
};

const mergeData = (data1: any, data2: any) => {
	for (let i = 0; i < data1.length; i++) {
		let id = data1[i]["id"].split("-")[0];
		for (let j = 0; j < data2.length; j++) {
			if (id === data2[j]["id"]) {
				data2[j]["value"] = data1[i]["option_id"];
			}
		}
	}
	return data2;
};
export const parseUpdatedQuestionnaireResult = (
	questionnaire: any,
	inputFieldIds: string[]
) => {
	let updatedResult: {}[] = [];
	let radioTextfield: {}[] = [];
	console.log("ques++", questionnaire);
	Object.entries(questionnaire).map(([key, value]) => {
		let ques: any = {};
		let textfield: any = {};
		let text = false;
		if (key.split("-").length > 1) {
			textfield["id"] = key;
			textfield["option_id"] = value;
			radioTextfield.push(textfield);
			text = true;
		}
		if (!text) {
			// if (key === "1" || key === "2") ques["option_id"] = value;
			// else {
			let inputfieldExist = false;
			ques["id"] = key;
			for (let i = 0; i < inputFieldIds.length; i++) {
				if (key == inputFieldIds[i]) {
					ques["option_id"] = value;
					inputfieldExist = true;
				}
			}
			if (!inputfieldExist) {
				if (Array.isArray(value)) {
					let arr: number[] = [];
					value.map((ans) => {
						arr.push(parseInt(ans));
					});
					ques["option_id"] = arr;
				} else ques["option_id"] = value;
			}
			//}
			updatedResult.push(ques);
		}
	});
	let resp = mergeData(radioTextfield, updatedResult);
	return resp;
};
export const parseQuestionnaire = (questionnaire: any) => {
	let q = [];
	for (let i = 0; i < questionnaire.length; i++) {
		var ques: any = {};
		ques["name"] = questionnaire[i].id.toString();
		ques["label"] = i + 1 + ". " + questionnaire[i].question;
		ques["type"] = questionnaire[i].types;
		ques["component"] = Field;
		ques["required"] = true;
		if (
			questionnaire[i].types == "radio" ||
			questionnaire[i].types == "checkbox"
		) {
			let op = [];
			for (let j = 0; j < questionnaire[i].options.length; j++) {
				op.push({
					value: questionnaire[i].options[j].id.toString(),
					label: questionnaire[i].options[j].option,
				});
			}
			ques["options"] = op;
			if (questionnaire[i].types == "radio" && questionnaire[i].input)
				ques["radioInput"] = true;
		} else {
			ques["placeholder"] = questionnaire[i].question;
			if (
				questionnaire[i].question == "Height" ||
				questionnaire[i].question == "Weight"
			) {
				ques["gridItem"] = 6;
				ques["type"] = "number";
				if (questionnaire[i].question == "Height")
					ques["placeholder"] =
						questionnaire[i].question + " (in centimeters)";
				else
					ques["placeholder"] =
						questionnaire[i].question + " (in kgs)";
			}
		}
		q.push(ques);
	}
	return q;
};

export const parseAppointment = (appointment: any) => {
	let date = formatDate(appointment.start);
	let time = appointment.start.substr(11, 5);
	return { date, time };
};

export const parseQuestionnairePayload = (questionnaire: any) => {
	let allQues: any = [];
	for (const item in questionnaire) {
		var ques: any = {};
		if (item.includes("input")) {
			let radioInput = item.substring(0, item.indexOf("-input"));
			let input = allQues.find((q: any) => q.question_id == radioInput);
			input["value"] = questionnaire[item];
			allQues[allQues.indexOf(input)] = input;
		} else {
			if (Array.isArray(questionnaire[item])) {
				let checkedOptions = questionnaire[item].map((q: any) =>
					Number(q)
				);
				ques["option_id"] = checkedOptions;
			} else ques["option_id"] = Number(questionnaire[item]);
			ques["question_id"] = Number(item);
			ques["value"] = "";
			allQues.push(ques);
		}
	}
	return allQues;
};

export const createProfilePayload = () => {
	let personalDetail = getItem("personalDetail");
	let demographics = getItem("demographics");
	let questionnaire = getItem("questionnaire");
	let billing = getItem("billing");
	if (!personalDetail || !demographics || !questionnaire || !billing)
		return false;
	let ques = parseQuestionnairePayload(questionnaire);
	let payload = {
		first_name: personalDetail.firstName,
		last_name: personalDetail.lastName,
		email: personalDetail.email,
		password: personalDetail.password,
		dob: formatDate(demographics.dob),
		gender: demographics.gender,
		marital_status: demographics.maritalStatus,
		employment: demographics.employment,
		race: demographics.race,
		questionnaire: ques,
		billing: {
			add1: billing.billingAddress,
			add2: billing.billingAddress2,
			city: billing.billingCity,
			state: billing.billingState,
			zip_code: billing.billingZipCode,
		},
		shipping: {
			add1: billing.shippingAddress,
			add2: billing.shippingAddress2,
			city: billing.shippingCity,
			state: billing.shippingState,

			zip_code: billing.shippingZipCode,
		},
		payments: billing.payments,
	};
	return payload;
};

export const formatDate = (inputDate: any, format?: any) => {
	var date = new Date(inputDate);
	let month = getDayOrMonth(date, "month");
	let day = getDayOrMonth(date, "day");
	let year = date.getFullYear();
	switch (format) {
		case "MM/DD/YYYY":
			return month + "/" + day + "/" + year;
		default:
			return month + "/" + day + "/" + year;
	}
};

export const getDayOrMonth = (date: Date, type: string) => {
	let d;
	if (type == "month") d = date.getMonth() + 1;
	else d = date.getDate();
	if (d.toString().length == 1) return "0" + d;
	return d;
};

export const getDayOrMonthName = (date: Date) => {
	let dayName = day[date.getDay()];
	let monthName = monthNames[date.getMonth()];
	return { dayName, monthName };
};
export const getMonthNameAndYear = (month: any) => {
	let monthName, year;
	let date = new Date();
	if (month < 12) {
		monthName = monthNames[month];
		year = date.getFullYear();
	} else if (month >= 12) {		
		let newMonth = month - 12;
		monthName = monthNames[newMonth];
		year = date.getFullYear() + 1;
	}
	return { monthName, year };
};

export const parseToken = (token: any) => {
	try {
		let access_token = token.access_token;
		var payload = JSON.parse(window.atob(access_token.split(".")[1]));
		return payload;
	} catch (error) {
		clearStorage();
		return null;
	}
};

export const parseProfile = (profile: any) => {
	return {
		firstName: profile.first_name,
		lastName: profile.last_name,
		email: profile.email,
		dob: profile.dob,
		shippingAddress: profile.address?.add1,
		shippingAddress2: profile.address?.add2,
		shippingCity: profile.address?.city,
		shippingState: profile.address?.state,
		shippingZipCode: profile.address?.zip_code,
		gender: profile.gender,
		maritalStatus: profile.marital_status,
		race: profile.race,
		employment: profile.employment,
	};
};


export const parseBilling = (billing: any) => {
	return {
		billing: {
			billingAddress: billing.add1,
			billingAddress2: billing.add2,
			billingCity: billing.city,
			billingState: billing.state,
			billingZipCode: billing.zip_code,
		},
		payment: billing.payments,
	};
};

export const ediProfilePayload = (profile: any) => {
	return {
		first_name: profile.firstName,
		last_name: profile.lastName,
		email: profile.email,
		dob: profile.dob,
		marital_status: profile.maritalStatus,
		employment: profile.employment,
		gender: profile.gender,
		race: profile.race,
		address: {
			add1: profile.shippingAddress,
			add2: profile.shippingAddress2,
			city: profile.shippingCity,
			state: profile.shippingState,
			zip_code: profile.shippingZipCode,
		},
	};
};

export const parseBillingShippingValues = (payload: any) => {
	let { billing, shipping, token } = payload;
	return {
		billingAddress: billing.add1,
		billingAddress2: billing.add2,
		billingCity: billing.city,
		billingState: billing.state,
		billingZipCode: billing.zip_code,
		shippingAddress: shipping.add1,
		shippingAddress2: shipping.add2,
		shippingCity: shipping.city,
		shippingState: shipping.state,
		shippingZipCode: shipping.zip_code,
		planId: billing.plan_id,
		token: token,
	};
};

export const parseUpdateBillingPayload = (payload: any) => {
	return {
		add1: payload.billingAddress,
		add2: payload.billingAddress2,
		city: payload.billingCity,
		state: payload.billingState,
		zip_code: payload.billingZipCode,
	};
};

export const changepassword1 =(payload:any)=>{
	return{
		oldPass:payload.oldPassword,
		newPass:payload.newPassword,
		confPass:payload.confirmPassword
	};
}

export const createBillingAndPaymentPayload = (payload: any) => {
	payload.payments.plan_id = payload.planId;
	return {
		billing: {
			add1: payload.billingAddress,
			add2: payload.billingAddress2,
			city: payload.billingCity,
			state: payload.billingState,
			zip_code: payload.billingZipCode,
		},
		shipping: {
			add1: payload.shippingAddress,
			add2: payload.shippingAddress2,
			city: payload.shippingCity,
			state: payload.shippingState,
			zip_code: payload.shippingZipCode,
		},
		payments: payload.payments,
	};
};
const getActions = (buttons: any[], row: any, id?: any) => {
	console.log("buttons", id);
	return buttons.map(({ method = () => {}, ...rest }) => ({
		...rest,
		callBack: method.bind(this, row, id),
	}));
};
const convertStatus = (sts: any) => {
	switch (sts) {
		case "followup":
			return <div className="status-btn pending">Follow Up</div>;
		case "pending":
			return <div className="status-btn pending">Pending</div>;
		case "accepted":
			return <div className="status-btn accepted">Accepted</div>;
		case "reschedule":
			return <div className="status-btn accepted">Reschedule</div>;
		case "appo":
			return <div className="status-btn accepted">Appointment</div>;
		case "completed":
			return <div className="status-btn other">completed</div>;
		default:
			return <div className="status-btn rejected">Other</div>;
	}
};
export const parseAcceptRequestsList = (payload: any, button?: any) => {
	let requests = [];
	for (let i = 0; i < payload.length; i++) {
		let timeConvert = parseTimeUTCtoLocal(payload[i].date, payload[i].time);
		console.log("+time+", payload[i].date, payload[i].time, timeConvert);
		let index = timeConvert.lastIndexOf(" ");
		let obj: any = {};
		let Name =
			payload[i].patient.first_name + " " + payload[i].patient.last_name;
		obj["Id"] = payload[i].patient_id;
		obj["Appointment_Id"] = payload[i].id;
		obj["Name"] = Name;
		obj["Dob"] = payload[i].patient.dob;
		obj["Email"] = payload[i].patient.email;
		obj["Date"] = payload[i].date;
		obj["Time"] = timeConvert.substring(index + 1);
		obj["Status"] = convertStatus(payload[i].status);
		if (button) obj["action"] = getActions(button, obj);
		requests.push(obj);
	}
	return requests;
};
export const parseHistoryList = (payload: any, button?: any) => {
	let requests = [];
	for (let i = 0; i < payload.length; i++) {
		let obj: any = {};
		let id = payload[i].patient_id;
		let Name =
			payload[i].patient.first_name + " " + payload[i].patient.last_name;
		//obj["Id"] = payload[i].patient_id;
		//obj["Name"] = Name;
		obj["first_name"] = payload[i].patient.first_name;
		obj["last_name"] = payload[i].patient.last_name;
		obj["dob"] = payload[i].patient.dob;
		obj["email"] = payload[i].patient.email;
		// obj["Date"] = payload[i].date;
		// obj["Time"] = payload[i].time;
		//obj["status"] = convertStatus(payload[i].status);
		if (button) obj["action"] = getActions(button, obj, id);
		requests.push(obj);
	}
	return requests;
};
export const parseRequestsList = (payload: any, button?: any) => {
	let requests = [];
	for (let i = 0; i < payload.length; i++) {
		let obj: any = {};
		let id = payload[i].patient_id;
		let Name =
			payload[i].patient.first_name + " " + payload[i].patient.last_name;
		obj["Id"] = payload[i].patient_id;
		obj["Name"] = Name;
		obj["Dob"] = payload[i].patient.dob;
		obj["Email"] = payload[i].patient.email;
		// obj["Date"] = payload[i].date;
		// obj["Time"] = payload[i].time;
		obj["Status"] = convertStatus(payload[i].status);
		if (button) obj["action"] = getActions(button, obj);
		requests.push(obj);
	}
	return requests;
};
export const parseUTCtoLocalTime = (utcDateTime: any) => {
	var newDate = new Date(utcDateTime + " " + "UTC");
	var date = newDate.toString().lastIndexOf(":");
	var list = newDate.toString().substring(0, date);
	console.log("datetime", utcDateTime, newDate);
	return list;
};
//Testing......
export const parseTimeUTCtoLocal = (date: any, time: any) => {
	var dateTime = new Date(date + " " + time);
	//console.log("check++=>",dateTime.getFullYear(),dateTime.getMonth()+1,dateTime.getDate(),dateTime.getHours(),dateTime.getMinutes(),dateTime.getSeconds());
	// var dateGet = date.split("-");
	// var Time = time.split(":");
	// let second = Time[2].substring(0, 2);
	let newDate = new Date(
		Date.UTC(
			dateTime.getFullYear(),
			dateTime.getMonth() + 1,
			dateTime.getDate(),
			dateTime.getHours(),
			dateTime.getMinutes(),
			dateTime.getSeconds()
		)
	);
	var date1 = newDate.toString().lastIndexOf(":");
	var list = newDate.toString().substring(0, date1);
	//console.log("check Timming", newDate,list);
	return list;
};

export const parseEvaluationRequestList = (payload: any) => {
	let requests = [];
	for (let i = 0; i < payload.length; i++) {
		let time = parseTimeUTCtoLocal(payload[i].date, payload[i].time);
		let index = time.lastIndexOf(" ");
		//console.log("index of dash", index, time.substring(index + 1));
		let obj: any = {};
		let Name =
			payload[i].patient.first_name + " " + payload[i].patient.last_name;
		obj["Request Id"] = payload[i].id;
		obj["Patient Id"] = payload[i].patient_id;
		obj["Patient Name"] = Name;
		obj["Dob"] = payload[i].patient.dob;
		obj["Time"] = time.substring(index + 1); //parseUTCtoLocalTime(payload[i].date + " " + payload[i].time); //payload[i].time;
		requests.push(obj);
	}
	console.log("requests", requests);
	let sequenceList = getTimeSequenceList(requests);
	return sequenceList;
};

export const parseSearchPatientsList = (payload: any, button?: any) => {
	let requests = [];
	for (let i = 0; i < payload.length; i++) {
		let obj: any = {};
		obj["Id"] = payload[i].id;
		obj["first_name"] = payload[i].first_name;
		obj["last_name"] = payload[i].last_name;
		//obj["Name"]=payload[i].first_name+" "+payload[i].last_name;
		obj["email"] = payload[i].email;
		obj["dob"] = payload[i].dob;
		console.log("id+", payload[i].id);
		if (button) obj["action"] = getActions(button, obj, payload[i].id);
		requests.push(obj);
	}
	return requests;
};
export const parsePatientReportInfo = (payload: any) => {
	console.log("payload", payload);
	let detail = [];
	for (let i = 0; i < payload.length; i++) {
		let patientInfo: any = {};
		patientInfo["Report By"] = payload[i]["reported_by"]
			? "Physician"
			: "Nurse";
		patientInfo["Date"] = payload[i]["date"];
		patientInfo["Time"] = payload[i]["time"].split(".")[0];
		patientInfo["Report"] = payload[i]["detail"];
		detail.push(patientInfo);
	}
	//console.log("detail=>>>>",detail);
	return detail;
};

export const parsePatientViewDetails = (payload: any) => {
	// let results=[];
	let detail: any = {};
	let orderList = [];
	detail["Name"] = payload["user data"]["first_name"];
	detail["Email"] = payload["user data"]["email"];
	detail["DOB"] = payload["user data"]["dob"];
	for (let i = 0; i < payload["order data"].length; i++) {
		let order: any = {};
		let list = payload["order data"][i];
		order["Drug Name"] = list["drug"];
		order["Dose"] = list["dosage"];
		order["Quantity"] = list["amount"];
		orderList.push(order);
	}
	return { detail, orderList };
};

export const parsePatientMedicalInfo = (payload: any) => {
	//let payload=data;
	//console.log("check", payload);
	let medicalInfo = [];
	for (let i = 0; i < payload.length; i++) {
		let list: any = {};
		list["question"] = payload[i].question;
		let answers = "";
		for (let j = 0; j < payload[i].answer.length; j++) {
			if (j == 0) answers = payload[i].answer[j]["option"];
			else answers += ", " + payload[i].answer[j]["option"];
		}
		//let ans=payload[i].answer.map((list:any)=>list.option);
		list["answer"] = answers;
		if (payload[i].input == true) list["value"] = payload[i].value;
		medicalInfo.push(list);
	}
	//console.log("parse Data", medicalInfo);
	return medicalInfo;
};

export const parseRoom_TokenValue = (payload: any) => {
	let obj: any = {};
	obj["room"] = payload.room;
	obj["token"] = payload.token;
	return obj;
};

export const isLoggedIn = () => {
	let token = getToken();
	if (token != null) return true;
	else return false;
};
// interface IpatientObject {
// 	id: number;
// 	date: string;
// 	time: string;
// 	status: number;
// 	updated: string;
// 	created: string;
// 	patient_id: number;
// 	nurse_id: number;
// 	patient: object;
// }

export const checkSecondSmall = (firstTime: string, secondTime: string) => {
	let small = firstTime.split(":");
	let large = secondTime.split(":");
	let first = new Date();
	first.setHours(parseInt(small[0]));
	first.setMinutes(parseInt(small[1]));
	let second = new Date();
	second.setHours(parseInt(large[0]));
	second.setMinutes(parseInt(large[1]));
	if (first > second) {
		return true;
	} else return false;
};
export const getTimeSequenceList = (list: any) => {
	let small, position, update, second;
	if (list != undefined) {
		for (let i = 0; i < list.length - 1; i++) {
			position = -1;
			small = list[i]["Time"];
			for (let j = i + 1; j < list.length; j++) {
				second = list[j]["Time"];
				if (checkSecondSmall(small, second)) {
					small = list[j]["Time"];
					position = j;
				}
			}
			if (position != -1) {
				update = list[i];
				list[i] = list[position];
				list[position] = update;
			}
		}
	}
	//console.log("list+", list);
	return list;
};

export const parseNurseNotification = (payload: any) => {
	let list = [];
	if (payload["signup data"] > 0) {
		let obj: any = {};
		obj["newPatient"] =
			"You have" + " " + payload["signup data"] + "new patient";
		obj["url"] = "/new-requests";
		list.push(obj);
	}
	if (payload["followup data"] > 0) {
		let obj1: any = {};
		obj1["followUp"] =
			"You have" + " " + payload["followup data"] + "new follow-ups";
		obj1["url"] = "/follow-up";
		list.push(obj1);
	}
	return list;
};
export const parseOrderHistory = (payload: any) => {
	let details = [];
	for (let i = 0; i < payload.length; i++) {
		let obj: any = {};
		obj["Date"] = payload[i].date;
		obj["Status"] = payload[i].order_status;
		obj["Plan"] = payload[i].plan_id;
		details.push(obj);
	}
	return details;
};

export const parsePatientPlanDetail = (payload: any) => {
	let obj: any = {};
	if (Object.keys(payload).length != 0) {
		obj["id"] = payload.id;
		obj["name"] = payload.name;
		obj["drug"] = payload.drug;
		obj["dosage"] = payload.dosage;
		obj["frequency"] = payload.frequency;
		obj["amount"] = payload.amount;
		obj["detail"] = payload.detail;
	}
	return obj;
};

export const parsePatientNotification = (payload: any) => {
	let list = [];
	for (let i = 0; i < payload.length; i++) {
		let obj: any = [];
		if (i == 0 && payload[0]["notification"] != 0) {			
			obj["notification"] =
				"you have " + payload[i]["notification"] + " upcoming order";
			obj["url"] = "/orders";
			list.push(obj);
		} else if(i!=0) {
			obj["notification"] = payload[i]["notification"];
			obj["url"] = "/orders";
			list.push(obj);
		}
	}
	return list;
};

// export const checkValidAppointmentTime = (time: string) => {
// 	let d = new Date();
// 	let start_hr = 0;
// 	let start_min = 0;
// 	let end_hr = 0;
// 	let end_min = 0;
// 	let current_hr = d.getHours();
// 	let current_min = d.getMinutes();
// 	start_hr = parseInt(time.substring(0, 2));
// 	start_min = parseInt(time.substring(3, 5));
// 	if (parseInt(time.substring(3, 5)) + 15 > 60) {
// 		end_hr = start_hr + 1;
// 		end_min = parseInt(time.substring(3, 5)) + 15 - 60;
// 	} else {
// 		end_hr = start_hr;
// 		end_min = parseInt(time.substring(3, 5)) + 15;
// 	}
// 	if (
// 		(current_hr === end_hr &&
// 			end_hr === start_hr &&
// 			start_min <= current_min &&
// 			current_min <= end_min) ||
// 		(start_hr < end_hr &&
// 			(start_min <= current_min || current_min <= end_min))
// 	) {
// 		return "yes";
// 	} else if (
// 		current_hr > end_hr ||
// 		(current_hr === end_hr && current_min > end_min)
// 	) {
// 		return "time gone";
// 	}
// 	return "wait";
// };
