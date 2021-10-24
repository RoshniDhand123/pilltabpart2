import axios from "axios";
//import { object } from "yup/lib/locale";
import { getToken, clearStorage } from "../storage";
const BASE_URL = "http://5895-203-129-220-19.ngrok.io/";

let token = getToken();
const requestHeaders = {
	"content-type": "application/json",
	Accept: "application/json",
	Authorization: token,
};

export default {
	get: (url: string) => {
		return new Promise((resolve, reject) =>
			axios
				.get(BASE_URL + url, { headers: requestHeaders })
				.then((response) => resolve(response))
				.catch((error) => {
					if (error && error.response && error.response.status === 401) {
						clearStorage();
						window.location.href = "/";
					}
					resolve(error.response);
				})
		);
	},
	post: (url: string, data: string, access_token?: string) => {
		if (access_token) requestHeaders["Authorization"] = access_token;
		return new Promise((resolve, reject) =>
			axios
				.post(BASE_URL + url, data, { headers: requestHeaders })
				.then((response) => resolve(response))
				.catch((error) => reject(false))
		);
	},

	put: (url: string, data: string) => {
		return new Promise((resolve, reject) =>
			axios
				.put(BASE_URL + url, data, { headers: requestHeaders })
				.then((response) => resolve(response))
				.catch((error) => reject(false))
		);
	},
	delete: (url: string, data: string) => {
		return new Promise((resolve, reject) =>
			axios
				.delete(BASE_URL + url, { data, headers: requestHeaders })
				.then((response) => resolve(response))
				.catch((error) => reject(false))
		);
	},

	postFile: (url: string, data: any) => {
		const formData = new FormData();
		for (const property in data) {
			formData.append(property, data[property]);
		}
		return new Promise((resolve, reject) =>
			axios
				.post(BASE_URL + url, formData, { headers: requestHeaders })
				.then((res) => resolve(res))
				.catch((error) => reject(false))
		);
	},
};
