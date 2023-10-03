import React, { useState } from "react";
import DeckBuilder from "./deckBuilder/deckBuilder";
import FlowBuilder from "./flowBuilder/flowBuilder";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

import { createDeck, patchDeck, getAllByUserId } from "../actions/deck";

function DeckBuilderManager() {
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState(0);

  const { activeDeck } = useSelector((state) => state.deck);
  const { user } = useSelector((state) => state.auth);

  const changeTab = (tab) => () => setSelectedTab(tab);

  const handleOnSave = (deck) => {
    if (deck._id) {
      dispatch(patchDeck(deck))
        .then(() => {
          toast.custom((t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } max-w-md w-full toast toast-top toast-center h-10`}>
              <div className="alert alert-success">
                <div className="flex flex-row justify-center items-center">
                  <AiOutlineCheckCircle className="mr-2" />
                  Deck saved successfully
                </div>
              </div>
            </div>
          ));
          dispatch(getAllByUserId(user._id));
        })
        .catch(() =>
          toast.custom((t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } max-w-md w-full toast toast-top toast-center h-10`}>
              <div className="alert alert-error">
                <div className="flex flex-row justify-center items-center">
                  <AiOutlineCloseCircle className="mr-2" />
                  Something happened while saving.
                </div>
              </div>
            </div>
          )),
        );
    } else {
      dispatch(createDeck(deck))
        .then(() => {
          toast.custom((t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } max-w-md w-full toast toast-top toast-center h-10`}>
              <div className="alert alert-success">
                <div className="flex flex-row justify-center items-center">
                  <AiOutlineCheckCircle className="mr-2" />
                  Deck saved successfully
                </div>
              </div>
            </div>
          ));
          dispatch(getAllByUserId(user._id));
        })
        .catch(() =>
          toast.custom((t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } max-w-md w-full toast toast-top toast-center h-10`}>
              <div className="alert alert-error">
                <div className="flex flex-row justify-center items-center">
                  <AiOutlineCloseCircle className="mr-2" />
                  Something happened while saving.
                </div>
              </div>
            </div>
          )),
        );
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex justify-center flex-initial">
        <div className="tabs">
          <a
            className={`tab tab-bordered ${selectedTab === 0 ? "tab-active" : ""} transition-all`}
            onClick={changeTab(0)}>
            Deck Builder
          </a>
          <a
            className={`tab tab-bordered ${selectedTab === 1 ? "tab-active" : ""} transition-all`}
            onClick={changeTab(1)}>
            Flow Builder
          </a>
        </div>
      </div>
      <div className="w-full flex-auto">
        {selectedTab === 0 && <DeckBuilder pdeck={activeDeck} onSave={handleOnSave} />}
        {selectedTab === 1 && <FlowBuilder />}
      </div>
    </div>
  );
}

export default DeckBuilderManager;
