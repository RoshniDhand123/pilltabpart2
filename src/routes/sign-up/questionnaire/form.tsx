import React from "react";
import Form from "../../../components/form";
import Button from "../../../components/button";
import { getQuestionnaire } from "../../../services/apis";
import { parseQuestionnaire } from "../../../services/helper";
import Loading from "../../../components/loader";
import { getItem } from "../../../services/storage";

const initialValues = {};
export default class QuestionnaireForm extends React.PureComponent<any, {}> {
	getInitialValues = () => {
		if (
			this.props.match &&
			this.props.match.params.id == getItem("treatmentId")
		) {
			let questionnaire = getItem("questionnaire");
			if (questionnaire) return questionnaire;
		}
		return initialValues;
	};

	state = {
		questionnaire: [],
		loading: false,
		initialValues: this.getInitialValues(),
	};

	componentDidMount = async () => {
		this.setState({ loading: true });
		//if (!this.props.edit) {
		let response =
			this.props.match &&
			(await getQuestionnaire(this.props.match.params.id));
		if (response && response.data.status) {
			let questionnaire = parseQuestionnaire(response.data.data);
			this.setState({ questionnaire });
		}
		//}
		this.setState({ loading: false });
	};

	render() {
		const { questionnaire, loading, initialValues } = this.state;
		//const edit = this.props.edit;
		//let details = this.props.details;
		return (
			<>
				<Form
					fields={questionnaire}
					onSubmit={this.props.onSubmit}
					initialValues={initialValues}
					renderCustomSubmit={
						<Button
							btnText={"Next"}
							className="form-button"
							type="submit"
						/>
					}
					column={6}
				/>

				<Loading show={loading} />
			</>
		);
	}
}
