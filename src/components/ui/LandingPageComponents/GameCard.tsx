import { ReactNode, useRef, useState, useEffect } from "react";

interface GameCardProps {
  name1: string;
  name2: string;
  imgSrc: string;
  description: string;
  duration: string;
  stake: string;
  sendSize: (value: number) => void;
}

const GameCard = function ({
  name1,
  name2,
  description,
  imgSrc,
  duration,
  stake,
  sendSize,
}: GameCardProps) {
  const cardref = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    if (!cardref.current) return;

    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      setCardWidth(width);
      sendSize(cardWidth); // 🔥 send to grandparent whenever it changes
    });

    observer.observe(cardref.current);

    return () => observer.disconnect();
  }, [sendSize]);

  return (
    <div
      className="flex flex-col flex-shrink-0 w-auto p-4 gap-[16px] bg-[#2E2E2E] text-[#D5CFC7] rounded-[4px] border [border-color:var(--wdw,rgba(248,138,1,0.5))]"
      ref={cardref}
    >
      <img src={imgSrc} alt="" />
      <div>
        <h2 className="capitalize mt-4 font-semibold text-[#fff] text-base">
          {name1}{" "}
          <span className="bg-[linear-gradient(90deg,#F88A01_-0.1%,#F66E14_92.2%)]   bg-clip-text text-transparent">
            {name2}
          </span>
        </h2>
        <p className="max-w-[270px] text-[14px]/[20px] font-normal tracking-[0.011px]">
          {description}
        </p>
      </div>
      <div className="flex flex-row gap-[15px] justify-between items-center mt-4 text-[10px]/[12px] tracking-[0.008px] font-medium ">
        <div className="flex gap-3">
          <img src="Icons/hugeicons_user-multiple-02.png" alt="" />
          <p>Multiplayer</p>
        </div>
        <div className="flex gap-3">
          <img src="/Icons/hugeicons_alarm-clock.svg" alt="" />
          <p>{duration}</p>
        </div>
        <div className="flex gap-3">
          <img src="/Icons/hugeicons_stake.svg" alt="" />
          <p>{stake}</p>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
