import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import {ArrowDropUp} from '@material-ui/icons';

const style = makeStyles((theme) => ({
  root: {
    height: 70,
  },
  cell: {
    fontSize: 22,
    // backgroundColor: "#767676",
    // color: theme.palette.common.white,
  },
}));

function EnhancedTableHead({
  onSelectAllClick,
  order,
  orderBy,
  onRequestSort,
  keys,
  selectable,
  sorting,
  ignoreCell,
  updationFromRow,
}:any) {
  const classes = style();
  const createSortHandler = (property:any) => (event:any) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow className={classes.root}>
        {selectable && keys && (
          <TableCell className={classes.cell} padding="checkbox">
            <Checkbox onChange={onSelectAllClick} />
          </TableCell>
        )}

        {keys &&
          keys.map((headCell:any) => {
            {
              if (!ignoreCell.includes(headCell)) {
                if (sorting) {
                  return (
                    <TableCell
                      key={headCell}
                      sortDirection={orderBy === headCell ? order : false}
                      className={classes.cell}
                    >
                      <TableSortLabel
                        active={orderBy === headCell}
                        direction={orderBy === headCell ? order : "asc"}
                        onClick={createSortHandler(headCell)}
                        IconComponent={ArrowDropUp}
                        hideSortIcon={true}
                      >
                        {headCell}
                      </TableSortLabel>
                    </TableCell>
                  );
                } else {
                  return (
                    <TableCell className={classes.cell}>{headCell}</TableCell>
                  );
                }
              }
            }
          })}
        {updationFromRow && <TableCell padding="checkbox"></TableCell>}
      </TableRow>
    </TableHead>
  );
}

export default EnhancedTableHead;
