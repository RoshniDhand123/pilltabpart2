import React from "react";
import { Typography } from "@material-ui/core";
import { CONSTANTS } from "../../constants";
import SearchBy from "../../../components/SearchByInput";
import Loading from "../../../components/loader";
import ModalComponent from "../../../components/modal";
import TableComponent from "../../../components/Table";
import PatientChart from "../patient-chart";
import {
	getAllPatientList,
	//getSearchList,
	patientMedicationOrder,
	getPatientAllList,
	getSearchPatientList,
	getPatientDetails,
	getSearchPatientByValue,
} from "../../../services/apis/index";
import {
	parsePatientViewDetails,
	parseSearchPatientsList,
} from "../../../services/helper/index";
import TableCmp from "../../../components/tableCmp";
import { HeadCell } from "../../../components/tableCmp/type";

const headers: HeadCell[] = [
	{ name: "first_name", label: "First Name",width:"5%" },
	{ name: "last_name", label: "Last Name",width:"5%" },
	{ name: "email", label: "Email",width:"5%" },
	{ name: "dob", label: "DOB" ,width:"5%"},
	{ name: "action", label: "Action" ,width:"5%"},
]

const patientDetails = [
	{
		"Patient Name": "Ravi",
		"No. Of Orders": "1",
		"Date Of Birth": "1/21/1967",
		Status: "active",
	},
	{
		"Patient Name": "Ashna",
		"No. Of Orders": "5",
		"Date Of Birth": "1/21/1967",
		Status: "active",
	},
	{
		"Patient Name": "Parveen",
		"No. Of Orders": "10",
		"Date Of Birth": "1/21/1967",
		Status: "active",
	},
	{
		"Patient Name": "Vivek",
		"No. Of Orders": "12",
		"Date Of Birth": "1/21/1967",
		Status: "active",
	},
	{
		"Patient Name": "Surekha",
		"No. Of Orders": "2",
		"Date Of Birth": "1/21/1967",
		Status: "active",
	},
	{
		"Patient Name": "Ravi",
		"No. Of Orders": "3",
		"Date Of Birth": "1/21/1967",
		Status: "active",
	},
];

type PatientType = {
	id?: string;
	dob: string;
	email: string;
	first_name: string;
	last_name: string;
	action?: any;
}

const parseSearchPatient = (
	patients: PatientType[],
	button: any
): PatientType[] => {
	return patients.map((patient: PatientType) => ({
		...patient,
		action: button
	}))
}

class SearchPatient extends React.PureComponent<
	any,
	{
		open: boolean;
		loading: boolean;
		fields: any;
		searchData: string;
		searchBy: string;
		details: any;
		count: number;
		patient_details: object;
		order_list: any;
	}
> {
	state = {
		open: false,
		loading: false,
		fields: [],
		searchData: "",
		searchBy: "",
		details: [],
		count: 0,
		patient_details: {},
		order_list: [],
	};

	componentDidMount() {
		this.getUserData();
	}

	getUserData = async () => {
		this.setState({ loading: true });
		let button = {
			btnTxt: "View Chart",
			classname: "nurse btn f-left",
			method: this.getUserRecord,
		};
		//let resp = await getAllPatientList("");
		let resp = await getPatientAllList();
		if (resp.data && resp.data.status) {
			const { data = [], count = 0 } = resp.data;
			this.setState({
				details: parseSearchPatientsList(data, [button]),
				count,
			});
			this.getFieldsValue(this.state.details[0]);
		}
		this.setState({ loading: false });
	};

	getUserRecord = async (row: any, id: any) => {
		// const requestId = "12";
		// let resp = await patientMedicationOrder(requestId);		
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

	closeModel = () => {
		this.setState({ open: false });
	};

	onEnter = async (search_value: string, search_by: string) => {
		console.log("search_by", search_value, search_by);
		let button = {
			btnTxt: "View Chart",
			classname: "nurse btn f-left",
			method: this.getUserRecord,
		};
		this.setState({ searchData: search_value });
		if (search_by !== "" && search_value) {
			console.log("in searchBy");
			this.setState({ searchBy: search_by });
			this.setState({ loading: true });
			let resp = await getSearchPatientList({ search_value, search_by });
			//console.log("respon...e", resp);
			if (resp.data && resp.data.results) {
				const { data = [], count = 0 } = resp.data;
				this.setState({
					details: parseSearchPatientsList(data, [button]),
					count,
					loading: false,
				});
			}
		} else if (search_value != "") {
			this.setState({ searchBy: "" });
			let resp = await getSearchPatientByValue(search_value); //await getAllPatientList(search_value);
			//console.log("check resp", resp);
			if (resp.data) {
				const { results = [], count = 0 } = resp.data;
				//console.log("results++", search_value, results);
				this.setState({
					details: parseSearchPatientsList(results, [button]),
					count,
				});
			}
			//console.log("update+", this.state.details);
		} else {
			//console.log("null++");
			let resp = await getPatientAllList();
			if (resp.data && resp.data.status) {
				const { data = [], count = 0 } = resp.data;
				this.setState({
					details: parseSearchPatientsList(data, [button]),
					count,
				});
				//console.log("check", this.state.details);
			}
		}
	};

	getFieldsValue = (patientObject: any) => {
		let fields: string[] = [];
		Object.keys(patientObject).map(
			(field) => field != "action" && fields.push(field)
		);
		this.setState({ fields: fields });
	};
	_loadDetails = async (page = 0, perPage = 10) => {
		let button = {
			btnTxt: "View Chart",
			classname: "nurse btn f-left",
			method: this.getUserRecord,
		};
		this.setState({ loading: true });
		let resp = await getAllPatientList("", `&page=${page + 1}`);
		if (resp.data && resp.data.status) {
			const { data = [], count = 0 } = resp.data;
			this.setState({
				details: [
					...this.state.details,
					...parseSearchPatientsList(data, [button]),
				],
				count,
				loading: false
			});
		}
		else this.setState({ loading: false });
	}
	onPageChange = async (perPage: number, page: number) => {
		const { count, details = [] } = this.state;
		if (count > details.length && (page + 1) * perPage > details.length)
			await this._loadDetails(page, perPage);
		return this.state.details;
	}
	render() {
		const {
			loading,
			open,
			details,
			fields,
			count,
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
						{CONSTANTS.SEARCH_PATIENT}
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

export default SearchPatient;
