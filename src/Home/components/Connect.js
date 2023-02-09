import Button from "@mui/material/Button";
import { styled } from "@mui/system";

import { useAuthContext } from "../../providers/AuthProvider";

const ConnectButton = styled(Button)(({ theme }) => ({
  // color: theme.palette.text.textLight,
  marginTop: 30,
  marginBottom: 18,
  width: "30%",
  marginLeft: "auto",
  marginRight: "auto",
  [theme.breakpoints.down("md")]: {
    display: "block"
  }
}));

export default function Connect() {
  const { address, loading, connect, disconnect } = useAuthContext();
    return (
    <ConnectButton
      variant="outlined"
      disabled={loading}
      onClick={() => (address ? disconnect() : connect())}
    >
      {address ? "Disconnect" : "Connect"}
    </ConnectButton>
  );
}
