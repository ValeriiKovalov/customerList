import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

interface Iprops {
    customers: any[];
    deleteCustomerHandler: any;
}

interface IProjects {
    name: string;
    contact: string;
    start_date: Date;
    end_date: Date;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function CustomersTable(props: Iprops) {
    const { customers, deleteCustomerHandler } = props;

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="right">Company</StyledTableCell>
                        <StyledTableCell align="right">Industry</StyledTableCell>
                        <StyledTableCell align="right">About</StyledTableCell>
                        <StyledTableCell align="right">IsActive</StyledTableCell>
                        <StyledTableCell align="right">Projects</StyledTableCell>
                        <StyledTableCell align="right">Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {customers.map((customer) => (
                        <StyledTableRow
                            key={customer._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <StyledTableCell component="th" scope="row">{customer.company}</StyledTableCell>
                            <StyledTableCell align="right">{customer.industry}</StyledTableCell>
                            <StyledTableCell align="right">{customer.about}</StyledTableCell>
                            <StyledTableCell align="right">{customer.isActive ? 'Active' : 'Not Active'}</StyledTableCell>
                            <StyledTableCell align="right">{customer.projects.map((v: IProjects) => v.name).join(', ')}</StyledTableCell>
                            <StyledTableCell align="right">
                                <ButtonGroup disableElevation
                                             variant="contained"
                                             aria-label="Disabled elevation buttons"
                                             size="small"
                                >
                                    <Button component={Link} to={`edit/${customer._id}`} color="secondary">Edit Customer</Button>
                                    <Button onClick={() => deleteCustomerHandler(customer._id)} color="error">Delete Customer</Button>
                                </ButtonGroup>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
