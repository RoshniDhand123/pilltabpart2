import Field from "../../../components/Field";

const eighteenYearsAgo = () => {
	let d = new Date();
	d.setFullYear(d.getFullYear() - 18);
	return d;
  };
export default [
	{
		label: "Date of Birth",
		name: "dob",
		component: Field,
		type: "date",
		required: true,
		max_date: eighteenYearsAgo()
	},
	{
		label: "Gender",
		name: "gender",
		type: "radio",
		options: [
			{
				value: "Male",
				label: "Male",
			},
			{
				value: "Female",
				label: "Female",
			},
			{
				value: "Other",
				label: "Other",
			},
		],
		required: true,
	},
	{
		label: "Marital Status",
		name: "maritalStatus",
		component: Field,
		type: "radio",
		options: [
			{
				value: "Single",
				label: "Single",
			},
			{
				value: "Married",
				label: "Married",
			},
			{
				value: "Other",
				label: "Other",
			},
		],
		required: true,
	},
	{
		label: "Employment",
		name: "employment",
		component: Field,
		type: "radio",
		options: [
			{
				value: "Employed",
				label: "Employed",
			},
			{
				value: "Unemployed",
				label: "Unemployed",
			},
			{
				value: "Other",
				label: "Other",
			},
		],
		required: true,
	},
	{
		label: "Race",
		name: "race",
		component: Field,
		type: "radio",
		options: [
			{
				value: "White",
				label: "White",
			},
			{
				value: "Black",
				label: "Black",
			},
			{
				value: "Other",
				label: "Other",
			},
		],
		required: true,
	},
];
