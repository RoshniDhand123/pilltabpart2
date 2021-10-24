import { Theme, makeStyles } from "@material-ui/core";
import { getThemeByRole } from "./utils";

const drawer_width = 230;

const styles = makeStyles((theme: Theme) => ({
    color: {
        color: "white",
    },
    topDrawer: {
        background: (props: { role: string }) => getThemeByRole(props.role),
        boxShadow: "0px 2px 4px rgb(0 0 0 / 10%), 0px 4px 20px rgb(0 0 0 / 15%)",
        "@media (min-width:800px)": {
            display: "none",
        },
    },
    drawer: {
        width: drawer_width,
        flexShrink: 0,
        whiteSpace: "nowrap",
        overflowX: "hidden",
        "@media (max-width:800px)": {
            width: "0px !important;",
        },
    },
    drawerOpen: {
        width: drawer_width,
        overflowX: "hidden",
        transition: theme.transitions.create(["width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        background: (props: { role: string }) => getThemeByRole(props.role),
        boxShadow: "0px 2px 4px rgb(0 0 0 / 10%), 0px 4px 20px rgb(0 0 0 / 15%)",
        borderRadius: "6px",
        marginTop: "85px",
        "@media (max-width:800px)": {
            marginTop: 0,
        },
    },
    drawerClose: {
        transition: theme.transitions.create(["width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: "hidden",
        width: 60,
        borderRadius: 6,
        background: (props: { role: string }) => getThemeByRole(props.role),
        marginTop: "85px",
        "@media (max-width:800px)": {
            marginTop: 0,
            width: "0px !important;",
        },
    },
    root: {
        display: "flex",
    },
    navContent: {
        width: "100%",
        overflow: "auto",
    },
}));

export default styles;