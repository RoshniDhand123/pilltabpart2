import { useState } from "react";
import Form from "../../../components/form";
import Button from "../../../components/button";
import fields from "./fields";

type props_type = {
	onSubmit: any;
	handleInputChange: any;
};

const initialValues = { fileInfo: "", file: "" };

export default ({ onSubmit, handleInputChange }: props_type) => {
	return (
		<Form
			fields={fields}
			onSubmit={onSubmit}
			initialValues={initialValues}
			renderCustomSubmit={
				<Button
					btnText="Upload"
					className="form-button"
					type="submit"
				/>
			}
			gridItem={6}
			column={12}
			handleInputChange={handleInputChange}
		/>
	);
};
