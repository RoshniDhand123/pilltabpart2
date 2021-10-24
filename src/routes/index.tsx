import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import * as path from "./constants";
import "../index.scss";
import Footer from "../components/footer"
import { footerLinks } from "../store/data"
const Login = React.lazy(() => import('./login'));
const ForgotPassword = React.lazy(() => import('./forgot-password'));
const PasswordRecovery = React.lazy(() => import('./password-recovery'));
const ChooseTreatment = React.lazy(() => import('./sign-up/choose-treatment'));
const ChoosePlan = React.lazy(() => import('./sign-up/choose-plan'));
const CreateProfile = React.lazy(() => import('./sign-up/create-profile'));
const Demographics = React.lazy(() => import('./sign-up/demographics'));
const Questionnaire = React.lazy(() => import('./sign-up/questionnaire'));
const Billing = React.lazy(() => import('./sign-up/billing'));
const Home = React.lazy(() => import('./home'));
const Chart = React.lazy(() => import('./patient/chart'));
const PATIENT_VIDEOCALLING = React.lazy(() => import('./patient/attendCalling'));
const ContactUs = React.lazy(() => import('./contact-us'));
const AboutUs = React.lazy(() => import('./about-us'));


type RouteType = {
  userRole: any | null;
  onLogin: (token: string, router: any) => void;
}

const Routes = ({ userRole, onLogin }: RouteType) => {
  return (
    <Router>
      {/* <Route path={path.CONTACT_US} component={ContactUs} /> */}
      {/* <Route path={path.ABOUT_US} component={AboutUs} /> */}
      {!userRole ?
        <>
          <Route
            exact
            path={path.LOGIN}
            render={({ history }: any) => (
              <Login
                userRole={userRole}
                onLogin={onLogin}
                history={history}
              />
            )}
          />
          <Route path={path.FORGOT_PASSWORD} component={ForgotPassword} />
          <Route path={path.PASSWORD_RECOVERY} component={PasswordRecovery} />
          <Route path={path.CHOOSE_TREATMENT} component={ChooseTreatment} />
          <Route path={path.CHOOSE_PLAN + "/:id"} component={ChoosePlan} />
          <Route path={path.CREATE_PROFILE} component={CreateProfile} />
          <Route path={path.DEMOGRAPHICS} component={Demographics} />
          <Route path={path.QUESTIONNAIRE + "/:id"} component={Questionnaire} />
          <Route path={path.BILLING} component={Billing} />
          <Route path={path.Home} component={Home} />
          <Route path={path.PATIENT_VIDEOCALLING} component={PATIENT_VIDEOCALLING} />
          <Redirect from="*" to={path.LOGIN} />
        </> :
        <Home userRole={userRole} />
      }
      <Footer leftLinks={footerLinks.leftLinks} rightLinks={footerLinks.rightLinks} />
    </Router >
  );
};

export default Routes;
