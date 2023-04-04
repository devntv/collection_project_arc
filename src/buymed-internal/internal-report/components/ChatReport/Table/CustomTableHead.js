import { TableCell, TableHead, TableRow, TableSortLabel } from "@material-ui/core";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const CustomTableHead = (props) => {
    const { columns, order, orderBy, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {columns.map((headCell) => (
                    (headCell.hasSort ?
                        <TableCell
                            key={headCell.id}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                                IconComponent={ArrowDropDownIcon}
                                sx={{
                                    textTransform: "uppercase",
                                    fontWeight: 600,
                                    textAlign: `${headCell.align}`
                                }}
                            >
                                {headCell.label}
                            </TableSortLabel>
                        </TableCell> :
                        <TableCell key={headCell.id}
                            sx={{
                                textTransform: "uppercase",
                                fontWeight: 600,
                                textAlign: `${headCell.align}`
                            }}>
                            {headCell.label}
                        </TableCell>
                    )
                ))}
            </TableRow>
        </TableHead>
    );
}

export default CustomTableHead;