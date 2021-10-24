import * as React from "react";
import { Select, MenuItem, FormControl, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	formControl: {
		minWidth: 100,
		color: "white",
	},
	selectField: {
		border: "1px solid white",
		borderRadius: "3px",
	},
}));

interface props {
	handleChangedata: (selectedValue: any) => void;
	dropDownList: any[];
}

export default function BasicSelect({ handleChangedata, dropDownList }: props) {
	const classes = useStyles();
	//const [value, setValue] = React.useState("");

	const handleChange = (event: any) => {
		//setValue(event.target.value );
		handleChangedata(event.target.value);
	};
	const renderOption = (data: any, index: number) => {
		return (
			<MenuItem key={index} value={data} style={{ fontSize: "12px" }}>
				{data}
			</MenuItem>
		);
	};

	return (
		<FormControl className={classes.formControl}>
			<Select
				onChange={handleChange}
				className={classes.selectField}
				MenuProps={{
					PaperProps: {
						style: {
							// width: 120,
							maxHeight: 150,
						},
					},
					getContentAnchorEl: null,
					anchorOrigin: {
						vertical: "bottom",
						horizontal: "left",
					},
				}}
			>
				{dropDownList.map(renderOption)}
			</Select>
		</FormControl>
	);
}
