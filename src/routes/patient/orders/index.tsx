import React from "react";
import Loading from "../../../components/loader";
import { Typography } from "@material-ui/core";
import { CONSTANTS } from "../../constants";
import OrderCard from "../../../components/order-card";
import TableCmp from "../../../components/tableCmp";
import { HeadCell } from "../../../components/tableCmp/type";
import {
	getPatientOrderHistory,
	getUpcomingOrders,
} from "../../../services/apis";
import { parseOrderHistory } from "../../../services/helper";
import { notifError, notifSuccess } from "../../util";

const currentOrder = null;
const orders: OrderType[] = [];

const headCells: HeadCell[] = [
	// { name: "Medication", label: "Medication" },
	// { name: "Status", label: "Status" },
	// { name: "City", label: "City" },
	// { name: "Salary", label: "Salary" },
	{ name: "Plan", label: "Plan",width:"5%" },
	{ name: "Date", label: "Order Date",width:"5%" },
	{ name: "Status", label: "Status",width:"5%" }
];
export type OrderType = {
	Medication: string;
	Status: string;
	City: string;
	Salary: string;
};
const data = [
	{
		id: 1,
		date: "2021-10-04",
		order_status: "pending",
		updated: "2021-10-04T12:14:57Z",
		created: "2021-10-04T12:14:57Z",
		plan_id: 1,
		patient_id: 3,
	},
	// {
	// 	id: 2,
	// 	date: "2021-10-06",
	// 	order_status: "delivered",
	// 	updated: "2021-10-04T12:16:40Z",
	// 	created: "2021-10-04T12:16:40Z",
	// 	plan_id: 1,
	// 	patient_id: 3,
	// },
];

class Orders extends React.PureComponent<any, {}> {
	state = { loading: false, orderHistory: [], upcomingOrder: [] };

	componentDidMount = async () => {
		this.setState({ Loading: true });
		let resp = await getPatientOrderHistory();
		if (resp.data && resp.data.status) {
			this.setState({
				orderHistory: parseOrderHistory(resp.data.data),
			});
			//console.log("+response+",response);
		} else {
			notifError("order", "Something went wrong");
		}
		this.setState({ loading: false });
		this.getUpcomingOrder();
	};
	getUpcomingOrder = async () => {
		let response = await getUpcomingOrders();
		if (response.data && response.data.status) {
			this.setState({
				upcomingOrder: parseOrderHistory(response.data.data),
			});
			console.log("+response+", response.data.data, this.state.upcomingOrder);
		}
	};

	render() {
		const { orderHistory, upcomingOrder } = this.state;
		return (
			<>
				<div className="content edit-billing">
					<Typography variant="h3" gutterBottom>
						{CONSTANTS.ORDER_HEADER}
					</Typography>
					<div className="flex-column-start">
						<Typography variant="h5" gutterBottom>
							{CONSTANTS.UPCOMING_ORD}
						</Typography>
						{/* <div style={{display:"flex",flex:"wrap"}}> */}
						{upcomingOrder.map((currentOrder) => (
							<OrderCard order={currentOrder} />
						))}
						{/* </div> */}
						<div className="table-container">
							<TableCmp
								title={CONSTANTS.ORDER_TABLE_TITLE}
								headers={headCells}
								data={orderHistory}
							/>
						</div>
					</div>
				</div>
				<Loading show={this.state.loading} />
			</>
		);
	}
}

export default Orders;
