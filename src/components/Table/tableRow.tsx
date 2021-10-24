import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import { makeStyles } from "@material-ui/core/styles";
import classes from "*.module.css";
import ButtonComponent from "../../components/button";
import VideoCall from "../../components/VideoCalling";
import { Link, Route } from "react-router-dom";
import ModalComponent from "../../components/modal";

const useStyles = makeStyles((theme) => ({
	divStyle: {
		padding: "10px 12px",
		background: "#c5c3c3",
		border: "none",
		width: 100,
		"&:focus": {
			outline: "none",
		},
	},
}));

const TableCellComponent = ({
	value,
	index,
	id,
	editable,
	handleChanges,
	row,
}: any) => {
	const classes = useStyles();
	const onChange = (e: any) => {
		if (typeof row[value] === "number") {
			if (/^\d+$/.test(e.target.innerText)) {
				handleChanges(e.target.innerText, value, id);
			} else {
				e.target.innerText = 0;
			}
		} else {
			handleChanges(e.target.innerText, value, id);
		}
	};
	return (
		<TableCell key={index} id={index}>
			{/* {console.log("index",index)} */}
			{id === editable ? (
				<div
					className={classes.divStyle}
					contentEditable="true"
					id={value}
					// type="text"
					onKeyUp={onChange}
				>
					{row[value]}
				</div>
			) : (
				row[value]
			)}
		</TableCell>
	);
};

const TableRowComponent = ({
	row,
	selectable,
	index,
	isItemSelected,
	labelId,
	handleClick,
	onIconClick,
	uniqueId,
	ignoreCell,
	editable,
	onSave,
	updationFromRow,
	button,
	button1,
}: any) => {
	const [obj, setObj] = React.useState({});
	const [open, setOpen] = React.useState(false);

	const handleChanges = (value: any, key: any, id: any) => {
		setObj({ value, key, id });
	};
	const doneChanges = () => {
		onSave(obj);
		onIconClick();
	};

	const renderCell = (value: any, index: any) => {
		if (!ignoreCell.includes(value)) {
			return (
				<TableCellComponent
					value={value}
					index={index}
					id={row[uniqueId]}
					editable={editable}
					handleChanges={handleChanges}
					row={row}
					button={button}
				/>
			);
		}
	};
	const openModel = () => {
		setOpen(true);
	};
	const closeModal = (callDetails: any) => {
		console.log("callDetail", callDetails);
		setOpen(false);
	};

	const checkAppointmentTime = (row: any) => {
		let d = new Date();
		let time = row["Appointment Time"];
		let current_hr = d.getHours();
		let current_min = d.getMinutes();
		let start_hr: number;
		let start_min: number;
		let end_hr: number;
		let end_min: number;
		start_hr = parseInt(time.substring(0, 2));
		start_min = parseInt(time.substring(3, 5));
		if (parseInt(time.substring(3, 5)) + 15 > 60) {
			end_hr = start_hr + 1;
			end_min = parseInt(time.substring(3, 5)) + 15 - 60;
		} else {
			end_hr = start_hr;
			end_min = parseInt(time.substring(3, 5)) + 15;
		}
		if (
			(current_hr === end_hr &&
				end_hr === start_hr &&
				start_min <= current_min &&
				current_min <= end_min) ||
			(start_hr < end_hr &&
				(start_min <= current_min || current_min <= end_min))
		) {
			openModel();
		} else if (
			current_hr > end_hr ||
			(current_hr === end_hr && current_min > end_min)
		) {
			alert("your time has gone");
		} else {
			alert("your need to wait some time");
		}
	};

	return (
		<>
			<ModalComponent open={open} alongSidebar={true}>
				<div className="videoCallBox">
					<VideoCall method={closeModal} identity="nurse"/>
				</div>
			</ModalComponent>
			<TableRow
				hover
				role="checkbox"
				aria-checked={isItemSelected}
				tabIndex={-1}
				key={index}
				selected={isItemSelected}
			>
				{selectable && (
					<TableCell padding="checkbox">
						<Checkbox
							checked={isItemSelected}
							inputProps={{ "aria-labelledby": labelId }}
							onClick={(event) =>
								handleClick(event, row[uniqueId])
							}
						/>
					</TableCell>
				)}
				{row && Object.keys(row).map(renderCell)}
				{button && (
					<TableCell className="setBorder">
						{button ? (
							button.btnTxt === "Start Video Call" ? (
								index === 0 && (
									<ButtonComponent
										btnText={button.btnTxt}
										className={button.classname}
										onClick={() =>
											checkAppointmentTime(row)
										}
									/>
								)
							) : button.btnTxt === "Review" ? (
								row.Status === "Not Approved" && (
									<ButtonComponent
										btnText={button.btnTxt}
										className={button.classname}
										onClick={() => button.method(row)}
									/>
								)
							) : (
								<ButtonComponent
									btnText={button.btnTxt}
									className={button.classname}
									onClick={() => button.method(row)}
								/>
							)
						) : (
							""
						)}
						{button1 ? (
							<ButtonComponent
								btnText={button1.btnTxt}
								className={button1.classname}
								onClick={() => button1.method(row)}
							/>
						) : (
							""
						)}
					</TableCell>
				)}
				{updationFromRow && (
					<TableCell padding="checkbox">
						{editable === row[uniqueId] ? (
							<Tooltip title="Edit">
								<IconButton aria-label="edit">
									<DoneIcon
										id="elloEditIconId"
										onClick={doneChanges}
									/>
								</IconButton>
							</Tooltip>
						) : (
							<Tooltip title="Edit">
								<IconButton aria-label="edit">
									<EditIcon
										id="elloEditIconId"
										onClick={(event) =>
											onIconClick(event, row[uniqueId])
										}
									/>
								</IconButton>
							</Tooltip>
						)}
					</TableCell>
				)}
			</TableRow>
		</>
	);
};

export default TableRowComponent;
