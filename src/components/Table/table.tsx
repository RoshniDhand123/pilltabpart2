import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EnhancedTableToolbar from "./TableToolbar";
import EnhancedTableHead from "./TableHead";
import { getData } from "./utils";
import TableRowComponent from "./tableRow";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
	},
	paper: {
		width: "100%",
		marginBottom: theme.spacing(2),
	},
	table: {
		minWidth: 300,
	},
	container: {
		//maxHeight: "80vh",
	},
	image: {
		width: 200,
		borderRadius: 5,
	},
	selectDropdown: { color: "#ffffff", backgroundColor: "#1b1f38" },
	menuItem: {
		"&:hover": {
			backgroundColor: "#3b3f58",
		},
	},
}));

export default function EnhancedTable({
	tableData,
	defaultOrderBy,
	TableName,
	defaultRowPerPage,
	defaultRowsPerPageOptions,
	pagination,
	rowPadding,
	stickyHeader,
	selectable,
	sorting,
	ignoreCell,
	onSearch,
	handleDeleteRow,
	selected,
	handleSelectAllClick,
	isSelected,
	handleClick,
	data,
	uniqueId,
	toogleSearch,
	search,
	onSave,
	updationFromRow,
	...props
}: any) {
	const classes = useStyles();
	const [order, setOrder] = React.useState("asc");
	const [orderBy, setOrderBy] = React.useState(defaultOrderBy);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(defaultRowPerPage);
	const [editable, setEditable] = React.useState("");
	
	const handleRequestSort = (event: any, property: any) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleChangePage = (event: any, newPage: any) => {
		//alert("hlo");
		console.log("page", newPage);
		props.setPageData(newPage);
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: any) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const clickHandle = (e: any, id: any) => {
		if (id) {
			setEditable(id);
		} else {
			setEditable("");
		}
	};

	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

	const renderRow = (row: any, index: any) => {
		const isItemSelected = isSelected(row[uniqueId]);
		const labelId = `enhanced-table-checkbox-${index}`;
		return (
			<TableRowComponent
				row={row}
				selectable={selectable}
				index={index}
				isItemSelected={isItemSelected}
				labelId={labelId}
				handleClick={handleClick}
				onIconClick={clickHandle}
				uniqueId={uniqueId}
				ignoreCell={ignoreCell}
				editable={editable}
				onSave={onSave}
				updationFromRow={updationFromRow}
				button={props.button}
				button1={props.button1}
			/>
		);
	};

	return (
		<>
			<div id="elloTable" className={classes.root}>
				<Paper className={classes.paper}>
					<EnhancedTableToolbar
						TableName={TableName}
						numSelected={selected.length}
						deleteRow={handleDeleteRow}
						onSearch={onSearch}
						toogleSearch={toogleSearch}
						search={search}
						{...props}
					/>
					<TableContainer className={classes.container}>
						<Table
							id="elloTable"
							className={classes.table}
							aria-labelledby="tableTitle"
							size={rowPadding ? "medium" : "small"}
							aria-label="enhanced table"
							stickyHeader={stickyHeader}
						>
							<EnhancedTableHead
								order={order}
								orderBy={orderBy}
								onSelectAllClick={handleSelectAllClick}
								onRequestSort={handleRequestSort}
								keys={
									tableData &&
									tableData.length > 0 &&
									Object.keys(tableData[0])
								}
								selectable={selectable}
								sorting={sorting}
								ignoreCell={ignoreCell}
								updationFromRow={updationFromRow}
							/>
							<TableBody>
								{console.log("")}
								{data &&
									getData(
										data,
										pagination,
										order,
										orderBy,
										page,
										rowsPerPage
									).map(renderRow)}
								{emptyRows > 0 && (
									<TableRow
										style={{
											height:
												(rowPadding ? 53 : 33) *
												emptyRows,
										}}
									>
										<TableCell colSpan={6} />
									</TableRow>
								)}
							</TableBody>
						</Table>
					</TableContainer>
					{pagination && (
						<TablePagination
							rowsPerPageOptions={defaultRowsPerPageOptions}
							component="div"
							count={props.count}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							onChangeRowsPerPage={handleChangeRowsPerPage}
							SelectProps={{
								MenuProps: {
									classes: { paper: classes.selectDropdown },
								},
							}}
							classes={{ menuItem: classes.menuItem }}
							//backIconButtonProps={{ disabled: true }}
							// backIconButtonProps={{
							// 	"aria-label": "Previous Page",
							// 	onClick: loadPreviousPage,
							// }}
							// nextIconButtonProps={{
							// 	"aria-label": "Next Page",
							// 	onClick: loadNextPage,
							// }}
						/>
					)}
				</Paper>
			</div>
		</>
	);
}
