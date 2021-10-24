import React from "react";
import { Typography } from "@material-ui/core";
import { CONSTANTS } from "../../constants";
import Loading from "../../../components/loader";
import ModalComponent from "../../../components/modal";
import {
	getUserRequestList,
	//getParticularUserRecord,
	nurseSetPatientReport,
	getPatientReport,
} from "../../../services/apis/index";
import {
	parseRequestsList,
	parseAcceptRequestsList,
	parsePatientReportInfo,
} from "../../../services/helper/index";
import Detail from "./detail";
import { notifError, notifSuccess } from "../../util";
import TableCmp from "../../../components/tableCmp";
import { HeadCell } from "../../../components/tableCmp/type";

const headCells: HeadCell[] = [
	{ name: "Id", label: "ID",width:"5%" },
	{ name: "Name", label: "Name",width:"5%" },
	{ name: "Dob", label: "DOB",width:"5%" },
	{ name: "Email", label: "Email",width:"5%" },
	{ name: "Date", label: "Date" ,width:"5%"},
	{ name: "Time", label: "Time",width:"5%" },
	{ name: "Status", label: "Status" ,width:"5%"},
	{ name: "action", label: "Action" ,width:"5%"},
];
export type PatientReportType = {
	created: string;
	date: string;
	id: number;
	nurse_id: number;
	patient: {
		first_name: number;
		last_name: number;
		email: number;
		dob: number;
	};
	dob: number;
	email: number;
	first_name: number;
	last_name: number;
	patient_id: number;
	status: number;
	time: number;
	updated: number;
};
export type report = {
	"Report By": string;
	Date: string;
	Time: string;
	Report: string;
};

class Evaluations extends React.PureComponent<
	any,
	{
		loading: boolean;
		open: boolean;
		total: number;
		details: PatientReportType[];
		id: number;		
		patient_reportInfo: report[];
		Appointment_Id:number;
	}
> {
	state = {
		details: [],
		loading: true,
		open: false,
		total: 0,
		id: -1,
		patient_reportInfo: [],
		Appointment_Id:-1,
	};

	componentDidMount() {
		this.getAllUserList();
	}

	getAllUserList = async () => {
		let resp = await getUserRequestList("completed");
		//console.log("report=>", resp);
		if (resp.data && resp.data.status) {
			let button = {
				btnTxt: "View Report",
				classname: "nurse btn",
				method: this.getUserRecord,
			};
			const { data = [], count = 0 } = resp.data;
			this.setState({
				total: count,
				details: parseAcceptRequestsList(data, [button]),
			});
		}	
		this.setState({ loading: false });
	};

	getUserRecord = async (row: any) => {
		console.log("row==>", row);
		let app_id=row["Appointment_Id"];		
		let resp = await getPatientReport(row.Id,app_id);		
		let parseData = await parsePatientReportInfo(resp.data.data);
		// let resp = await getParticularUserRecord(row.Id);		
		this.setState({patient_reportInfo:parseData, id: row.Id, open: true,Appointment_Id:app_id });
	};

	getReport = async (data: string) => {
		//console.log("get", data);
		if (data === "cancelButton") console.log("cancelButtonClick");
		else {
			let payload = { patient_id: this.state.id, detail: data,appointment_id:this.state.Appointment_Id };
			let resp = await nurseSetPatientReport(payload);
			if (resp.data && resp.data.status) {
				notifSuccess(
					"Report Submission",
					"Report Submitted successfully"
				);
			} else notifError("Report not submitted");
			//console.log("resp+", resp);
		}
		this.setState({ open: false });
	};
	_loadDetails = async (page = 0, perPage = 10) => {};

	onPageChange = async (perPage: number, page: number) => {
		const { total, details = [] } = this.state;
		if (total > details.length && (page + 1) * perPage > details.length)
			await this._loadDetails(page, perPage);
		return this.state.details;
	};

	render() {
		const { loading, open, details, total,patient_reportInfo } = this.state;
		return (
			<>
				{open && (
					<ModalComponent open={open} alongSidebar={true}>
						<Detail buttonAction={this.getReport} prevReport={patient_reportInfo}/>
					</ModalComponent>
				)}
				<div className="content nurse nursePageContainer">
					<Typography variant="h3" gutterBottom>
						{CONSTANTS.PATIENT_REPORTS}
					</Typography>
					<div className="table-container">
						<TableCmp
							onPageChange={this.onPageChange}
							total={total}
							data={details}
							headers={headCells}
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
