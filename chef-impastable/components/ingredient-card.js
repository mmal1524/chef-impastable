import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';

function displayIngredient(ingredient) {
    return (
    <TableRow
        key={"ingredient"}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
        <TableCell component="th" scope="row">
            {ingredient}
        </TableCell>
        <TableCell align="right">{<TextField size="small" id="outlined-basic" label="Add Quantity" variant="outlined"  />}</TableCell>
        <TableCell align="right">{<TextField size="small" id="outlined-basic" label="Add Unit" variant="outlined"  />}</TableCell>
    </TableRow>
    )
}