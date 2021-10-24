import React from "react";
import VideoCall from "../../../components/VideoCalling";
import { isLoggedIn } from "../../../services/helper";
import {
	updatePatientCallDetail,
	deletePatientCall,
} from "../../../services/apis/index";
import { LOGIN } from "../../constants";

export default class callingAttend extends React.PureComponent<any, {}> {
	state = { validate: false, token: "" };
	componentDidMount = async () => {
		this.setState({ token: this.props.location.search.split(/&|=/)[1] });
		// const resp = await updatePatientCallDetail(this.state.token);
		if (isLoggedIn()) {
			this.setState({ validate: true });
		} else {
			localStorage.setItem("checkCalling", JSON.stringify("yes"));
		}
	};
	callEndMessage = async () => {
		localStorage.removeItem("checkCalling");
		const resp = await deletePatientCall(this.state.token);
		window.location.href = "/";
	};

	render() {
		const validate = this.state.validate;
		return (
			<>
				{validate === false ? (
					(window.location.href = LOGIN)
				) : (
					<VideoCall
						method={this.callEndMessage}
						identity={this.state.token}
					/>
				)}
			</>
		);
	}
}
