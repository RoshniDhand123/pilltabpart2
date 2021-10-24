import React from "react";
import Form from "../../../components/form";
import Button from "../../../components/button";
//import field from "../../forgot-password/fields";
import Loading from "../../../components/loader";
import { Typography } from "@material-ui/core";
import { PASSWORD_RECOVERY, CONSTANTS } from "../../constants";
import ModalComponent from "../../../components/modal";
import { forgotPassword } from "../../../services/apis";
import { notifError } from "../../util";
import fields from "./fields";
import "../style.scss";

interface payload_type {
	oldPassword: any;
	newPassword:any;
}
const initialValues = { oldPassword: "", newPassword: "" };

class ForgotPassword extends React.PureComponent<any, {}> {
	state = { loading: false, open: false, email: "" };

	sendCode = async (payload: payload_type, { resetForm }: any) => {
		this.setState({ loading: true });
		// let resp = await forgotPassword(payload.email);
		// if (resp && resp.data && resp.data.status)
			// this.setState({ loading: false, open: true, email: payload.email });
		// else {
		// 	const {
		// 		data: { msg11, msg },
		// 	} = resp;
		// 	notifError(
		// 		"Forgot Password",
		// 		msg11 || msg || "something went wrong."
		// 	);
		// 	this.setState({ loading: false });
		// }
	};

	closeModal = () => {
		this.setState({ open: false });
		this.props.history.push({
			pathname: PASSWORD_RECOVERY,
			state: { email: this.state.email },
		});
	};

	render() {
		return (
			<div id="forgot-password-setting">
				<ModalComponent
					open={this.state.open}
					buttonText="OK"
					buttonAction={this.closeModal}
					modalHeading={CONSTANTS.FORGOT_PSWD_TITLE}
					modalText={CONSTANTS.FORGOT_PSWD_SUBTITLE}
				/>
				<Typography variant="h3" gutterBottom>
					Change Password
				</Typography>
				<div className="table-container">
					{/* <Typography variant="h5" gutterBottom>
						Enter your email address to retrive your password.
					</Typography> */}
					<Form
						fields={fields}
						onSubmit={this.sendCode}
						initialValues={initialValues}
						renderCustomSubmit={
							<Button
								className="form-button button"
								btnText="change password"
								type="submit"
							/>
						}
						alignCenter={true}
						gridItem={6}
						column={12}
					/>
				</div>
				<Loading show={this.state.loading} />
			</div>
		);
	}
}
export default ForgotPassword;
