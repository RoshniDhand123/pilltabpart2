import React from "react";
import Loading from "../../../components/loader";
import PlanCard from "../../../components/plan-card";
import Typography from '@material-ui/core/Typography';
import Header from "../../../components/Header";
import { CHOOSE_TREATMENT, CREATE_PROFILE, CONSTANTS } from "../../constants"
import { getPlans } from "../../../services/apis"
import { parsePlans } from "../../../services/helper"
import { setItem } from "../../../services/storage"
import "../style.scss"

interface types {
  plan: string,
  drugName: string,
  dosage: string,
  frequency: string,
  amount: number,
  id: number,
  detail: string
}

class ChoosePlan extends React.PureComponent<any, {}> {
  state = { loading: true, plans: [] }

	componentDidMount = async () => {
		let response;
		if (this.props.treatementId) {
			response = await getPlans(this.props.treatementId);
		} else {
			response = await getPlans(this.props.match.params.id);
		}
		if (response.data.status) {
			let plans = parsePlans(response.data.data);
			this.setState({ plans });
		}
		this.setState({ loading: false });
	};

	onPlanSelection = (id?: string | number) => {
		setItem("planId", id);
		this.props.history.push({
			pathname: CREATE_PROFILE,
		});
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
			onSelect={this.onPlanSelection}
			headerStyle="headerSize"
		/>
	);
	render() {
		const { plans } = this.state;
		return (
			<>
				<Header
					routeLink={{
						path: CHOOSE_TREATMENT,
						text: CONSTANTS.PLAN_HEADER,
					}}
				/>
				<div className="container sign-up flex-center">
					<div className="content">
						<Typography variant="h4" gutterBottom>
							{CONSTANTS.PLAN_TITLE}
						</Typography>
						<Typography variant="h6" gutterBottom>
							{CONSTANTS.PLAN_SUBTITLE}
						</Typography>
						<div className="flex-row-center">
							{plans.map(this.renderCard)}
						</div>
					</div>
					<Loading show={this.state.loading} />
				</div>
			</>
		);
	}
}

export default ChoosePlan;
