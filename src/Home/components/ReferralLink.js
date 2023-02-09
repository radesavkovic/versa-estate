import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import copy from "copy-to-clipboard";

const Input = styled("input")(({ theme }) => ({
  fontSize: 14,
  fontWeight: 400,
  borderRadius: 18,
  padding: "5px 14px 5px 14px",
  marginLeft: "10%",
  display: "block",
  border: `1px solid ${theme.palette.text.textLight}`,
  boxShadow: "0px 0px 2px 1px #fffc0096",
  color: theme.palette.text.textLight,
  background: theme.palette.text.darkBgColor,
  width: "80%",
  outline: "none",
  '& label.Mui-focused': {
    color: '#ffffff00',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#ffffff00',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#ffffff00',
    },
    '&:hover fieldset': {
      borderColor: '#ffffff00',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#ffffff00',
    },
  },
}));


const copyToClipboard = str => {
  copy(str);
};

export default function ReferralLink({ address }) {
  const link = `${window.origin}?ref=${address}`;
  return (
    <>
      <Input value={address ? link : ""} readOnly/>
      <Button
        variant="outlined"
        style={{marginTop: "10px", padding: 0}}
        onClick={()=>{copyToClipboard(link)}}
      >
        COPY
      </Button>
      <Typography variant="body2" color="textLight" sx={{ mt: 3, mb: 3}}>
        Earn 5% of the USDC deposited from anyone who uses your referral link.
      </Typography>
    </>
  );
}
