import React from "react";
import { Typography } from "@material-ui/core";
import { CONSTANTS } from "../../constants";
import TableComponent from "../../../components/Table";
import Loading from "../../../components/loader";
import ModalComponent from "../../../components/modal";
import Review from "./Review";

const patientDetails = [
	{
		"Patient Name": "Ravi",
		"Date Of Eval": "1/21/1967",
		DOB: "1/21/1967",
		Status: "Approved",
	},
	{
		"Patient Name": "Ashna",
		"Date Of Eval": "1/21/1967",
		DOB: "1/21/1967",
		Status: "Not Approved",
	},
	{
		"Patient Name": "Parveen",
		"Date Of Eval": "1/21/1967",
		DOB: "1/21/1967",
		Status: "Not Approved",
	},
	{
		"Patient Name": "Vivek",
		"Date Of Eval": "1/21/1967",
		DOB: "1/21/1967",
		Status: "Not Approved",
	},
	{
		"Patient Name": "Surekha",
		"Date Of Eval": "1/21/1967",
		DOB: "1/21/1967",
		Status: "Not Approved",
	},
	{
		"Patient Name": "suresh",
		"Date Of Eval": "1/21/1967",
		DOB: "1/21/1967",
		Status: "Approved",
	},
];

class SignCharts extends React.PureComponent<any, {}> {
	state = { loading: false, open: false };

	componentDidMount() {}

	getUserRecord = (row: any) => {
		this.setState({ open: true });
		//console.log("row", row);
	};

	closeModel = () => {
		this.setState({ open: false });
	};
	render() {
		const { loading, open } = this.state;
		let button = {
			btnTxt: "Review",
			classname: "nurse btn",
			method: this.getUserRecord,
		};
		return (
			<>
				{open && (
					<ModalComponent open={open} alongSidebar={true}>
						<Review closeModel={this.closeModel} />
					</ModalComponent>
				)}
				<div className="content nurse">
					<Typography variant="h3" gutterBottom>
						{CONSTANTS.SIGN_CHARTS}
					</Typography>
					<div className="table-container">
						{!loading && (
							<TableComponent
								tableData={patientDetails}
								selectable={false}
								rowPadding={true}
								TableName={CONSTANTS.SIGN_CHARTS_TABLE_TITLE}
								sorting={true}
								button={button}
							/>
						)}
					</div>
				</div>
				<Loading show={this.state.loading} />
			</>
		);
	}
}

export default SignCharts;
