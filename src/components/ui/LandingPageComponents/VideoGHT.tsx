import OverLayHead from "./OverLayHead";

const VideoGHT = function () {
  return (
    <section className="mb-[120px]">
      <OverLayHead
        underLayText="video game history tournament"
        overLayText="Video game history tournament"
      />
      <div className="flex flex-col gap-[40px]">
        <div className="border rounded-[4px] [border-color:var(--wdw,rgba(248,138,1,0.5))]">
          <img src="/Images/Rectangle 86 (2).png" alt="" />
        </div>
        <div className="grid grid-cols-2 gap-[40px]">
          <img src="/Images/Rectangle 86.png" alt="" />
          <img src="/Images/Rectangle 87.png" alt="" />
        </div>
      </div>
    </section>
  );
};

export default VideoGHT;
