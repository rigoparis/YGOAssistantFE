import React from "react";
import PropTypes from "prop-types";

import { useDrag } from "react-dnd";

function CardContainer({ cardId, subDeck }) {
  const [{ isDragging }, ref] = useDrag({
    type: "CARD",
    item: { id: cardId, subDeck },
  });
  const opacity = isDragging ? 0.4 : 1;

  return (
    <div
      ref={ref}
      style={{ opacity }}
      className="bg-gray-200 flex cursor-grab justify-center items-center
      xl:h-[100px] xl:w-[80px]
      lg:h-[80px] lg:w-[60px]
      md:h-[100px] md:w-[70px] 
      sm:h-[120px] sm:w-[90px] 
      h-[140px] w-[120px] 
      rounded-xl animate-pulse text-base-200 text-xs">
      {cardId}
    </div>
  );
}

CardContainer.propTypes = { cardId: PropTypes.number, subDeck: PropTypes.string };

export default CardContainer;
