import React from "react";
import Loading from "../../../components/loader";
import { Typography } from "@material-ui/core";
import { CONSTANTS } from "../../constants";
//import QuestionnaireForm from "../../sign-up/questionnaire/form";
import {
	getQuestionnaireForUpdate,
	passUpdatedQuestionnaire,
} from "../../../services/apis/index";
import {
	parseUpdatedQuestionnaireResult,
	parseUpdateQuestionnaire,
} from "../../../services/helper/index";
import Button from "../../../components/button";
import Form from "../../../components/form";
import ModalComponent from "../../../components/modal";

class MedicalInformation extends React.PureComponent<any, {}> {
	state = {
		loading: true,
		details: { field: [], initialValue: {} ,inputFieldIds:[]},
		open: false,
	};
	componentDidMount() {
		this.getQuestionnaireForUpdate();
	}

	getQuestionnaireForUpdate = async () => {
		let resp = await getQuestionnaireForUpdate();
		//console.log("resp", resp);
		if (resp.data && resp.data.status) {
			this.setState({
				details: parseUpdateQuestionnaire(resp.data.data),
			});
		}
		this.setState({ loading: false });
	};

	updateQuesionnary = async (payload: any) => {
		let updatePayload = parseUpdatedQuestionnaireResult(payload,this.state.details.inputFieldIds);
		console.log("data...afterParse", updatePayload);
		this.setState({ loading: true });
		let resp = await passUpdatedQuestionnaire(updatePayload);
		if (resp.data && resp.data.status) {
			this.getQuestionnaireForUpdate();
			this.setState({ open: true });
		}
	};
	closeModal = () => {
		this.setState({ open: false });
	};

	render() {
		const { loading, open } = this.state;
		return (
			<>
				<ModalComponent
					open={open}
					buttonText="OK"
					buttonAction={this.closeModal}
					modalHeading={CONSTANTS.THANK_YOU}
					modalText={CONSTANTS.Medical_MODAL_SUBTITLE}
					alongSidebar={true}
				/>
				<div className="content patientContainer">
					<Typography variant="h3" gutterBottom>
						{CONSTANTS.MED_INFO_HEADER}
					</Typography>
					<div className="flex-column-start">
						<Typography variant="h5" gutterBottom>
							{CONSTANTS.MED_INFO_TITLE}
						</Typography>
						<div className="questionnaire">
							{!loading && (
								// <QuestionnaireForm
								// 	edit={true}
								// 	onSubmit={this.updateQuesionnary}
								// 	details={this.state.details}
								// />
								<Form
									fields={this.state.details.field}
									onSubmit={this.updateQuesionnary}
									initialValues={
										this.state.details.initialValue
									}
									renderCustomSubmit={
										<Button
											btnText={"Save"}
											className="form-button"
											type="submit"
										/>
									}
									column={6}
								/>
							)}
						</div>
					</div>
				</div>
				<Loading show={this.state.loading} />
			</>
		);
	}
}

export default MedicalInformation;
