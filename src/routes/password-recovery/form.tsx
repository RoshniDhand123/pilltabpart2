import { prop_type } from "./types";
import Form from "../../components/form";
import Button from "../../components/button";
import { Link } from "react-router-dom";
import Card from "../../components/card"
import FormHeading from "../../components/form-heading";
import { LOGIN } from "../../routes/constants";
import primaryCard from "../../assets/img/card-primary.png";
import fields from "./fields";

const initialValues = {
  password: "",
  cpassword: "",
  code: "",
};

const VerificationForm = ({ handleVerification }: prop_type) => {
  return (
    <>
    <div className="flex-div">
      <Card className="form-card">
        <FormHeading title ="reset password" card={primaryCard} cardStyle="card-style" titleStyle="wrapped-title"></FormHeading>
        <div className = "padding-lrb-20">
          <Form
            sectionWrap
            forgotPassword
            fields={fields}
            onSubmit={handleVerification}
            initialValues={initialValues}
            renderCustomSubmit={<Button className="m-10" btnText="Reset Password" type="submit"/>}
          />
          <div className="flex-center account">
            <div className="form-footer">
              <Link to={LOGIN} className="form-footer-txt">
                Cancel
            </Link>
            </div>
          </div>
        </div>
      </Card>

    </div>
</>
  );
};

export default VerificationForm;
