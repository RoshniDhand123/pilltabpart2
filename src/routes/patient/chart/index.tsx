import React from "react";
import Loading from "../../../components/loader";
import { Typography } from "@material-ui/core";
import TreatmentCard from "../../../components/treatment-card";
import CreateProfileForm from "../../sign-up/create-profile/form";
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
	state = { loading: true, profile: {}, open: false, showPopUp: false,currentMedications:{} };

	componentDidMount() {
		let checkLoginCount = localStorage.getItem("loginCount");
		if (parseInt(checkLoginCount!) > 1) {
			this.setState({ open: true });
			this.setState({ showPopUp: true });
			localStorage.removeItem("loginCount");
		}
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
		this.currentMedicationDetail();
		this.setState({ loading: false });
	};

	currentMedicationDetail=async()=>{
		let resp=await patientCurrentPlanDetail();
		if (resp.data && resp.data.status) {
			const parseData = await parsePatientPlanDetail(resp.data.data);
			this.setState({ currentMedications: parseData});
			//console.log("+check detail+", parseData, this.state.currentMedications);
		}
		//this.setState({ loading: false });
	}

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
	// moveToMedicalPage = () => {
	// 	window.location.href = "/update-medical-information";
	// 	this.setState({ open: false });
	// };
	// moveToDocumentPage=()=>{
	// 	window.location.href = "/upload-documents";
	// 	this.setState({ open: false });
	// }
	
	moveToNewPage=(url:string)=>{
		window.location.href = url;
		this.setState({ open: false });
	}

	renderTreatment = (treatment: any)=>(     //, i: number) => (
		<TreatmentCard
			//key={i}
			text={treatment.drug}
			detail={treatment.dosage}
		/>
	);

	render() {
		const { profile, loading, open, showPopUp,currentMedications } = this.state;
		
		const buttons=[{
            text:"Medical History",
            action:()=>this.moveToNewPage("/update-medical-information"),//this.moveToMedicalPage
        },{
			text:"Documentation",
			action:()=>this.moveToNewPage("/upload-documents"),//this.moveToDocumentPage
		}]
		return (
			<>
				<ModalComponent
					open={open}
					buttonText={showPopUp ?"Cancel":"OK"}
					buttonAction={
						this.closeModal
					}
					modalHeading={showPopUp ? "Welcome" : CONSTANTS.THANK_YOU}
					modalText={
						showPopUp
							? "Are You wants to update the medical history or any document"
							: CONSTANTS.CHARTS_MODAL_SUBTITLE
					}
					alongSidebar={true}
					renderButtons={showPopUp ?buttons:false}					
				/>
				<div className="content charts">
					<Typography variant="h3" gutterBottom>
						{CONSTANTS.CHART_HEADER}
					</Typography>
					<div className="flex-column-start">
						<Typography variant="h5" gutterBottom>
							{CONSTANTS.CURRENT_MED}
						</Typography>						
						{(Object.keys(currentMedications).length != 0 ? (
							<div className="flex-align-center">
							{this.renderTreatment(currentMedications)}
							</div>
						) : (
							<div className="full-container">
								<h2>No Medications</h2>
							</div>
						))}
						{/* <div className="flex-align-center">
							{medications.map(this.renderTreatment)}
						</div>
						{medications && !medications.length && (
							<div className="full-container">
								<h2>No Medications</h2>
							</div>
						)} */}
						<Typography variant="h5" gutterBottom>
						{CONSTANTS.VIEW_PROFILE}
						{/* {CONSTANTS.EDIT_PROFILE} */}
						</Typography>
						<div className="form-container">
							{!loading && (
								// <CreateProfileForm
								// 	edit={true}
								// 	column={6}
								// 	profile={profile}
								// 	onSubmit={this.editProfile}
								// />
								<Form
									fields={editFields}
									onSubmit={this.editProfile}
									initialValues={profile}
									renderCustomSubmit={
										<Button
											btnText={"Save"}
											className="form-button hide-visibilty"
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
