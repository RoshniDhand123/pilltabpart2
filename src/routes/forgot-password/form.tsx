import Form from "../../components/form";
import Button from "../../components/button";
import { Link } from "react-router-dom";
import fields from "./fields";
import Card from "../../components/card"
import FormHeading from "../../components/form-heading";
import { LOGIN } from "../constants";
import primaryCard from "../../assets/img/card-primary.png";

type props_type = {
  onSubmit: any;
};

const initialValues = { username: "", email: "" };

export default ({ onSubmit }: props_type) => (
  <div className="flex-div">
    <Card className="form-card">
      <FormHeading title="forgot password" card={primaryCard} cardStyle="card-style" titleStyle="wrapped-title"></FormHeading>
      <div className="padding-lrb-20">
        <Form
          fields={fields}
          onSubmit={onSubmit}
          initialValues={initialValues}
          renderCustomSubmit={<Button className="m-top-5" btnText="Email Reset Code" type="submit" />}
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
);
