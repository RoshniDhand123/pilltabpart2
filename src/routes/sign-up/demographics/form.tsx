import {useState} from "react"
import Form from "../../../components/form";
import Button from "../../../components/button";
import fields from "./fields";
import {getItem} from "../../../services/storage"

type props_type = {
  onSubmit: any;
};

const initialValues = { dob: "",gender:"",maritalStatus: "", employment: "",race:"" };

const getInitialValues =() =>{
  let demographics = getItem("demographics")
  if(demographics) return demographics 
  else return initialValues
}


export default ({ onSubmit }: props_type) => {
  const [demographics, setDemographics] = useState(getInitialValues());
  return (
    <Form
      fields={fields}
      onSubmit={onSubmit}
      initialValues={demographics}
      renderCustomSubmit={<Button btnText="Next" className="form-button" type="submit"/>}
    />
)};
