import React from "react";
import Loading from "../../../components/loader";
import Typography from "@material-ui/core/Typography";
import Header from "../../../components/Header";
import { DEMOGRAPHICS, BILLING, CONSTANTS } from "../../constants";
import QuestionnaireForm from "./form";
import LinearProgress from "../../../components/linear-progress";
import { setItem } from "../../../services/storage";
import "../style.scss";
import { removeBlankInput } from "../../util";

class Questionnaire extends React.PureComponent<any, {}> {
	state = { loading: false };

	submitQuestionnaire = async (payload: any, { resetForm }: any) => {
		setItem("questionnaire", removeBlankInput(payload));
		this.props.history.push({
			pathname: BILLING,
		});
	};

	render() {
		return (
			<>
				<Header
					routeLink={{
						path: DEMOGRAPHICS,
						text: CONSTANTS.QUESTIONNAIRE_HEADER,
					}}
				/>
				<div className="container sign-up questionnaire">
					<div className="content">
						<Typography variant="h5" gutterBottom>
							{" "}
							{CONSTANTS.QUESTIONNAIRE_TITLE}
						</Typography>
						<Typography variant="h6" gutterBottom>
							{CONSTANTS.QUESTIONNAIRE_SUBTITLE}
						</Typography>
						<LinearProgress value={75} />
					</div>
					<div className="form-container">
						<QuestionnaireForm
							onSubmit={this.submitQuestionnaire}
							{...this.props}
						/>
					</div>
					<Loading show={this.state.loading} />
				</div>
			</>
		);
	}
}

export default Questionnaire;
