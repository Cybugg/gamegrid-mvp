import { useState } from "react";
import GameCategory from "./GameCategory";
import GameCardRack from "./GameCardRack";
import OverLayHead from "./OverLayHead";
const GamingEvent = function () {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = 4;

  return (
    <section className=" relative mb-[120px] w-full  flex flex-col ">
      <OverLayHead overLayText="Gaming Event" underLayText=" GAming EVEnt" />

      <div className="flex gap-12 justify-center ">
        <GameCategory>All Games</GameCategory>
        <GameCategory>Action</GameCategory>
        <GameCategory>Multiplayer</GameCategory>
        <GameCategory>Adventure</GameCategory>
        <GameCategory>RPD</GameCategory>
      </div>

      <GameCardRack />

      <div className="flex justify-center space-x-2 mt-12">
        {Array.from({ length: totalSlides }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setActiveIndex(idx);
            }}
            className={`w-2 h-2 rounded-full transition-colors ${
              activeIndex === idx ? "bg-orange-500" : "bg-gray-600"
            }`}
          />
        ))}
      </div>
      <h1
        className=" absolute -right-[5%] -bottom-[5%] -z-[10]  font-bold text-transparent opacity-30 font-[lexend]  text-[120px]/[132px] 
         [-webkit-text-stroke-width:0.5px] 
         [-webkit-text-stroke-color:#F88A01]"
      >
        Gamegrid
      </h1>
    </section>
  );
};

export default GamingEvent;
