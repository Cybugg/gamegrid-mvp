interface OverLayHeadProps {
  underLayText: string;
  overLayText: string;
}

const OverLayHead = function ({ underLayText, overLayText }: OverLayHeadProps) {
  return (
    <div className="  flex gap-3 justify-center items-center mt-16 mb-[60px] z-10">
      <img src="/Icons/Frame-2.svg" alt="" />
      <h1
        className=" relative text-6xl font-bold text-transparent opacity-30 text-center font-oxanium  uppercase text-[48px] [text-shadow:_3px_0_4px_rgba(51,252,255,0.2)] 
         [-webkit-text-stroke-width:1px] 
         [-webkit-text-stroke-color:#F88A01]    "
      >
        {underLayText}
      </h1>
      <h1 className="absolute top-[50%]] left-[50%] -translate-x-[50%]  text-[32px] font-semibold tracking-[0.026px] text-[#fff]  capitalize">
        {overLayText}
      </h1>
      <img src="/Icons/Frame-3.svg" alt="" />
    </div>
  );
};

export default OverLayHead;
