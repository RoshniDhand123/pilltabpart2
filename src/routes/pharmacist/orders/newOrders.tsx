import React,{useState,useEffect} from "react";
import TableCmp from "../../../components/tableCmp";
import { HeadCell } from "../../../components/tableCmp/type";
import { Typography } from "@material-ui/core";
import { CONSTANTS } from "../../constants";
import axios from'axios';
import ButtonComponent from "../../../components/button";
import data from "./dummydata";
import ModalComponent from "../../../components/modal";
 import {
	parseAcceptRequestsList,
	getTimeSequenceList,
	parsePatientMedicalInfo,
	
} from "../../../services/helper/index";
import { getUserRequestList,getPatientMedicalInfo } from "../../../services/apis/index";
import Tracking from "./tracking";
import { Track } from "twilio-video";



const headCells: HeadCell[] = [	
	{name:"serailNo",label:"SrNo",width:"3%"},
	{name:"orderId",label:"OrderId",width:"5%"},
	{ name: "name", label: "Name" ,width:"20%"},
	{ name: "age", label: "Age",width:"5%" },
	{ name: "address", label: "Address",width:"40%" },
	{ name: "plan", label: "Plan",width:"10%" },
	{name:"action",label:"Action",width:"20%"},
	
];

const Chart=()=>{
const state = {
			loading: true,
			details: [],
			total: 0,
			open: false,		
			id: -1,
			userMedicalInfo:[],
		};

	const loadDetails = async (page = 0, perPage = 10) => {};
    const [count,setCount]=useState<number>();
    const [details,setDetails]=useState([]);
	const [total,setTotal]=useState();
	
	const[loading,setloading]=useState(false);
	
const onPageChange = async (perPage: number, page: number) => {
		const { total, details = [] } = state;
		if (total > details.length && (page + 1) * perPage > details.length)
			await loadDetails(page, perPage);
		return state.details;
	};

	// const  getTogglebutton =	async () => {
	// 	let resp = await getUserRequestList("accepted");
	// 	if (resp.data && resp.data.status) {
	// 		let parseData = parseAcceptRequestsList(resp.data.data, [
	// 			{
	// 				btnTxt: "Track Button",
	// 				classname: "style",
					
	// 			},
	// 		]);
	// 		setDetails(getTimeSequenceList(parseData));
	// 		// { details: getTimeSequenceList(parseData) };
	// 	}
	// 	//console.log("status", resp);
	// setloading(false);
	// };

	useEffect(()=>{
		console.log("Order Tracked");
		// getTogglebutton();
	},[])

	const[open,setOpen]=useState(true);
	
    return(
		
		<>
		<div className="content nurse nursePageContainer">
					<Typography variant="h3" gutterBottom>
						{CONSTANTS.PHARMACIST_TITLE}
					</Typography>
		</div>
		<div className="table-container">
		<TableCmp
			onPageChange={onPageChange}
			total={total}
			data={data}
			headers={headCells}
			title={""}
		/>
		</div>
	
	</>
   
    )
}

export default Chart;
