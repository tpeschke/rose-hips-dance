import "./home-page.css";
import BackgroundImages from "./components/backgroundImages/backgroundImages";
import BeginYourJourney from "./homeComponents/beginYourJourney/BeginYourJourney";
import FindYourClass from "./homeComponents/findYourClass/findYourClass";
import MainBanner from "./homeComponents/mainBanner/mainBanner";
import Marquee from "./homeComponents/marquee/marquee";
import RotatingSun from "./homeComponents/rotatingSun/rotatingSun";
import OurPhilosophy from "./homeComponents/ourPhilosophy/ourPhilosophy";

export default function Home() {
  return (
    <div className="home-page">
      <RotatingSun />
      <MainBanner />
      <OurPhilosophy />
      <Marquee />
      <FindYourClass />
      <BeginYourJourney />
      <BackgroundImages />
    </div>
  );
}
