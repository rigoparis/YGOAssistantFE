import React, { useState } from "react";
import axios from "axios";
import CFCardContainer from "./cfCardContainer";

function CardFinder() {
  const [cards, setCards] = useState([]);
  const [isLoadingCards, setIsLoadingCards] = useState(false);
  const [message, setMessage] = useState("");
  //   const [isLoadingImages, setIsLoadingImages] = useState(false);

  const handleCardSearch = async (event) => {
    if (event.key === "Enter") {
      try {
        setIsLoadingCards(true);
        setCards([]);
        var url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${event.target.value}`;
        var response = await axios.get(url);
        setIsLoadingCards(false);
        return setCards(response.data.data);
      } catch (error) {
        setIsLoadingCards(false);
        return setMessage("No cards found with those criteria");
      }
    }
  };

  return (
    <div className="bg-neutral p-4 rounded-box h-[980px] flex flex-col">
      <p className="label-text font-semibold text-lg text-center">Find cards</p>
      <div>
        <div>
          <label htmlFor="tags" className="label">
            <span className="label-text font-semibold">Card Name</span>
          </label>
          <input
            type="text"
            name="tags"
            className="input input-bordered w-full"
            onKeyDown={handleCardSearch}
          />
        </div>
      </div>
      {isLoadingCards && (
        <div className="flex justify-center mt-4 flex-1">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      )}
      {!isLoadingCards && (
        <div className="mt-4 flex flex-col gap-4 flex-1 overflow-y-auto">
          {cards.length === 0 && (
            <div className="flex justify-center mt-4 h-full">
              <p>{message || "Search for a card or cards using the filters above"}</p>
            </div>
          )}
          {cards.length > 0 && (
            <div className="flex flex-col gap-4 h-full">
              {cards.map((card) => (
                <CFCardContainer card={card} key={card.id} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CardFinder;
