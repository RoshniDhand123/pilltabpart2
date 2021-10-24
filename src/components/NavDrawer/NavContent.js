import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import NavListWithCollapse from "./NavListWithCollapse";
import Header from "./NavHeader";
const drawer_width = 228;

const styles = (theme) => ({
	root: {
		width: drawer_width,
		background: theme.palette.white,
		flexWrap: "nowrap",
		flex: 1,
		overflow: "hidden",
		[theme.breakpoints.up("lg")]: {
			width: "100%",
			maxWidth: drawer_width,
		},
	},
	container: {
		flex: 1,
		overflowY: "auto",
		overflowX: "hidden",
	},
});

const NavContent = ({
	classes: { root, container },
	isOpen,
	toggleDrawer,
	menu,
	setComponent,
}) => {
	return (
		<Grid container direction="column" className={root}>
			<Grid
				direction="column"
				container
				wrap="nowrap"
				className={container}
			>
				<Header isOpen={isOpen} toggleDrawer={toggleDrawer} />
				<NavListWithCollapse toggleDrawer={toggleDrawer} isOpen={isOpen} menu={menu} />
			</Grid>
		</Grid>
	);
};

export default withStyles(styles)(NavContent);
