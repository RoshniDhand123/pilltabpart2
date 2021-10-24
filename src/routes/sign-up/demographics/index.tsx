import React from "react";
import Loading from "../../../components/loader";
import Typography from "@material-ui/core/Typography";
import Header from "../../../components/Header";
import { CREATE_PROFILE, QUESTIONNAIRE,CONSTANTS } from "../../constants";
import DemographicsForm from "./form";
import LinearProgress from "../../../components/linear-progress";
import { payload_type } from "./types";
import { setItem, getItem } from "../../../services/storage";
import "../style.scss";
import { removeBlankInput } from "../../util";

class CreateProfile extends React.PureComponent<any, {}> {
	state = { loading: false };

	submitDemographics = async (payload: payload_type, { resetForm }: any) => {
		setItem("demographics", removeBlankInput(payload))
		this.props.history.push({
			pathname: QUESTIONNAIRE + "/" + getItem("treatmentId"),
		});
	};

	render() {
		return (
			<>
				<Header
					routeLink={{ path: CREATE_PROFILE, text: CONSTANTS.DEMOGRAPHICS_HEADER }}
				/>
				<div className="container sign-up demographics">
					<div className="content">
						<Typography variant="h5" gutterBottom>{CONSTANTS.DEMOGRAPHICS_TITLE}</Typography>
						<Typography variant="h6" gutterBottom>{CONSTANTS.DEMOGRAPHICS_SUBTITLE}</Typography>
						<LinearProgress value={50} />
					</div>
					<div className="form-container">
						<DemographicsForm onSubmit={this.submitDemographics} />
					</div>
					<Loading show={this.state.loading} />
				</div>
			</>
		);
	}
}

export default CreateProfile;
