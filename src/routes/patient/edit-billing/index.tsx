import React from "react";
import Loading from "../../../components/loader";
import {Typography} from "@material-ui/core";
import {CONSTANTS} from "../../constants"
import BillingForm from "../../sign-up/billing/form"
import {getBillingDetails,editBilling} from "../../../services/apis"
import {parseBilling,parseUpdateBillingPayload} from "../../../services/helper"
import ModalComponent from "../../../components/modal";

class EditBilling extends React.PureComponent<any, {}> {
  state = { loading: true,billing:{},payment:{},open:false}

  componentDidMount(){
    this.getBillingInformation()
  }

  getBillingInformation = async () =>{
    let resp = await getBillingDetails()
    if(resp.data && resp.data.status){
      let {billing,payment} = parseBilling(resp.data.data)
      this.setState({billing,payment})
    }
    this.setState({loading:false})
  }

  updateBilling = async(payload:any)=>{
    this.setState({loading:true})
    let updatePayload = parseUpdateBillingPayload(payload)
    let resp = await editBilling(updatePayload)
   
    this.setState({loading:false})
    if(resp && resp.data && resp.data.status) {
      this.getBillingInformation()
      this.setState({open:true})
    }
  }

  closeModal =()=>{
    this.setState({open:false})
  }

  render() {
    const {billing,loading,payment,open} = this.state
    return (
      <>
        <ModalComponent 
          open={open} 
          buttonText="OK" 
          buttonAction={this.closeModal} 
          modalHeading={CONSTANTS.THANK_YOU} 
          modalText={CONSTANTS.BILLING_MODAL_SUBTITLE}
          alongSidebar={true}
        />
        <div className="content edit-billing">
          <Typography variant="h3" gutterBottom>{CONSTANTS.EDIT_BILLING_HEADER}</Typography>
          <div className="flex-column-start">
            <Typography variant="h5" gutterBottom>{CONSTANTS.EDIT_BILLING}</Typography>
            <div className="form-container billing">
              {!loading && <BillingForm edit={true} column={12} onSubmit={this.updateBilling} editBilling={billing} editPayment={payment}/>}
            </div>
          </div>
        </div>  
        <Loading show={loading} />
      </>
    );
  }
}

export default EditBilling;
