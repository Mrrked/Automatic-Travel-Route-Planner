import { Table, TableBody, TableCell, TableRow, TableContainer, Paper, Typography } from "@material-ui/core"
import { MainContext } from "providers/Main"
import { useContext } from "react"

export default function MatrixTable({ variant="distance" }){
    const { validLocations, matrix } = useContext(MainContext)
    return <>
        <Typography style={{ marginBottom: 5 }}>
            <strong>Unit:</strong> {variant === "distance" ? "meters" : variant === "duration" ? "seconds" : null}
        </Typography>
        <TableContainer component={Paper} variant="outlined">
            <Table size="small">
                <TableBody>
                    <TableRow>
                        <TableCell></TableCell>
                        {validLocations.map((loc, index) => 
                        <TableCell key={index} variant="head">
                            {index}
                        </TableCell>
                        )}
                    </TableRow>
                    {matrix.map((row, index) => 
                    <TableRow key={index}>
                        <TableCell key={index} variant="head">
                            {index}
                        </TableCell>
                        {row.map((data, index) =>
                        <TableCell key={index}>
                            {data[variant]}
                        </TableCell>
                        )}
                    </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    </>
}