import React from "react";
import FormComponent from "../form";
import { makeStyles } from "@material-ui/core/styles";
import { createField, createInitialValues } from "./utils";
import { Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  flexBox: {
    margin: 10,
  },
  link: {
    textDecoration: "none",
  },
}));

const Form = ({ data, onSave, btnText, update, ignoreCell, ...props }:any) => {
  const classes = useStyles();
  const fields = createField(data, ignoreCell);
  const initialValues = createInitialValues(data, ignoreCell, update);

  const onClick = (values:any) => {
    onSave(values);
    props.history.push("/");
  };

  const customButtom = (
    <Button
      className={classes.flexBox}
      type="submit"
      variant="contained"
      color="primary"
    >
      {btnText}
    </Button>
  );
  return (
    <>
      <FormComponent
        fields={fields}
        onSubmit={onClick}
        sectionWrap
        renderCustomSubmit={customButtom}
        initialValues={initialValues}
      />
    </>
  );
};

export default withRouter(Form);
