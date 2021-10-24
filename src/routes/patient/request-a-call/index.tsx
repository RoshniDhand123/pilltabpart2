import React from "react";
import Loading from "../../../components/loader";
import { Typography } from "@material-ui/core";
import { CONSTANTS } from "../../constants";
import AppointmentForm from "./form";
import {
	parseAppointment,
	getDayOrMonthName,
} from "../../../services/helper/index";
import { appointmentDetail } from "../../../services/apis/index";
import ModalComponent from "../../../components/modal";
const checkTime = ({ start }: any) => {
	let date = new Date(new Date().getTime() + 30 * 60000),
		selectedDate = new Date(start);
	return selectedDate > date;
};
class RequestCall extends React.PureComponent<any, {}> {
	state = { loading: false, open: false, mainMsg: "", modalText: "" };



	requestAppointment = async (payload: any) => {
		//console.log("payload", payload);
		let need_setTime = checkTime(payload);
		if (need_setTime) {
			//alert("time is set");
			this.setState({ loading: true })
			let updatePayload = parseAppointment(payload);
			let resp = await appointmentDetail(updatePayload);
			var date = new Date(payload.start);
			var values = getDayOrMonthName(date);
			if (resp.data.status) {
				this.setState({
					open: true,
					loading: false,
					mainMsg: CONSTANTS.SET_APPOINTMENT,
					modalText: `for ${values.dayName} ${values.monthName} ${date.getDate()} ,${date.getFullYear()} at ${payload.start.substr(11, 8)} ${CONSTANTS.APPOINTMENT_MSG}`
				});
			} else {
				this.setState({
					loading: false,
					open: true,
					modalText: "",
					mainMsg: CONSTANTS.REJECT_APPOINTMENT
				});
			}
		}
		else
			alert(
				"please set minimum 30min timing difference between selected time and current time"
			);
	};

	closeModal = () => {
		this.setState({ open: false });
	};
	render() {
		const { open, loading, mainMsg, modalText } = this.state;
		return (
			<div className="requestCall">
				<ModalComponent
					open={open}
					buttonText="OK"
					buttonAction={this.closeModal}
					modalHeading={mainMsg}
					modalText={modalText}
					alongSidebar={true}
				/>
				<div className="content appointment">
					<Typography variant="h3" gutterBottom>
						{CONSTANTS.REQ_CALL_HEADER}
					</Typography>
					<div className="form-container">
						<AppointmentForm onSubmit={this.requestAppointment} />
					</div>
				</div>
				<Loading show={loading} />
			</div>
		);
	}
}

export default RequestCall;
