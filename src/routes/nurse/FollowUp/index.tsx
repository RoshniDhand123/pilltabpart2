import React from "react";
import { Typography } from "@material-ui/core";
import { CONSTANTS } from "../../constants";
import {
	getUserRequestList,
	acceptRejectRequestList,
	setAppointmentByNurse,
	getPatientMedicalInfo,
} from "../../../services/apis/index";
import Loading from "../../../components/loader";
import {
	parseRequestsList,
	parseUTCtoLocalTime,
	parsePatientMedicalInfo,
} from "../../../services/helper/index";
import { notifError, notifSuccess } from "../../util";
import TableCmp from "../../../components/tableCmp";
import { HeadCell } from "../../../components/tableCmp/type";
import ModalComponent from "../../../components/modal";
import ViewDetail from "../view-detail";

const headCells: HeadCell[] = [
	{ name: "Id", label: "ID" ,width:"5%"},
	{ name: "Name", label: "Name",width:"5%" },
	{ name: "Dob", label: "DOB",width:"5%" },
	{ name: "Email", label: "Email",width:"5%" },
	// { name: "Date", label: "Date" },
	// { name: "Time", label: "Time" }
	{ name: "Status", label: "Status",width:"5%" },
	{ name: "action", label: "Action" ,width:"5%"},
];
const data= [
    {"id":1,"date":"2012-11-29","time":"19:00","status":"followup","updated":"2021-09-08T12:57:47.564757Z","created":"2021-09-08T12:57:47.564804Z","patient_id":1,"nurse_id":5,"patient":{"first_name":"John","last_name":"Walker","email":"john@gmail.com","dob":"1900-09-15"}},
    {"id":2,"date":"2012-11-29","time":"10:45","status":"followup","updated":"2021-09-09T04:50:50.102383Z","created":"2021-09-09T04:50:50.102478Z","patient_id":1,"nurse_id":5,"patient":{"first_name":"John","last_name":"Walker","email":"john@gmail.com","dob":"1900-09-15"}},
]

class FollowUp extends React.Component<any, any> {
	state = {
		details: [],
		loading: true,
		current: 0,
		next: false,
		previous: false,
		count: 0,
		open: false,
		appointmentMsg: "",
		id:-1,		
		userMedicalInfo:[],
	};

	componentDidMount() {
		this.getNewRequestList();
	}
	setAppointment = async (row: any) => {
		//Api integrate to set appointment
		this.setState({ loading: true });
		let payload: any = { patient_id: row.Id };
		let resp = await setAppointmentByNurse(payload, "followup");
		//console.log("nurseAppointment", resp);
		if (resp.data && resp.data.status) {
			let localtime = await parseUTCtoLocalTime(
				resp.data.msg["date"] + " " + resp.data.msg["time"]
			);
			this.setState({
				open: true,
				appointmentMsg:
					"Appointment timming set for " +
					row.Name +
					" at " +
					localtime,
			});
			// let time = resp.data.msg["time"].split(".");
			// notifSuccess("Appointment Set", "Appointment Set at " + time[0]);
			this.getNewRequestList();
		} else {
			notifError("Appointment not set");
		}
		this.setState({ loading: false });
		//console.log("row++", row);
	};
	getNewRequestList = async () => {
		let resp = await getUserRequestList("followup");		
		if (resp.data && resp.data.status) {
			//let count=0,nextcheck=0;
			this.setState({
				details: parseRequestsList(resp.data.data, [					
					// {
					// 	btnTxt: "SetAppointment",
					// 	classname: "style",
					// 	method: this.setAppointment,
					// },
					{
						btnTxt: "View",
						classname: "style",
						method: this.getUserRecord,
					},
				]),
				count: resp.data.count,
				next: resp.data.next ? true : false,
				//loading: false,
			});
		}
		this.setState({ loading: false });
	};	
	getUserRecord = async (row: any, id: any) => {
		console.log("row=", row);
		let resp=await getPatientMedicalInfo(row.Id);
		if(resp.data && resp.data.status){
			let parseData=parsePatientMedicalInfo(resp.data.data);
			this.setState({userMedicalInfo:parseData});
		}
		this.setState({ id: row.Id, open: true });
	};

	componentDidUpdate(prevProps: any, prevState: any) {
		if (prevState.details !== this.state.details) {
			//console.log(" state has changed.");
		}
	}

	setPageData = async (page: number) => {
		let resp: any;
		let moveForward = "";
		this.setState({ loading: true });
		if (page > this.state.current && this.state.next === true) {
			resp = await getUserRequestList(`pending?page=${page + 1}`);
			{
				resp.data ? (moveForward = "yes") : (moveForward = "no");
			}
			//console.log("nextApi hit", resp);
		} else if (page < this.state.current && page !== 0) {
			resp = await getUserRequestList(`pending?page=${page + 1}`);
			{
				resp.data ? (moveForward = "yes") : (moveForward = "no");
			}
			//console.log("backApiHit", resp);
		} else if (page === 0) {
			resp = await getUserRequestList("pending");
			{
				resp.data ? (moveForward = "yes") : (moveForward = "no");
			}
			//console.log("initialData", resp);
		}
		if (moveForward === "yes") {
			if (resp.data && resp.data.status) {
				this.setState({
					details: parseRequestsList(resp.data.data, [						
						{
							btnTxt: "SetAppointment",
							classname: "style",
							method: this.setAppointment,
						},
					]),
					current: page,
					next: resp.data.next ? true : false,
					previous: resp.data.previous ? true : false,
				});				
			}
		} else notifError("", "No further Data exist");
		this.setState({ loading: false });
	};

	onPageChange = async (perPage: number, page: number) => {
		const { count, details = [] } = this.state;
		if (count > details.length && (page + 1) * perPage > details.length)
			await this.setPageData(page);
		return this.state.details;
	};
	closeModal = (followUp:boolean) => {
		//api set for Follow up button click
		if(followUp){
			console.log("+++");
			this.getNewRequestList();
		}
		this.setState({ open: false });
	};
	render() {
		const { count, details, loading, open, appointmentMsg,id,userMedicalInfo } = this.state;
		return (
			<>
				{/* <ModalComponent
					open={open}
					buttonText="OK"
					buttonAction={this.closeModal}
					modalHeading={"Appointment set"}
					modalText={appointmentMsg}
					alongSidebar={true}
				/> */}
				{open && (
					<ModalComponent open={open} alongSidebar={true}>
						<ViewDetail
							closeModel={this.closeModal}							
							id={id}
							secondBtnText="Follow-up done"
							medicalInfo={userMedicalInfo}
						/>
					</ModalComponent>
				)}
				<div >
					<Typography variant="h3" gutterBottom>
						{CONSTANTS.FOLLOW_UP}
					</Typography>
					<div className="table-container">
						<TableCmp
							onPageChange={this.onPageChange}
							total={count}
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

export default FollowUp;
