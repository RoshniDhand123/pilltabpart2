import React from "react";
import Form from "../../components/form";
import Button from "../../components/button";
import { Link } from "react-router-dom";
import fields from "./fields";
import "./style.scss";
import Card from "../../components/card"
import FormHeading from "../../components/form-heading";
import primaryCard from "../../assets/img/card-primary.png";
import { FORGOT_PASSWORD,CHOOSE_TREATMENT } from "../constants";

type props_type = {
  onSubmit: any;
};

const initialValues = { email: "", password: "" };

export default ({ onSubmit }: props_type) => (
  <div className="flex-div">
    <Card className="form-card login">
      <FormHeading title ="log in" card={primaryCard} cardStyle="card-style"></FormHeading>
      <div className = "padding-lrb-20">
        <Form
          fields={fields}
          onSubmit={onSubmit}
          initialValues={initialValues}
          renderCustomSubmit={<Button btnText="Get Started" className="form-button" type="submit"/>}
        />
        <div className="flex-space-around account">
          <div className="form-footer">
            <Link to={CHOOSE_TREATMENT} className="form-footer-txt">
              CREATE ACCOUNT
            </Link>
          </div>
          <div className="form-footer flex-end">
            <Link to={FORGOT_PASSWORD} className="form-footer-txt">
              NEED HELP?
            </Link>
          </div>
        </div>
      </div>
    </Card>

  </div>
);
