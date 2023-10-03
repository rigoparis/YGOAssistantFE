import React, { useCallback } from "react";
import PropTypes from "prop-types";

import { useDrag } from "react-dnd";

const CARD_COLORS = {
  normal: "bg-[#FDE68A]",
  effect: "bg-[#FF8B53]",
  normal_pendulum: "bg-gradient-to-b from-[#FDE68A] to-[#1D9E74]",
  effect_pendulum: "bg-gradient-to-b from-[#FF8B53] to-[#1D9E74]",
  spell: "bg-[#1D9E74]",
  ritual: "bg-[#9DB5CC]",
  link: "bg-[#00008B]",
  fusion: "bg-[#A086B7]",
  trap: "bg-[#BC5A84]",
  synchro: "bg-[#CCCCCC]",
  xyz: "bg-[#000]",
};

function CFCardContainer({ card }) {
  const [{ isDragging }, ref] = useDrag({
    type: "CARD",
    item: { id: card.id },
  });
  const opacity = isDragging ? 0.4 : 1;
  const getBGColor = useCallback((frameType) => CARD_COLORS[frameType], []);

  return (
    <div
      ref={ref}
      style={{ opacity }}
      className={`p-1 select-none rounded-2xl cursor-grab ${getBGColor(card.frameType)}`}>
      <div className="flex flex-col gap-5 p-2 bg-neutral-content rounded-2xl">
        <div className="flex flex-row gap-5">
          <div className="bg-gray-200 xl:h-[120px] xl:w-[100px] lg:h-[100px] lg:w-[80px] h-[80px] w-[60px] rounded-xl animate-pulse"></div>
          <div className="flex flex-col flex-1 gap-5 sm:p-2">
            <div className="flex flex-col flex-1 gap-3">
              <h3 className="h3 text-base-200">{card.name}</h3>
              <div className="flex gap-3 mt-auto flex-wrap">
                {card.attribute && (
                  <div className="w-fit px-2 min-h-8 text-center bg-gray-200 rounded-full flex justify-center items-center text-sm text-base-200 capitalize">
                    {card.attribute}
                  </div>
                )}
                {card.type && (
                  <div className="w-fit px-2 min-h-8 text-center bg-gray-200 rounded-full flex justify-center items-center text-sm text-base-200 capitalize">
                    {card.type}
                  </div>
                )}
                {card.race && (
                  <div className="w-fit px-2 min-h-8 text-center bg-gray-200 rounded-full flex justify-center items-center text-sm text-base-200 capitalize">
                    {card.race}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="collapse bg-gray-200 text-base-200 collapse-plus h-fit">
          <input type="checkbox" />
          <div className="collapse-title text-sm font-medium h-min">Description</div>
          <div className="collapse-content text-xs">
            <p>{card.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

CFCardContainer.propTypes = { card: PropTypes.object };

export default CFCardContainer;
