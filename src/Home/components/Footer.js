import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <Grid container justifyContent="center" spacing={2} marginTop={5}>
      <Typography variant="footer" sx={{ fontWeight: "400" }} style={{textAlign: "center"}} gutterBottom>
        Copyright VERSAESTATE
      </Typography>
    </Grid>
  );
}
