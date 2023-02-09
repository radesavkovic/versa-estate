import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";


const CardWrapper = styled(Card)(({ theme }) => ({
  background: theme.palette.text.darkBgColor,
  paddingLeft: "56px",
  paddingRight: "56px",
  marginTop: "40px",
  marginBottom: "24px",
  [theme.breakpoints.down("md")]: {
    paddingLeft: "0px",
    paddingRight: "0px",
  }
}));

const CustomCardContent = styled(CardContent)(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
        paddingLeft: "16px",
        paddingRight: "16px",
      }
}));

export default function Statistics(props) {

  return (
    <CardWrapper>
      <CustomCardContent sx={{ px: 5, py: 3}} style={{display: "flex"}}>
          <Box component="div" sx={{width: "100%", ml: 3}}>
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              style={{marginBottom: "10px"}}
            >
                <Typography variant="body2" color="primary">
                    ROI:
                </Typography>
                <Typography variant="body2" gutterBottom>
                    up to 365% per module
                </Typography>
            </Grid>

            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
            >
                <Typography variant="body2" color="primary">
                    TX:
                </Typography>
                <Typography variant="body2">
                    10% on each deposit/withdraw
                </Typography>
            </Grid>
            <Typography variant="body2" textAlign={"right"}>
                ( 5% dev, 2% contract, 3% treasury )
            </Typography>
          </Box>
      </CustomCardContent>
    </CardWrapper>
  );
}
