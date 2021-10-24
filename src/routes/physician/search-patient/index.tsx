import React from "react";
import { Typography } from "@material-ui/core";
import { CONSTANTS } from "../../constants";
import SearchBy from "../../../components/SearchByInput";
import Loading from "../../../components/loader";
import ModalComponent from "../../../components/modal";
import TableComponent from "../../../components/Table";
import PatientChart from "../patient-chart";

const patientDetails = [
	{
		"Patient Name": "Ravi",
		"No. Of Orders": "1",
		DOB: "1/21/1967",
		Status: "active",
	},
	{
		"Patient Name": "Ashna",
		"No. Of Orders": "5",
		DOB: "1/21/1967",
		Status: "active",
	},
	{
		"Patient Name": "Parveen",
		"No. Of Orders": "10",
		DOB: "1/21/1967",
		Status: "active",
	},
	{
		"Patient Name": "Vivek",
		"No. Of Orders": "12",
		DOB: "1/21/1967",
		Status: "active",
	},
	{
		"Patient Name": "Surekha",
		"No. Of Orders": "2",
		DOB: "1/21/1967",
		Status: "active",
	},
	{
		"Patient Name": "Mahesh",
		"No. Of Orders": "3",
		DOB: "1/21/1967",
		Status: "active",
	},
];

class SearchPatient extends React.PureComponent<any, {}> {
	state = {
		open: false,
		loading: true,
		fields: [],
		searchData: "",
		searchBy: "",
	};

	componentDidMount() {
		this.setState({ loading: false });
		this.getFieldsValue(patientDetails[0]);
	}

	getUserRecord = (row: any) => {
		this.setState({ open: true });
	};

	closeModel = () => {
		this.setState({ open: false });
	};

	onEnter = (search_value: string, search_by: string) => {
		this.setState({ searchData: search_value });
		if (search_by !== "searchBy") {
			this.setState({ searchBy: search_by });
		} else this.setState({ searchBy: search_by });
	};

	getFieldsValue = (patientObject: any) => {
		let fields: string[] = [];
		Object.keys(patientObject).map((field) => fields.push(field));
		this.setState({ fields: fields });
	};

	render() {
		const { loading, open } = this.state;

		let button = {
			btnTxt: "View Chart",
			classname: "nurse btn",
			method: this.getUserRecord,
		};

		return (
			<>
				{open && (
					<ModalComponent open={open} alongSidebar={true}>
						<PatientChart closeModel={this.closeModel} />
					</ModalComponent>
				)}
				<div className="content nurse">
					<Typography variant="h3" gutterBottom>
						{CONSTANTS.SEARCH_PATIENT}
					</Typography>
					<SearchBy
						placeholder="Type here"
						searchByList={this.state.fields}
						onEnter={this.onEnter}
						SearchByText="Search By"
						SearchButtonText="Search"
						buttonCss="nurse btn"
					/>
					<div className="table-container">
						<TableComponent
							tableData={patientDetails}
							selectable={false}
							rowPadding={true}
							TableName={CONSTANTS.SEARCH_TABLE_TITLE}
							sorting={true}
							button={button}
							searchData={this.state.searchData}
							valueSearchBy={this.state.searchBy}
						/>
					</div>
				</div>
				<Loading show={this.state.loading} />
			</>
		);
	}
}

export default SearchPatient;
