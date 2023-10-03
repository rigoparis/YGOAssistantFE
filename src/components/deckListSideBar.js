import React from "react";
import PropTypes from "prop-types";

import { GiBookPile } from "react-icons/gi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useSelector } from "react-redux";

function DeckListSideBar({ onAddNewDeck, onDeckClick }) {
  const { decks, loading } = useSelector((state) => state.deck);

  return (
    <div className="bg-base-200 w-56 rounded-box h-full flex flex-col content-between p-4">
      <div className="flex flex-row justify-center items-center">
        <GiBookPile size="14px" className="mr-2" />
        <h2>Decks</h2>
      </div>
      <button
        className="link flex flex-row items-center my-4 no-underline hover:opacity-50"
        onClick={onAddNewDeck}>
        <AiOutlinePlusCircle className="mr-2" />
        Add new deck
      </button>
      {loading && (
        <div className="flex flex-row justify-center items-center">
          <span className="loading loading-bars loading-md mr-2"></span>
          Loading decks...
        </div>
      )}
      {!loading && decks.length === 0 && <span className="label-text">No decks</span>}
      {!loading &&
        decks.map((deck) => (
          <button
            key={deck._id}
            className="link flex flex-row items-center mt-2 no-underline hover:opacity-50"
            onClick={onDeckClick(deck._id)}>
            {deck.deckname}
          </button>
        ))}
    </div>
  );
}

DeckListSideBar.propTypes = {
  onAddNewDeck: PropTypes.func.isRequired,
  onDeckClick: PropTypes.func.isRequired,
};

export default DeckListSideBar;
