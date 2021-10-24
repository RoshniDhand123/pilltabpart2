import React from "react";
import Form from "./form";
import { payload_type } from "./types";
import Loading from "../../components/loader";
import { PASSWORD_RECOVERY, CONSTANTS } from "../constants";
import ModalComponent from "../../components/modal";
import { forgotPassword } from "../../services/apis"
import { notifError } from "../util";

class ForgotPassword extends React.PureComponent<any, {}> {
  state = { loading: false, open: false, email: "" };

  sendCode = async (payload: payload_type, { resetForm }: any) => {
    this.setState({ loading: true })
    let resp = await forgotPassword(payload.email)
    if (resp && resp.data && resp.data.status)
      this.setState({ loading: false, open: true, email: payload.email })
    else {
      const { data: { msg11, msg } } = resp;
      notifError("Forgot Password", msg11 || msg || "something went wrong.")
      this.setState({ loading: false })
    }
  }

  closeModal = () => {
    this.setState({ open: false })
    this.props.history.push({
      pathname: PASSWORD_RECOVERY,
      state: { email: this.state.email }
    })
  }

  render() {
    return (
      <div className="container flex-center root-form-container">
        <ModalComponent
          open={this.state.open}
          buttonText="OK"
          buttonAction={this.closeModal}
          modalHeading={CONSTANTS.FORGOT_PSWD_TITLE}
          modalText={CONSTANTS.FORGOT_PSWD_SUBTITLE} />
        <Form onSubmit={this.sendCode} />
        <Loading show={this.state.loading} />
      </div>
    );
  }
}

export default ForgotPassword;
