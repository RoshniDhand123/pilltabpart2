const descendingComparator = (a:any, b:any, orderBy:any) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order:any, orderBy:any) => {
  return order === "desc"
    ? (a:any, b:any) => descendingComparator(a, b, orderBy)
    : (a:any, b:any) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array:any, comparator:any) => {
  const stabilizedThis = array.map((el:any, index:any) => [el, index]);
  stabilizedThis.sort((a:any, b:any) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el:any) => el[0]);
};

const getData = (data:any, pagination:any, order:any, orderBy:any, page:any, rowsPerPage:any) => {
  let sortedData = stableSort(data, getComparator(order, orderBy));
  if (pagination) {
    return sortedData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  } else {
    return sortedData;
  }
};

const createField = (data:any, ignoreCell:any) => {
  let fields:any = [];
  data &&
    Object.keys(data).map((key) => {
      if (!ignoreCell.includes(key)) {
        let obj = {
          name: key,
          placeholder: key,
          type: typeof data[key],
          required: true,
          label: key,
        };
        fields.push(obj);
      }
    });
  return fields;
};

const createInitialValues = (data:any, ignoreCell:any, update:any) => {
  let initialValues:any = {};
  data &&
    Object.keys(data).map((key) => {
      if (!ignoreCell.includes(key)) {
        initialValues[key] = update ? data[key] : "";
      }
    });
  return initialValues;
};

export { getData, createField, createInitialValues };
