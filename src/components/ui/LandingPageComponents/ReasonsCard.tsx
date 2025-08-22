interface ReasonsCardProps {
  imgSrc: string;
  title: string;
  text: string;
}

const ReasonsCard = function ({ imgSrc, title, text }: ReasonsCardProps) {
  return (
    <div className="flex flex-col p-4 bg-[#2E2E2E] border rounded-[4px] [border-color:var(--wdw,rgba(248,138,1,0.5))]">
      <img src={imgSrc} alt="" />
      <h3 className="mt-4 text-[#fff] text-base font-semibold">{title}</h3>
      <p className="mt-2 max-w-[274px] text-[#D5CFC7] text-[14px]/[20px] font-normal tracking-[0.011px] ">
        {text}
      </p>
    </div>
  );
};

export default ReasonsCard;
