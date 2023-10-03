import React, { useEffect } from "react";

import DeckListSideBar from "../components/deckListSideBar";
import DeckBuilderManager from "../components/deckBuilderManager";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getAllByUserId, resetActiveDeck, getDeckFromListById } from "../actions/deck";

import { GiBookPile } from "react-icons/gi";

function DeckManager() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  //const { deck, deckList } = useSelector((state) => state.deck);

  const handleOnAddNewDeck = () => {
    dispatch(resetActiveDeck());
  };

  const handleOnDeckClick = (id) => () => {
    dispatch(getDeckFromListById(id));
  };

  useEffect(() => {
    console.log(isLoggedIn);
    if (!isLoggedIn) {
      navigate("/login");
      window.location.reload();
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getAllByUserId(user._id));
    }
  }, [user, dispatch, isLoggedIn]);

  return (
    <div>
      <div className="flex flex-row gap-4 items-center ml-1 mb-4 lg:ml-6">
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn m-1">
            <GiBookPile />
          </label>
          <div className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <DeckListSideBar
              tabIndex={0}
              onAddNewDeck={handleOnAddNewDeck}
              onDeckClick={handleOnDeckClick}
            />
          </div>
        </div>
        <h1 className="text-2xl font-semibold h1">Deck Manager</h1>
      </div>
      <div className="flex flex-row h-full px-4 gap-4">
        <div className="hidden lg:block h-fit">
          <DeckListSideBar onAddNewDeck={handleOnAddNewDeck} onDeckClick={handleOnDeckClick} />
        </div>
        <DeckBuilderManager />
      </div>
    </div>
  );
}

export default DeckManager;
