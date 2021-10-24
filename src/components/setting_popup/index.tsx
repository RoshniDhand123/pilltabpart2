import React from "react";
import "../Header/style.scss";
import { Notifications, FiberManualRecord } from "@material-ui/icons";
import { Popover } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

interface Ilist {
	list: string;
	url: string;
}
interface Props {
	anchorEl: HTMLDivElement | null;
	handleClose: (screen: string) => void;
	list: Ilist[]|null;
	renderRoute: (url: string) => void;
	onLogout: () => void;
}

const NotificationMenu: React.FC<Props> = ({
	anchorEl,
	handleClose,
	list,
	renderRoute,
	onLogout,
}) => {
	const open = Boolean(anchorEl);
	//console.log("inside setting", list);
	return (
		<>
			<Popover
				id={"settingPopOver"}
				open={open}
				anchorEl={anchorEl}
				onClose={() => handleClose("setting")}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "center",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
			>
				{/* <Typography> */}
					<div className="settingContainer">
						{list!=null &&
							list.map((data: Ilist) => (
								<div className="border-b padding-10" onClick={()=>renderRoute(data.url)}>
									{Object.entries(data).map(
										([key, value], index) => (
											<div>{key != "url" && value}</div>
										)
									)}
								</div>
							))}
                            <div className="border-b padding-10" onClick={()=>renderRoute("/change-password")}>Change-Password</div>
						<div className="padding-10" onClick={onLogout}>Logout</div>
					</div>
				{/* </Typography> */}
			</Popover>
		</>
	);
};
export default NotificationMenu;
