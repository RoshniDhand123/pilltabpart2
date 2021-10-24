import React from "react";
import { Typography } from "@material-ui/core";
import { CONSTANTS } from "../../constants";
import SearchBy from "../../../components/SearchByInput";
import {
	getUserRequestList,
	getPatientDetails,
	getSearchPatientList,
	getSearchPatientByValue,
} from "../../../services/apis/index";
import {
	parseRequestsList,
	parseHistoryList,
	parsePatientViewDetails,
	parseSearchPatientsList,
} from "../../../services/helper/index";
import TableCmp from "../../../components/tableCmp";
import ModalComponent from "../../../components/modal";
import PatientChart from "../patient-chart";
import { HeadCell } from "../../../components/tableCmp/type";
import Loading from "../../../components/loader";
import { CardNumberElement } from "@stripe/react-stripe-js";

const headCells: HeadCell[] = [	
	{ name: "first_name", label: "First Name",width:"5%" },
	{ name: "last_name", label: "Last Name",width:"5%" },
	{ name: "email", label: "Email",width:"5%" },
	{ name: "dob", label: "DOB" ,width:"5%"},	
	{ name: "action", label: "Action",width:"5%" },
];

class History extends React.PureComponent<any, {}> {
	state = {
		loading: false,
		details: [],
		count: 0,
		fields: [],
		patient_details: {},
		order_list: [],
		open: false,
	};
	componentDidMount() {
		this.getUserRequestHistory("");
	}

	getUserRequestHistory = async (page: string) => {
		this.setState({ loading: true });
		let button = {
			btnTxt: "View Chart",
			classname: "nurse btn f-left",
			method: this.getUserRecord,
		};
		// let resp = await getUserRequestList("rejected");
		let resp = await getUserRequestList("history");
		console.log("history", resp);
		if (resp.data && resp.data.status) {
			const { data = [], count = 0 } = resp.data;
			this.setState({
				loading: false,
				count,
				details: parseHistoryList(data, [button]),
			});
			this.getFieldsValue(this.state.details[0]);
		} else this.setState({ loading: false });
	};

	getFieldsValue = (patientObject: any) => {
		let fields: string[] = [];
		Object.keys(patientObject).map(
			(field) => field != "action" && fields.push(field)
		);
		this.setState({ fields: fields });
	};
	getUserRecord = async (row: any, id: any) => {
		// const requestId = "12";
		// let resp = await patientMedicationOrder(requestId);
		console.log("row", id);
		console.log("row and Id", row);
		let resp = await getPatientDetails(id);
		if (resp.data && resp.data.status) {
			let response = await parsePatientViewDetails(resp.data);
			this.setState({
				patient_details: response.detail,
				order_list: response.orderList,
			});
		}
		this.setState({ open: true });
	};

	onEnter = async (search_value: string, search_by: string) => {
		console.log("search_by", search_value, search_by);
		let button = {
			btnTxt: "View Chart",
			classname: "nurse btn f-left",
			//method: this.getUserRecord,
		};
		this.setState({ searchData: search_value });
		if (search_by !== "" && search_value) {
			console.log("in searchBy");
			this.setState({ searchBy: search_by });
			this.setState({ loading: true });
			let resp = await getSearchPatientList({ search_value, search_by });			
			if (resp.data && resp.data.results) {
				const { results = [], count = 0 } = resp.data;
				this.setState({
					details: parseSearchPatientsList(results, [button]),
					count,
					loading: false,
				});
			}
		} else if (search_value != "") {
			this.setState({ searchBy: "" });
			let resp = await getSearchPatientByValue(search_value);
			if (resp.data) {
				const { results = [], count = 0 } = resp.data;
				this.setState({
					details: parseSearchPatientsList(results, [button]),
					count,
				});
			}
		} else {
			let resp = await getUserRequestList("history");
			if (resp.data && resp.data.status) {
				const { data = [], count = 0 } = resp.data;
				this.setState({
					details: parseHistoryList(data, [button]),
					count,
				});
			}
		}
	};

	closeModel = () => {
		this.setState({ open: false });
	};

	onPageChange = async (perPage: number, page: number) => {
		const { count, details = [] } = this.state;
		if (count > details.length && (page + 1) * perPage > details.length)
			await this.getUserRequestHistory(`?page=${page + 1}`);
		return this.state.details;
	};

	render() {
		const {
			loading,
			count,
			details,
			fields,
			open,
			patient_details,
			order_list,
		} = this.state;
		return (
			<>
				{open && (
					<ModalComponent open={open} alongSidebar={true}>
						<PatientChart
							closeModel={this.closeModel}
							patientDetail={patient_details}
							orderList={order_list}
						/>
					</ModalComponent>
				)}
				<div className="content nurse nursePageContainer">
					<Typography variant="h3" gutterBottom>
						{CONSTANTS.HISTORY}
					</Typography>
					<SearchBy
						placeholder="Type here"
						searchByList={fields}
						onEnter={this.onEnter}
						SearchByText="Search By"
						SearchButtonText="Search"
						buttonCss="nurse btn"
					/>
					<div className="table-container">
						<TableCmp
							onPageChange={this.onPageChange}
							total={count}
							data={details}
							headers={headCells}
							title={""}
						/>
					</div>
					<Loading show={this.state.loading} />
				</div>
			</>
		);
	}
}

export default History;
