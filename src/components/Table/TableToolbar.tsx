import React from "react";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import SearchIcon from "@material-ui/icons/Search";

import { Link } from "react-router-dom";
import "./style.css";

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
  flexBox: {
    display: "flex",
    alignItems: "center",
  },
}));

const EnhancedTableToolbar = ({
  TableName,
  numSelected,
  deleteRow,
  onSearch,
  search,
  searching,
  deletion,
  updationUsingForm,
  insertion,
  toogleSearch,
}:any) => {
  const classes = useToolbarStyles();

  return (
    <Toolbar
      id="tableSearch"
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
      onClick={toogleSearch}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {TableName}
        </Typography>
      )}

      {updationUsingForm && numSelected === 1 ? (
        <Link to="/form">
          <Tooltip title="Edit">
            <IconButton aria-label="edit">
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Link>
      ) : null}

      {deletion && numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon onClick={deleteRow} />
          </IconButton>
        </Tooltip>
      ) : null}
      {insertion && numSelected === 0 && (
        <Link to="/form">
          <Tooltip title="Add row">
            <IconButton aria-label="Add">
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
        </Link>
      )}

      {searching ? (
        search ? (
          <input name="input" type="text" onChange={onSearch} />
        ) : (
          <Tooltip title="search">
            <IconButton aria-label="search">
              <SearchIcon id="searchIcon" onClick={toogleSearch} />
            </IconButton>
          </Tooltip>
        )
      ) : null}
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
