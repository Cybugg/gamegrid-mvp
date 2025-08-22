import OverLayHead from "./OverLayHead";
import Button from "./Button";

const JoinWaitlist = function () {
  return (
    <section>
      <OverLayHead underLayText="Join waitlist" overLayText="Join waitlist" />
      <div className="flex flex-col items-center ml-auto mr-auto">
        <p className="w-[954px] text-center">
          Join the GameGrid waitlist for exclusive early access to our Web3
          multiplayer battles. Be among the first to play, earn in-game rewards,
          unlock premium perks, stake-to-win matches, and claim token drops
          before public launch. Limited spots available — join now!
        </p>
        <div>
          <form action="" className="flex flex-col items-center">
            <p className=" flex w-[100%] p-3">Email</p>
            <input
              type="email"
              name="email"
              id=""
              className="w-[536px] mb-12 p-4 rounded-[8px] border border-[#8D8D8D] bg-[#2E2E2E] font-[Albert Sans] text-base font-normal tracking-[0.013px]"
              placeholder="johnclev@gmail.com"
            />
            <Button to="/">Join</Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default JoinWaitlist;
