import * as Yup from "yup";
import { field } from "./types";

export const createSchema = (validations: field[]) => {
	let shape: any = {};
	for (let i = 0; i < validations.length; i++) {
		let _type = validations[i].type;
		let _placeholder = validations[i].placeholder;
		let _key = validations[i].name;
		let _label = validations[i].label;
		let _required = validations[i].required;
		let _req_msg = validations[i].req_msg;
		let _err_msg = validations[i].err_msg;
		let _min_date = validations[i].min_date;
		let _max_date = validations[i].max_date;
		let _matches = validations[i].matches;
		let _min = validations[i].min;
		let _max = validations[i].max;

		if (_type === "email") {
			shape[_key] = Yup.string().email(
				_err_msg || "Please provide a valid email address"
			);
		} else if (_type === "number") {
			shape[_key] = Yup.number();
			if (_min)
				shape[_key] = shape[_key].min(
					_min,
					"Minimum length should " + _min + ""
				);
			if (_max)
				shape[_key] = shape[_key].max(
					_max,
					"Maximum length should " + _max + ""
				);
		} else if (_type === "date") {
			shape[_key] = Yup.date();
			if (_min_date) shape[_key] = shape[_key].min(_min_date);
			if (_max_date) shape[_key] = shape[_key].max(_max_date);
		} else if (_type === "checkbox") {
			shape[_key] = Yup.array();
		} else {
			shape[_key] = Yup.string();
			if (_matches)
				shape[_key] = shape[_key].matches(
					_matches,
					_err_msg || "Invalid value"
				);
		}
		if (_required) {
			shape[_key] = shape[_key].required(
				_req_msg ||
					"The" +
						` field ${
							_label || _placeholder || _key
						} is required`.toLowerCase()
			);
		}
		if (_key === "cpassword") {
			shape["cpassword"] = Yup.mixed().test(
				"match",
				"password and re-enter password does not match",
				function (password) {
					return password === this.parent.password;
				}
			);
		}
	}
	return Yup.object().shape(shape);
};
