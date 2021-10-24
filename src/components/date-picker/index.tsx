import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDate, formatDateTime } from "../../routes/util";
//import DateTimePicker from "react-datetime-picker";
import "./style.scss";
// import moment from "moment";

export const DatePickerField = (props: any) => {
	const { setFieldValue } = useFormikContext();
	const [field] = useField(props);
	const onDateChange = (val: any) => {
		console.log("val", val);
		// console.log("check", field.name, formatDateTime(val));
		if (props.showTimeSelect)
			setFieldValue(field.name, formatDateTime(val));
		else setFieldValue(field.name, formatDate(val));
	};
	return (
		<div className="datePicker">
			<DatePicker

				autoFocus={false}
				// {...field}
				// {...props}
				selected={(field.value && new Date(field.value)) || null}
				onChange={onDateChange}
				maxDate={props.max_date || undefined}
				minDate={props.min_date || undefined}
				dateFormat={
					props.timeIntervals ? "MM/dd/yyyy HH:mm" : "MM/dd/yyyy"
				}
				showTimeSelect={props.showTimeSelect}
				timeIntervals={props.timeIntervals}
				timeFormat="HH:mm"
				showMonthDropdown
				showYearDropdown
			/>
			{/* <DateTimePicker
				onChange={onDateChange}
				maxDate={props.max_date || undefined}
				minDate={props.min_date || undefined}
				dateFormat={
					props.timeIntervals ? "MM/dd/yyyy hh:mm aa" : "MM/dd/yyyy"
				}
			/> */}
		</div>
	);
};

export default DatePickerField;
