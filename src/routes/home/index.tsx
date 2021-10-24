import React from "react";
import { getUser, clearStorage } from "../../services/storage";
import { resetRouter } from "../../routes/util";
import Navbar from "../../components/NavDrawer/index.js";
import {
	getRoleRoutes,
	Menu
} from "./menu-items";
import Header from "../../components/Header";
import "./style.scss";
import { withRouter, RouteComponentProps } from "react-router";
import { LOGIN } from "../constants";
interface HomeType { userRole: string | null; };
class Home extends React.PureComponent<HomeType & RouteComponentProps, {
	loading: boolean;
	menu: Menu[];
	notifications: boolean;
	badgeContent: number;
}> {
	state = {
		loading: true,
		menu: [],
		notifications: true,
		badgeContent: 0,
	};

	UNSAFE_componentWillMount = () => {
		const { userRole, history } = this.props;
		if (!userRole) history.push(LOGIN);
		else {
			let menu: Menu[] = getRoleRoutes(userRole);
			this.setState({ menu });
		}
		this.setState({ loading: false });
	};

	logout = () => {
		clearStorage();
		resetRouter();
	};

	render() {
		const { menu, badgeContent } = this.state;
		const { userRole } = this.props;
		return (
			<>
				<Header
					notifications={true}
					logout={true}
					onLogout={this.logout}
					badgeContent={badgeContent}
					role={userRole!=null ?userRole:""}
				/>
				<div className="container home">
					<Navbar
						notifications={true}
						logout={true}
						onLogout={this.logout}
						badgeContent={badgeContent}
						role={userRole}
						menu={menu}
					/>
				</div>
			</>
		);
	}
}

export default withRouter(Home);
