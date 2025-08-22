import { ReactNode } from "react";

interface GameCategoryProp {
  children: ReactNode;
}

const GameCategory = function ({ children }: GameCategoryProp) {
  return (
    <div className="relative inline-flex items-center bg-[#121418]  text-white/90 font-semibold border border-[#FFFFFF/30] rounded-[8px] p-4 ">
      {children}
      {/* cover top-right gap */}
      <span className="absolute top-[-1.5px] right-0 w-[15px] h-[2px] bg-[#121418]" />
      <span className="absolute top-0 right-[-1.8px] w-[2px] h-[15px] bg-[#121418]" />
      {/* cover bottom-left gap */}
      <span className="absolute bottom-[-1.8px] left-0 w-[15px] h-[2px] bg-[#121418]" />
      <span className="absolute bottom-0 left-[1.8px] w-[2px] h-[15px] bg-[#121418]" />
    </div>
  );
};

export default GameCategory;
