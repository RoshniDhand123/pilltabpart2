import React from "react";
import ButtonComponent from "../../../components/button";
import PlanCard from "../../../components/plan-card";
import { patientCurrentPlanDetail,cancelActivePlan } from "../../../services/apis/index";
import { parsePatientPlanDetail } from "../../../services/helper/index";
import Loading from "../../../components/loader";
import ModalComponent from "../../../components/modal";
import ChoosePlan from "./choose-plan"; //"../../sign-up/choose-plan";
import { notifError, notifSuccess } from "../../util";
import SetVacation from "./set-vacation";
import PlanPayment from "./plan-payment";
import "../../../index.scss";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

class MyPlan extends React.PureComponent<any, {}> {
	state = {
		patientId: "",
		planDetail: {},
		loading: true,
		open: false,
		confirmationMsg: "",
		plansShow: false,
		currentPlan: "",
		setVacation: false,
		paymentScreen: false,
	};

	componentDidMount = () => {	
		this.getUserCurrentPlan();
	};
	
	getUserCurrentPlan=async()=>{
		const resp = await patientCurrentPlanDetail();
		if (resp.data && resp.data.status) {
			const parseData = await parsePatientPlanDetail(resp.data.data);
			this.setState({
				planDetail: parseData,
				currentPlan: parseData.name,
			});
			//console.log("+check detail+", resp, this.state.planDetail);
		}
		this.setState({ loading: false });
	}

	showPlan = (data: any) => {
		//console.log("data", data, this.state.planDetail);
		return (
			<PlanCard
				key={data.id}
				id={data.id}
				plan={data.name}
				drugName={data.drug}
				dosage={data.dosage}
				frequency={data.frequency}
				amount={data.amount}
				detail={data.detail}
				headerStyle="headerSize"
			/>
		);
	};

	handleCancelPlan = async () => {
		this.setState({ loading: true });
		let resp = await cancelActivePlan();
		if (resp.data && resp.data.status) {
			notifSuccess("Plan Cancel", "plan cancel successfully");
			this.getUserCurrentPlan();
		}
		this.setState({ open: false, loading: false });
	};

	// handlePlanCancel = () => {
	// 	this.setState({
	// 		open: true,
	// 		confirmationMsg:
	// 			"Are you sure you wants to Cancel the plan or Set a 'Vacation Period' during which plan will be suspended or close the popup and go back to My Plan screen",
	// 	});
	// };

	// handleSetVacation = () => {
	// 	//console.log("setVacation call");
	// 	this.setState({ plansShow: true, setVacation: true });
	// };

	// handleUpgradePlan = () => {
	// 	this.setState({ plansShow: true });
	// };

	// openPaymentScreen = () => {
	// 	this.setState({ plansShow: false, paymentScreen: true });
	// };
	handleOpenScreen = (openWindow?: string) => {
		if (openWindow == "cancel") {
			this.setState({
				open: true,
				confirmationMsg:
					"Are you sure you wants to Cancel the plan or Set a 'Vacation Period' during which plan will be suspended",
			});
		} else if (openWindow == "upgrade") {
			this.setState({ plansShow: true });
		} else if (openWindow == "vacation")
			this.setState({ plansShow: true, setVacation: true });
		else if (openWindow == "payment"){
			this.setState({ plansShow: false, paymentScreen: true });
			this.getUserCurrentPlan(); // check if upgrade method is change
		}
	};

	handleClose = (closeWindow?: string) => {
		if (closeWindow == "plans") this.setState({ plansShow: false });
		else if (closeWindow == "payment")
			this.setState({ paymentScreen: false });
		else if (closeWindow == "vacation")
			this.setState({ setVacation: false, plansShow: false });
		else this.setState({ open: false });
	};
	// closeUpgradePlan = () => {
	// 	this.setState({ plansShow: false });
	// };
	// closePaymentScreen = () => {
	// 	this.setState({ paymentScreen: false });
	// };
	// closeSetVacation = () => {
	// 	this.setState({ setVacation: false, plansShow: false });
	// };
	// closeModal = () => {
	// 	this.setState({ open: false });
	// };

	render() {
		const {
			planDetail,
			loading,
			open,
			confirmationMsg,
			plansShow,
			currentPlan,
			setVacation,
			paymentScreen,
		} = this.state;
		//console.log("+state+", planDetail);
		const buttons = [
			{
				text: "Cancel",
				action: this.handleCancelPlan,
				classes: "set-bg text-bold",
			},
			{
				text: "Set Vacation",
				action: () => this.handleOpenScreen("vacation"),
				classes: "set-bg",
			},			
		];
		return (
			<div className="patient-plan-container">
				<ModalComponent
					open={open}
					buttonText="Close"
					buttonAction={this.handleClose}
					modalHeading={"Confirmation"}
					modalText={confirmationMsg}
					alongSidebar={true}
					renderButtons={buttons}
					buttonStyles="set-bg"
					icon={<HelpOutlineIcon />}
				/>
				<ModalComponent open={plansShow} alongSidebar={true}>
					{setVacation ? (
						<SetVacation closeModal={this.handleClose} />
					) : (
						<ChoosePlan
							treatementId={1}
							closeModel={this.handleClose}
							showPaymentScreen={this.handleOpenScreen}
							currentPlan={currentPlan}
						/>
					)}
				</ModalComponent>
				<ModalComponent open={paymentScreen} alongSidebar={true}>
					<PlanPayment closeModal={this.handleClose} />
				</ModalComponent>
				<div className="flex-align">
					{!loading &&
						(Object.keys(planDetail).length != 0 ? (
							this.showPlan(planDetail)
						) : (
							<div className="font-style set-containerStyle">
								Currently you have no new Plan 
							</div>
						))}
				</div>
				<div className="flex-align">
					<ButtonComponent
						btnText="Upgrade"
						onClick={() => this.handleOpenScreen("upgrade")}
					/>
					<ButtonComponent
						btnText="Cancel"
						className="margin-bothSide "
						onClick={() => this.handleOpenScreen("cancel")}
					/>
					<ButtonComponent
						btnText="Set Vacation"
						onClick={() => this.handleOpenScreen("vacation")}
					/>
				</div>
				<Loading show={loading} />
			</div>
		);
	}
}
export default MyPlan;
