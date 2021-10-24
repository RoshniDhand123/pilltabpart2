import useStyles from "./styles";

interface EnhancedTableToolbarProps {
    numSelected: number;
    title: any;
    children?: React.ReactChild;
    onDelete: (sts: boolean) => void;
}

interface HeadCell {
    name: string;
    label: string;
    width:string;
}

type Order = 'asc' | 'desc';


interface Data {
    name: string;
    airports: number;
    img: string;
    action?: ActionPara[];
    status?: boolean;
}
type ActionPara = {
    name: string;
    action: () => void
}
interface TableProps {
    total?: number;
    title: any;
    headers: HeadCell[];
    data: any;
    children?: React.ReactChild;
    onDelete?: (id: string[]) => void;
    onSearch?: (value: string) => Promise<{ [x: string]: any }[]>;
    onCancelSearch?: () => { [x: string]: any }[];
    onPageChange?: (perPage: number, page: number) => Promise<{ [x: string]: any }[]>;
    page?: number;
    perPage?: number;
}
interface EnhancedTableProps {
    classes: ReturnType<typeof useStyles>;
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
    headers: HeadCell[];
    isDelete: boolean;
}
export type {
    EnhancedTableToolbarProps,
    HeadCell,
    Order,
    Data,
    TableProps,
    EnhancedTableProps,
    ActionPara
}


