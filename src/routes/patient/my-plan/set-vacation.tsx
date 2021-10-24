import React from "react";
import ButtonComponent from "../../../components/button";
import BasicSelect from "../../../components/drop-down";
import { setPatientVacation } from "../../../services/apis";
import { getMonthNameAndYear } from "../../../services/helper";
import { notifError, notifSuccess } from "../../util";
import Loading from "../../../components/loader";
import "../style.scss";

interface props {
	closeModal: (name:string) => void;
}
const dropDownMenu = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const SetVacationPage: React.FC<props> = React.memo(({ closeModal }) => {
	const [vacation, setVacation] = React.useState<number>(-1);
	const [monthName, setMonth] = React.useState<string>();
	const [year, setYear] = React.useState<number>();
	const [loading, setLoading] = React.useState<boolean>(false);

	const handleSetVacation = async () => {
		if (vacation != -1) {
			setLoading(true);
			let payload = { vacation_time: vacation.toString() };
			let resp = await setPatientVacation(payload);
			if (resp.data && resp.data.status) {
				notifSuccess(
					"Set Vacation",
					resp.data.msg //"Your next order deliver after " + vacation + " month"
				);
				closeModal("vacation");
			}			
			setLoading(false);
		} else
			notifError("Vacations", "Please select months for vacation period");
	};
	const handleChange = async (selectedMonth: number) => {
		let date = new Date();
		let detail = await getMonthNameAndYear(date.getMonth() + selectedMonth);
		console.log(
			"check selection",
			selectedMonth,
			date,
			date.getMonth() + selectedMonth
		);
		console.log("month", detail.monthName, detail.year);
		setVacation(selectedMonth);
		setMonth(detail.monthName);
		setYear(detail.year);
	};

	return (
		<div id="set-Vacation">
			<div className="vacation-heading">Set Vacation</div>
			<div className="dropDownStyle">
				<div className="subheading">Select No of Months</div>
				<BasicSelect
					handleChangedata={handleChange}
					dropDownList={dropDownMenu}
				/>
			</div>
			{vacation != -1 && (
				<div className="m-topBottom">
					Your Next order delivery is schedule for {monthName} {year}
				</div>
			)}
			<div className="buttonContainer">
				<ButtonComponent
					btnText="Set Vacation"
					className="set-width set-bg"
					onClick={handleSetVacation}
				/>
				<ButtonComponent
					btnText="Cancel"
					className="margin-bothSide set-bg"
					onClick={()=>closeModal("vacation")}
				/>
			</div>
			<Loading show={loading} />
		</div>
	);
});
export default SetVacationPage;
