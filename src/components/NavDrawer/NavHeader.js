import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Menu } from "@material-ui/icons";
import AppLogo from "../app-logo";
import Logo from "../../assets/img/PillTabs.png";

const header_styles = (theme) => ({
	root: {
		height: 20,
		padding: "30px 20px",
		color: "#ffffff",
		display: "flex",
		alignItems: "center",
		cursor: "pointer",
	
	},
	logo: {
		width: "150px",
		marginLeft: "10px",
	},
	divider: {
		width: "90%",
		border: "0.2px solid #ffffff",
		margin: "auto",
	},
});

export default React.memo(
	withStyles(header_styles)(({ classes, toggleDrawer, isOpen }) => {
		return (
			<div>
				<div className={classes.root}>
					<Menu onClick={toggleDrawer} />
					<AppLogo
						logo={Logo}
						className={`${classes.logo} header-logo ${
							!isOpen && "hide"
						}`}
					/>
				</div>
				<div className={classes.divider}></div>
			</div>
		);
	})
);
