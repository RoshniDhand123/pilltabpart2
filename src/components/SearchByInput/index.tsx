import React from "react";
//import Input from "../../FieldComponent/index";
import DropDown from "../DropDown";
import Button from "../button";
import "./style.scss";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		paddingLeft: 10,
		border: "1px solid grey",
		borderRadius: "3px",
		//width: "480px",
		height: "33px",
		paddingTop: "5px",
		"& .MuiInputBase-input": {
			color: "white",
		},
		// [theme.breakpoints.down(600)]: {
		// 	width: "300px",
		// },
	},
}));

interface Props {
	placeholder: string;
	//searchBy: string[];
	searchByList: string[];
	onEnter: (value: string, searchBy: string) => void;
	SearchByText: string;
	SearchButtonText: string;
	//variant: string;
	buttonCss: string;
}

const SearchBy: React.FC<Props> = React.memo(
	({
		placeholder,
		searchByList,
		onEnter,
		SearchByText,
		SearchButtonText,
		//variant,
		buttonCss,
	}) => {
		const classes = useStyles();
		const [searchBy, setSearchBy] = React.useState("");
		const [value, setValue] = React.useState("");
		const handleChange = (e: any) => {
			setValue(e.target.value);
			onEnter(e.target.value, "");
		};
		const onClick = () => {
			onEnter(value, searchBy);
		};
		return (
			<div className="search-by">
				<div className="search-input-container">
					<TextField
						className={classes.root}
						placeholder={placeholder}
						onChange={handleChange}
					/>
					{/* <Input
            variant={variant}
            onChange={handleChange}
            placeholder={placeholder}
          /> */}
				</div>

				<div className="search-by-button-container">
					<DropDown
						dropDownMenu={searchByList}
						btnText={SearchByText}
						buttonCss={buttonCss}
						setSearchBy={setSearchBy}
					/>
					<Button
						className={`${buttonCss} button-style`}
						//variant="contained"
						btnText={SearchButtonText}
						onClick={onClick}
					/>
				</div>
			</div>
		);
	}
);

export default SearchBy;
