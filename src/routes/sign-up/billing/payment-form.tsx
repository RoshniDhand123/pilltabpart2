import React from "react";
import Form from "../../../components/form";
import Button from "../../../components/button";
import { billingFields } from "./fields";
import { getItem } from "../../../services/storage";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, ElementsConsumer } from "@stripe/react-stripe-js";
import { notifError } from "../../util";
import { CONSTANTS } from "../../constants";
import Typography from "@material-ui/core/Typography";
import Loading from "../../../components/loader";
import { editPaymentInfo } from "../../../services/apis";

interface billing {
	billingAddress: string;
	billingAddress2: string;
	billingCity: string;
	billingState: string;
	billingZipCode: string;
}
type props_type = {
	handleBillingForm?: any;
	saveCardDetails?: any;
	edit?: Boolean;
	billingInfo?: billing;
};
const initialValues = {};
type CheckoutProps = {
	stripe?: any;
	elements?: any;
	handleBillingForm?: any;
	saveCardDetails?: any;
	edit?: Boolean;
	billingInfo: billing;
};

class CheckoutForm extends React.Component<CheckoutProps> {
	state = { loading: false };

	doPayment = async (payload: any) => {
		console.log("payload", payload, this.props.billingInfo)
		let billingInfo: string = "allFillcolumn";
		Object.entries(this.props.billingInfo).map(([key, value]) => {
			if (value === "") {
				console.log(key, value)
				billingInfo = "pleaseFill"
			};
		});
		// console.log("msg", billingInfo);
		if (billingInfo === "allFillcolumn") {
			this.setState({ loading: true });
			const { stripe, elements } = this.props;
			if (!stripe || !elements) {
				return;
			}
			const cardElement = elements.getElement("cardNumber");
			const user_details = {
				name: payload.cardName,
				address_line1: this.props.billingInfo!["billingAddress"],
				address_line2: this.props.billingInfo!["billingAddress2"],
				address_city: this.props.billingInfo!["billingCity"],
				address_state: this.props.billingInfo!["billingState"],
				address_zip: this.props.billingInfo!["billingZipCode"],
				address_country: "IN",
			};
			const { error, token } = await stripe.createToken(
				cardElement,
				user_details
			);
			this.setState({ loading: false });
			if (error) notifError("Payment Failed", error.message);
			else {
				console.log("token...", token);
				let exp_date = token.card.exp_month + "/" + token.card.exp_year;
				let last4 = token.card.last4;
				let card_token = token.id;
				let name = token.card.name;
				let payments = {
					plan_id: getItem("planId"),
					payment_token: card_token,
					expiry_date: exp_date,
					payment_type: "card",
					card_number: last4,
					name: name,
				};
				if (this.props.edit) {
					// let resp = await editPaymentInfo()
				}
				this.props.saveCardDetails({
					cardNumber: "**** **** **** " + last4,
					expDate: exp_date,
					payments,
				});
				this.props.handleBillingForm();
			}
		} else {
			notifError("", "Please first fill all billing Information");
		}
	};

	render() {
		return (
			<>
				<div className="card-form">
					<Typography variant="h5" gutterBottom>
						{CONSTANTS.ADD_CARD_DETAILS}
					</Typography>
					<Form
						fields={billingFields}
						onSubmit={this.doPayment}
						initialValues={initialValues}
						renderCustomSubmit={
							<div className="flex-space-between">
								<Button
									btnText="Cancel"
									className="form-button"
									onClick={this.props.handleBillingForm}
									type="button"
								/>
								<Button
									btnText="Save"
									className="form-button"
									type="submit"
								/>
							</div>
						}
					/>
					<Loading show={this.state.loading} />
				</div>
			</>
		);
	}
}

const stripePromise = loadStripe(
	process.env.REACT_LOGIN_STRIPE_KEY ||
	"pk_test_51IfIU2SCO3eTsdzgZ0ZUv4R9UpXb8mAwu0Z2ZELDXuOsYE93beWdLokrsOSUQuAzP5vqvbx0VtpIKADIfs2lGrqk00pgAkk6fM"
);

export default ({
	handleBillingForm,
	saveCardDetails,
	edit,
	billingInfo,
}: props_type) => {
	return (
		<Elements stripe={stripePromise}>
			<ElementsConsumer>
				{({ elements, stripe }: any) => (
					<CheckoutForm
						elements={elements}
						stripe={stripe}
						handleBillingForm={handleBillingForm}
						saveCardDetails={saveCardDetails}
						edit={edit}
						billingInfo={billingInfo!}
					/>
				)}
			</ElementsConsumer>
		</Elements>
	);
};
