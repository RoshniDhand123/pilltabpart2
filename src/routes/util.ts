import { store as notify } from "react-notifications-component";
import { saveUser, clearStorage, setItem } from "../services/storage";
import { login } from "../services/apis/index";
import axios from "axios";

type payload_type = {
	email: string;
	password: string;
};

export const resetRouter = () => {
	window.location.href = "/";
};

export const notifError = (title: string, message?: string) => {
	notify.addNotification({
		title,
		message,
		type: "danger",
		insert: "top",
		container: "top-right",
		animationIn: ["animate__animated", "animate__fadeIn"],
		animationOut: ["animate__animated", "animate__fadeOut"],
		dismiss: {
			duration: 5000,
			onScreen: true,
		},
	});
};

export const notifSuccess = (title: string, message?: string) => {
	notify.addNotification({
		title,
		message,
		type: "success",
		insert: "top",
		container: "top-right",
		animationIn: ["animate__animated", "animate__fadeIn"],
		animationOut: ["animate__animated", "animate__fadeOut"],
		dismiss: {
			duration: 5000,
			onScreen: true,
		},
	});
};

export const notifWarning = (title: string, message?: string) => {
	notify.addNotification({
		title,
		message,
		type: "warning",
		insert: "top",
		container: "top-right",
		animationIn: ["animate__animated", "animate__fadeIn"],
		animationOut: ["animate__animated", "animate__fadeOut"],
		dismiss: {
			duration: 5000,
			onScreen: true,
		},
	});
};

export const verifyPassword = (value: string): string => {
	if (
		value.length < 8 ||
		!/[a-z]/.test(value) ||
		!/[A-Z]/.test(value) ||
		!/[0-9]/.test(value) ||
		!/[!@#\$%\^&\*]/.test(value)
	) {
		return "Password should contain : \n Minimum length of 8 characters \n Atleast 1 Numeric character \n Atleast 1 Uppercase letter \n Atleast 1 Lowercase letter \n Atleast 1 Special character";
	}

	return "";
};

export const removeBlankInput = (values: any) => {
	let keys = Object.keys(values);
	let payload: any = {};
	keys.map((key) => {
		if (!key.includes("-input")) {
			payload[key] = values[key];
		} else if (key.includes("-input") && values[key] !== "") {
			payload[`${key}`] = values[key];
		}
	});
	return payload;
};

const preZero = (n: number): any => (n > 9 ? n : "0" + n);

export const formatDate = (d: Date): string => {
	return `${preZero(d.getMonth() + 1)}/${preZero(
		d.getDate()
	)}/${d.getFullYear()}`;
};

export const formatDateTime = (d: Date): string => {
	return `${preZero(d.getMonth() + 1)}/${preZero(
		d.getDate()
	)}/${d.getFullYear()} ${preZero(d.getHours())}:${preZero(d.getMinutes())}`;
	// ${parseHourAndMinutes(d)}`;
};

export const parseHourAndMinutes = (d: Date) => {
	let hour = d.getHours();
	let min = preZero(d.getMinutes());
	if (hour > 12) return preZero(hour % 12) + ":" + min + " " + "pm";
	else if (hour == 12) return 12 + ":" + min + " " + "pm";
	else if (hour == 0) return 12 + ":" + min + " " + "am";
	else return preZero(hour) + ":" + min + " " + "am";
};

export const moveDocumentSection = async (payload: any) => {
	let resp: any = loginApi(payload);
};

const loginApi = (payload: any) => {
	new Promise((resolve, reject) =>
		axios
			.post("http://5895-203-129-220-19.ngrok.io/api/v1/login", payload)
			.then((response) => {
				saveUser(response.data.tokens);
				window.location.href = "/upload-documents";
				setItem("uploadDocumentMsg", true);
			})
			.catch((error) => reject(false))
	);
};
