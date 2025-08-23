import React from "react";
import { ReactNode } from "react";
import GameCard from "./GameCard";

interface GameCardRackProps {
  onChildData: (value: number) => void;
}

const GameCardRack = function ({ onChildData }: GameCardRackProps) {
  const cardDetailsArr = [
    {
      name1: "league of",
      name2: "legends",
      description:
        "Lorem ipsum vulputate vitae venenatis nibh risus sollicitudin massa pellentesque.",
      duration: "4 days",
      imgSrc: "/Images/Rectangle 86 (10).png",
      stake: " 12 ICP",
    },
    {
      name1: "legends of",
      name2: "orisha",
      description:
        "Lorem ipsum vulputate vitae venenatis nibh risus sollicitudin massa pellentesque.",
      duration: "7 days",
      imgSrc: "/Images/Rectangle 86 (9).png",
      stake: " 8 ICP",
    },
    {
      name1: "assasin",
      name2: "creed",
      description:
        "Lorem ipsum vulputate vitae venenatis nibh risus sollicitudin massa pellentesque.",
      duration: "1 days",
      imgSrc: "/Images/Rectangle 86 (8).png",
      stake: " 3 ICP",
    },
    {
      name1: "league of",
      name2: "legends",
      description:
        "Lorem ipsum vulputate vitae venenatis nibh risus sollicitudin massa pellentesque.",
      duration: "4 days",
      imgSrc: "/Images/Rectangle 86 (10).png",
      stake: " 4.7 ICP",
    },
  ];

  const expandedItems = [
    ...cardDetailsArr.slice(0, 3),
    ...Array(17).fill(cardDetailsArr[3]),
  ];

  return (
    <div className="flex gap-8 mt-[70px] no-wrap ">
      {expandedItems.map((each, index) => {
        return (
          <GameCard
            name1={each.name1}
            name2={each.name2}
            description={each.description}
            duration={each.duration}
            imgSrc={each.imgSrc}
            stake={each.stake}
            key={index}
            sendSize={onChildData}
          />
        );
      })}
    </div>
  );
};

export default GameCardRack;
