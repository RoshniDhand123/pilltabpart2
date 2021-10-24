import React from "react";
import { Formik, Form, Field } from "formik";
import { createSchema } from "./utils";
import { formProps, formParams } from "./types";
import { Button, Grid } from "@material-ui/core";
import Sections from "../section";
import { field as field_type } from "./types";
import "./style.scss";
import { Checkbox } from "@material-ui/core";
import RadioComponent from "../radio";
import CheckboxComponent from "../checkbox";
import DatePickerField from "../date-picker";
const cardFieldOptions = {
	style: {
		base: {
			color: "#ffffff",
		},
	},
};
var formikRef: any;
class FormContainer extends React.PureComponent<formProps, {}> {
	schema = createSchema(this.props.fields);
	state = { fileSelected: false, initialValues: this.props.initialValues };
	onFieldChange = (e: any) => {
		if (e.target) {
			if (e.target.type === "file") this.setState({ fileSelected: true });
			this.props.handleInputChange && this.props.handleInputChange(e);
			formikRef.handleChange && e.type && formikRef.handleChange(e);
		}
	};
	renderSwitch = (props: field_type) => {
		const { label, gridItem = 12, ...rest } = props;
		switch (props.type) {
			case "text":
				return (
					<Field
						key={props.name}
						{...rest}
						className={gridItem === 6 ? "input-padding" : ""}
						onChange={this.onFieldChange}
					/>
				);
			case "radio":
				return (
					<RadioComponent
						initialValues={this.props.initialValues}
						{...rest}
					/>
				);
			case "checkbox":
				return <CheckboxComponent {...rest} />;
			case "cardElement":
				return (
					<Field
						key={props.name}
						{...rest}
						className={gridItem === 6 ? "input-padding" : ""}
						options={cardFieldOptions}
						onChange={this.onFieldChange}
					/>
				);
			case "date":
				return <DatePickerField {...rest} />;
			case "datetime-local":
				return <DatePickerField {...rest} />;
			case "file":
				return (
					<Field
						key={props.name}
						{...rest}
						className={`${gridItem === 6 ? "input-padding" : ""} ${this.state.fileSelected
							? "selectedFile"
							: "notSelected"
							} custom-file-input`}
						onChange={this.onFieldChange}
					/>
				);
			default:
				return (
					<Field
						key={props.name}
						{...rest}
						className={gridItem === 6 ? "input-padding" : ""}
						onChange={this.onFieldChange}
					/>
				);
		}
	};
	renderField = (props: field_type, index: number) => {
		const { label, gridItem } = props;
		const { column } = this.props;
		return (
			<Grid
				container
				key={index}
				className={`${props.type == "date" && column ? "" : "field-container"
					}`}
				sm={column ? column : gridItem ? gridItem : 12}
				xs={12}
			>
				{column && label ? (
					<Grid item xs={11} sm={11} className="column">
						<div className={`input-label`}>{label}</div>
						{this.renderSwitch(props)}
					</Grid>
				) : (
					<>
						{label && (
							<Grid item xs={3} sm={2} className="label">
								<div className={`input-label`}>{label}</div>
							</Grid>
						)}
						<Grid
							item
							xs={label ? 9 : 12}
							sm={label ? 10 : 12}
							id={props.id}
						>
							{this.renderSwitch(props)}
						</Grid>
					</>
				)}
			</Grid>
		);
	};
	renderForm = ({ handleSubmit }: formParams) => {
		const {
			fields,
			renderCustomSubmit,
			sectionWrap,
			btnText,
			rememberMe,
			id,
			gridItem,
			alignCenter
		}: formProps = this.props;
		return (
			<Form id={id} onSubmit={handleSubmit} onChange={this.props.onChange ? this.props.onChange : () => { }}>
				{sectionWrap ? (
					<Sections>
						<Grid container spacing={1}>
							{fields.map(this.renderField)}
							{rememberMe && (
								<div className="form-footer flex-end">
									<Checkbox />
									<span className="remember-txt">
										Remember Me
									</span>
								</div>
							)}
						</Grid>
					</Sections>
				) : (
					<Grid container sm={gridItem ? gridItem : 12} className={alignCenter?"center-set":""}>
						{fields.map(this.renderField)}
					</Grid>
				)}
				{fields.length
					? renderCustomSubmit || (
						<Button variant="contained" type="submit">
							{btnText}
						</Button>
					)
					: null}
			</Form>
		);
	};
	setRef = (ref: any) => {
		formikRef = ref;
	};
	componentDidUpdate(prevProps: any) {
		if (prevProps.initialValues !== this.props.initialValues) {
			this.setState({ initialValues: this.props.initialValues });
		}
	}
	render() {
		let { onSubmit }: any = this.props;
		let { initialValues } = this.state;
		return (
			<Formik
				initialValues={initialValues}
				onSubmit={onSubmit}
				validationSchema={this.schema}
				innerRef={this.setRef}
				enableReinitialize
			>
				{this.renderForm}
			</Formik>
		);
	}
}
export default FormContainer;
