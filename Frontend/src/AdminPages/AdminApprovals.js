// 
import React, { useState , useEffect} from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
  TablePagination,
  IconButton,
} from "@mui/material";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone"
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import PropTypes from "prop-types";





const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;


  

  const handleClick = (newPage) => {
    onPageChange(null, newPage);
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={() => handleClick(0)}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={() => handleClick(page - 1)}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={() => handleClick(page + 1)}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={() =>
          handleClick(Math.max(0, Math.ceil(count / rowsPerPage) - 1))
        }
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};



export default function AdminApprovals() {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  console.log(process.env.REACT_APP_BASE_URL);
  ///mycode
// const [status, setStatus] = useState("");
const [isApproved , setIsApproved] =useState("rejected")
const rows = [
  {
    sNo: 1,
    clientName: "LEAVE",
    projectLead: "17 Aug, 2020",
    project: "Diwali Holyday and Outing",
    stats: isApproved ,
  },
  {
    sNo: 2,
    clientName: "INVENTORY",
    projectLead: "08 Oct, 2020",
    project: "New Headphones required as old ones are not working",
    stats: isApproved ,
  },
  {
    sNo: 3,
    clientName: "TRAINING",
    projectLead: "27 Jun, 2020",
    project: "Request for react native Training",
    stats: isApproved ,
  },
  {
    sNo: 4,
    clientName: "LEAVE",
    projectLead: "27 Jun, 2020",
    project: "Brother’s Marriage ",
    stats: isApproved ,
  },
  {
    sNo: 5,
    clientName: "INVENTORY",
    projectLead: "23 Jul, 2020",
    project: "Replacement for old keyboard",
    stats: isApproved ,
  },
];
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;



    // chetan code
    async function fetchData(status) {

      setIsApproved("approved")
      // console.log(isApporved);
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_API_URI}/approval/admin/approval`,
          {
            emp_id: "AMEMP010",
            item: "sick leave", 
            foreign_id: "1138",
            status,
            request_type: "leave",
          }
        );
        console.log("ress",response);
  
        //   // Handle login error
      } catch (error) {
        console.log("Error data:", error);
        // setRes(error.response.data.errors[0]?.msg);
      }
      
    };
    
  return (
    <div>
      <Box
        sx={{
          borderRadius: "15px",
          border: "1px solid #0000004D",
          p: 1,
          margin: "10px",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            component="span"
            sx={{
              fontFamily: "Poppins",
              fontWeight: "600",
              color: "#00000099",
              margin: "12px 2px",
              fontSize: "1.1rem",
            }}
          >
            {" "}
            Approvals
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              sx={{ border: "1px solid black", borderRadius: "9px" }}
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Box>
        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#1B204A" }}>
                  <TableCell sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}>
                    S.No.{" "}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}
                  >
                    Request Type
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}
                  >
                    Date
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}
                  >
                    Subject
                  </TableCell>
                  <TableCell
                    align="left"
                    // onChange={(e) => setStatus(e.target.value)}
                    sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    align="left"
                    ///my code
                    
                    sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? rows.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : rows
                ).map((row) => (
                  <TableRow
                    key={row.sNo}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontFamily: "Open Sans" }}
                    >
                      {row.sNo}
                    </TableCell>
                    <TableCell align="left" sx={{ fontFamily: "Open Sans" }}>
                      {row.clientName}

                    </TableCell>
                    <TableCell align="left" sx={{ fontFamily: "Open Sans" }}>
                      {row.projectLead}
                    </TableCell>
                    <TableCell align="left" sx={{ fontFamily: "Open Sans" }}>
                      {row.project}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ fontFamily: "Open Sans", minwidth: "119px" }}
                    >
                      {row?.stats === "approved" && (
                        <>
                          <img src="Images/circle(1).svg" /> {row.stats}
                        </>
                      )}
                      {row?.stats === "Pending" && (
                        <>
                          <span
                            style={{
                              margin: "0px 1px",
                              display: "inline-block",
                              width: "14px",
                              height: "11px",
                              borderRadius: "50px",
                              backgroundColor: "rgb(255, 180, 94)",
                            }}
                          ></span>{" "}
                          {row.stats}
                        </>
                      )}
                      {row?.stats === "rejected" && (
                        <>
                          <img src="Images/circle.svg" /> {row.stats}
                        </>
                      )}
                    </TableCell>
                    <TableCell align="left" sx={{ minWidth: "104px" }}>
                      <FileDownloadDoneIcon 
                      onClick={()=>{fetchData("approved")}}
                       sx={{ color: "#b1bacb" }} />
                      <NotInterestedIcon onClick={()=>{fetchData("rejected")}} sx={{ color: "#b1bacb" }} />
                      <DeleteOutlineIcon sx={{ color: "#b1bacb" }} />
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter sx={{ boxShadow: "none" }}>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={6}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { "aria-label": "rows per page" },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </div>
  );
}


// 
// import React, { useState , useEffect} from "react";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TableFooter,
//   TablePagination,
//   IconButton,
// } from "@mui/material";
// import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone"
// import NotInterestedIcon from "@mui/icons-material/NotInterested";
// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import { useTheme } from "@mui/material/styles";
// import SearchIcon from "@mui/icons-material/Search";
// import { styled, alpha } from "@mui/material/styles";
// import InputBase from "@mui/material/InputBase";
// import FirstPageIcon from "@mui/icons-material/FirstPage";
// import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
// import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
// import LastPageIcon from "@mui/icons-material/LastPage";
// import PropTypes from "prop-types";





// const Search = styled("div")(({ theme }) => ({
//   position: "relative",
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   "&:hover": {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: "100%",
//   [theme.breakpoints.up("sm")]: {
//     marginLeft: theme.spacing(3),
//     width: "auto",
//   },
// }));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "inherit",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("md")]: {
//       width: "20ch",
//     },
//   },
// }));

// function TablePaginationActions(props) {
//   const theme = useTheme();
//   const { count, page, rowsPerPage, onPageChange } = props;


  

//   const handleClick = (newPage) => {
//     onPageChange(null, newPage);
//   };

//   return (
//     <Box sx={{ flexShrink: 0, ml: 2.5 }}>
//       <IconButton
//         onClick={() => handleClick(0)}
//         disabled={page === 0}
//         aria-label="first page"
//       >
//         {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
//       </IconButton>
//       <IconButton
//         onClick={() => handleClick(page - 1)}
//         disabled={page === 0}
//         aria-label="previous page"
//       >
//         {theme.direction === "rtl" ? (
//           <KeyboardArrowRight />
//         ) : (
//           <KeyboardArrowLeft />
//         )}
//       </IconButton>
//       <IconButton
//         onClick={() => handleClick(page + 1)}
//         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//         aria-label="next page"
//       >
//         {theme.direction === "rtl" ? (
//           <KeyboardArrowLeft />
//         ) : (
//           <KeyboardArrowRight />
//         )}
//       </IconButton>
//       <IconButton
//         onClick={() =>
//           handleClick(Math.max(0, Math.ceil(count / rowsPerPage) - 1))
//         }
//         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//         aria-label="last page"
//       >
//         {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
//       </IconButton>
//     </Box>
//   );
// }

// TablePaginationActions.propTypes = {
//   count: PropTypes.number.isRequired,
//   onPageChange: PropTypes.func.isRequired,
//   page: PropTypes.number.isRequired,
//   rowsPerPage: PropTypes.number.isRequired,
// };



// export default function AdminApprovals() {

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   console.log(process.env.REACT_APP_BASE_URL);
//   ///mycode
// // const [status, setStatus] = useState("");
// const [isApproved , setIsApproved] =useState("rejected")
// const rows = [
//   {
//     sNo: 1,
//     clientName: "LEAVE",
//     projectLead: "17 Aug, 2020",
//     project: "Diwali Holyday and Outing",
//     stats: isApproved ,
//   },
//   {
//     sNo: 2,
//     clientName: "INVENTORY",
//     projectLead: "08 Oct, 2020",
//     project: "New Headphones required as old ones are not working",
//     stats: isApproved ,
//   },
//   {
//     sNo: 3,
//     clientName: "TRAINING",
//     projectLead: "27 Jun, 2020",
//     project: "Request for react native Training",
//     stats: isApproved ,
//   },
//   {
//     sNo: 4,
//     clientName: "LEAVE",
//     projectLead: "27 Jun, 2020",
//     project: "Brother’s Marriage ",
//     stats: isApproved ,
//   },
//   {
//     sNo: 5,
//     clientName: "INVENTORY",
//     projectLead: "23 Jul, 2020",
//     project: "Replacement for old keyboard",
//     stats: isApproved ,
//   },
// ];
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const emptyRows =
//     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;



//     // chetan code
//     async function fetchData(status) {

//       setIsApproved("approved")
//       // setIsApproved(!isApproved)

//       // console.log(isApporved);
//       try {
//         const response = await axios.put(
//          "http://localhost:4000/api/v1/approval/admin/approval",
//           {
//             emp_id: "AMEMP010",
//             item: "sick leave", 
//             foreign_id: "1138",
//             status,
//             request_type: "leave",
//           }
//         );
//         console.log("ress",response);
  
//         //   // Handle login error
//       } catch (error) {
//         console.log("Error data:", error);
//         // setRes(error.response.data.errors[0]?.msg);
//       }
      
//     };

    
//     async function rejectData(status) {

//       setIsApproved("rejected")
//       // setIsApproved(!isApproved)

//       // console.log(isApporved);
//       try {
//         const response = await axios.put(
//          "http://localhost:4000/api/v1/approval/admin/approval",
//           {
//             emp_id: "AMEMP010",
//             item: "sick leave", 
//             foreign_id: "1138",
//             status,
//             request_type: "leave",
//           }
//         );
//         console.log("ress",response);
  
//         //   // Handle login error
//       } catch (error) {
//         console.log("Error data:", error);
//         // setRes(error.response.data.errors[0]?.msg);
//       }
      
//     };

//     async function deleteData(status) {

//       setIsApproved("rejected")
//       // setIsApproved(!isApproved)

//       // console.log(isApporved);
//       try {
//         const response = await axios.put(
//          "http://localhost:4000/api/v1/approval/admin/approval",
//           {
//             emp_id: "AMEMP010",
//             item: "sick leave", 
//             foreign_id: "1138",
//             status,
//             request_type: "leave",
//           }
//         );
//         console.log("ress",response);
  
//         //   // Handle login error
//       } catch (error) {
//         console.log("Error data:", error);
//         // setRes(error.response.data.errors[0]?.msg);
//       }
      
//     };
    
//   return (
//     <div>
//       <Box
//         sx={{
//           borderRadius: "15px",
//           border: "1px solid #0000004D",
//           p: 1,
//           margin: "10px",
//         }}
//       >
//         <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//           <Typography
//             component="span"
//             sx={{
//               fontFamily: "Poppins",
//               fontWeight: "600",
//               color: "#00000099",
//               margin: "12px 2px",
//               fontSize: "1.1rem",
//             }}
//           >
//             {" "}
//             Approvals
//           </Typography>
//           <Search>
//             <SearchIconWrapper>
//               <SearchIcon />
//             </SearchIconWrapper>
//             <StyledInputBase
//               placeholder="Search…"
//               sx={{ border: "1px solid black", borderRadius: "9px" }}
//               inputProps={{ "aria-label": "search" }}
//             />
//           </Search>
//         </Box>
//         <Box>
//           <TableContainer component={Paper}>
//             <Table sx={{ minWidth: 650 }} aria-label="simple table">
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: "#1B204A" }}>
//                   <TableCell sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}>
//                     S.No.{" "}
//                   </TableCell>
//                   <TableCell
//                     align="left"
//                     sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}
//                   >
//                     Request Type
//                   </TableCell>
//                   <TableCell
//                     align="left"
//                     sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}
//                   >
//                     Date
//                   </TableCell>
//                   <TableCell
//                     align="left"
//                     sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}
//                   >
//                     Subject
//                   </TableCell>
//                   <TableCell
//                     align="left"
//                     // onChange={(e) => setStatus(e.target.value)}
//                     sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}
//                   >
//                     Status
//                   </TableCell>
//                   <TableCell
//                     align="left"
//                     ///my code
                    
//                     sx={{ color: "#FFFFFF", fontFamily: "Prompt" }}
//                   >
//                     Action
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {(rowsPerPage > 0
//                   ? rows.slice(
//                       page * rowsPerPage,
//                       page * rowsPerPage + rowsPerPage
//                     )
//                   : rows
//                 ).map((row) => (
//                   <TableRow
//                     key={row.sNo}
//                     sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                   >
//                     <TableCell
//                       component="th"
//                       scope="row"
//                       sx={{ fontFamily: "Open Sans" }}
//                     >
//                       {row.sNo}
//                     </TableCell>
//                     <TableCell align="left" sx={{ fontFamily: "Open Sans" }}>
//                       {row.clientName}

//                     </TableCell>
//                     <TableCell align="left" sx={{ fontFamily: "Open Sans" }}>
//                       {row.projectLead}
//                     </TableCell>
//                     <TableCell align="left" sx={{ fontFamily: "Open Sans" }}>
//                       {row.project}
//                     </TableCell>
//                     <TableCell
//                       align="left"
//                       sx={{ fontFamily: "Open Sans", minwidth: "119px" }}
//                     >
//                       {row?.stats === "approved" && (
//                         <>
//                           <img src="Images/circle(1).svg" /> {row.stats}
//                         </>
//                       )}
//                       {row?.stats === "Pending" && (
//                         <>
//                           <span
//                             style={{
//                               margin: "0px 1px",
//                               display: "inline-block",
//                               width: "14px",
//                               height: "11px",
//                               borderRadius: "50px",
//                               backgroundColor: "rgb(255, 180, 94)",
//                             }}
//                           ></span>{" "}
//                           {row.stats}
//                         </>
//                       )}
//                       {row?.stats === "rejected" && (
//                         <>
//                           <img src="Images/circle.svg" /> {row.stats}
//                         </>
//                       )}
//                     </TableCell>
//                     <TableCell align="left" sx={{ minWidth: "104px" }}>
//                       <FileDownloadDoneIcon 
//                       onClick={()=>{fetchData("approved")}}
//                        sx={{ color: "#b1bacb" }} />
//                       <NotInterestedIcon onClick={()=>{rejectData("rejected")}} sx={{ color: "#b1bacb" }} />
//                       <DeleteOutlineIcon onClick={()=>{deleteData("deleted")}} sx={{ color: "#b1bacb" }} />
//                     </TableCell>
//                   </TableRow>
//                 ))}
//                 {emptyRows > 0 && (
//                   <TableRow style={{ height: 53 * emptyRows }}>
//                     <TableCell colSpan={6} />
//                   </TableRow>
//                 )}
//               </TableBody>
//               <TableFooter sx={{ boxShadow: "none" }}>
//                 <TableRow>
//                   <TablePagination
//                     rowsPerPageOptions={[
//                       5,
//                       10,
//                       25,
//                       { label: "All", value: -1 },
//                     ]}
//                     colSpan={6}
//                     count={rows.length}
//                     rowsPerPage={rowsPerPage}
//                     page={page}
//                     SelectProps={{
//                       inputProps: { "aria-label": "rows per page" },
//                       native: true,
//                     }}
//                     onPageChange={handleChangePage}
//                     onRowsPerPageChange={handleChangeRowsPerPage}
//                     ActionsComponent={TablePaginationActions}
//                   />
//                 </TableRow>
//               </TableFooter>
//             </Table>
//           </TableContainer>
//         </Box>
//       </Box>
//     </div>
//   );
// }

