import React from "react";
import Form from "../../../components/form";
import Button from "../../../components/button";
import fields, { editBillingFields } from "./fields";
import { getItem } from "../../../services/storage";
import { notifError } from "../../util";
import CreditCard from "../../../components/credit-card";
import Modal from "../../../components/modal";
import { CONSTANTS } from "../../constants";
import PaymentForm from "./payment-form";

const initialValues = {};

const getInitialValues = (edit: Boolean | undefined) => {
	if (edit) return {};
	let billing = getItem("billing");
	if (billing) return billing;
	else return initialValues;
};

interface billing {
	billingAddress: string;
	billingAddress2: string;
	billingCity: string;
	billingState: string;
	billingZipCode: string;
}
type CheckoutProps = {
	onSubmit?: any;
	handleInputChange?: any;
	edit?: Boolean;
	column?: any;
	editBilling?: any;
	billingValues?: any;
	editPayment?: any;
};

type CheckoutState = {
	billing: [];
	cardNumber: string;
	expDate: string;
	cvv: string;
	cardName: string;
	billingForm: Boolean;
	payments: {};
	billingInfo: billing;
	billingValues: {};
};
let billingInfo = {
	billingAddress: "",
	billingAddress2: "",
	billingCity: "",
	billingState: "",
	billingZipCode: "",
};
export default class CheckoutForm extends React.Component<
	CheckoutProps,
	CheckoutState
> {
	state = {
		billing: getInitialValues(this.props.edit),
		cardNumber: "",
		expDate: "",
		cvv: "",
		cardName: "",
		billingForm: false,
		payments: {},
		billingInfo: {
			billingAddress: "",
			billingAddress2: "",
			billingCity: "",
			billingState: "",
			billingZipCode: "",
		},
		billingValues: this.props.billingValues,
	};

	componentDidMount = () => {
		if (this.props.edit) {
			billingInfo = this.props.editBilling;
			//this.setState({ billingInfo: billingInfo });
			// Object.entries(this.props.billingValues).map(([key, value]) => {
			// 	console.log("checkBilling", key, value);
			// });
			//console.log("check....", this.state.billingInfo["billingAddress"]);
		}
		const { payments } = this.state.billing;
		let payment: any = {};

		if (this.props.editPayment) payment = this.props.editPayment;
		else payment = payments;

		if (payment) {
			const { expiry_date, card_number, name } = payment;
			this.setState({
				cardNumber: "**** **** **** " + card_number,
				expDate: expiry_date,
				cardName: name,
			});
		}
	};

	submitBillingInfo = (payload: any) => {
		let { payments } = this.state;
		if (this.props.edit) this.props.onSubmit({ ...payload });
		else {
			if (Object.keys(payments).length !== 0)
				this.props.onSubmit({ ...payload, payments });
			else notifError("", CONSTANTS.MSG_ADD_PAYMENT);
		}
	};

	handleInputChange = ({ target: { name, value } }: any) => {
		if (this.props.billingValues) {
			this.setState({ billingValues: { ...this.state.billingValues, [name]: value } });
		}
	};
	saveCardDetails = (cardDetails: any) => {
		const { cardNumber, expDate, payments } = cardDetails;
		this.setState({
			cardNumber,
			expDate,
			cardName: payments.name,
			payments,
		});
	};

	handleBillingForm = () => {
		this.setState((prevState, props) => ({
			billingForm: !prevState.billingForm,
		}));
	};
	handleChangeValue = ({ target: { name, value } }: any) => {
		console.log("target", name, value)
	}

	render() {
		const {
			cardNumber,
			expDate,
			cvv,
			cardName,
			billing,
			billingForm,
		} = this.state;
		const {
			edit,
			column,
			editBilling,
			billingValues,
			editPayment,
		} = this.props;
		return (
			<>
				<Modal className={"card-form"} open={billingForm} alongSidebar={editPayment}>
					<PaymentForm
						handleBillingForm={this.handleBillingForm}
						saveCardDetails={this.saveCardDetails}
						edit={edit}
						billingInfo={
							edit
								? billingInfo
								: this.props.billingValues
									? this.state.billingValues
									: this.state.billingInfo
						}
					/>
				</Modal>
				<Form
					fields={edit ? editBillingFields : fields}
					onSubmit={this.submitBillingInfo}
					initialValues={
						billingValues
							? billingValues
							: edit
								? editBilling
								: billing
					}
					onChange={this.handleInputChange}
					renderCustomSubmit={
						<>
							<Button
								btnText={
									edit
										? "Update card details"
										: "Add card details"
								}
								className="form-button card-btn"
								onClick={this.handleBillingForm}
								type="button"
							/>
							<Button
								btnText="Save"
								className="form-button save-btn"
								type="submit"
							/>
						</>
					}
					gridItem={6}
					column={12}
				/>
				<div className={edit ? "credit-card" : "SignUp-credit-card"}>
					<CreditCard
						name={cardName}
						number={cardNumber}
						expiry={expDate}
						cvc={cvv}
					/>
				</div>
			</>
		);
	}
}
