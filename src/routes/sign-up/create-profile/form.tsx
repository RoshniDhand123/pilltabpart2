import { useState } from "react";
import Form from "../../../components/form";
import Button from "../../../components/button";
import fields from "./fields";
import { getItem } from "../../../services/storage";

type props_type = {
	onSubmit: any;
	edit?: Boolean;
	// column?: any;
	// profile?: {};
};

const initialValues = { firstName: "", lastName: "", email: "", password: "" };

const getInitialValues = (edit: Boolean | undefined) => {
	if (edit) return {};
	let personalDetail = getItem("personalDetail");
	if (personalDetail) return personalDetail;
	else return initialValues;
};

export default ({ onSubmit, edit }: props_type) => {
	const [personalDetail, setpersonalDetail] = useState(
		getInitialValues(edit)
	);

	return (
		<Form
			fields={fields}
			onSubmit={onSubmit}
			initialValues={personalDetail}
			renderCustomSubmit={
				<Button btnText="Next" className="form-button" type="submit" />
			}
			column={12}
		/>
	);
};
