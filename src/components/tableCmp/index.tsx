import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TablePagination,
    TableContainer,
    Tooltip,
    IconButton,
    Checkbox,
    Paper,
    Typography,
    TableSortLabel,
    Toolbar,
    Button
} from '@material-ui/core';
import { Delete, Close, Check } from '@material-ui/icons';
import "./style.scss";
import { EnhancedTableToolbarProps, Data, Order, EnhancedTableProps, HeadCell, TableProps } from "./type";
import useStyles, { useToolbarStyles } from "./styles";
import ModalComponent from '../modal';
import ViewDetail from '../../routes/nurse/view-detail';
// import Button from "../button";

const renderCell = (val: string, index: number) => (
    <TableCell align="left" key={index}>{val === "undefined" ? "" : val}</TableCell>
)

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}


function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}



function EnhancedTableHead(props: EnhancedTableProps) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, isDelete } = props;
    const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };
    const { headers } = props;
    // const styles ={
    //     maxWidth:"5px", backgroundColor: "green" 
    // }
    return (
        <TableHead >
            <TableRow >
                {isDelete && <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>}
                {headers.map((headCell) => (
                    <TableCell
                    // style={{width:"2%"}}
                        key={headCell.name}
                        align={'left'}
                        padding={'none'}
                        sortDirection={orderBy === headCell.name ? order : false}
                        width={headCell.width}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.name}
                            direction={orderBy === headCell.name ? order : 'asc'}
                            onClick={createSortHandler(headCell.name)}
                        >
                            {headCell.label}
                            {orderBy === headCell.name ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const classes = useToolbarStyles();
    const { numSelected, children, onDelete } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <>
                    {props.title &&
                        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                            {props.title}
                        </Typography>}
                </>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton onClick={onDelete.bind({}, false)} aria-label="delete">
                        <Delete />
                    </IconButton>
                </Tooltip>
            ) : (
                children
            )}
        </Toolbar>
    );
};
// const [toogle,setToogle]=useState();
// const setToogle=()=>{

// }




const renderStatusCell = (val: any, index: number) => (
    <TableCell align="left" key={index}>
        {val}
    </TableCell>
)

const TableComponent: React.FC<TableProps> = (props) => {
    const classes = useStyles();
    const [data, setData] = React.useState<any[]>([])
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<string>('calories');
    const [selected, setSelected] = React.useState<string[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [openModels,setopenModel]=useState(false);


const openModel=()=>{
    setopenModel(true);
}
const closeModal=()=>{
    setopenModel(false);
}


const renderActionCell = (val: any, index: number) => (
   
    <TableCell align="left" key={index}>
       {/* {console.log("mike",val)} */}

       <Button  onClick={openModel}>vikas</Button>
        {/* { val.map((item: any, indx: number) => (
          
            // <Button
            //     className={item.classname}
            //     key={indx}
            //     onClick={item.method ? item.method.bind({}, indx) : item.callBack}
            //     btnText={item.btnTxt}
            // />
        ))} */}
    </TableCell>
)


    
    useEffect(() => {
        setData(props.data)
        // if (data.length > props.data.length)
        //     setData(props.data)
        // if (data && !data.length)
        //     setData(props.data)
        if (props.page)
            setPage(props.page)
        if (props.perPage)
            setRowsPerPage(props.perPage)
    }, [props.data])

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    const onSearch = async (value: string) => {
        setPage(0)
        if (props.onSearch) {
            const search = await props.onSearch(value.trim());
            setData(search)
        } else {
            const search = props.data.filter((item: any) => {
                let sts = false
                for (const key of Object.keys(item)) {
                    try {
                        sts = item[key]
                            .toString()
                            .toLowerCase()
                            .includes(value.trim().toString().toLowerCase())
                        if (sts)
                            break
                    }
                    catch (err) {
                    }
                }
                return sts
            })
            setData(search)
        }

    }
    const onCancelSearch = () => {
        if (props.onCancelSearch) {
            const search = props.onCancelSearch();
            setData(search)
        } else {
            setData(props.data)
        }
    }

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked && props.onDelete) {
            const newSelecteds = props.data.map((n: any) => `${n.id}`);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
        if (props.onDelete) {
            const selectedIndex = selected.indexOf(id);
            let newSelected: string[] = [];

            if (selectedIndex === -1) {
                newSelected = newSelected.concat(selected, id);
            } else if (selectedIndex === 0) {
                newSelected = newSelected.concat(selected.slice(1));
            } else if (selectedIndex === selected.length - 1) {
                newSelected = newSelected.concat(selected.slice(0, -1));
            } else if (selectedIndex > 0) {
                newSelected = newSelected.concat(
                    selected.slice(0, selectedIndex),
                    selected.slice(selectedIndex + 1),
                );
            }

            setSelected(newSelected);
        }
    };

    const handleChangePage = async (event: unknown, newPage: number) => {
        setPage(newPage);
        if (props.onPageChange) {
            const resp = await props.onPageChange(rowsPerPage, newPage);
            setData(resp)
        }

    };

    const handleChangeRowsPerPage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        if (props.onPageChange) {
            const resp = await props.onPageChange(parseInt(event.target.value, 10), 0);
            setData(resp)
        }
    };

    const getCell = (name: string, index: number, value: any) => {
        switch (name.toLowerCase()) {
            case "action":
                return renderActionCell(value, index);
            case "status":
                return renderStatusCell(value, index);
            default:
                return renderCell(`${value}`, index)
        }
    }

  

    const isSelected = (name: string) => selected.indexOf(name) !== -1;
    const { headers, children } = props;
    return (
        <div className={classes.root} id="table">
            <Paper className={classes.paper}>
                <EnhancedTableToolbar
                    onDelete={() => { }}
                    children={children}
                    numSelected={selected.length}
                    title={props.title} />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            headers={headers}
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            isDelete={Boolean(props.onDelete)}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {stableSort(data, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(`${row.id}`);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, `${row.id}`)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                        >
                                            {props.onDelete &&
                                                <TableCell align="center" padding="checkbox">
                                                    <Checkbox
                                                        checked={isItemSelected}
                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                    />
                                                </TableCell>}
                                            {headers.map((item: HeadCell, index: number) => (
                                                getCell(item.name, index, row[item.name])
                                            ))}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                {!data.length && <div className="no-data">No Data available</div>}
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={props.total || data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>

            {openModels?
                <ModalComponent open={openModels} alongSidebar={true}>
             
            </ModalComponent>:null
            }
        </div >
    );
}

export default TableComponent;