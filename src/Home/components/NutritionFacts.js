import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import ReferralLink from "./ReferralLink";

import { useContractContext } from "../../providers/ContractProvider";
import { useAuthContext } from "../../providers/AuthProvider";
import { useEffect, useState } from "react";


const CardWrapper = styled(Card)(({ theme }) => ({
  background: theme.palette.text.darkBgColor,
}));

export default function NutritionFacts(props) {
  const {
    contract,
    wrongNetwork,
    fromWei,
    web3
  } = useContractContext();
  const { address, chainId } = useAuthContext();
  const [referralData, setReferralData] = useState({
    refCount: 0,
    reward: 0
  });
  const [loading, setLoading] = useState(false);

  const fetchReferralData = async () => {
    if (!web3 || wrongNetwork || !address) {
      setReferralData({
        refCount: 0,
        reward: 0,
      });
      return;
    }

    try {
      const [referralCount, rewardAmount] =
        await Promise.all([
          contract.methods
            .getUserReferralCount(address)
            .call()
            .catch((err) => {
              console.error("refCount", err);
              return 0;
            }),
          contract.methods
            .getUserReferralBonus(address)
            .call()
            .catch((err) => {
              console.error("refReward", err);
              return 0;
            }),
        ]);
      setReferralData({
        refCount: referralCount,
        reward: fromWei(`${rewardAmount}`)
      });
    } catch (err) {
      console.error(err);
      setReferralData({
        refCount: 0,
        reward: 0
      });
    }
  };

  useEffect(() => {
    fetchReferralData();
  }, [address, web3, chainId]);

  const collect = async () => {
    setLoading(true);

    try {
      await contract.methods.collectRef().send({
        from: address
      });
    } catch (err) {
      console.error(err);
    }
    fetchReferralData();
    setLoading(false);
  };

  return (
    <>
    <Typography variant="h5" color="white" style={{textAlign: "center"}} gutterBottom>
      Referral Link
    </Typography>
    
    <CardWrapper>
      <CardContent sx={{ p: 3 }}>
        <Grid container columnSpacing={3}>
          <Grid item md={12} xs={12} textAlign="center">
            <ReferralLink address={props.address} />
          </Grid>
          <Grid item md={2} xs={12}></Grid>
          <Grid item md={8} xs={12}>
            <Box component="div" >
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="body2" color="primary" gutterBottom>
                    Total Referral Team:
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {`${referralData.refCount} `} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {" "}
                  </Typography>
                </Grid>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="body2" color="primary" gutterBottom>
                    Your Referral Pay:
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {`${referralData.reward} USDC`}
                  </Typography>
                  <Button
                    variant="outlined"
                    style={{height: "30px"}}
                    disabled={wrongNetwork || !address || loading}
                    onClick={collect}
                  >
                    COLLECT
                  </Button>
                </Grid>
            </Box>
          </Grid>
          <Grid item md={2} xs={12}></Grid>
        </Grid>
      </CardContent>
    </CardWrapper>
    </>
  );
}
