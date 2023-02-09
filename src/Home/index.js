import { styled } from "@mui/system";

import Header from "./components/Header";
import BakeCard from "./components/BakeCard";
import NutritionFacts from "./components/NutritionFacts";
import { useAuthContext } from "../providers/AuthProvider";
import Footer from "./components/Footer";
import Statistics from "./components/Statistics";

const Wrapper = styled("div")(({ theme }) => ({
  maxWidth: 560,
  margin: "0 auto",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%"
  }
}));

const ExtendWrapper = styled("div")(({ theme }) => ({
  maxWidth: 680,
  margin: "0 auto",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%"
  }
}));

export default function Home() {
  const { address } = useAuthContext();

  return (
    <>
    <Wrapper>
      <Header />
      <BakeCard />
    </Wrapper>

    <ExtendWrapper>
      <NutritionFacts address={address} />
    </ExtendWrapper>

    <Wrapper>
      <Statistics />
      <Footer />
    </Wrapper>
    </>
  );
}
