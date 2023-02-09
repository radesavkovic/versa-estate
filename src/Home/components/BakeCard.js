import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import Web3 from "web3";
import { useContractContext } from "../../providers/ContractProvider";
import { useAuthContext } from "../../providers/AuthProvider";
import { useEffect, useState } from "react";
import { config } from "../../config";

import { styled } from "@mui/system";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";

import logo_apartment from "../../assets/1-Apartment.png";
import logo_house from "../../assets/2-House.png";
import logo_building from "../../assets/3-Building.png";
import logo_villa from "../../assets/4-Villa.png";


const CardWrapper = styled(Card)(({ theme }) => ({
  background: theme.palette.text.darkBgColor,
  marginBottom: "24px"
}));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function BakeCard() {
  const {
    usdccontract,
    contract,
    wrongNetwork,
    getUsdcBalance,
    fromWei,
    getUsdcApproved,
    web3
  } = useContractContext();
  const { address, chainId } = useAuthContext();

  const [loading, setLoading] = useState(false);

  const [contractData, setContractData] = useState({
    contractBalance: 0,
    treasuryBalance: 0,
    totalModules: 0
  });

  const [moduleCount, setModuleCount] = useState([0, 0, 0, 0]);

  const fetchContractData = async () => {
    if (!web3 || wrongNetwork) {
      setContractData({
        contractBalance: 0,
        treasuryBalance: 0,
        totalModules: 0
      });
      return;
    }
    try {
      const [contractAmount, treasuryAmount, modulesCount] =
        await Promise.all([
          getUsdcBalance(config.contractAddress),
          getUsdcBalance(config.treasuryAddress),
          contract.methods
            .getModuleCount()
            .call()
        ]);
      setContractData({
        contractBalance: fromWei(`${contractAmount}`),
        treasuryBalance: fromWei(`${treasuryAmount}`),
        totalModules: modulesCount
      });
    } catch (err) {
      console.error(err);
      setContractData({
        contractBalance: 0,
        treasuryBalance: 0,
        totalModules: 0
      });
    }
  };

  const [userData, setUserData] = useState({
    usdc: 0,
    rewards: 0,
    modules: [],
    approved: 0
  });

  const fetchUserData = async () => {
    if (!web3 || wrongNetwork || !address) {
      setUserData({
        usdc: 0,
        rewards: 0,
        modules: [],
        approved: 0
      });
      return;
    }

    try {
      const [usdcAmount, rewardAmount, moduleData, approvedAmount] =
        await Promise.all([
          getUsdcBalance(address),
          contract.methods
            .getRewards(address)
            .call(),
          contract.methods
            .getUserModules(address)
            .call(),
          getUsdcApproved(address)
        ]);

      const moduleArray = [];
      for (let i = 0; i < 4; i++) {
        moduleArray.push(0);
      }

      for (let index = 0; index < moduleData.length; index++) {
        moduleArray[parseInt(moduleData[index].moduleIndex)] = Number(moduleArray[parseInt(moduleData[index].moduleIndex)]) + 1;
      }
      
      setModuleCount(moduleArray);

      console.log("MODULES", moduleArray);

      setUserData({
        usdc: fromWei(`${usdcAmount}`),
        rewards: fromWei(`${rewardAmount}`),
        moduleData: moduleData,
        approved: approvedAmount
      });
    } catch (err) {
      console.error(err);
      setUserData({
        usdc: 0,
        rewards: 0,
        modules: [],
        approved: 0
      });
    }
  };

  useEffect(() => {
    fetchContractData();
  }, [web3, chainId]);

  useEffect(() => {
    fetchUserData();
  }, [address, web3, chainId]);

  const query = useQuery();

  const getRef = () => {
    const ref = Web3.utils.isAddress(query.get("ref"))
      ? query.get("ref")
      : "0x9dda759C79d073509D020d74F084C5D2bd080000";
    return ref;
  };

  const invest = async (index) => {
    setLoading(true);

    try {
      if (+userData.approved === 0) {
        const lcontract = "0x706CC7F1f641d92190783eA19388DA83d7D84415";
        await usdccontract.methods
          .approve(lcontract, "1000000000000000000000000000000")
          .send({
            from: address
          });
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      return;
    }

    let ref = getRef();
    if (index > 0) {
      ref = "0x7f4F16423D04D47B023934a03390F96FdCb29fAE";
    }

    try {
      await contract.methods.invest(ref, index).send({
        from: address,
        value: 0
      });
    } catch (err) {
      console.error(err);
    }
    fetchContractData();
    fetchUserData();
    setLoading(false);
  };

  const compound = async (index) => {
    setLoading(true);

    const ref = "0x9dda759C79d073509D020d74F084C5D2bd080000";

    try {
      await contract.methods.compound(ref, index).send({
        from: address
      });
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const collect = async () => {
    setLoading(true);

    try {
      await contract.methods.collect().send({
        from: address
      });
    } catch (err) {
      console.error(err);
    }
    fetchContractData();
    fetchUserData();
    setLoading(false);
  };

  return (
    <>
      <Box component="div" sx={{ width: "100%" }}>
        <Grid container spacing={1} sx={{ width: "100%", mx: "18px"}}>
          <Grid item sm={6} xs={12}>
            <Box component="div" sx={{ mb: "18px" }}>
              <Typography variant="body1" sx={{ fontWeight: "500" }}>
                Contract:
              </Typography>
              <Typography variant="caption" color="text.textLight">
                {`${contractData.contractBalance} USDC`}
              </Typography>
            </Box>
            <Box component="div" sx={{ mb: "18px" }}>
              <Typography variant="body1" sx={{ fontWeight: "500" }}>
                Wallet:
              </Typography>
              <Typography variant="caption" color="text.textLight">
                {`${userData.usdc} USDC`}
              </Typography>
            </Box>
            <Box component="div" sx={{ mb: "18px" }}>
              <Typography variant="body1" sx={{ fontWeight: "500" }}>
                My Profits:
              </Typography>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                // justifyContent="start"
              >
                <Typography variant="caption" color="text.textLight">
                  {`${userData.rewards} USDC`}
                </Typography>
                <Button
                  variant="outlined"
                  style={{marginRight: "24px", height: "30px"}}
                  disabled={wrongNetwork || !address || loading}
                  onClick={collect}
                >
                  COLLECT
                </Button>
              </Grid>
            </Box>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Box component="div" sx={{ mb: "18px" }}>
              <Typography variant="body1" sx={{ fontWeight: "500" }}>
                Total Renting Modules:
              </Typography>
              <Typography variant="caption" color="text.textLight">
                {`${contractData.totalModules}`}
              </Typography>
            </Box>
            <Box component="div" sx={{ mb: "18px" }}>
              <Typography variant="body1" sx={{ fontWeight: "500" }}>
                Treasury:
              </Typography>
              <Typography variant="caption" color="text.textLight">
                {`${contractData.treasuryBalance} USDC`}
              </Typography>
            </Box>
          </Grid>
          <Grid item sm={12} xs={12}>
            <Box component="div" sx={{ mb: "48px" }}>
                <Typography variant="body1" sx={{ fontWeight: "500" }}>
                  My Renting Modules:
                </Typography>
                <Typography variant="caption" color="text.textLight">
                  {/* {`${userData.modules} USDC`} */}
                  {`${moduleCount[0]} Apartment(s) - ${moduleCount[1]} House(s) - ${moduleCount[2]} Building(s) - ${moduleCount[3]} Villa(s)`}
                </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>



      {/* ======================RENTING MODULES========================== */}

      <Typography variant="h5" color="white" style={{textAlign: "center"}} gutterBottom>
        Renting Modules
      </Typography>
      
      <CardWrapper>
        <CardContent sx={{ px: 5, py: 3}} style={{display: "flex"}}>
            <img src={logo_apartment} alt="" height="100px" />
            <Box component="div" sx={{width: "100%", ml: 3}}>
              <Typography variant="body1" sx={{ fontWeight: "500" }}>
                Apartment
              </Typography>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                style={{marginBottom: "10px"}}
              >
                <Typography variant="caption" color="text.textLight">
                  {`Price: ${150} USDC`}
                </Typography>
                <Button
                  variant="outlined"
                  style={{height: "30px"}}
                  disabled={wrongNetwork || !address || loading}
                  onClick={() => invest(0)}
                >
                  INVEST
                </Button>
              </Grid>

              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="caption" color="text.textLight">
                  {`Earn ${0.45}% Daily`}
                </Typography>
                <Button
                  variant="outlined"
                  style={{height: "30px"}}
                  disabled={wrongNetwork || !address || loading}
                  onClick={() => compound(0)}
                >
                  COMPOUND
                </Button>
              </Grid>
            </Box>
        </CardContent>
      </CardWrapper>

      <CardWrapper>
        <CardContent sx={{ px: 5, py: 3}} style={{display: "flex"}}>
            <img src={logo_house} alt="" height="100px" />
            <Box component="div" sx={{width: "100%", ml: 3}}>
              <Typography variant="body1" sx={{ fontWeight: "500" }}>
                House
              </Typography>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                style={{marginBottom: "10px"}}
              >
                <Typography variant="caption" color="text.textLight">
                  {`Price: ${500} USDC`}
                </Typography>
                <Button
                  variant="outlined"
                  style={{height: "30px"}}
                  disabled={wrongNetwork || !address || loading}
                  onClick={() => invest(1)}
                >
                  INVEST
                </Button>
              </Grid>

              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="caption" color="text.textLight">
                  {`Earn ${0.65}% Daily`}
                </Typography>
                <Button
                  variant="outlined"
                  style={{height: "30px"}}
                  disabled={wrongNetwork || !address || loading}
                  onClick={() => compound(1)}
                >
                  COMPOUND
                </Button>
              </Grid>
            </Box>
        </CardContent>
      </CardWrapper>

      <CardWrapper>
        <CardContent sx={{ px: 5, py: 3}} style={{display: "flex"}}>
            <img src={logo_building} alt="" height="100px"/>
            <Box component="div" sx={{width: "100%", ml: 3}}>
              <Typography variant="body1" sx={{ fontWeight: "500" }}>
                Building
              </Typography>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                style={{marginBottom: "10px"}}
              >
                <Typography variant="caption" color="text.textLight">
                  {`Price: ${750} USDC`}
                </Typography>
                <Button
                  variant="outlined"
                  style={{height: "30px"}}
                  disabled={wrongNetwork || !address || loading}
                  onClick={() => invest(2)}
                >
                  INVEST
                </Button>
              </Grid>

              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="caption" color="text.textLight">
                  {`Earn ${"0.75"}% Daily`}
                </Typography>
                <Button
                  variant="outlined"
                  style={{height: "30px"}}
                  disabled={wrongNetwork || !address || loading}
                  onClick={() => compound(2)}
                >
                  COMPOUND
                </Button>
              </Grid>
            </Box>
        </CardContent>
      </CardWrapper>

      <CardWrapper style={{marginBottom: "60px"}}>
        <CardContent sx={{ px: 5, py: 3}} style={{display: "flex"}}>
            <img src={logo_villa} alt="" height="100px" />
            <Box component="div" sx={{width: "100%", ml: 3}}>
              <Typography variant="body1" sx={{ fontWeight: "500" }}>
                Villa
              </Typography>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                style={{marginBottom: "10px"}}
              >
                <Typography variant="caption" color="text.textLight">
                  {`Price: ${1000} USDC`}
                </Typography>
                <Button
                  variant="outlined"
                  style={{height: "30px"}}
                  disabled={wrongNetwork || !address || loading}
                  onClick={() => invest(3)}
                >
                  INVEST
                </Button>
              </Grid>

              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="caption" color="text.textLight">
                  {`Earn ${"1.00"}% Daily`}
                </Typography>
                <Button
                  variant="outlined"
                  style={{height: "30px"}}
                  disabled={wrongNetwork || !address || loading}
                  onClick={() => compound(3)}
                >
                  COMPOUND
                </Button>
              </Grid>
            </Box>
        </CardContent>
      </CardWrapper>
    </>
  );
}
