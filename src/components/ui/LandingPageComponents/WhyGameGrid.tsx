import OverLayHead from "./OverLayHead";
import ReasonsCard from "./ReasonsCard";

const WhyGameGrid = function () {
  return (
    <section className="relative mb-[120px]">
      <div className="absolute -top-[26%] left-[-3.5%] -z-10">
        <div className="relative">
          <img src="/Images/Vector 14.png" alt="" />
          <img
            src="/Icons/Rectangle 19.svg"
            alt=""
            className="absolute top-[30%] left-[31.3%]"
          />
        </div>
      </div>

      <div className="absolute left-[6%] -bottom-[50%] -z-10">
        <div className="relative w-fit ">
          <img src="/Images/Vector 15.png" alt="" />
          <img
            src="/Icons/Ellipse 5.svg"
            alt=""
            className="absolute -bottom-[2%] -left-[8%]"
          />
        </div>
      </div>

      <div className="absolute top-[40%] -right-[5%] flex flex-col gap-4 -z-10">
        <img src="/Icons/Frame.svg" alt="" />
        <img src="/Icons/Frame.svg" alt="" />
        <img src="/Icons/Frame.svg" alt="" />
        <img src="/Icons/Frame.svg" alt="" />
        <img src="/Icons/Frame.svg" alt="" />
      </div>

      <div className="absolute -bottom-[107%] -right-[2%] -z-10">
        <div className="relative  ">
          <img src="/Images/Vector 12.png" alt="" />
          <img
            src="/Icons/Ellipse 4.svg"
            alt=""
            className="absolute -top-[1%] -right-[5%]"
          />
          <img
            src="/Icons/Vector 13.svg"
            alt=""
            className="absolute top-[40%] left-[15%]"
          />
          <img
            src="/Icons/Group 8.svg"
            alt=""
            className="absolute top-[44.5%] left-[7%]"
          />
        </div>
      </div>
      <OverLayHead underLayText="Why gamegrid" overLayText="Why gamegrid" />
      <div className="flex gap-8">
        <ReasonsCard
          imgSrc="/Images/Rectangle 86 (6).png"
          title="Real-Time Gaming"
          text="Experience lightning-fast multiplayer matches with zero lag"
        />
        <ReasonsCard
          imgSrc="/Images/Rectangle 86 (5).png"
          title="Trustless Staking"
          text="Secure smart contract handles all stakes and payouts automatically"
        />
        <ReasonsCard
          imgSrc="/Images/Rectangle 86 (4).png"
          title="Win Real Rewards"
          text="Compete for ICP tokens and climb the global leaderboards"
        />
        <ReasonsCard
          imgSrc="/Images/Rectangle 86 (3).png"
          title="Global Community"
          text="Join thousands of players in the ultimate gaming arena"
        />
      </div>
    </section>
  );
};

export default WhyGameGrid;
