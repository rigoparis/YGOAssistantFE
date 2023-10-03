import React from "react";
import PropTypes from "prop-types";

function CardContainer({ cardId }) {
  const onDragStart = (event, nodeType, cardId) => {
    console.log("onDragStart");
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("cardId", cardId);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <div
      onDragStart={(event) => onDragStart(event, "default", cardId)}
      draggable
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
