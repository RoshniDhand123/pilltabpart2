import React from "react";
import Loading from "../../../components/loader";
import Typography from '@material-ui/core/Typography';
import Header from "../../../components/Header";
import { QUESTIONNAIRE, CONSTANTS } from "../../constants";
import BillingForm from "./form";
import LinearProgress from "../../../components/linear-progress"
import "../style.scss"
import ModalComponent from "../../../components/modal";
import { getItem, setItem, clearStorage } from "../../../services/storage"
import { createProfile, submitBillingWithPayment } from "../../../services/apis"
import { createProfilePayload, parseBillingShippingValues, createBillingAndPaymentPayload } from "../../../services/helper"
import { notifError, resetRouter ,moveDocumentSection} from "../../util";


type payload_type = {
	email: string;
	password: string;
  };

  let UserInfo:payload_type;
class Billing extends React.PureComponent<any, {}> {
  state = { loading: false, open: false, modalText: "", paymentPending: false, billingValues: {}, token: '' }

  UNSAFE_componentWillMount = () => {
    if (this.props.location.state && this.props.location.state.paymentPending) {
      let billingValues = parseBillingShippingValues(this.props.location.state)
      this.setState({ paymentPending: true, billingValues, token: billingValues.token })
    }
  }

  submitBilling = async (payload: any) => {
    if (this.state.paymentPending) {
      setItem("token", this.state.token)
      let billingPayload = createBillingAndPaymentPayload(payload)
      let resp = await submitBillingWithPayment(billingPayload, this.state.token)
      if (resp.data && resp.data.status) this.setState({ open: true, modalText: CONSTANTS.PROFILE_SUCCESS })
      else clearStorage()
    }
    else {
      this.setState({ loading: true })
      setItem("billing", payload)
      let p = createProfilePayload()
      if (!p) notifError("", "Kindly complete all the forms")
      else {
        let resp = await createProfile(p)
        if (resp.data && resp.data.status) {
          let modalText
          if (resp.data.payment) modalText = CONSTANTS.PROFILE_SUCCESS_PAYMENT
          else modalText = CONSTANTS.PROFILE_SUCCESS
          this.setState({ open: true, modalText })
          clearStorage()
          console.log("--",resp.data,p);
          // email: "sharda@gmail.com"
          // password: "Sharda@12345"   
          UserInfo={email:p.email,password:p.password};
          //localStorage.setItem("userId",JSON.stringify(payloadInfo));
          //payload=payloadInfo;
        }
      }
      this.setState({ loading: false })
    }
  }

  closeModal = () => {
    this.setState({ open: false });    
    moveDocumentSection(UserInfo);
    //resetRouter()
  }


  render() {
    const { paymentPending, billingValues } = this.state;
    return (
      <>
        <ModalComponent
          open={this.state.open}
          buttonText="OK"
          buttonAction={this.closeModal}
          modalHeading={CONSTANTS.THANK_YOU}
          modalText={this.state.modalText}
        />
        {!paymentPending && <Header routeLink={{ path: QUESTIONNAIRE + '/' + getItem("treatmentId"), text: CONSTANTS.BILLING_HEADER }} />}
        <div className="container sign-up">
          <div className="content">
            <Typography variant="h5" gutterBottom>{CONSTANTS.BILLING_TITLE}</Typography>
            <Typography variant="h6" gutterBottom>{CONSTANTS.BILLING_SUBTITLE}</Typography>
            <LinearProgress value={100} />
          </div>
          <div className="form-container billing">
            <BillingForm onSubmit={this.submitBilling} billingValues={billingValues} />
          </div>
          <Loading show={this.state.loading} />
        </div>
      </>
    );
  }
}

export default Billing;
