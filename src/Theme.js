import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fffc00",
      light: "#fffc0024"
    },
    secondary: {
      main: "#fffc00"
    },
    text: {
      primary: "#fffc00",
      textLight: "#ffffff",
      darkBgColor: "#17171c"
    }
  },
  typography: {
    fontFamily: "Roboto",
    body1: {
      fontSize: 20
    },
    body2: {
      fontSize: 16,
      color: "#ffffff"
    },
    footer: {
      fontSize: 16,
      fontWeight: 400,
      color: "white"
    },
    allVariants: {
      color: "#fffc00"
    },
    h4: {
      fontWeight: 600,
      fontSize: 32
    },
    h5: {
      fontSize: 24,
      fontWeight: 500
    },
    h6: {
      fontSize: 24,
      fontWeight: 800,
      color: "#fffc00"
    },
    caption: {
      fontSize: 18
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "12px 24px"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          fontWeight: 400,
          fontSize: "0.8rem",
          padding: "3px",
          minWidth: 80,
          backgroundColor: "#a671d4",
        },
        outlined: {
          boxShadow: "0px 1px 2px 1px #fffc0096;",
          color: "white",
          border: "1px solid #fffc00"
        },
        containedSecondary: {
          color: "#f4b52d",
        },
      }
    }
  }
});

export default function Theme({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
