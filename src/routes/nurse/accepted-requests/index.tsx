import React from "react";
import { Typography } from "@material-ui/core";
import { CONSTANTS } from "../../constants";
import Loading from "../../../components/loader";
import { getUserRequestList,getPatientMedicalInfo } from "../../../services/apis/index";
import {
	parseAcceptRequestsList,
	getTimeSequenceList,
	parsePatientMedicalInfo,
} from "../../../services/helper/index";
import { PatientReportType } from "../patient-reports";
import TableCmp from "../../../components/tableCmp";
import { HeadCell } from "../../../components/tableCmp/type";
import ModalComponent from "../../../components/modal";
import PatientChart from "../patient-chart";
import ViewDetail from "../view-detail";

const headCells: HeadCell[] = [
	{ name: "Id", label: "ID" ,width:"5%"},
	{ name: "Name", label: "Name" ,width:"5%"},
	{ name: "Dob", label: "DOB" ,width:"5%"},
	{ name: "Email", label: "Email",width:"5%" },
	// { name: "Date", label: "Date" },
	// { name: "Time", label: "Time" },
	{ name: "Status", label: "Status",width:"5%" },
	{ name: "action", label: "Action" ,width:"5%"},
];

class AcceptedRequests extends React.PureComponent<
	any,
	{
		loading: boolean;
		details: PatientReportType[];
		total: number;
		open: boolean;		
		id: number;
		userMedicalInfo:any;
	}
> {
	state = {
		loading: true,
		details: [],
		total: 0,
		open: false,		
		id: -1,
		userMedicalInfo:[],
	};

	componentDidMount() {
		this.getRequestList();
	}

	getRequestList = async () => {
		let resp = await getUserRequestList("accepted");
		if (resp.data && resp.data.status) {
			let parseData = parseAcceptRequestsList(resp.data.data, [
				{
					btnTxt: "View",
					classname: "style",
					method: this.getUserRecord,
				},
			]);

			this.setState({ details: getTimeSequenceList(parseData) });
		}
		//console.log("status", resp);
		this.setState({ loading: false });
	};
	_loadDetails = async (page = 0, perPage = 10) => {};

	onPageChange = async (perPage: number, page: number) => {
		const { total, details = [] } = this.state;
		if (total > details.length && (page + 1) * perPage > details.length)
			await this._loadDetails(page, perPage);
		return this.state.details;
	};

	getUserRecord = async (row: any, id: any) => {
		//console.log("row=", row);
		let resp=await getPatientMedicalInfo(row.Id);
		if(resp.data && resp.data.status){
			let parseData=parsePatientMedicalInfo(resp.data.data);
			this.setState({userMedicalInfo:parseData});
		}
		//console.log("questions info",resp);
		this.setState({ id: row.Id, open: true });
	};

	closeModal = (setAppointment:boolean) => {
		this.setState({ open: false });
		if(setAppointment){
			this.setState({loading:true})
			this.getRequestList();
		}		
	};

	render() {
		let {
			loading,
			total,
			details,
			open,
			id,			
			userMedicalInfo,
		} = this.state;
		return (
			<>			
				{open && (
					<ModalComponent open={open} alongSidebar={true}>
						<ViewDetail
							closeModel={this.closeModal}												
							id={id}
							medicalInfo={userMedicalInfo}
						/>
					</ModalComponent>
				)}
				<div className="content nurse nursePageContainer">
					<Typography variant="h3" gutterBottom>
						{CONSTANTS.ACCEPTED_REQUESTS}
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

export default AcceptedRequests;
