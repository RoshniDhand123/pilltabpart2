import React from "react";
import { getBillingDetails } from "../../../services/apis";
import { parseBilling } from "../../../services/helper";
import CreditCard from "../../../components/credit-card";
import ButtonComponent from "../../../components/button";
import "../style.scss"

class PlanPayment extends React.PureComponent<any, {}> {
	state = {
		billing: {},
		cardName: "",
		expiry_date: "",
		card_number: "",
		cvv: "",
	};

	componentDidMount() {
		this.getBillingInformation();
	}

	getBillingInformation = async () => {
		let resp = await getBillingDetails();
		if (resp.data && resp.data.status) {
            let { billing, payment } = parseBilling(resp.data.data);
            
			const { expiry_date, card_number, name } = payment;
			this.setState({ billing, cardName:name, expiry_date, card_number });
		}
		this.setState({ loading: false });
    };
    
    planPayment=()=>{
        this.props.closeModal("payment");
    }

	render() {
		const { cardName, card_number, expiry_date, cvv } = this.state;
		return (
			<div id="updgradePlan-payment">
                <div className="payment-heading">Payment</div>
                <div className="payment-subheading">If you want to update your card-Information then go to billing page.</div>
				<div className="credit-card">
					<CreditCard
						name={cardName}
						number={card_number}
						expiry={expiry_date}
						cvc={cvv}
					/>
				</div>
				<div className="payment-buttonContainer">
					<ButtonComponent
						btnText="Procced"
						className="m-bothSide"
						onClick={this.planPayment}
					/>
                    <ButtonComponent
						btnText="Cancel"
						className="m-bothSide"
						onClick={()=>this.props.closeModal("payment")}
					/>
				</div>
			</div>
		);
	}
}
export default PlanPayment;
