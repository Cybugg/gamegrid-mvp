import { useState, useEffect, useRef } from "react";
import GameCategory from "./GameCategory";
import GameCardRack from "./GameCardRack";
import OverLayHead from "./OverLayHead";
const GamingEvent = function () {
  const containerRef = useRef<HTMLDivElement>(null);
  const ellipseRef = useRef(null);
  const sectionRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [cardWidth, setcardWidth] = useState(0);
  const [sectionWidth, setsectionWidth] = useState(0);
  const [noOfSlides, setNoOfSlides] = useState(0);

  const handleChildData = (value: number) => {
    setcardWidth(value);
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      setsectionWidth(entry.contentRect.width);
    });

    observer.observe(sectionRef.current);

    const totalWidth = cardWidth * 20 + (32 + 3);
    setNoOfSlides(Math.ceil(totalWidth / sectionWidth));

    console.log(
      `${sectionWidth}am section width while ${cardWidth} is card width and total sef is ${totalWidth} and it has ${noOfSlides}`
    );

    return () => observer.disconnect();
  }, [sectionWidth, cardWidth, noOfSlides]);

  const moveto = (idx) => {
    setActiveIndex(idx);
    if (containerRef.current) {
      console.log(containerRef.current.clientWidth);
      console.log(containerRef.current.scrollWidth);
      containerRef.current.scrollTo({
        left: sectionWidth * idx,
        behavior: "smooth",
      });
      console.log(containerRef.current.scrollLeft);
    }
  };

  return (
    <section
      className=" relative mb-[120px] w-full  flex flex-col"
      ref={sectionRef}
    >
      <OverLayHead overLayText="Gaming Event" underLayText=" GAming EVEnt" />

      <div className="flex gap-12 justify-center ">
        <GameCategory>All Games</GameCategory>
        <GameCategory>Action</GameCategory>
        <GameCategory>Multiplayer</GameCategory>
        <GameCategory>Adventure</GameCategory>
        <GameCategory>RPD</GameCategory>
      </div>

      <div
        className="pr-[100px] w-full max-w-[100%] overflow-x-auto snap-x snap-mandatory scroll"
        style={{ scrollbarWidth: "none" }}
        ref={containerRef}
      >
        <GameCardRack onChildData={handleChildData} />
      </div>

      <div className="flex justify-center space-x-2 mt-12">
        {noOfSlides !== Infinity &&
          Array.from({ length: noOfSlides }).map((_, idx) => (
            <button
              key={idx}
              data-key={idx}
              onClick={() => moveto(idx)}
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
