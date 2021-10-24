import Form from "../../../components/form";
import Button from "../../../components/button";
import fields from "./fields";

type props_type = {
	onSubmit: any;
};

const initialValues = { start: "" };

export default ({ onSubmit }: props_type) => {
	return (
		<Form
			fields={fields}
			onSubmit={onSubmit}
			initialValues={initialValues}
			renderCustomSubmit={
				<Button
					btnText={"Book Appointment"}
					className="form-button"
					type="submit"
				/>
			}
			//gridItem={6}
			column={12}
		/>
	);
};
