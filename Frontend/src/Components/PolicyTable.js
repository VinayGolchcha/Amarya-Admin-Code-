import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";

export default function PolicyTable({ tableHeaders, tableContent }) {
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          margin: "20px 0px",
          width: { lg: "64%", md: "75%", sm: "100%", xs: "100%" },
        }}
      >
        <Table>
          <TableHead>
            <TableRow style={{ fontFamily: "Poppins" }}>
              {tableHeaders.map((item, i) => (
                <TableCell
                  style={{
                    backgroundColor: "rgb(142, 141, 138)",
                    color: "#ffffff",
                    fontFamily: "Poppins",
                    minWidth: "104px",
                    height: "40px",
                  }}
                  key={i}
                >
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableContent?.map((row, i) => (
              <TableRow key={i}>
                <TableCell style={{ fontFamily: "Poppins" }}>
                  {row?.dates ? row?.dates : row?.firstQuarter}
                </TableCell>
                <TableCell style={{ fontFamily: "Poppins" }}>
                  {row?.day ? row?.dates : row?.secondQuarter}
                </TableCell>
                <TableCell style={{ fontFamily: "Poppins" }}>
                  {row?.occation ? row?.dates : row?.thirdQuarter}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
