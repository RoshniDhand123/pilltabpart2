import React, { useEffect, useState } from "react";
import { Field, useField } from "formik";
import "./style.scss";
import { Radio, RadioGroup, FormControl } from "@material-ui/core";

type option_props = {
	value: string;
	label: string;
};

const isLabelYes = (option: option_props[], value: string) => {
	let val = option.find((item) => item.value === value);
	if (val) return val.label === "Yes";
	else return false;
};

const RadioButtonsGroup = function (props: any) {
	const [textField, displayTextField] = useState(false);
	const [value, setValue] = useState(props.initialValues[props.name]);
	const [inputVal, setInputVal] = useState(
		props.initialValues[props.name + "-input"] || ""
	);

	const [field] = useField(props);
	useEffect(() => {
		if (props.radioInput && isLabelYes(props.options, value))
			displayTextField(true);
	}, [props.radioInput, props.options, value]);

	useEffect(() => {
		setValue(props.initialValues[props.name]);
	}, [props.initialValues]);

	const onHandleInput = (e: any) => {
		setInputVal(e.target.value);
		field.onChange({
			target: { name: e.target.name, value: e.target.value },
		});
	};
	const onFieldChange = (e: any) => {
		setValue(e.target.value);
		field.onChange(e);
		if (props.radioInput && e.target.id == "Yes") displayTextField(true);
		else if (props.radioInput && e.target.id == "No") {
			setInputVal("");
			field.onChange({
				target: { name: props.name + "-input", value: "" },
			});
			displayTextField(false);
		}
	};

	const renderOptions = (option: { label: string; value: string }) => (
		<div className="option" key={option.label}>
			<Field
				type="radio"
				component={Radio}
				id={option.label}
				name={props.name}
				value={option.value}
				required={props.required}
			/>
			<label>{option.label}</label>
		</div>
	);

	return (
		<div role={props.name} aria-labelledby={props.name}>
			<div className="radio-container">
				<FormControl component="fieldset" disabled={props.disabled}>
					<RadioGroup
						name={props.name}
						value={value}
						onChange={onFieldChange}
					>
						{props.options.map(renderOptions)}
					</RadioGroup>
				</FormControl>
			</div>
			{textField && (
				<Field
					type="text"
					onChange={onHandleInput}
					value={inputVal}
					required={true}
					name={props.name + "-input"}
					className="radio-input"
				/>
			)}
		</div>
	);
};

export default React.memo(RadioButtonsGroup);
