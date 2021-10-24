import React from "react";
import LoginForm from "./form";
//import { payload_type } from "./types";
import Loading from "../../components/loader";
import AppLogo from "../../components/app-logo";
import BigLogo from "../../assets/img/biglogo.png";
import { login } from "../../services/apis";
import { notifError, notifSuccess } from "../util";
import OneSignal  from "react-onesignal";
import "./style.scss";
type payload_type = {
    email: "daisyjohnson@gmail.com";
    password: "DaisyJohnson@1234";
    player_id: string;
};
class Login extends React.PureComponent<
    {
        userRole?: any;
        onLogin: (token: string, router: any) => void;
        history: any;
    },
    {}
> {
    state = { loading: false };
    componentDidMount() {
        if (localStorage.getItem("checkCalling") !== null) {
            notifSuccess(
                "Login",
                "please first login into your account to start video calling"
            );
        }
    }
    UNSAFE_componentWillMount() {
        if (this.props.userRole) window.location.href = "/";
    }
    doSignin = async (payload: payload_type) => {
        alert("opne lohon page");
        // let options = {
        //     appId: "5a6c2bc4-ea41-4a9e-9ef4-d4425281360e",
        //     subdomainName: "pilltab.os.tc",
        //     allowLocalhostAsSecureOrigin: true,
        //     notifyButton: {
        //         enable: true,
        //     },
        // };
        // await OneSignal.init(options);
        // const playerId = await OneSignal.getUserId();
        // payload["player_id"] = playerId!;
        // this.setState({ loading: true });
        // let resp = await login(payload);
        // this.setState({ loading: false });
        // if (resp.data && resp.data.status) {
        //     this.props.onLogin(resp.data.tokens, this.props.history);
        // }
    };
    render() {
        return (
            <>
                <div className="flex-space-around container root-form-container">
                    <AppLogo logo={BigLogo} className="app-logo" />
                    {/* <LoginForm onSubmit={this.doSignin} /> */}
                    <Loading show={this.state.loading} />
                </div>
            </>
        );
    }
}
export default Login;