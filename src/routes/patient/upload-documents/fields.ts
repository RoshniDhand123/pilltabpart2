import Field from "../../../components/Field";

export default [
	{
		label: "What does this file contain?",
		name: "fileInfo",
		component: Field,
		type: "text",
		required: true,
	},
    {
		label: "Upload",
		name: "file",
		component: Field,
		type: "file",
		required: true,
	}
];
