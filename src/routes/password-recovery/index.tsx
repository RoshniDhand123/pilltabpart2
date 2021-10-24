import React from "react";
import Form from "./form";
import { payload_type } from "./types";
import {resetPassword} from "../../services/apis"
import {notifSuccess,resetRouter,notifError} from "../util"

export default class Verification extends React.PureComponent<any, {}> {
  state = { loading: false, email: "" };

  componentDidMount() {
    if (this.props.location && this.props.location.state && this.props.location.state.email) {
      this.setState({ email: this.props.location.state.email })
    } 
  }

  handleVerification = async (payload: payload_type, { resetForm }: any) => {
    if(this.state.email == "") return notifError("","Something went wrong")
    this.setState({ loading: true });
    let resp = await resetPassword({email:this.state.email,password:payload.password,otp:payload.code})
    this.setState({ loading: false });
    if(resp.data && resp.data.status){
       notifSuccess("", "Password has been suceesfully changed.")
       resetRouter();
    }
  };

  render() {
    return (
      <div className="container flex-center root-form-container">
        <Form handleVerification={this.handleVerification} />
      </div>
    );
  }
}
