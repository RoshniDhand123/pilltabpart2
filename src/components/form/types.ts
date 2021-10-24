export type formParams = {
	values: object;
	errors: object;
	touched: object;
	handleSubmit: any;
	handleChange: any;
};

export type field = {
	name: string;
	component?: any;
	placeholder?: string;
	type?: string;
	icon?: any;
	required?: boolean;
	req_msg?: string;
	err_msg?: string;
	min_date?: Date;
	max_date?: Date;
	min?: number;
	max?: number;
	matches?: RegExp;
	options?: { name?: string; value: any; label: string }[];
	label?: string;
	displayable?: boolean;
	gridItem?: any;
	radioInput?: boolean;
	id?: string;
};

export type formProps = {
	fields: field[];
	onSubmit: any;
	initialValues?: any;
	renderCustomSubmit?: any;
	sectionWrap?: boolean;
	forgotPassword?: boolean;
	btnText?: string;
	rememberMe?: any;
	id?: string;
	gridItem?: any;
	handleInputChange?: any;
	column?: any;
	onChange?: any;
	alignCenter?: boolean;
};
