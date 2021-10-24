import React, { useState } from "react";
//import DateTimePicker from "../../../components/date-time-picker";
import ButtonComponent from "../../../components/button";
import { notifError, notifSuccess } from "../../util";
import { setAppointmentByNurse,setFollowUp } from "../../../services/apis/index";
import {parseTimeUTCtoLocal}from "../../../services/helper/index";
import "./style.scss";

interface Iprops {
	closeModel: (setAppointment: boolean) => void;	
	id?: number;
	secondBtnText?:string;
	medicalInfo?:any;
}
export type medicalInfo = {
	"question": string;
	answer: any;
	value?: string;	
};
const ViewDetail = ({ closeModel, id,secondBtnText,medicalInfo }: Iprops) => {	
	const[open,setModel]=useState<boolean>(false);
	const [appointmentMsg,setMessage]=useState<string>();

	const submitData = async () => {	
		let payload: any = { patient_id: id };
		let resp = await setAppointmentByNurse(payload);		
		if (resp.data && resp.data.status) {
			notifSuccess("Appointment ","Appointment set")	;	
			//let localtime = await parseTimeUTCtoLocal(resp.data.msg["date"],resp.data.msg["time"]);
			//setMessage("Appointment timming set for " +"userName"+" at " +localtime);
		} else notifError("Appointment not set");
		closeModel(true);		
	};
	const followUp=async()=>{
		let payload: any = { patient_id: id };
		let resp = await setFollowUp(payload);		
		if (resp.data && resp.data.status) {
			notifSuccess("FollowUp ","Follow up Completed")	;	
			//let localtime = await parseTimeUTCtoLocal(resp.data.msg["date"],resp.data.msg["time"]);
			//setMessage("Appointment timming set for " +"userName"+" at " +localtime);
		} else notifError("Follow up not Completed");
		closeModel(true);
	}
	const closeModal=()=>{
		setModel(false);
		closeModel(true);
	}
	const list=(value:string[])=>{
		return(value.map((list)=><li>{list}</li>))					
	}
	
	const showData = (list:medicalInfo) => {
		return (
			<div className="container-box">
				{Object.entries(list).map(([key, value], index) => {
					return (
						<div className="d-flex">
							<div className="fieldName">{key}</div>							
							<div className="fieldValue">{Array.isArray(value)?list:value}</div>
						</div>
					);
				})}
			</div>
		);
	};
	return (
		<>
		{/* <ModalComponent
					open={open}
					buttonText="OK"
					buttonAction={this.closeModal}
					modalHeading={"Appointment set"}
					modalText={appointmentMsg}
					alongSidebar={true}
				/> */}
			<div id="view-detail">
				{/* <div>
					<DateTimePicker handleDate={handleInput}></DateTimePicker>
				</div> */}
				<div className="detailInfo">					
					{medicalInfo.map(showData)}
				</div>
				<div className="set-alignment">
					{/* <div className="set-space"> */}
					<ButtonComponent
						btnText={secondBtnText?secondBtnText:"Schedule Call"}
						className="style b-width"
						onClick={secondBtnText?followUp:submitData}
					/>
					{/* </div> */}
					<ButtonComponent
						btnText={"Cancel"}
						className="style b-width"
						onClick={() => closeModel(false)}
					/>
				</div>
			</div>
		</>
	);
};
export default ViewDetail;
