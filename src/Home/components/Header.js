import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";
import { config } from "../../config";
import logo from "../../assets/FullLogo.png";
import avaxlogo from "../../assets/avax.svg";
import Connect from "./Connect";


const Wrapper = styled("div")(({ theme }) => ({
  textAlign: "center",
  [theme.breakpoints.down("md")]: {
    h5: {
      fontSize: 20,
      margin: 0,
    },
  },
}));
const CustomLinks = styled(Link)(({ theme }) => ({
  color: theme.palette.text.textLight,
  textDecoration: "none",
  fontWeight: "500",
  cursor:"pointer",
  padding:"10px 16px",
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));


export default function Header() {

  return (
    <Wrapper>
      <img src={logo} alt="" width={"42%"} style={{ marginTop: -10, minWidth: "225px" }} />
      <Typography variant="body2" sx={{fontWeight: "400"}} marginTop={2}>
        Real estate fractional investments in the metaverse and in the real world, powered by blockchain technology.
      </Typography>
      <Connect responsive={false} />
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        style={{width: "112px", margin: "auto"}}
      >
        <img src={avaxlogo} alt="" width={"32px"} />
        <Typography variant="body2" sx={{fontWeight: "400"}}>
          Avalanche
        </Typography>
      </Grid>

      <Box component="div" sx={{width: "100%",display: "flex",alignItems: "center",justifyContent: "center",my:3}}>
        <CustomLinks href={config.scanLink} target="_blank" variant="body2" component="a" rel="noreferrer">CONTRACT</CustomLinks>
        <CustomLinks href="" target="_blank" variant="body2" component="a" rel="noreferrer">AUDIT</CustomLinks>
        <CustomLinks href="https://t.me/versaestate" target="_blank" variant="body2" component="a" rel="noreferrer">TELEGRAM</CustomLinks>
        <CustomLinks href="" target="_blank" variant="body2" component="a" rel="noreferrer">DOCS</CustomLinks>
      </Box>

      {/* {countdown.alive && 
        <>
        <LaunchTitle>LAUNCH COUNTDOWN</LaunchTitle>
        <Countdown>
          {`${countdown.days} Days, ${countdown.hours} Hours, ${countdown.minutes} Mins & ${countdown.seconds} Secs`}
        </Countdown>
        </>
      } */}
    </Wrapper>
  );
}
