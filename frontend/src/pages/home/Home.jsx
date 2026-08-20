import Banner from "./Banner";
import Recommended from "./Recommended";
import TopSellers from "./TopSellers";
import News from "./News";
import MoreBooks from "./MoreBooks";
// import LandingPage from "../../components/LandingPage";
// import Login from "./Login";

const Home = () => {
  return (
    <div>
      <Banner />
      <TopSellers />
      <Recommended />
      <MoreBooks />
      <News />
    </div>
  );
};

export default Home;
