import React from "react";
import Loading from "../../../components/loader";
import { Typography } from "@material-ui/core";
import { CONSTANTS } from "../../constants";
import { getProfile, editProfile ,patientCurrentPlanDetail} from "../../../services/apis";
import { parseProfile, ediProfilePayload,parsePatientPlanDetail } from "../../../services/helper";
import ModalComponent from "../../../components/modal";
import Button from "../../../components/button";
import { editFields } from "./fields";
import Form from "../../../components/form";

type medicationType = {
	drugName: string;
	dosage: string;
}
const medications: medicationType[] = [];

class Chart extends React.PureComponent<any, {}> {
	state = { loading: true, profile: {}, open: false };

	componentDidMount() {		
		this.getUserProfile();
	}

	getUserProfile = async () => {
		let resp = await getProfile();
		//console.log("resp", resp);
		if (resp && resp.data && resp.data.status) {
			let profile = parseProfile(resp.data.data);
			this.setState({ profile });
			//console.log("profile", this.state.profile);
		}		
		this.setState({ loading: false });
	};	

	editProfile = async (payload: any) => {
		//console.log("payload", payload);
		this.setState({ loading: true });
		let editPayload = ediProfilePayload(payload);
		let resp = await editProfile(editPayload);
		this.setState({ loading: false });
		if (resp && resp.data && resp.data.status) {
			this.getUserProfile();
			this.setState({ open: true });
		}
	};

	closeModal = () => {
		this.setState({ open: false });
	};	
	
	moveToNewPage=(url:string)=>{
		window.location.href = url;
		this.setState({ open: false });
	}	

	render() {
		const { profile, loading, open } = this.state;
				
		return (
			<>
				<ModalComponent
					open={open}
					buttonText={"OK"}
					buttonAction={
						this.closeModal
					}
					modalHeading={CONSTANTS.THANK_YOU}
					modalText={
						CONSTANTS.CHARTS_MODAL_SUBTITLE
					}
					alongSidebar={true}								
				/>
				<div className="content charts">
					<Typography variant="h3" gutterBottom>
						{CONSTANTS.MY_PROFILE}
					</Typography>
					<div className="flex-column-start">						
						<Typography variant="h5" gutterBottom>
							{CONSTANTS.EDIT_PROFILE}
						</Typography>
						<div className="form-container">
							{!loading && (								
								<Form
									fields={editFields}
									onSubmit={this.editProfile}
									initialValues={profile}
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
				<Loading show={loading} />
			</>
		);
	}
}

export default Chart;
