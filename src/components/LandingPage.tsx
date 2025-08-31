import Header from "./ui/LandingPageComponents/Header";
import WhyGameGrid from "./ui/LandingPageComponents/WhyGameGrid";
import VideoGHT from "./ui/LandingPageComponents/VideoGHT";
import JoinWaitlist from "./ui/LandingPageComponents/JoinWaitlist";
import Footer from "./ui/LandingPageComponents/Footer";
import LazyLoadSection from "@/hooks/lazyLoadSextion";

const LandingPage = function () {
  return (
    <div className=" relative  px-16 py-[25px] font-[Oxanium,sans-serif]">
      <div className="absolute inset-0 bg-[url('/Images/texture.png')] bg-repeat opacity-10"></div>
      <main>
        <Header />
        <LazyLoadSection
          importFunc={() => import("./ui/LandingPageComponents/GamingEvent")}
          placeholder="Game Event placeholder..."
        />
        <WhyGameGrid />
        <VideoGHT />
        <JoinWaitlist />
        <Footer />
      </main>
    </div>
  );
};

export default LandingPage;
