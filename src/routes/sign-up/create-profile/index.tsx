import React from "react";
import Loading from "../../../components/loader";
import Typography from "@material-ui/core/Typography";
import Header from "../../../components/Header";
import { CHOOSE_PLAN, DEMOGRAPHICS, CONSTANTS } from "../../constants";
import ProfileForm from "./form";
import LinearProgress from "../../../components/linear-progress";
import { payload_type } from "./types";
import "../style.scss";
import { setItem, getItem } from "../../../services/storage";
import { verifyEmail } from "../../../services/apis";

class CreateProfile extends React.PureComponent<any, {}> {
	state = { loading: false };

	createProfile = async (payload: payload_type) => {
		this.setState({ loading: true });
		let emailExists = await verifyEmail(payload.email);
		this.setState({ loading: false });
		if (emailExists.data && emailExists.data.status) {
			setItem("personalDetail", payload);
			this.props.history.push({
				pathname: DEMOGRAPHICS,
			});
		} else return;
	};
	render() {
		const id = getItem("planId");
		console.log("checkPlanId", id);
		return (
			<>
				<Header
					routeLink={{
						path: CHOOSE_PLAN + "/" + getItem("treatmentId"),
						text: CONSTANTS.PROFILE_HEADER,
					}}
				/>
				<div className="container sign-up profile">
					<div className="content">
						<Typography variant="h5" gutterBottom>
							{CONSTANTS.PROFILE_TITLE}
						</Typography>
						<Typography variant="h6" gutterBottom>
							{CONSTANTS.PROFILE_SUBTITLE}
						</Typography>
						<LinearProgress value={25} />
					</div>
					<div className="form-container">
						<ProfileForm onSubmit={this.createProfile} />
					</div>
					<Loading show={this.state.loading} />
				</div>
			</>
		);
	}
}

export default CreateProfile;
