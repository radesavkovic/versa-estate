// import CardContent from "@mui/material/CardContent";
// import Card from "@mui/material/Card";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import { styled } from "@mui/system";
// import logo_apartment from "../../assets/1-Apartment.png";
// import logo_house from "../../assets/2-House.png";
// import logo_building from "../../assets/3-Building.png";
// import logo_villa from "../../assets/4-Villa.png";

// import { useContractContext } from "../../providers/ContractProvider";
// import { useAuthContext } from "../../providers/AuthProvider";
// import { useEffect, useState } from "react";


// const CardWrapper = styled(Card)(({ theme }) => ({
//   background: theme.palette.text.darkBgColor,
//   marginBottom: "24px"
// }));

// export default function Modules(props) {
//   const {
//     contract,
//     wrongNetwork,
//     fromWei,
//     web3
//   } = useContractContext();
//   const { address, chainId } = useAuthContext();

//   const [loading, setLoading] = useState(false);

//   return (
//     <>
//     <Typography variant="h5" color="white" style={{textAlign: "center"}} gutterBottom>
//       Renting Modules
//     </Typography>
    
//     <CardWrapper>
//       <CardContent sx={{ px: 5, py: 3}} style={{display: "flex"}}>
//           <img src={logo_apartment} alt="" height="100px" />
//           <Box component="div" sx={{width: "100%", ml: 3}}>
//             <Typography variant="body1" sx={{ fontWeight: "500" }}>
//               Apartment
//             </Typography>
//             <Grid
//               container
//               alignItems="center"
//               justifyContent="space-between"
//               style={{marginBottom: "10px"}}
//             >
//               <Typography variant="caption" color="text.textLight">
//                 {`Price: ${150} USDC`}
//               </Typography>
//               <Button
//                 variant="outlined"
//                 style={{height: "30px"}}
//                 // disabled={wrongNetwork || !address || loading || countdown.alive}
//                 onClick={"#"}
//               >
//                 INVEST
//               </Button>
//             </Grid>

//             <Grid
//               container
//               alignItems="center"
//               justifyContent="space-between"
//             >
//               <Typography variant="caption" color="text.textLight">
//                 {`Earn ${0.15}% Daily`}
//               </Typography>
//               <Button
//                 variant="outlined"
//                 style={{height: "30px"}}
//                 // disabled={wrongNetwork || !address || loading || countdown.alive}
//                 onClick={"#"}
//               >
//                 COMPOUND
//               </Button>
//             </Grid>
//           </Box>
//       </CardContent>
//     </CardWrapper>

//     <CardWrapper>
//       <CardContent sx={{ px: 5, py: 3}} style={{display: "flex"}}>
//           <img src={logo_house} alt="" height="100px" />
//           <Box component="div" sx={{width: "100%", ml: 3}}>
//             <Typography variant="body1" sx={{ fontWeight: "500" }}>
//               House
//             </Typography>
//             <Grid
//               container
//               alignItems="center"
//               justifyContent="space-between"
//               style={{marginBottom: "10px"}}
//             >
//               <Typography variant="caption" color="text.textLight">
//                 {`Price: ${500} USDC`}
//               </Typography>
//               <Button
//                 variant="outlined"
//                 style={{height: "30px"}}
//                 // disabled={wrongNetwork || !address || loading || countdown.alive}
//                 onClick={"#"}
//               >
//                 INVEST
//               </Button>
//             </Grid>

//             <Grid
//               container
//               alignItems="center"
//               justifyContent="space-between"
//             >
//               <Typography variant="caption" color="text.textLight">
//                 {`Earn ${0.75}% Daily`}
//               </Typography>
//               <Button
//                 variant="outlined"
//                 style={{height: "30px"}}
//                 // disabled={wrongNetwork || !address || loading || countdown.alive}
//                 onClick={"#"}
//               >
//                 COMPOUND
//               </Button>
//             </Grid>
//           </Box>
//       </CardContent>
//     </CardWrapper>

//     <CardWrapper>
//       <CardContent sx={{ px: 5, py: 3}} style={{display: "flex"}}>
//           <img src={logo_building} alt="" height="100px"/>
//           <Box component="div" sx={{width: "100%", ml: 3}}>
//             <Typography variant="body1" sx={{ fontWeight: "500" }}>
//               Building
//             </Typography>
//             <Grid
//               container
//               alignItems="center"
//               justifyContent="space-between"
//               style={{marginBottom: "10px"}}
//             >
//               <Typography variant="caption" color="text.textLight">
//                 {`Price: ${750} USDC`}
//               </Typography>
//               <Button
//                 variant="outlined"
//                 style={{height: "30px"}}
//                 // disabled={wrongNetwork || !address || loading || countdown.alive}
//                 onClick={"#"}
//               >
//                 INVEST
//               </Button>
//             </Grid>

//             <Grid
//               container
//               alignItems="center"
//               justifyContent="space-between"
//             >
//               <Typography variant="caption" color="text.textLight">
//                 {`Earn ${1}% Daily`}
//               </Typography>
//               <Button
//                 variant="outlined"
//                 style={{height: "30px"}}
//                 // disabled={wrongNetwork || !address || loading || countdown.alive}
//                 onClick={"#"}
//               >
//                 COMPOUND
//               </Button>
//             </Grid>
//           </Box>
//       </CardContent>
//     </CardWrapper>

//     <CardWrapper style={{marginBottom: "60px"}}>
//       <CardContent sx={{ px: 5, py: 3}} style={{display: "flex"}}>
//           <img src={logo_villa} alt="" height="100px" />
//           <Box component="div" sx={{width: "100%", ml: 3}}>
//             <Typography variant="body1" sx={{ fontWeight: "500" }}>
//               Villa
//             </Typography>
//             <Grid
//               container
//               alignItems="center"
//               justifyContent="space-between"
//               style={{marginBottom: "10px"}}
//             >
//               <Typography variant="caption" color="text.textLight">
//                 {`Price: ${1000} USDC`}
//               </Typography>
//               <Button
//                 variant="outlined"
//                 style={{height: "30px"}}
//                 // disabled={wrongNetwork || !address || loading || countdown.alive}
//                 onClick={"#"}
//               >
//                 INVEST
//               </Button>
//             </Grid>

//             <Grid
//               container
//               alignItems="center"
//               justifyContent="space-between"
//             >
//               <Typography variant="caption" color="text.textLight">
//                 {`Earn ${1.05}% Daily`}
//               </Typography>
//               <Button
//                 variant="outlined"
//                 style={{height: "30px"}}
//                 // disabled={wrongNetwork || !address || loading || countdown.alive}
//                 onClick={"#"}
//               >
//                 COMPOUND
//               </Button>
//             </Grid>
//           </Box>
//       </CardContent>
//     </CardWrapper>
//     </>
//   );
// }
