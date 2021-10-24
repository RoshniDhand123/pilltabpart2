import React from "react";
import "./style.scss";
import AppLogo from "../app-logo";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/PillTabs.png";
import {
	Notifications,
	ArrowBackIos,
	ExitToApp,
	Settings,
} from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import NotificationMenu from "../notificationMenu";
import {
	getNurseNotificationData,
	getPatientNotification,
} from "../../services/apis/index";
import {
	parseNurseNotification,
	parsePatientNotification,
} from "../../services/helper/index";
import SettingPopup from "../setting_popup";

interface routeLink {
	path: string;
	icon?: any;
	text: string;
}

interface Props {
	backgroundColor?: string;
	textColor?: string;
	routeLink?: routeLink;
	notifications?: boolean;
	logout?: boolean;
	onLogout?: () => void;
	badgeContent?: number;
	role?: string;
}
export type NotificationType = {
	date: string;
	header: string;
	data: string;
	check: string;
	url: string;
};
const settingList = [
	{ list: "My Profile", url: "/my-profile" },
	//{ list: "change Password", url: "/forgot-password" },
];
const Header: React.FC<Props> = ({
	routeLink,
	notifications,
	logout,
	onLogout,
	badgeContent,
	role,
}) => {
	const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
	const [settingPopUp, openPopUP] = React.useState<HTMLDivElement | null>(
		null
	);
	const [notificationData, setNotificationData] = React.useState<
		NotificationType[]
	>([]);

	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (screen: string) => {
		if (screen === "notification") setAnchorEl(null);
		if (screen === "setting") openPopUP(null);
	};

	const handleSetting = (event: any) => {
		openPopUP(event.currentTarget);
	};
	const handleNurseNotification = async () => {
		let resp = await getNurseNotificationData();
		//console.log("resp=>>>>",resp);
		let data = parseNurseNotification(resp.data);
		setNotificationData(data);
	};
	const handlePatientNotification = async () => {
		let resp = await getPatientNotification();
		//console.log("patientNotification", resp);
		let notifData = parsePatientNotification(resp.data.data);
		setNotificationData(notifData);
	};
	React.useEffect(() => {
		if (role == "Nurse") {
			handleNurseNotification();
		}
		if (role === "User") {
			handlePatientNotification();
		}
	}, []);

	const renderRoute = (url: string) => {
		window.location.href = url;
	};

	const open = Boolean(anchorEl);
	return (
		<div className="flex-space-between header">
			<div className="inner">
				<AppLogo logo={Logo} className="header-logo" />
			</div>
			<div className="flex-space-between margin-right-20">
				{routeLink ? (
					<Link to={routeLink.path}>
						<div className="flex-space-between headerIcon">
							{routeLink.icon ? routeLink.icon : <ArrowBackIos />}{" "}
							<span className="headerText">{routeLink.text}</span>
						</div>
					</Link>
				) : (
					<>
						{notifications && (
							<div className="notification">
								<Badge
									color="secondary"
									badgeContent={badgeContent || 0}
								>
									<IconButton onClick={handleClick}>
										<Notifications />
									</IconButton>
									<NotificationMenu
										anchorEl={anchorEl}
										handleClose={handleClose}
										notificationData={notificationData}
										renderRoute={renderRoute}
									/>
								</Badge>
							</div>
						)}
						{/* {logout && (
							<div className="notification logout">
								<ExitToApp onClick={onLogout} />
							</div>
						)} */}
						<div className="notification d-flex">
							<IconButton onClick={handleSetting}>
								<Settings />
							</IconButton>
							<SettingPopup
								anchorEl={settingPopUp}
								handleClose={handleClose}
								list={role == "User" ? settingList : null}
								renderRoute={renderRoute}
								onLogout={onLogout!}
							/>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Header;
