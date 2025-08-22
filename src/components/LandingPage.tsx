import Header from "./ui/LandingPageComponents/Header";
import GamingEvent from "./ui/LandingPageComponents/GamingEvent";
import WhyGameGrid from "./ui/LandingPageComponents/WhyGameGrid";
import VideoGHT from "./ui/LandingPageComponents/VideoGHT";
import JoinWaitlist from "./ui/LandingPageComponents/JoinWaitlist";
import Footer from "./ui/LandingPageComponents/Footer";

const LandingPage = function () {
  return (
    <div className=" relative  px-16 py-[25px] font-[Oxanium,sans-serif]">
      <div className="absolute inset-0 bg-[url('/Images/texture.png')] bg-repeat opacity-10"></div>
      <main>
        <Header />
        <GamingEvent />
        <WhyGameGrid />
        <VideoGHT />
        <JoinWaitlist />
        <Footer />
      </main>
    </div>
  );
};

export default LandingPage;
