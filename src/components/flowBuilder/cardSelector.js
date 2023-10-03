import React, { useMemo } from "react";

import { useSelector } from "react-redux";

import CardContainer from "./cardContainer";

function CardSelector() {
  const { activeDeck } = useSelector((state) => state.deck);
  const cards = useMemo(() => {
    if (
      activeDeck.mainDeck.length > 0 &&
      activeDeck.extraDeck.length > 0 &&
      activeDeck.sideDeck.length > 0
    ) {
      let allCardsPartialUnique = [
        ...new Set(activeDeck.mainDeck.map((id) => id)),
        ...new Set(activeDeck.extraDeck.map((id) => id)),
        ...new Set(activeDeck.sideDeck.map((id) => id)),
      ];
      return [...new Set(allCardsPartialUnique.map((id) => id))];
    }
    return [];
  }, [activeDeck]);

  return (
    <div className="bg-neutral p-4 rounded-box h-full flex flex-col">
      <p className="label-text font-semibold text-lg text-center mb-4">Cards in your deck</p>
      <div className="flex flex-row flex-wrap gap-3 justify-center">
        {cards && cards.map((id, i) => <CardContainer key={i} cardId={id} />)}
      </div>
    </div>
  );
}

export default CardSelector;
