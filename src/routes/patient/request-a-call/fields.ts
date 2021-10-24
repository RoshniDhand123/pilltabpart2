import Field from "../../../components/Field";

const date = new Date();
const setDate = new Date(
	date.getFullYear(),
	date.getMonth(),
	date.getDate() + 7
);

export default [
	{
		label: "Select a start time",
		name: "start",
		component: Field,
		placeholder: "Start of call",
		type: "datetime-local",
		required: true,
		showTimeSelect: true,
		min_date: new Date(),
		max_date: setDate,
		timeIntervals: 15,
	},
];
