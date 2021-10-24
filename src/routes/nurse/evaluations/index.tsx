import React from "react";
import { Typography } from "@material-ui/core";
import { CONSTANTS } from "../../constants";
import CallCard from "../../../components/call-card";
import {
	getPatientList,
	getUserRequestList,
	rescheduleAppointment,
	getScheduleAppointmentList,
} from "../../../services/apis/index";
import Loading from "../../../components/loader";
import {
	parseEvaluationRequestList,
	parseAcceptRequestsList,
	getTimeSequenceList,
} from "../../../services/helper/index";
import TableCmp from "../../../components/tableCmp";
import { HeadCell } from "../../../components/tableCmp/type";
import VideoCall from "../../../components/VideoCalling";
import ModalComponent from "../../../components/modal";
import { notifError, notifSuccess } from "../../util";

const headers: HeadCell[] = [
	{ name: "Patient Name", label: "Patient Name",width:"5%" },
	{ name: "Time", label: "Appointment Time",width:"5%" },
	{ name: "Dob", label: "Date Of Birth" ,width:"5%"},
	{ name: "action", label: "Action",width:"5%" },
	// { name: "Id", label: "ID" },
	// { name: "Name", label: "Name" },
	// { name: "Dob", label: "DOB" },
	// { name: "Email", label: "Email" },
	// { name: "Date", label: "Date" },
	// { name: "Time", label: "Time" },
	// { name: "Status", label: "Status" },
];

//import OneSignal from "react-onesignal";

// const Call = (
// 	<ButtonComponent btnText="start Video call" className="nurse btn" />
// );

class Evaluations extends React.PureComponent<any, {}> {
	state = {
		first_appointmentTime: "",
		details: [],
		loading: false,
		filterArray: [],
		count: 0,
		open: false,
	};
	timer: any;
	componentDidMount = async () => {
		this.getPatientDetailList();
	};
	componentWillUnmount = () => {
		clearInterval(this.timer);
	};

	checkValidAppointmentTime = (time: string) => {
		let d = new Date();
		let start_hr = 0,
			start_min = 0,
			end_hr = 0,
			end_min = 0;
		let current_hr = d.getHours();
		let current_min = d.getMinutes();
		start_hr = parseInt(time.substring(0, 2));
		start_min = parseInt(time.substring(3, 5));
		if (parseInt(time.substring(3, 5)) + 15 >= 60) {
			end_hr = start_hr + 1;
			end_min = parseInt(time.substring(3, 5)) + 15 - 60;
		} else {
			end_hr = start_hr;
			end_min = parseInt(time.substring(3, 5)) + 15;
		}
		if (
			current_hr > end_hr ||
			(current_hr === end_hr && current_min > end_min)
		) {
			return false;
		}
		return true;
	};

	openModel = () => {
		this.setState({ open: true });
	};
	closeModal = (callDetails: any) => {
		// console.log("callDetail", callDetails);
		this.setState({ open: false });
	};

	checkAppointmentTime = (row: any) => {
		let d = new Date();
		let time = row["Time"];
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
			this.openModel();
		} else if (
			current_hr > end_hr ||
			(current_hr === end_hr && current_min > end_min)
		) {
			alert("your time has gone");
		} else {
			alert("your need to wait some time");
		}
	};

	rescheduleAppointmentTime = async (row: any) => {
		this.setState({ loading: true });
		let resp = await rescheduleAppointment(row["Patient Id"]);
		if (resp.data && resp.data.status) {
			notifSuccess("Reschedule", "reschedule request successfully");
			let resp = await this.getPatientDetailList();
			this.setState({ loading: false });
		} else {
			notifError("Reschedule", "something went wrong");
			this.setState({ loading: false });
		}
	};
	filterArrayList = () => {
		let filterData: any = [];
		let i = 0;
		if (this.state.filterArray) {
			this.state.filterArray.map((object: any) => {
				Object.entries(object).map(([key, value]) => {
					//console.log("appointmentTIme",object);
					let data = value as string;
					if (key === "Time") {
						let check = this.checkValidAppointmentTime(data);
						if (check) {
							if (filterData.indexOf(object) < 0) {
								let obj: any = {};
								// get appointment time and request id from first row
								if (i === 0) {
									this.setState({
										first_appointmentTime: object["Time"],
									});
									localStorage.setItem(
										"patientId",
										JSON.stringify(object["Patient Id"])
									);
									obj["action"] = [
										{
											btnTxt: "Reschedule",
											classname: "style",
											callBack: this.rescheduleAppointmentTime.bind(
												this,
												object
											),
										},
										{
											btnTxt: "Start Video Call",
											classname: "style",
											callBack: this.checkAppointmentTime.bind(
												this,
												obj
											),
										},
									];
								} else {
									obj["action"] = [
										{
											btnTxt: "Reschedule",
											classname: "style",
											callBack: this.rescheduleAppointmentTime.bind(
												this,
												object
											),
										},
									];
								}
								obj["Patient Id"] = object["Patient Id"];
								obj["Patient Name"] = object["Patient Name"];
								obj["Time"] = object["Time"];
								obj["Dob"] = object["Dob"];
								filterData.push(obj);
								i++;
							}
						}
					}
				});
			});
			this.setState({ filterArray: filterData });
			if (this.state.filterArray.length == 0) {
				this.setState({ first_appointmentTime: "" }); //set appointment time null when no upcoming call is exist.
				clearInterval(this.timer);
			}
		}
	};

	getPatientDetailList = async () => {
		this.setState({ loading: true });
		// let resp = await getPatientList();
		//let resp = await getUserRequestList("accepted");
		let resp = await getScheduleAppointmentList();
		console.log("check resp+", resp);
		if (resp.data.data.length) {
			localStorage.setItem(
				"nurseId",
				JSON.stringify(resp.data.data[0].nurse_id)
			);
		}
		if (resp.data && resp.data.status) {
			const { data = [], count = 0 } = resp.data;
			let parseData = await parseEvaluationRequestList(data);
			this.setState({
				count,
				details: parseData,
				filterArray: parseData,
			});
			if (data && data.length)
				this.timer = setInterval(this.filterArrayList, 1000);
		}
		this.setState({ loading: false });
	};
	_loadDetails = async (page = 0, perPage = 10) => {
		this.setState({ loading: true });
		let resp = await getPatientList(`?page=${page + 1}`);
		if (resp.data && resp.data.status) {
			const { data = [], count = 0 } = resp.data;
			this.setState({
				details: [
					...this.state.details,
					...parseEvaluationRequestList(data),
				],
				count,
				loading: false,
			});
			clearInterval(this.timer);
			this.timer = setInterval(this.filterArrayList, 1000);
		} else this.setState({ loading: false });
	};
	onPageChange = async (perPage: number, page: number) => {
		const { count, details = [] } = this.state;
		if (count > details.length && (page + 1) * perPage > details.length)
			await this._loadDetails(page, perPage);
		return this.state.filterArray;
	};
	render() {
		const {
			open,
			loading,
			filterArray,
			first_appointmentTime,
			count,
		} = this.state;
		return (
			<>
				<ModalComponent open={open} alongSidebar={true}>
					<div className="videoCallBox">
						<VideoCall method={this.closeModal} identity="nurse" />
					</div>
				</ModalComponent>
				<div className="content nurse nursePageContainer">
					<Typography variant="h3" gutterBottom>
						{CONSTANTS.EVALUATIONS}
					</Typography>
					<CallCard time={first_appointmentTime} />
					<div className="table-container">
						<TableCmp
							onPageChange={this.onPageChange}
							total={count}
							data={filterArray}
							headers={headers}
							title={""}
						/>
					</div>
				</div>
				<Loading show={loading} />
			</>
		);
	}
}

export default Evaluations;
