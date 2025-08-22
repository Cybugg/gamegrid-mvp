import { Link } from "react-router-dom";
import Button from "./Button";
const Hero = function () {
  return (
    <section className=" flex flex-col items-center gap-4 w-160  my-16 text-center">
      <img src="/Icons/Frame-35.svg" alt="" />
      <h2 className="bg-[linear-gradient(91deg,#F88A01_19.85%,#F66E14_69.01%)] bg-clip-text text-transparent text-[40px]/[48px] font-semibold">
        Stake. Play. Win.
      </h2>
      <h2 className="text-[#fff] text-[44px]/[48px] font-semibold tracking-[0.035px]">
        Decentralized Gaming
      </h2>
      <p className="text-[#D5CFC7] text-base font-normal tracking-[0.013px] max-w-[644px] ">
        Stake ICP tokens, compete in real-time multiplayer games, and win big on
        the most advanced decentralised gaming platform .
      </p>

      <div className="mt-10">
        <div className="flex gap-8">
          <Button to="/index">Connect Wallet</Button>
          <div className="flex gap-3  items-center  text-[14px]">
            <img
              src="/Icons/hugeicons_play.svg"
              alt=""
              className="w-[1em] h-[1em]"
            />
            <Link to="">View Games</Link>
          </div>
        </div>

        <div className="flex gap-8 rounded-[8px] bg-[linear-gradient(90deg,rgba(248,138,1,0)_0.14%,rgba(246,110,20,0.05)_134.05%)] p-4  border-2 border-[#ffffff] mt-4 text-[10px]  relative   ">
          <div className="flex gap-2 ">
            <img
              src="/Icons/Ellipse 21894.svg"
              alt=""
              className="w-[1em] h-[1em]"
            />
            <p>2847 active players</p>
          </div>
          <div className="flex gap-2 ">
            <img src="/Icons/Group-1.svg" alt="" className="w-[1em] h-[1em]" />
            <p>45,230 ICP Staked Today</p>
          </div>
          <span className="absolute  -left-[2px]  top-[calc(50%-5px)] -translate-y-1/2 w-[2px] h-[30px] bg-[#121418]"></span>
          <span className="absolute -right-[2px]  top-[calc(50%+5px)] -translate-y-1/2 w-[2px] h-[30px] bg-[#121418]"></span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
