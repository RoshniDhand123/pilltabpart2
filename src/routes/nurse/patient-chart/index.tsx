import React from "react";
import { Typography } from "@material-ui/core";
import { CONSTANTS } from "../../constants";
import TableComponent from "../../../components/Table";
import UserInfoCard from "../../../components/userInfo-card";
import ButtonComponent from "../../../components/button";

const patientDetails = [
	{
		"Order Date": "1/21/2021",
		"Drug Name": "Sildenefil",
		Dose: "25mg",
		Quantity: "10",
	},
	{
		"Order Date": "1/20/2021",
		"Drug Name": "Sildenefil",
		Dose: "25mg",
		Quantity: "10",
	},
	{
		"Order Date": "5/16/2021",
		"Drug Name": "Sildenefil",
		Dose: "25mg",
		Quantity: "10",
	},
	{
		"Order Date": "1/21/2021",
		"Drug Name": "Sildenefil",
		Dose: "25mg",
		Quantity: "10",
	},
	{
		"Order Date": "1/21/2021",
		"Drug Name": "Sildenefil",
		Dose: "25mg",
		Quantity: "10",
	},
	{
		"Order Date": "1/21/2021",
		"Drug Name": "Sildenefil",
		Dose: "25mg",
		Quantity: "10",
	},
];

const order = {
	Name: " Rena",
	PhoneNO: " 9876543214",
	Age: " 30",
	Email: " User1@gmail.com",
	DOB: " 1/12/1990",
	Status: " active",
	Height: " 5.3",
	"Order Shipped": " 5",
	Weight: " 50",
};

interface Iprops {
	closeModel: () => void;
	patientDetail: object;
	orderList: any;
}
class PatientChart extends React.PureComponent<Iprops, {}> {
	render() {
		return (
			<div className="content  patientchart">
				<Typography variant="h3" gutterBottom>
					{CONSTANTS.CHART_PAGE_HEADING}
				</Typography>
				<div className="button-container">
					<UserInfoCard order={this.props.patientDetail} />
					<ButtonComponent
						btnText="Back to Search"
						className="nurse btn"
						onClick={this.props.closeModel}
					/>
				</div>
				<div className="table-container">
					<TableComponent
						tableData={this.props.orderList}
						selectable={false}
						rowPadding={true}
						TableName={CONSTANTS.CHART_TABLEHEADING}
						sorting={true}
					/>
					{/* <div className="button-container">
						<ButtonComponent
							btnText="Back"
							className="nurse btn"
							onClick={this.props.closeModel}
						/>
					</div> */}
				</div>
			</div>
		);
	}
}

export default PatientChart;
