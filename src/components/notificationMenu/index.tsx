import React from "react";
import "../Header/style.scss";
import { Notifications, FiberManualRecord } from "@material-ui/icons";
import { Popover } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
//import { Link } from "react-router-dom";

type NotificationType = {
	date: string;
	header: string;
	data: string;
	check: string;
	url:string;
}

interface Props {
	anchorEl: HTMLDivElement | null;
	handleClose: (screen:string) => void;
	notificationData:NotificationType[]
	renderRoute:(url:string)=>void;
}

const NotificationMenu: React.FC<Props> = ({ anchorEl, handleClose,notificationData,renderRoute}) => {
	const open = Boolean(anchorEl);
	return (
		<>
			<Popover
				id={"simple"}
				open={open}
				anchorEl={anchorEl}
				onClose={()=>handleClose("notification")}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "center",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
			>
				<Typography>
					<div className="notificationMainContainer">
						<div className="notificationHeader">
							<Notifications />
							Notifications
						</div>
						{/* <div className="notification-clearButton" onClick={clearNotificationData}>Clear All</div> */}
						<div className="listContainer">
							{notificationData!=undefined && notificationData.length>0 && notificationData.map((lists: NotificationType) => (
								<div className="flexNotificationList" onClick={()=>renderRoute(lists.url)}>
									<div className="notificationList" >
										{Object.entries(lists).map(([key,value],index) => (																																			
													<li className="list" >
														{key!="url"?value:""}
													</li>											
											))}
									</div>
									{/* <div className="notificationDot">
										<FiberManualRecord
											className={
												lists.check === "true"
													? "greenDot"
													: "greyDot"
											}
										/>
									</div> */}
								</div>
							))}
						</div>
						{notificationData!=undefined && notificationData && !notificationData.length &&
							<div className="flexNotificationList p-tb-10">
								No Notifications
							</div>
						}
					</div>
				</Typography>
			</Popover>
		</>
	);
};
export default NotificationMenu;
