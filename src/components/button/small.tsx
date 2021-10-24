import React from "react";
import { makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    mainContainer: {
      background: "grey",
      border: "none",
      borderRadius: 20,
      color: "white",
      padding: "0 20px",
      height: 32,
      fontFamily: "NunitoRegular",
    },
  })
);
export default ({ text, className, ...props }: any) => {
  let classes = useStyles();
  return (
    <button className={`${classes.mainContainer} ${className}`} {...props}>
      {text}
    </button>
  );
};
