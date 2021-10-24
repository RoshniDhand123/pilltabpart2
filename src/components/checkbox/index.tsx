import React from "react"
import {Field} from "formik"
import "./style.scss"
import {Grid} from "@material-ui/core"
import { Checkbox } from 'formik-material-ui';

const CheckboxComponent =  function (props:any) {
  
  const renderOptions=(option:{label:string,value:string})=>(
        <Grid item sm={6} className="option" key={option.label}>
            <Field type="checkbox" name={props.name} value={option.value} component={Checkbox}/>
            <label>{option.label}</label>
        </Grid>
  )

  return (
    <div role={props.name} aria-labelledby={props.name} className="checkbox-container">
        {props.options.map(renderOptions)}
    </div>
  );
}

export default React.memo(CheckboxComponent)
