import React from "react";
import Loading from "../../../components/loader";
import PlanCard from "../../../components/plan-card";
import Typography from "@material-ui/core/Typography";
import { CONSTANTS } from "../../constants";
import { getPlans,upgradePatientPlan } from "../../../services/apis";
import { parsePlans } from "../../../services/helper";
import { setItem } from "../../../services/storage";
import ButtonComponent from "../../../components/button";
import "../../sign-up/style.scss";

interface types {
	plan: string;
	drugName: string;
	dosage: string;
	frequency: string;
	amount: number;
	id: number;
	detail: string;
}

class ChoosePlan extends React.PureComponent<any, {}> {
	state = { loading: true, plans: [] };

	componentDidMount = async () => {
		let response;
		response = await getPlans(this.props.treatementId);
		if (response.data.status) {
			let plans = parsePlans(response.data.data);
			this.setState({ plans });
		}
		this.setState({ loading: false });
	};

	onPlanSelection = async(id?: string | number) => {		
		let payload={"plan_id":id!.toString()};
		let resp=await upgradePatientPlan(payload);
		this.props.showPaymentScreen("payment");
		//setItem("planId", id);
	};
	close = () => {
		this.props.closeModel("plans");
	};

	renderCard = (plan: types, i: number) => (
		<PlanCard
			key={plan.id}
			id={plan.id}
			plan={plan.plan}
			drugName={plan.drugName}
			dosage={plan.dosage}
			frequency={plan.frequency}
			amount={plan.amount}
			detail={plan.detail}
			onSelect={() => this.onPlanSelection(plan.id)}
			headerStyle="headerSize"
			heighlight={
				this.props.currentPlan == plan.plan ? "highlightCard" : ""
			}
		/>
	);
	render() {
		const { plans } = this.state;
		return (
			<>
				<div className="flex-center" id="plan-container">
					<div className="">
						<div className="main-title">{CONSTANTS.PLAN_TITLE}</div>
						<div className="flex-row-center set-Container">
							{plans.map(this.renderCard)}
						</div>
					</div>
					<ButtonComponent
						btnText="Close"
						className="margin-bothSide m-bottom set-bg"
						onClick={this.close}
					/>
					<Loading show={this.state.loading} />
				</div>
			</>
		);
	}
}

export default ChoosePlan;
